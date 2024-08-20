import { Module } from '@nestjs/common';
import { TelephonesService } from './telephone.service';
import { TelephoneController } from './telephone.controller';
import { DatabaseModule } from '../database/database.module';
import { telephoneProviders } from './telephone.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Telephone } from './entities/telephone.entity';
import { ClientesModule } from 'src/clientes/clientes.module';

@Module({
  imports: [DatabaseModule,
    TypeOrmModule.forFeature([Telephone]),
    ClientesModule,
  ],
  controllers: [TelephoneController],
  providers: [...telephoneProviders, TelephonesService],
})
export class TelephonesModule {}