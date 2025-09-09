// src/orders/schemas/order.schema.ts  
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';  
import { Document, Schema as MongooseSchema } from 'mongoose';  

/**
 * Định nghĩa kiểu OrderDocument cho Mongoose (Order + Document)
 */
export type OrderDocument = Order & Document;  

/**
 * OrderItem: Đại diện cho từng sản phẩm trong đơn hàng.
 * - product: Tham chiếu đến _id của sản phẩm trong collection Product.
 * - variantId: Nếu sản phẩm có biến thể (màu, size...), lưu id biến thể.
 * - name, sku: Tên và mã SKU của sản phẩm tại thời điểm đặt hàng (có thể thay đổi theo thời gian).
 * - price: Giá tại thời điểm đặt hàng.
 * - quantity: Số lượng sản phẩm đặt.
 * - subtotal: Tổng tiền cho dòng sản phẩm này (price * quantity).
 */
@Schema()  
export class OrderItem {  
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product', required: true })  
  product: MongooseSchema.Types.ObjectId;  
  
  @Prop()  
  variantId?: string;  
  
  @Prop({ required: true })  
  name: string;  
  
  @Prop({ required: true })  
  sku: string;  
  
  @Prop({ required: true })  
  price: number;  
  
  @Prop({ required: true, min: 1 })  
  quantity: number;  
  
  @Prop({ required: true })  
  subtotal: number;  
}  

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);  

/**
 * Address: Địa chỉ giao hàng hoặc thanh toán.
 * - addressLine1, addressLine2: Địa chỉ chi tiết.
 * - city, state, postalCode, country: Thông tin địa lý.
 */
@Schema()  
export class Address {  
  @Prop({ required: true })  
  addressLine1: string;  
  
  @Prop()  
  addressLine2?: string;  
  
  @Prop({ required: true })  
  city: string;  
  
  @Prop({ required: true })  
  state: string;  
  
  @Prop({ required: true })  
  postalCode: string;  
  
  @Prop({ required: true })  
  country: string;  
}  

export const AddressSchema = SchemaFactory.createForClass(Address);  

/**
 * StatusHistory: Lưu lại lịch sử thay đổi trạng thái của đơn hàng.
 * - status: Trạng thái đơn hàng tại thời điểm đó.
 * - note: Ghi chú thêm (nếu có).
 * - date: Thời điểm thay đổi trạng thái.
 */
@Schema()  
export class StatusHistory {  
  @Prop({ required: true })  
  status: string;  
  
  @Prop()  
  note?: string;  
  
  @Prop({ default: Date.now })  
  date: Date;  
}  

export const StatusHistorySchema = SchemaFactory.createForClass(StatusHistory);  

/**
 * Order: Đơn hàng chính.
 * - user: Tham chiếu đến _id của User đặt hàng.
 * - items: Danh sách sản phẩm trong đơn hàng.
 * - status: Trạng thái hiện tại của đơn hàng (pending, shipped, ...).
 * - subtotal: Tổng tiền hàng (chưa gồm thuế, phí ship, giảm giá).
 * - tax: Tiền thuế.
 * - shippingFee: Phí vận chuyển.
 * - discount: Số tiền giảm giá (nếu có).
 * - total: Tổng tiền phải thanh toán (đã tính tất cả).
 * - shippingAddress, billingAddress: Địa chỉ giao hàng và thanh toán.
 * - paymentMethod: Phương thức thanh toán (credit_card, paypal, ...).
 * - paymentStatus: Trạng thái thanh toán (pending, paid, ...).
 * - paymentDetails: Thông tin chi tiết thanh toán (mã giao dịch, ...).
 * - statusHistory: Lịch sử thay đổi trạng thái đơn hàng.
 * - timestamps: Tự động lưu createdAt, updatedAt.
 */
@Schema({ timestamps: true })  
export class Order {  
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })  
  user: MongooseSchema.Types.ObjectId;  
  
  @Prop({ type: [OrderItemSchema], required: true })  
  items: OrderItem[];  
  
  @Prop({   
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],  
    default: 'pending'  
  })  
  status: string;  
  
  @Prop({ required: true })  
  subtotal: number;  
  
  @Prop({ required: true })  
  tax: number;  
  
  @Prop({ required: true })  
  shippingFee: number;  
  
  @Prop({ default: 0 })  
  discount: number;  
  
  @Prop({ required: true })  
  total: number;  
  
  @Prop({ type: AddressSchema, required: true })  
  shippingAddress: Address;  
  
  @Prop({ type: AddressSchema, required: true })  
  billingAddress: Address;  
  
  @Prop({   
    enum: ['credit_card', 'paypal', 'bank_transfer', 'cash_on_delivery'],  
    required: true  
  })  
  paymentMethod: string;  
  
  @Prop({   
    enum: ['pending', 'paid', 'failed', 'refunded'],  
    default: 'pending'  
  })  
  paymentStatus: string;  
  
  @Prop({ type: Object })  
  paymentDetails?: Record<string, any>;  
  
  @Prop({ type: [StatusHistorySchema], default: [] })  
  statusHistory: StatusHistory[];  
}  

export const OrderSchema = SchemaFactory.createForClass(Order);  
