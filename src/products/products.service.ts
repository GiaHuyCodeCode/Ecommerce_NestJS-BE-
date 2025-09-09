import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Model } from 'mongoose';
import { UpdateProductDto } from './dto/update-product.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>
    ){}

    async create(createProductDto : CreateCategoryDto): Promise<ProductDocument>{
        const createProduct = new this.productModel(createProductDto);
        return createProduct.save();
    }

    async findAll(query: any = {}): Promise<ProductDocument[]>{
        
        // Xử lý query params
        let filter = {};

        if(query.categoty){
            filter['category'] = query.category;
        }

        if(query.minPrice || query.maxPrice){
            
            filter['price']= {};
            if(query.minPrice) filter['price']['$gte']= query.minPrice;
            if(query.maxPrice) filter['price']['$lte']= query.maxPrice;
        }

        if(query.search){
            filter['name']= {$regex: query.search, $options: 'i'};
        }

        const limit = query.limit ? parseInt(query.limit): 10;
        const skip = query.page ? (parseInt(query.page)-1)* limit : 0;

        return this.productModel
            .find(filter)
            .populate('category', 'name')
            .skip(skip)
            .exec();
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductDocument>{

        const updatedProduct= await this.productModel
        .findByIdAndUpdate(id, updateProductDto, {new: true})
        .exec();

        if(!updatedProduct){
            throw new NotFoundException(`Product with ID "${id}" not found`);
        }

        return updatedProduct;
    }

    async remove(id : string): Promise<ProductDocument>{
        const deletedProduct= await this.productModel.findByIdAndDelete(id).exec();

        if(!deletedProduct){
            throw new NotFoundException(`Product with ID "${id}" not found`);
        }

        return deletedProduct;
    }
}
