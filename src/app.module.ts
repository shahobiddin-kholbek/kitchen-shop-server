import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { ProductController } from './controllers/product.controller';
import { Product } from './entities/product.entity';
import { ProductsService } from './providers/product.service';
import { ValidationExceptionFilter } from './filters/validation-exception.filter';
import { Order } from './entities/orders.entity';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './providers/orders.service';
// import { Cart } from './entities/cart.entity';
// import { CartService } from './providers/cart.service';
// import { CartController } from './controllers/cart.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1111',
      database: 'kitchen_shop',
      entities: [Product, Order], 
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product, Order]), 
  ],
  controllers: [ProductController, OrdersController], 
  providers: [
    ProductsService,
    OrdersService, 
    // CartService,
    {
      provide: APP_FILTER, 
      useClass: ValidationExceptionFilter, 
    },
  ],
})
export class AppModule {}
