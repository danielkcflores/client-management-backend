import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { productProviders } from './products.providers';
import { Product } from './entities/product.entity';
import { ClientesModule } from 'src/clients/clients.module';

@Module({
  imports: [DatabaseModule,
    TypeOrmModule.forFeature([Product]),
    ClientesModule,
  ],
  controllers: [ProductsController],
  providers: [...productProviders, ProductsService],
})
export class ProductsModule {}
