// src/products/schemas/category.schema.ts  
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';  
import { Document, Schema as MongooseSchema } from 'mongoose';  
  
export type CategoryDocument = Category & Document;  
  
@Schema({ timestamps: true })  
export class Category {  
  @Prop({ required: true })  
  name: string;  
  
  @Prop()  
  description?: string;  
  
  @Prop()  
  imageUrl?: string;  
  
  // Trường "parent" dùng để xác định danh mục cha (nếu có) của danh mục hiện tại.
  // Nếu danh mục này là danh mục con, "parent" sẽ chứa ObjectId của danh mục cha.
  // Nếu là danh mục gốc, "parent" có thể để trống (undefined).
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category' })
  parent?: MongooseSchema.Types.ObjectId;
}  
  
export const CategorySchema = SchemaFactory.createForClass(Category);  
