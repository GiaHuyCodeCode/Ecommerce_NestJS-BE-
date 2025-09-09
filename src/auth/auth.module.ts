// src/auth/auth.module.ts  
import { Module } from '@nestjs/common';  
import { AuthService } from './auth.service';  
import { AuthController } from './auth.controller';  
import { UsersModule } from '../users/users.module';  
import { PassportModule } from '@nestjs/passport';  
import { JwtModule } from '@nestjs/jwt';  
import { ConfigModule, ConfigService } from '@nestjs/config';  
import { JwtStrategy } from './jwt.strategy';  
import { MongooseModule } from '@nestjs/mongoose';  
import { User, UserSchema } from '../users/schemas/user.schema';  
  
@Module({  
  imports: [  
    UsersModule,  
    PassportModule,  
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),  
    JwtModule.registerAsync({  
      imports: [ConfigModule],  
      inject: [ConfigService],  
      useFactory: async (configService: ConfigService) => ({  
        secret: configService.get<string>('JWT_SECRET'),  
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION', '7d') },  
      }),  
    }),  
  ],  
  controllers: [AuthController],  
  providers: [AuthService, JwtStrategy],  
  exports: [AuthService],  
})  
export class AuthModule {}  
