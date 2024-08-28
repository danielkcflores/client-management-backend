import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { PurchaseService } from './purchases.service';
import { PurchaseController } from './purchases.controller';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Product } from 'src/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, Cliente, Product])],
  providers: [PurchaseService],
  controllers: [PurchaseController],
})
export class PurchaseModule {}
