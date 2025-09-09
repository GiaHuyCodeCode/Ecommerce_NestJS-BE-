import {   
    IsString, IsNumber, IsOptional, IsArray,   
    ValidateNested, Min, IsMongoId   
  } from 'class-validator';  
  import { Type } from 'class-transformer';  
    
  export class ProductAttributeDto {  
    @IsString()  
    name: string;  
    
    @IsString()  
    value: string;  
  }  
    
  export class ProductVariantDto {  
    @IsString()  
    sku: string;  
    
    @ValidateNested({ each: true })  
    @Type(() => ProductAttributeDto)  
    attributes: ProductAttributeDto[];  
    
    @IsNumber()  
    @Min(0)  
    price: number;  
    
    @IsNumber()  
    @Min(0)  
    quantity: number;  
    
    @IsArray()  
    @IsString({ each: true })  
    @IsOptional()  
    images?: string[];  
  }  
    
  export class CreateProductDto {  
    @IsString()  
    name: string;  
    
    @IsString()  
    description: string;  
    
    @IsNumber()  
    @Min(0)  
    price: number;  
    
    @IsNumber()  
    @Min(0)  
    @IsOptional()  
    compareAtPrice?: number;  
    
    @IsArray()  
    @IsString({ each: true })  
    @IsOptional()  
    images?: string[];  
    
    @IsMongoId()  
    category: string;  
    
    @IsString()  
    brand: string;  
    
    @IsString()  
    sku: string;  
    
    @IsNumber()  
    @Min(0)  
    quantity: number;  
    
    @ValidateNested({ each: true })  
    @Type(() => ProductAttributeDto)  
    @IsOptional()  
    attributes?: ProductAttributeDto[];  
    
    @ValidateNested({ each: true })  
    @Type(() => ProductVariantDto)  
    @IsOptional()  
    variants?: ProductVariantDto[];  
  }  
    