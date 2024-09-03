import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { PurchaseService } from './purchases.service';
import { PurchaseController } from './purchases.controller';
import { Cliente } from 'src/clients/entities/client.entity';
import { Product } from 'src/products/entities/product.entity';
import { purchaseProviders } from './purchases.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Purchase, Cliente, Product]),
  ],
  providers: [...purchaseProviders, PurchaseService],
  controllers: [PurchaseController],
  exports: [...purchaseProviders],  // Exporte os providers para serem utilizados em outros módulos
})
export class PurchaseModule {}
