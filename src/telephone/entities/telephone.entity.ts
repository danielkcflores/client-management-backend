import { Cliente } from "src/clientes/entities/cliente.entity";
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Telephone {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    numero: string;

    @ManyToOne(() => Cliente, cliente => cliente.telefones, { onDelete: 'CASCADE' })
  cliente: Cliente;
}