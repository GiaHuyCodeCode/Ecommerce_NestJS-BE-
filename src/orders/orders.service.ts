// src/orders/orders.service.ts  
import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';  
import { InjectModel } from '@nestjs/mongoose';  
import { Model } from 'mongoose';  
import { Order, OrderDocument, OrderItem } from './schemas/order.schema';  
import { Product, ProductDocument } from '../products/schemas/product.schema';  
import { CreateOrderDto } from './dto/create-order.dto';  
import { UpdateOrderDto } from './dto/update-order.dto';  
  
@Injectable()  
export class OrdersService {  
  constructor(  
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,  
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,  
  ) {}  
  
  async create(userId: string, createOrderDto: CreateOrderDto): Promise<OrderDocument> {  
    // Calculate order values  
    let subtotal = 0;  
    let tax = 0;  
    const shippingFee = 10; // Fixed shipping fee for simplicity  
    const orderItems: OrderItem[] = [];  
      
    // Process each item in the order  
    for (const item of createOrderDto.items) {  
      const product = await this.productModel.findById(item.product).exec();  
        
      if (!product) {  
        throw new NotFoundException(`Product with ID "${item.product}" not found`);  
      }  
        
      // Check if enough stock  
      if (product.quantity < item.quantity) {  
        throw new BadRequestException(`Not enough stock for product "${product.name}"`);  
      }  
        
      // Find variant if specified
      let price = product.price;
      let variant: any = null;
        
      if (item.variantId) {  
        variant = product.variants.find(v => (v as any)._id.toString() === item.variantId);  
        if (!variant) {  
          throw new NotFoundException(`Variant with ID "${item.variantId}" not found`);  
        }  
        price = variant.price;  
          
        // Check variant stock  
        if (variant.quantity < item.quantity) {  
          throw new BadRequestException(`Not enough stock for product variant`);  
        }  
      }  
        
      // Calculate item subtotal  
      const itemSubtotal = price * item.quantity;  
      subtotal += itemSubtotal;  
        
      // Add to order items
      orderItems.push({
        product: product._id as any,
        variantId: item.variantId,
        name: product.name,
        sku: item.variantId ? variant?.sku : product.sku,
        price: price,
        quantity: item.quantity,
        subtotal: itemSubtotal
      });
        
      // Update product stock  
      if (item.variantId) {  
        // Update variant stock  
        const variantIndex = product.variants.findIndex(v => (v as any)._id.toString() === item.variantId);  
        product.variants[variantIndex].quantity -= item.quantity;  
      } else {  
        // Update main product stock  
        product.quantity -= item.quantity;  
      }  
        
      // Save product with updated stock  
      await product.save();  
    }  
      
    // Calculate tax (assuming 10% tax rate)  
    tax = subtotal * 0.1;  
      
    // Calculate total  
    const total = subtotal + tax + shippingFee;  
      
    // Create the order  
    const order = new this.orderModel({  
      user: userId,  
      items: orderItems,  
      subtotal,  
      tax,  
      shippingFee,  
      total,  
      shippingAddress: createOrderDto.shippingAddress,  
      billingAddress: createOrderDto.billingAddress,  
      paymentMethod: createOrderDto.paymentMethod,  
      statusHistory: [  
        {  
          status: 'pending',  
          note: 'Order created',  
          date: new Date()  
        }  
      ]  
    });  
      
    return order.save();  
  }  
  
  async findAll(): Promise<OrderDocument[]> {  
    return this.orderModel  
      .find()  
      .populate('user', 'email firstName lastName')  
      .sort({ createdAt: -1 })  
      .exec();  
  }  
  
  async findByUser(userId: string): Promise<OrderDocument[]> {  
    return this.orderModel  
      .find({ user: userId })  
      .sort({ createdAt: -1 })  
      .exec();  
  }  
  
  async findOne(id: string, user?: any): Promise<OrderDocument> {  
    const order = await this.orderModel  
      .findById(id)  
      .populate('user', 'email firstName lastName')  
      .exec();  
      
    if (!order) {  
      throw new NotFoundException(`Order with ID "${id}" not found`);  
    }  
      
    // If user is not admin, check if order belongs to user
    if (user && user.role !== 'admin' && (order.user as any)._id.toString() !== user.userId) {
      throw new ForbiddenException('You do not have permission to access this order');
    }
      
    return order;  
  }  
  
  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<OrderDocument> {  
    const order = await this.orderModel.findById(id).exec();  
      
    if (!order) {  
      throw new NotFoundException(`Order with ID "${id}" not found`);  
    }  
      
    // If status is being updated, add to status history  
    if (updateOrderDto.status && updateOrderDto.status !== order.status) {  
      order.statusHistory.push({  
        status: updateOrderDto.status,  
        note: `Status updated to ${updateOrderDto.status}`,  
        date: new Date()  
      });  
        
      // Update the order status  
      order.status = updateOrderDto.status;  
    }  
      
    // If payment status is being updated  
    if (updateOrderDto.paymentStatus && updateOrderDto.paymentStatus !== order.paymentStatus) {  
      order.paymentStatus = updateOrderDto.paymentStatus;  
    }  
      
    // Save the updated order  
    return order.save();  
  }  
  
  async cancelOrder(id: string, user: any): Promise<OrderDocument> {  
    const order = await this.orderModel.findById(id).exec();  
      
    if (!order) {  
      throw new NotFoundException(`Order with ID "${id}" not found`);  
    }  
      
    // Check if order belongs to user  
    if (user.role !== 'admin' && (order.user as any)._id.toString() !== user.userId) {  
      throw new ForbiddenException('You do not have permission to cancel this order');  
    }  
      
    // Check if order can be cancelled  
    if (!['pending', 'processing'].includes(order.status)) {  
      throw new BadRequestException(`Order with status "${order.status}" cannot be cancelled`);  
    }  
      
    // Add cancelled status to history  
    order.statusHistory.push({  
      status: 'cancelled',  
      note: 'Order cancelled by user',  
      date: new Date()  
    });  
      
    // Update order status  
    order.status = 'cancelled';  
      
    // Restore product stock  
    for (const item of order.items) {  
      const product = await this.productModel.findById(item.product).exec();  
        
      if (product) {  
        if (item.variantId) {  
          // Find and update variant stock  
          const variantIndex = product.variants.findIndex(v => (v as any)._id.toString() === item.variantId);  
          if (variantIndex !== -1) {  
            product.variants[variantIndex].quantity += item.quantity;  
          }  
        } else {  
          // Update main product stock  
          product.quantity += item.quantity;  
        }  
          
        // Save product with restored stock  
        await product.save();  
      }  
    }  
      
    // Save the updated order  
    return order.save();  
  }  
  
  async remove(id: string): Promise<{ message: string }> {  
    const order = await this.orderModel.findById(id).exec();  
      
    if (!order) {  
      throw new NotFoundException(`Order with ID "${id}" not found`);  
    }  
      
    // Only allow deletion of cancelled orders  
    if (order.status !== 'cancelled') {  
      throw new BadRequestException('Only cancelled orders can be deleted');  
    }  
      
    await this.orderModel.findByIdAndDelete(id).exec();  
      
    return { message: 'Order deleted successfully' };  
  }  
  
  // Get order statistics for admin dashboard  
  async getOrderStats(): Promise<any> {  
    const today = new Date();  
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());  
      
    const stats = await this.orderModel.aggregate([  
      {  
        $facet: {  
          // Total orders  
          totalOrders: [  
            { $count: 'count' }  
          ],  
          // Total revenue  
          revenue: [  
            {   
              $group: {  
                _id: null,  
                total: { $sum: '$total' }  
              }  
            }  
          ],  
          // Orders by status  
          byStatus: [  
            {  
              $group: {  
                _id: '$status',  
                count: { $sum: 1 }  
              }  
            }  
          ],  
          // Recent orders (last 30 days)  
          recentOrders: [  
            {  
              $match: {  
                createdAt: { $gte: lastMonth }  
              }  
            },  
            { $count: 'count' }  
          ],  
          // Revenue by day (last 30 days)  
          revenueByDay: [  
            {  
              $match: {  
                createdAt: { $gte: lastMonth }  
              }  
            },  
            {  
              $group: {  
                _id: {   
                  $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }   
                },  
                revenue: { $sum: '$total' },  
                orders: { $sum: 1 }  
              }  
            },  
            { $sort: { _id: 1 } }  
          ]  
        }  
      }  
    ]);  
      
    // Format response  
    return {  
      totalOrders: stats[0].totalOrders[0]?.count || 0,  
      revenue: stats[0].revenue[0]?.total || 0,  
      byStatus: stats[0].byStatus,  
      recentOrders: stats[0].recentOrders[0]?.count || 0,  
      revenueByDay: stats[0].revenueByDay  
    };  
  }  
  
  // Process payment (simplified implementation)  
  async processPayment(orderId: string, paymentDetails: any): Promise<OrderDocument> {  
    const order = await this.orderModel.findById(orderId).exec();  
      
    if (!order) {  
      throw new NotFoundException(`Order with ID "${orderId}" not found`);  
    }  
      
    // In a real application, you would integrate with a payment gateway here  
    // This is a simplified implementation  
      
    // Update payment status  
    order.paymentStatus = 'paid';  
      
    // Add payment details  
    order.paymentDetails = paymentDetails;  
      
    // Update order status if it was pending  
    if (order.status === 'pending') {  
      order.status = 'processing';  
      order.statusHistory.push({  
        status: 'processing',  
        note: 'Payment received, order is being processed',  
        date: new Date()  
      });  
    }  
      
    return order.save();  
  }  
}  
