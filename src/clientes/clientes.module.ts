import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { DatabaseModule } from '../database/database.module';
import { clientesProviders } from './clientes.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Cliente])],
  controllers: [ClientesController],
  providers: [...clientesProviders, ClientesService],
  exports: [ClientesService]
})
export class ClientesModule {}