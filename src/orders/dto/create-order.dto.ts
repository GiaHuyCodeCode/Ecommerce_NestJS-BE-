// src/orders/dto/create-order.dto.ts  
import {   
  IsString, IsNumber, IsOptional, IsArray,   
  ValidateNested, Min, IsMongoId, IsEnum   
} from 'class-validator';  
import { Type } from 'class-transformer';  

export class AddressDto {  
  @IsString()  
  // Địa chỉ dòng 1, bắt buộc nhập  
  addressLine1: string;  

  @IsString()  
  @IsOptional()  
  // Địa chỉ dòng 2, không bắt buộc (có thể để trống nếu không có)  
  addressLine2?: string;  

  @IsString()  
  // Thành phố  
  city: string;  

  @IsString()  
  // Tỉnh/bang  
  state: string;  

  @IsString()  
  // Mã bưu điện  
  postalCode: string;  

  @IsString()  
  // Quốc gia  
  country: string;  
}  

export class OrderItemDto {  
  @IsMongoId()  
  // ID của sản phẩm, phải là một Mongo ObjectId hợp lệ  
  product: string;  

  @IsString()  
  @IsOptional()  
  // ID biến thể sản phẩm (nếu có), không bắt buộc  
  variantId?: string;  

  @IsNumber()  
  // Số lượng sản phẩm đặt mua  
  quantity: number;  
}  

export class CreateOrderDto {  
  // Sử dụng @ValidateNested({ each: true }) để đảm bảo mỗi phần tử trong mảng items
  // đều được kiểm tra (validate) theo các quy tắc của OrderItemDto.
  @ValidateNested({ each: true })  
  @Type(() => OrderItemDto)  
  // Danh sách các sản phẩm trong đơn hàng, mỗi phần tử phải là OrderItemDto  
  items: OrderItemDto[];  

  @ValidateNested()  
  @Type(() => AddressDto)  
  // Địa chỉ giao hàng, phải là một object AddressDto  
  shippingAddress: AddressDto;  

  @ValidateNested()  
  @Type(() => AddressDto)  
  // Địa chỉ thanh toán, phải là một object AddressDto  
  billingAddress: AddressDto;  

  @IsEnum(['credit_card', 'paypal', 'bank_transfer', 'cash_on_delivery'])  
  // Phương thức thanh toán, chỉ nhận một trong các giá trị liệt kê  
  paymentMethod: string;  
}  

