// src/app.module.ts  
import { Module } from '@nestjs/common';  
import { ConfigModule, ConfigService } from '@nestjs/config';  
import { MongooseModule } from '@nestjs/mongoose';  
import { AppController } from './app.controller';  
import { AppService } from './app.service';  
import { UsersModule } from './users/users.module';  
import { ProductsModule } from './products/products.module';  
import { OrdersModule } from './orders/orders.module';  
import { AuthModule } from './auth/auth.module';  
  
@Module({  
  imports: [  
    /**
     * ConfigModule - Global Configuration Management
     * 
     * This module provides access to environment variables and configuration settings
     * throughout the entire application. The 'isGlobal: true' option makes the ConfigService
     * available in all modules without explicitly importing ConfigModule in each one.
     * 
     * Environment variables are typically loaded from:
     * - .env files in the project root
     * - System environment variables
     * - Command line arguments
     */
    ConfigModule.forRoot({  
      isGlobal: true,  
    }),  
    
    /**
     * MongooseModule - MongoDB Database Connection
     * 
     * This module establishes the connection to the MongoDB database using Mongoose ODM.
     * The forRootAsync() method allows for asynchronous configuration, which is useful
     * when you need to inject dependencies (like ConfigService) during the connection setup.
     * 
     * Configuration:
     * - Uses ConfigService to get the MongoDB URI from environment variables
     * - The connection is established when the application starts
     * - All modules can access the database through this connection
     */
    MongooseModule.forRootAsync({  
      imports: [ConfigModule],  // Import ConfigModule to access ConfigService
      inject: [ConfigService],  // Inject ConfigService into the factory function
      useFactory: async (configService: ConfigService) => ({  
        uri: configService.get<string>('MONGODB_URI'),  // Get MongoDB URI from environment
      }),  
    }),  
    UsersModule,  
    ProductsModule,  
    OrdersModule,  
    AuthModule,  
  ],  
  controllers: [AppController],  
  providers: [AppService],  
})  
export class AppModule {}  

