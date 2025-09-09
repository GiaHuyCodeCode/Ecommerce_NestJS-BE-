// src/products/categories.service.ts  
import { Injectable, NotFoundException } from '@nestjs/common';  
import { InjectModel } from '@nestjs/mongoose';  
import { Model } from 'mongoose';  
import { Category, CategoryDocument } from './schemas/category.schema';  
import { CreateCategoryDto } from './dto/create-category.dto';  
import { UpdateCategoryDto } from './dto/update-category.dto';  
  
@Injectable()  
export class CategoriesService {  
  constructor(  
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,  
  ) {}  
  
  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryDocument> {  
    const createdCategory = new this.categoryModel(createCategoryDto);  
    return createdCategory.save();  
  }  
  
  async findAll(): Promise<CategoryDocument[]> {  
    return this.categoryModel.find().populate('parent', 'name').exec();  
  }  
  
  async findOne(id: string): Promise<CategoryDocument> {  
    const category = await this.categoryModel  
      .findById(id)  
      // Dòng này sử dụng phương thức populate của Mongoose để lấy thông tin chi tiết của trường "parent" (danh mục cha) từ collection Category,
      // nhưng chỉ lấy trường "name" của danh mục cha đó. Nhờ vậy, khi truy vấn một category, ta có thể xem được tên của danh mục cha thay vì chỉ thấy ObjectId.
      .populate('parent', 'name')  
      .exec();  
        
    if (!category) {  
      throw new NotFoundException(`Category with ID "${id}" not found`);  
    }  
      
    return category;  
  }  
  
  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<CategoryDocument> {  
    const updatedCategory = await this.categoryModel  
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })  
      .exec();  
        
    if (!updatedCategory) {  
      throw new NotFoundException(`Category with ID "${id}" not found`);  
    }  
      
    return updatedCategory;  
  }  
  
  async remove(id: string): Promise<CategoryDocument> {  
    // First check if there are any categories using this as parent  
    const hasChildren = await this.categoryModel.exists({ parent: id });  
      
    if (hasChildren) {  
      throw new NotFoundException(`Cannot delete category with children. Remove child categories first.`);  
    }  
      
    const deletedCategory = await this.categoryModel.findByIdAndDelete(id).exec();  
      
    if (!deletedCategory) {  
      throw new NotFoundException(`Category with ID "${id}" not found`);  
    }  
      
    return deletedCategory;  
  }  
  
  
  /**
   * Giải thích chi tiết cách xây dựng cây phân cấp danh mục:
   * 
   * 1. Đầu tiên, lấy toàn bộ danh mục từ database (allCategories).
   *    - Mỗi danh mục có thể có trường "parent" (ObjectId) trỏ tới danh mục cha.
   *    - Nếu "parent" là null/undefined thì đó là danh mục gốc.
   * 
   * 2. Tạo một "categoryMap" để ánh xạ _id của từng danh mục tới chính nó (dạng object).
   *    - Mục đích: tra cứu nhanh danh mục theo _id, đồng thời thêm thuộc tính "children" (mảng) cho mỗi danh mục.
   *    - Ban đầu, "children" là mảng rỗng.
   * 
   * 3. Duyệt qua tất cả danh mục:
   *    - Nếu danh mục có "parent", tìm danh mục cha trong "categoryMap" và push danh mục hiện tại vào "children" của cha.
   *    - Nếu không có "parent", đây là danh mục gốc, push vào mảng "rootCategories".
   * 
   * 4. Kết quả trả về là mảng các danh mục gốc, mỗi danh mục sẽ có thuộc tính "children" là các danh mục con (có thể lồng nhiều cấp).
   * 
   * Ví dụ:
   * [
   *   {
   *     _id: 1, name: 'A', parent: null, children: [
   *       { _id: 2, name: 'B', parent: 1, children: [ ... ] },
   *       ...
   *     ]
   *   },
   *   ...
   * ]
   */
  async getCategoryHierarchy(): Promise<any[]> {  
    // 1. Lấy tất cả danh mục từ database, trả về dạng plain object (lean)
    const allCategories = await this.categoryModel.find().lean().exec();  
      
    // 2. Tạo một map để tra cứu nhanh danh mục theo _id, đồng thời thêm thuộc tính children
    const categoryMap: Record<string, any> = {};  
    allCategories.forEach(cat => {  
      categoryMap[cat._id.toString()] = {  
        ...cat,  
        children: [] // Thêm thuộc tính children để chứa các danh mục con
      };  
    });  
      
    // 3. Xây dựng cây phân cấp
    const rootCategories: any[] = [];  
      
    allCategories.forEach(cat => {  
      if (cat.parent) {  
        // Nếu có parent, thêm vào mảng children của danh mục cha
        const parentId = cat.parent.toString();  
        if (categoryMap[parentId]) {  
          categoryMap[parentId].children.push(categoryMap[cat._id.toString()]);  
        }  
      } else {  
        // Nếu không có parent, đây là danh mục gốc
        rootCategories.push(categoryMap[cat._id.toString()]);  
      }  
    });  
      
    // 4. Trả về mảng các danh mục gốc, mỗi danh mục sẽ có thuộc tính children là các danh mục con (nếu có)
    return rootCategories;  
  }  
}