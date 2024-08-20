import { DataSource } from 'typeorm';
import { Telephone } from './entities/telephone.entity';

export const telephoneProviders = [
  {
    provide: 'TELEPHONE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Telephone),
    inject: ['DATA_SOURCE'],
  },
];