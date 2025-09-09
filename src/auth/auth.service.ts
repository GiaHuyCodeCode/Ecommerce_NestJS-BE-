import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt from 'node_modules/bcryptjs';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    // Khởi tạo AuthService với các dependency cần thiết:
    // - usersService: để thao tác với user (tìm kiếm, xác thực, ...)
    // - jwtService: để tạo và xác thực JWT token
    // - userModel: model mongoose cho user (truy vấn trực tiếp DB nếu cần)
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ){}

    // VALIDATE USER
    async validateUser(email:string, password: string): Promise<any>{
        const user=await this.userModel.findOne({email}).select('+password');

        if(!user){
            return null;
        }

        const isPasswordValid= await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return null;
        }

        // Loại bỏ trường password khỏi kết quả trả về để đảm bảo bảo mật
        const { password: _, ...result } = user.toObject();
        return result;
    }
    // END VALIDATE USER


    // LOGIN
    async login(loginDto: LoginDto){
        const user=await this.validateUser(loginDto.email, loginDto.password);

        if(!user){
            throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
        }

        const payload={
            email: user.email,
            sub: user._id,
            role:user.role,
        };

        return{
            accessToken: this.jwtService.sign(payload),
            user:{
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            },
        };
    }
    //END LOGIN

    // REGISTER
    async register(registerDto: RegisterDto){
        
        // Kiểm tra email đã tồn tại
        const existingUser=await this.userModel.findOne({email: registerDto.email});

        if(existingUser){
            throw new UnauthorizedException("Email đã được sử dụng");
        }

        // Băm mật khẩu trước khi lưu user mới
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(registerDto.password, salt);

        // Tạo user mới với mật khẩu đã băm và role mặc định
        // Lưu ý: usersService.create cần được triển khai trong UsersService
        // Nếu chưa có, cần bổ sung hàm này để tạo user mới
        const newUser = await this.usersService.create({
            ...registerDto,
            password: hashedPassword,
            role: 'customer' //Default role
        })

        // Tạo payload cho JWT
        const payload = {
            email: newUser.email,
            sub: newUser._id,
            role: newUser.role
        };

        // Trả về accessToken và thông tin user (không bao gồm password)
        return {
            accessToken: this.jwtService.sign(payload),
            user: {
                id: newUser._id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                role: newUser.role,
            },
        };
    }
    // END REGISTER
}
