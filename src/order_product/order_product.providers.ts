import { DataSource } from 'typeorm';
import { OrderProduct } from './entities/order_product.entity';

export const orderProductProviders = [
  {
    provide: 'ORDER_PRODUCT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(OrderProduct),
    inject: ['DATA_SOURCE'],
  },
];