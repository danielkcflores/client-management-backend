import { Module } from '@nestjs/common';
import { DependentsService } from './dependents.service';
import { DependentController } from './dependents.controller';
import { DatabaseModule } from '../database/database.module';
import { dependentProviders } from './dependents.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dependent } from './entities/dependent.entity';
import { ClientesModule } from 'src/clientes/clientes.module';

@Module({
  imports: [DatabaseModule,
    TypeOrmModule.forFeature([Dependent]),
    ClientesModule,
  ],
  controllers: [DependentController],
  providers: [...dependentProviders, DependentsService],
})
export class DependentsModule {}
