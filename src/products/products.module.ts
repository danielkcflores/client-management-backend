import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { productProviders } from './products.providers';
import { Product } from './entities/product.entity';
import { PurchaseModule } from 'src/purchases/purchases.module';  // Importar o módulo de compras

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Product]),
    PurchaseModule,  // Adicione PurchaseModule aqui
  ],
  controllers: [ProductsController],
  providers: [...productProviders, ProductsService],
})
export class ProductsModule {}
