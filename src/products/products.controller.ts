// src/products/products.controller.ts  
import {   
  Controller,   
  Get,   
  Post,   
  Body,   
  Patch,   
  Param,   
  Delete,   
  Query,   
  UseGuards   
} from '@nestjs/common';  
import { ProductsService } from './products.service';  
import { CreateProductDto } from './dto/create-product.dto';  
import { UpdateProductDto } from './dto/update-product.dto';  
import { JwtAuthGuard } from '../auth/jwt-auth.guard';  
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
  
@Controller('products')  
export class ProductsController {  
  constructor(private readonly productsService: ProductsService) {}  
  
  @Post()  
  @UseGuards(JwtAuthGuard, RolesGuard)  
  @Roles('admin', 'vendor')  
  create(@Body() createProductDto: CreateProductDto) {  
    return this.productsService.create(createProductDto);  
  }  
  
  @Get()  
  findAll(  
    @Query('category') category?: string,  
    @Query('minPrice') minPrice?: number,  
    @Query('maxPrice') maxPrice?: number,  
    @Query('search') search?: string,  
    @Query('page') page?: number,  
    @Query('limit') limit?: number,  
  ) {  
    return this.productsService.findAll({  
      category,  
      minPrice,  
      maxPrice,  
      search,  
      page,  
      limit  
    });  
  }  
  
  @Get(':id')  
  findOne(@Param('id') id: string) {  
    return this.productsService.findOne(id);  
  }  
  
  @Patch(':id')  
  @UseGuards(JwtAuthGuard, RolesGuard)  
  @Roles('admin', 'vendor')  
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {  
    return this.productsService.update(id, updateProductDto);  
  }  
  
  @Delete(':id')  
  @UseGuards(JwtAuthGuard, RolesGuard)  
  @Roles('admin', 'vendor')  
  remove(@Param('id') id: string) {  
    return this.productsService.remove(id);  
  }  
}  
