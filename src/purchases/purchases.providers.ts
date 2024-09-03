import { DataSource } from 'typeorm';
import { Purchase } from './entities/purchase.entity';

export const purchaseProviders = [
  {
    provide: 'PURCHASE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Purchase),
    inject: ['DATA_SOURCE'],
  },
];