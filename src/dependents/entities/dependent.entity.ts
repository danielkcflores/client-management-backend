import { Cliente } from "src/clients/entities/client.entity";
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Dependent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    nome: string;

    @ManyToOne(() => Cliente, cliente => cliente.dependentes, { onDelete: 'CASCADE' })
  cliente: Cliente;
}
