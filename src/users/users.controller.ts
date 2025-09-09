// src/users/users.controller.ts  
import {   
  Controller,   
  Get,   
  Post,   
  Body,   
  Patch,   
  Param,   
  Delete,   
  UseGuards,  
  Request  
} from '@nestjs/common';  
import { UsersService } from './users.service';  
import { CreateUserDto } from './dto/create-user.dto';  
import { UpdateUserDto } from './dto/update-user.dto';  
import { JwtAuthGuard } from '../auth/jwt-auth.guard';  
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
  
@Controller('users')  
export class UsersController {  
  constructor(private readonly usersService: UsersService) {}  
  
  @Post()  
  @UseGuards(JwtAuthGuard, RolesGuard)  
  @Roles('admin')  
  create(@Body() createUserDto: CreateUserDto) {  
    return this.usersService.create(createUserDto);  
  }  
  
  @Get()  
  @UseGuards(JwtAuthGuard, RolesGuard)  
  @Roles('admin')  
  findAll() {  
    return this.usersService.findAll();  
  }  
  
  @Get('profile')  
  @UseGuards(JwtAuthGuard)  
  getProfile(@Request() req) {  
    return this.usersService.findOne(req.user.userId);  
  }  
  
  @Get(':id')  
  @UseGuards(JwtAuthGuard, RolesGuard)  
  @Roles('admin')  
  findOne(@Param('id') id: string) {  
    return this.usersService.findOne(id);  
  }  
  
  @Patch('profile')  
  @UseGuards(JwtAuthGuard)  
  updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {  
    return this.usersService.update(req.user.userId, updateUserDto);  
  }  
  
  @Patch(':id')  
  @UseGuards(JwtAuthGuard, RolesGuard)  
  @Roles('admin')  
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {  
    return this.usersService.update(id, updateUserDto);  
  }  
  
  @Delete(':id')  
  @UseGuards(JwtAuthGuard, RolesGuard)  
  @Roles('admin')  
  remove(@Param('id') id: string) {  
    return this.usersService.remove(id);  
  }  
}  
