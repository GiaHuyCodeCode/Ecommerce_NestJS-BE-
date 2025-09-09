import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';  
import { InjectModel } from '@nestjs/mongoose';  
import { Model } from 'mongoose';  
import { Order, OrderDocument } from './schemas/order.schema';  
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
    // Tính toán giá trị đơn hàng  
    let subtotal = 0;  
    const orderItems = [];  
      
    // Lặp qua từng sản phẩm trong đơn hàng  
    for (const item of createOrderDto.items) {  
      const product = await this.productModel.findById(item.product).exec();  
        
      if (!product) {  
        throw new NotFoundException(`Product with ID "${item.product}" not found`);  
      }  
        
      // Kiểm tra số lượng tồn kho  
      if (product.quantity < item.quantity) {  
        throw new BadRequestException(`Not enough stock for product "${product.name}"`);  
      }  
        
      // Tìm variant nếu có  
      let price = product.price;  
      if (item.variantId) {  
        const variant = product.variants.find(v => v._id.toString() === item.variantId);  
        if (!variant) {  
          throw new NotFoundException(`Variant with ID "${item.variantId}" not found`);  
        }  
        price = variant.price;  
      }  
        
      // Tính subtotal của item  
      const itemSubtotal = price * item.quantity
    }
}
}