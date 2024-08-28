import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Purchase } from 'src/purchases/entities/purchase.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 }) // Garantindo precisão decimal
  price: number;

  @OneToMany(() => Purchase, purchase => purchase.product)
  purchases: Purchase[];
}
