// src/products/categories.controller.ts  
import {   
    Controller,   
    Get,   
    Post,   
    Body,   
    Patch,   
    Param,   
    Delete,   
    UseGuards   
  } from '@nestjs/common';  
 

    import { JwtAuthGuard } from '../auth/jwt-auth.guard';  
    import { RolesGuard } from '../common/guards/roles/roles.guard';
    import { Roles } from '../common/decorators/roles/roles.decorator';
    import { CategoriesService } from './categories.service';
    import { CreateCategoryDto } from './dto/create-category.dto';
    import { UpdateCategoryDto } from './dto/update-category.dto';
        
  @Controller('categories')  
  export class CategoriesController {  
    constructor(private readonly categoriesService: CategoriesService) {}  
    
    @Post()  
    @UseGuards(JwtAuthGuard, RolesGuard)  
    @Roles('admin')  
    create(@Body() createCategoryDto: CreateCategoryDto) {  
      return this.categoriesService.create(createCategoryDto);  
    }  
    
    @Get()  
    findAll() {  
      return this.categoriesService.findAll();  
    }  
    
    @Get(':id')  
    findOne(@Param('id') id: string) {  
      return this.categoriesService.findOne(id);  
    }  
    
    @Patch(':id')  
    @UseGuards(JwtAuthGuard, RolesGuard)  
    @Roles('admin')  
    update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {  
      return this.categoriesService.update(id, updateCategoryDto);  
    }  
    
    @Delete(':id')  
    @UseGuards(JwtAuthGuard, RolesGuard)  
    @Roles('admin')  
    remove(@Param('id') id: string) {  
      return this.categoriesService.remove(id);  
    }  
  }  
  