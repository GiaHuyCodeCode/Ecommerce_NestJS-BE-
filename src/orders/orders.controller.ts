// src/orders/orders.controller.ts  
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
import { OrdersService } from './orders.service';  
import { CreateOrderDto } from './dto/create-order.dto';  
import { UpdateOrderDto } from './dto/update-order.dto';  
import { JwtAuthGuard } from '../auth/jwt-auth.guard';  
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
import { Roles } from 'src/common/decorators/roles/roles.decorator';

@Controller('orders')  
export class OrdersController {  
  constructor(private readonly ordersService: OrdersService) {}  
  
  @Post()  
  @UseGuards(JwtAuthGuard)  
  create(@Request() req, @Body() createOrderDto: CreateOrderDto) {  
    return this.ordersService.create(req.user.userId, createOrderDto);  
  }  
  
  @Get()  
  @UseGuards(JwtAuthGuard, RolesGuard)  
  @Roles('admin')  
  findAll() {  
    return this.ordersService.findAll();  
  }  
  
  @Get('my-orders')  
  @UseGuards(JwtAuthGuard)  
  findMyOrders(@Request() req) {  
    return this.ordersService.findByUser(req.user.userId);  
  }  
  
  @Get(':id')  
  @UseGuards(JwtAuthGuard)  
  findOne(@Request() req, @Param('id') id: string) {  
    return this.ordersService.findOne(id, req.user);  
  }  
  
  @Patch(':id')  
  @UseGuards(JwtAuthGuard, RolesGuard)  
  @Roles('admin')  
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {  
    return this.ordersService.update(id, updateOrderDto);  
  }  
  
  @Patch(':id/cancel')  
  @UseGuards(JwtAuthGuard)  
  cancelOrder(@Request() req, @Param('id') id: string) {  
    return this.ordersService.cancelOrder(id, req.user);  
  }  
  
  @Delete(':id')  
  @UseGuards(JwtAuthGuard, RolesGuard)  
  @Roles('admin')  
  remove(@Param('id') id: string) {  
    return this.ordersService.remove(id);  
  }  
}  
