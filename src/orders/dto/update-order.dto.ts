// src/orders/dto/update-order.dto.ts  
import { PartialType } from '@nestjs/mapped-types';  
import { CreateOrderDto } from './create-order.dto';  
import { IsEnum, IsOptional } from 'class-validator';  
  
export class UpdateOrderDto extends PartialType(CreateOrderDto) {  
  @IsEnum(['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'])  
  @IsOptional()  
  status?: string;  
  
  @IsEnum(['pending', 'paid', 'failed', 'refunded'])  
  @IsOptional()  
  paymentStatus?: string;  
}  
