import { DataSource } from 'typeorm';
import { Cliente } from './entities/client.entity';

export const clientesProviders = [
  {
    provide: 'CLIENTES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Cliente),
    inject: ['DATA_SOURCE'],
  },
];
