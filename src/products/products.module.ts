import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { productProviders } from './products.providers';
import { Product } from './entities/product.entity';
import { PurchaseModule } from 'src/purchases/purchases.module';  // Importar o módulo de compras
import { OrderProduct } from 'src/order_product/entities/order_product.entity';
import { OrderProductModule } from 'src/order_product/order_product.module';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Product, OrderProduct]),
    PurchaseModule, OrderProductModule // Adicione PurchaseModule aqui
  ],
  controllers: [ProductsController],
  providers: [...productProviders, ProductsService],
})
export class ProductsModule {}
