import { DataSource } from 'typeorm';
import { Dependent } from './entities/dependent.entity';

export const dependentProviders = [
  {
    provide: 'DEPENDENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Dependent),
    inject: ['DATA_SOURCE'],
  },
];