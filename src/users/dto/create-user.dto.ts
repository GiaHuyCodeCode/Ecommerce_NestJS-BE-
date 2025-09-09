// src/users/dto/create-user.dto.ts  
import { IsEmail, IsString, IsOptional, IsEnum, ValidateNested, IsBoolean } from 'class-validator';  
import { Type } from 'class-transformer';  
  
export class AddressDto {  
  @IsString()  
  addressLine1: string;  
  
  @IsString()  
  @IsOptional()  
  addressLine2?: string;  
  
  @IsString()  
  city: string;  
  
  @IsString()  
  state: string;  
  
  @IsString()  
  postalCode: string;  
  
  @IsString()  
  country: string;  
  
  @IsBoolean()  
  @IsOptional()  
  isDefault?: boolean;  
}  
  
export class CreateUserDto {  
  @IsEmail()  
  email: string;  
  
  @IsString()  
  password: string;  
  
  @IsString()  
  firstName: string;  
  
  @IsString()  
  lastName: string;  
  
  @IsString()  
  @IsOptional()  
  phoneNumber?: string;  
  
  @ValidateNested({ each: true })  
  @Type(() => AddressDto)  
  @IsOptional()  
  addresses?: AddressDto[];  
  
  @IsEnum(['customer', 'admin', 'vendor'])  
  @IsOptional()  
  role?: string;  
}  
  
