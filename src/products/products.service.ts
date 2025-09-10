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
    
    async findOne(id : string): Promise<ProductDocument>{
        
        const product= await this.productModel.findById(id).exec();
        
        if (!product) {  
            throw new NotFoundException(`Product with ID "${id}" not found`);  
        }
        return product;
    }
    
    async findAll(query: any = {}): Promise<ProductDocument[]>{
        
        // Xử lý query params để lọc, tìm kiếm và phân trang sản phẩm

        // Khởi tạo object filter để xây dựng điều kiện truy vấn MongoDB
        let filter = {};

        // Lọc theo category (danh mục)
        // Lưu ý: Có thể client gửi sai key (categoty), nên cần kiểm tra đúng key là 'category'
        // Nếu có query.category thì lọc sản phẩm theo category đó
        if (query.category) {
            filter['category'] = query.category;
        }

        // Lọc theo khoảng giá (minPrice, maxPrice)
        // Nếu có minPrice hoặc maxPrice thì tạo điều kiện cho trường 'price'
        if (query.minPrice || query.maxPrice) {
            filter['price'] = {};
            // Nếu có minPrice: lấy các sản phẩm có giá >= minPrice
            if (query.minPrice) filter['price']['$gte'] = query.minPrice;
            // Nếu có maxPrice: lấy các sản phẩm có giá <= maxPrice
            if (query.maxPrice) filter['price']['$lte'] = query.maxPrice;
        }

        // Tìm kiếm theo tên sản phẩm (search)
        // Sử dụng biểu thức chính quy (regex) không phân biệt hoa thường
        if (query.search) {
            filter['name'] = { $regex: query.search, $options: 'i' };
        }

        // Phân trang: xác định số lượng sản phẩm mỗi trang (limit) và vị trí bắt đầu (skip)
        // Nếu không truyền limit thì mặc định là 10 sản phẩm/trang
        const limit = query.limit ? parseInt(query.limit) : 10;
        // Nếu không truyền page thì mặc định là trang 1 (skip = 0)
        const skip = query.page ? (parseInt(query.page) - 1) * limit : 0;

        // Truy vấn MongoDB:
        // - .find(filter): lấy danh sách sản phẩm theo điều kiện filter
        // - .populate('category', 'name'): lấy thông tin tên danh mục (category) cho mỗi sản phẩm
        // - .skip(skip): bỏ qua skip sản phẩm đầu (phục vụ phân trang)
        // - .limit(limit): giới hạn số lượng sản phẩm trả về
        // - .exec(): thực thi truy vấn và trả về Promise
        return this.productModel
            .find(filter)
            .populate('category', 'name')
            .skip(skip)
            .limit(limit)
            .exec();
    }
}
