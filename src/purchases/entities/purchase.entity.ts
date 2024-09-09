import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Cliente } from 'src/clients/entities/client.entity';
import { OrderProduct } from 'src/order_product/entities/order_product.entity';

@Entity('purchase_order')
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, cliente => cliente.purchases, { eager: true })
  cliente: Cliente;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.purchase)
  orderProducts: OrderProduct[];
}
