import { Module } from '@nestjs/common';
import { ClientesService } from './clients.service';
import { ClientesController } from './clients.controller';
import { DatabaseModule } from '../database/database.module';
import { clientesProviders } from './clients.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/client.entity';
import { PurchaseModule } from 'src/purchases/purchases.module'; // Importar o módulo de compras

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Cliente]), PurchaseModule],  // Adicione PurchaseModule aqui
  controllers: [ClientesController],
  providers: [...clientesProviders, ClientesService],
  exports: [ClientesService],
})
export class ClientesModule {}
