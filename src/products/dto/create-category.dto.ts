import { IsString, IsOptional, IsMongoId } from 'class-validator';

export class CreateCategoryDto {
@IsString()
name: string;

@IsString()
@IsOptional()
description?: string;

@IsString()
@IsOptional()
imageUrl?: string;

@IsMongoId()
@IsOptional()
parent?: string;
}
