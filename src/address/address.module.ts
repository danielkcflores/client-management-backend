import { Module } from '@nestjs/common';
import { AddressesService } from './address.service';
import { AddressController } from './address.controller';
import { DatabaseModule } from '../database/database.module';
import { addressProviders } from './address.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { ClientesModule } from 'src/clientes/clientes.module';

@Module({
  imports: [DatabaseModule,
    TypeOrmModule.forFeature([Address]),
    ClientesModule,
  ],
  controllers: [AddressController],
  providers: [...addressProviders, AddressesService],
})
export class AddressModule {}
