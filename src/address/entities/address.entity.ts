import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';

@Entity('address')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  rua: string;

  @Column({ length: 20 })
  numero: string;

  @Column({ length: 50 })
  bairro: string;

  @Column({ length: 50 })
  cidade: string;

  @Column({ length: 2 })
  uf: string;  // corrigido para manter consistência com o frontend

  @Column({ length: 10 })
  cep: string;

  @ManyToOne(() => Cliente, cliente => cliente.enderecos, { onDelete: 'CASCADE' })
  cliente: Cliente;
}
