import { Product } from 'src/products/entities/product.entity';
import { Purchase } from 'src/purchases/entities/purchase.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';

@Entity()
export class OrderProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Purchase, purchase => purchase.orderProducts)
    purchase: Purchase;

    @ManyToOne(() => Product)
    product: Product;

    @Column()
    quantity: number;

    @CreateDateColumn({ type: 'timestamp' }) // Data de criação da compra
    createdAt: Date;

    @Column('decimal', { precision: 10, scale: 2 })
    productPrice: number; // Preço unitário do produto

    @Column('decimal', { precision: 10, scale: 2 })
    totalPrice: number; // Preço total (quantidade * preço unitário)
}

