import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { NotFoundError } from 'rxjs';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}

    // Trong TypeScript, nếu một hàm async thì nó luôn trả về Promise.
    // Ở đây, Promise<UserDocument> nghĩa là hàm này sẽ trả về một Promise chứa UserDocument.
    // Nếu bỏ Promise<UserDocument> thì TypeScript sẽ tự hiểu kiểu trả về là Promise<any> (vì async).
    // Tuy nhiên, nên khai báo rõ ràng kiểu trả về để code dễ hiểu và kiểm soát tốt hơn.
    // Nếu bạn bỏ Promise<UserDocument> và chỉ để : UserDocument thì sẽ bị sai vì async luôn trả về Promise.
    async create(createUserDto: CreateUserDto): Promise<UserDocument> {
        const createUser= new this.userModel(createUserDto);
        return createUser.save();
    }


    async findAll(): Promise<UserDocument[]>{
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<UserDocument> {
        const user = await this.userModel.findById(id).exec();
        
        if (!user){
            throw new NotFoundException(`User with ID "${id}" not found`);
        }

        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {  
        // Gọi phương thức findByIdAndUpdate của userModel để cập nhật user với id tương ứng.
        // - id: id của user cần cập nhật.
        // - updateUserDto: dữ liệu mới để cập nhật cho user.
        // - { new: true }: option này giúp trả về document sau khi đã được cập nhật (nếu không có sẽ trả về document trước khi cập nhật).
        const updatedUser = await this.userModel
          .findByIdAndUpdate(id, updateUserDto, { new: true })
          .exec(); // Thực thi truy vấn và trả về kết quả (Promise).
            
        if (!updatedUser) {  
          throw new NotFoundException(`User with ID "${id}" not found`);  
        }  
          
        return updatedUser;  
      }  
      
      async remove(id: string): Promise<UserDocument> {  
        const deletedUser = await this.userModel.findByIdAndDelete(id).exec();  
          
        if (!deletedUser) {  
          throw new NotFoundException(`User with ID "${id}" not found`);  
        }  
          
        return deletedUser;  
      }  
}