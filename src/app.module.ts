import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './clients/clients.module';
import { AddressModule } from './address/address.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './clients/entities/client.entity';
import { Address } from './address/entities/address.entity';
import { DependentsModule } from './dependents/dependents.module';
import { Dependent } from './dependents/entities/dependent.entity';
import { TelephonesModule } from './telephone/telephone.module';
import { Telephone } from './telephone/entities/telephone.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { PurchaseModule } from './purchases/purchases.module';
import { Purchase } from './purchases/entities/purchase.entity';
import { OrderProduct } from './order_product/entities/order_product.entity';
import { OrderProductModule } from './order_product/order_product.module';

@Module({
  imports: [
    ClientesModule,
    AddressModule,
    DependentsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'clientes',
      entities: [Cliente, Address, Dependent, Telephone, Product, Purchase, OrderProduct
      ],
      synchronize: false,
    }),
    AddressModule,
    DependentsModule,
    TelephonesModule,
    ProductsModule,
    PurchaseModule,
    OrderProduct,
    OrderProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
