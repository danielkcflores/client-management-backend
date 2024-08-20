import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './clientes/clientes.module';
import { AddressModule } from './address/address.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './clientes/entities/cliente.entity';
import { Address } from './address/entities/address.entity';
import { DependentsModule } from './dependents/dependents.module';
import { Dependent } from './dependents/entities/dependent.entity';

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
      entities: [Cliente, Address, Dependent
      ],
      synchronize: true,
    }),
    DependentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
