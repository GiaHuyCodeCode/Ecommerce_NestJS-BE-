// src/main.ts  
import { NestFactory } from '@nestjs/core';  
import { ValidationPipe } from '@nestjs/common';  
import { AppModule } from './app.module';  
  
async function bootstrap() {  
  const app = await NestFactory.create(AppModule);  
    
  // Global validation pipe for DTOs  
  app.useGlobalPipes(  
    new ValidationPipe({  
      whitelist: true,  // Strip properties not in DTO  
      forbidNonWhitelisted: true,  // Throw error if non-whitelisted props are present  
      transform: true,  // Transform payloads to DTO instances  
    }),  
  );  
    
  // Global prefix for all routes  
  app.setGlobalPrefix('api');  
    
  // Enable CORS  
  app.enableCors();  
    
  await app.listen(process.env.PORT || 3000);  
  console.log(`Application is running on: ${await app.getUrl()}`);  
}  
bootstrap();  
