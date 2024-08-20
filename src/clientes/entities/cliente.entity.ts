import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Address } from '../../address/entities/address.entity';
import { Dependent } from 'src/dependents/entities/dependent.entity';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  cpf: string;

  @Column({ length: 100 })
  telefone: string;

  @OneToMany(() => Address, address => address.cliente, { cascade: true })
  enderecos: Address[];

  @OneToMany(() => Dependent, dependent => dependent.cliente, { cascade: true })
  dependentes: Dependent[];
}

