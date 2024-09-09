import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProduct } from './entities/order_product.entity';
import { OrderProductService } from './order_product.service'; // Se você tiver um serviço
import { OrderProductController } from './order_product.controller'; // Se você tiver um controlador
import { orderProductProviders } from './order_product.providers';
import { DatabaseModule } from 'src/database/database.module';
import { Product } from 'src/products/entities/product.entity';
import { Purchase } from 'src/purchases/entities/purchase.entity';

@Module({
  imports: [
  DatabaseModule,
  TypeOrmModule.forFeature([OrderProduct, Product, Purchase]),
],
  providers: [...orderProductProviders, OrderProductService],
  controllers: [OrderProductController],
  exports: [...orderProductProviders],
})
export class OrderProductModule {}
