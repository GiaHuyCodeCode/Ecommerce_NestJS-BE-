// src/products/schemas/product.schema.ts  
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';  // NestJS Mongoose decorators for schema definition
import { Document, Schema as MongooseSchema } from 'mongoose';  // MongoDB Document type and Schema for references  

/**
 * CRUCIAL NOTE:
 * This schema defines the Product entity structure for MongoDB using Mongoose.
 * The Product schema contains embedded subdocuments (ProductAttribute and ProductVariant)
 * and references to external collections (Category), creating a complex product catalog
 * structure that supports e-commerce functionality.
 * 
 * Schema Hierarchy:
 * - Product: Main entity with basic product information, pricing, and inventory
 * - ProductVariant: Embedded subdocument for product variations (size, color, etc.)
 * - ProductAttribute: Embedded subdocument for variant-specific attributes
 * 
 * Key Features:
 * - Supports product variants with different SKUs and pricing
 * - Flexible attribute system for product specifications
 * - Inventory tracking at both product and variant levels
 * - Rating and review system integration
 * - Category reference for product organization
 * 
 * Note: Uses embedded documents for closely related data (variants, attributes)
 * and references for loosely coupled data (categories) following MongoDB best practices.
 */

export type ProductDocument = Product & Document;
  
@Schema({ _id: false })  
export class ProductAttribute {  
  @Prop({ required: true })  
  name: string;  
  
  @Prop({ required: true })  
  value: string;  
}  
  
export const ProductAttributeSchema = SchemaFactory.createForClass(ProductAttribute);  
  
@Schema({ _id: true })  
export class ProductVariant {  
  @Prop({ required: true })  
  sku: string;  
  
  @Prop({ type: [ProductAttributeSchema] })  
  attributes: ProductAttribute[];  
  
  @Prop({ required: true, min: 0 })  
  price: number;  
  
  @Prop({ required: true, min: 0, default: 0 })  
  quantity: number;  
  
  @Prop({ type: [String] })  
  images: string[];  
}  
  
export const ProductVariantSchema = SchemaFactory.createForClass(ProductVariant);  
  
@Schema({ timestamps: true })  
export class Product {  
  @Prop({ required: true })  
  name: string;  
  
  @Prop({ required: true })  
  description: string;  
  
  @Prop({ required: true, min: 0 })  
  price: number;  
  
  @Prop({ min: 0 })  
  compareAtPrice?: number;  
  
  @Prop({ type: [String] })  
  images: string[];  
  
  // This property links the product to a category using the Category collection's ObjectId.
  // It is required, and the 'ref' option enables population of category details.
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category', required: true })
  category: MongooseSchema.Types.ObjectId;
  
  @Prop({ required: true })  
  brand: string;  
  
  /**
   * SKU (Stock Keeping Unit) là mã định danh duy nhất cho từng sản phẩm hoặc dịch vụ có thể mua bán.
   * - SKU dùng để phân biệt các sản phẩm khác nhau, phục vụ cho việc quản lý kho, bán hàng, truy xuất sản phẩm.
   * - SKU ở cấp Product là mã tổng thể cho sản phẩm, còn ở cấp ProductVariant là mã riêng cho từng biến thể (ví dụ: màu sắc, kích cỡ).
   * 
   * quantity là số lượng tồn kho của sản phẩm đó.
   * - quantity thể hiện có bao nhiêu sản phẩm (hoặc biến thể) còn trong kho để bán.
   * 
   * Tóm lại:
   * - sku: mã định danh duy nhất cho sản phẩm/biến thể (phân biệt sản phẩm)
   * - quantity: số lượng sản phẩm còn lại trong kho (quản lý tồn kho)
   */
  @Prop({ required: true, unique: true })
  sku: string;
  
  @Prop({ required: true, min: 0, default: 0 })  
  quantity: number;  
  
  @Prop({ type: [ProductAttributeSchema] })  
  attributes: ProductAttribute[];  
  
  @Prop({ type: [ProductVariantSchema] })  
  variants: ProductVariant[];  
  
  @Prop({ default: 0, min: 0, max: 5 })  
  ratings: number;  
  
  @Prop({ default: 0, min: 0 })  
  reviewCount: number;  
}  
  
export const ProductSchema = SchemaFactory.createForClass(Product);  
