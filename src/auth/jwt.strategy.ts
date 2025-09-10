// src/auth/jwt.strategy.ts  
import { Injectable } from '@nestjs/common';  
import { PassportStrategy } from '@nestjs/passport';  
import { ExtractJwt, Strategy } from 'passport-jwt';  
import { ConfigService } from '@nestjs/config';  
  
// JwtStrategy là một class dùng để xác thực JWT cho NestJS sử dụng Passport
@Injectable()  
export class JwtStrategy extends PassportStrategy(Strategy) {  
  // Inject ConfigService để lấy biến môi trường (ví dụ JWT_SECRET)
  constructor(private configService: ConfigService) {  
    // Gọi hàm khởi tạo của PassportStrategy với các option:
    // - jwtFromRequest: chỉ định cách lấy JWT từ request (ở đây là từ header Authorization dạng Bearer)
    // - ignoreExpiration: false nghĩa là JWT hết hạn sẽ bị từ chối
    // - secretOrKey: lấy secret key từ biến môi trường để xác thực JWT
    super({  
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || (() => {
        throw new Error('JWT_SECRET environment variable is not defined');
      })(),  
    });  
  }  
  
  // Hàm validate sẽ được gọi sau khi JWT được xác thực thành công
  // payload là dữ liệu đã được giải mã từ JWT
  // Hàm này trả về một object chứa userId, email, role để lưu vào request.user
  async validate(payload: any) {  
    return { userId: payload.sub, email: payload.email, role: payload.role };  
  }  
}  
