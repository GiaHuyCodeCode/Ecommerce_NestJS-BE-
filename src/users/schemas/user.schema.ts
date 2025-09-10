import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

/**
 * CIRCULAR NOTE:
 * This schema defines the User entity structure for MongoDB using Mongoose.
 * The User schema contains an embedded Address schema, creating a one-to-many
 * relationship where a user can have multiple addresses. This is a common
 * pattern in MongoDB for related data that doesn't need to be in separate collections.
 * 
 * Schema Structure:
 * - User: Main entity with basic user information and role-based access
 * - Address: Embedded subdocument for user addresses (shipping, billing, etc.)
 * 
 * Note: The Address schema uses { _id: false } to prevent automatic ID generation
 * for embedded documents, while the User schema uses { timestamps: true } to
 * automatically track createdAt and updatedAt fields.
 */

export type UserDocument = HydratedDocument<User>;

@Schema({ _id: false })
export class Address{
    @Prop({ required: true })
    addressLine1: string;
    
    @Prop()
    addressLine2?: string;
    
    @Prop({ required: true })
    city: string;
    
    @Prop({ required: true })
    state: string;
    
    @Prop()
    zip?: string;
    
    @Prop({required: true})
    country: string;

    @Prop({ required: false })
    isDefault: boolean;
}

export const AddressSchema = SchemaFactory.createForClass(Address);

@Schema({ timestamps: true })
export class User{
    @Prop({ required: true })
    email: string;
    
    @Prop({ required: true })
    password: string;
    
    @Prop({ required: true })
    firstName: string;
    
    @Prop({ required: true })
    lastName: string;
    
    @Prop()
    phoneNumber?: string;
    
    @Prop({type: [AddressSchema]})
    addresses: Address[];

    @Prop({enum: ['customer','admin','vendor'], default:'customer'})
    role?: string;
}
export const UserSchema= SchemaFactory.createForClass(User)