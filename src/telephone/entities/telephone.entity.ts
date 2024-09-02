import { Cliente } from "src/clients/entities/client.entity";
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