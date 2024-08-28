import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity('purchase_order')
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, cliente => cliente.purchases, { eager: true })
  cliente: Cliente;

  @ManyToOne(() => Product, product => product.purchases, { eager: true })
  product: Product;
}
