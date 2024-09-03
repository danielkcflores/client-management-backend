import { Injectable, Inject } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Cliente } from './entities/client.entity';
import { CreateClienteDto } from './dto/create-client.dto';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { UpdateClienteDto } from './dto/update-client.dto';
import { Purchase } from 'src/purchases/entities/purchase.entity';

@Injectable()
export class ClientesService {
  constructor(
    @Inject('CLIENTES_REPOSITORY')
    private clientesRepository: Repository<Cliente>,
    @Inject('PURCHASE_REPOSITORY') // Injeção do repositório de compras
    private purchaseRepository: Repository<Purchase>,
  ) {}

  async findAll(): Promise<Cliente[]> {
    return this.clientesRepository.find();
  }

  async buscar(searchText: string): Promise<Cliente[]> {
    return this.clientesRepository.find({
      where: [
        {
          name: Like(`%${searchText}%`),
        },
      ],
    });
  }

  async verificarCpf(cpf: string): Promise<boolean> {
    const cliente = await this.clientesRepository.findOne({ where: { cpf } });
    return !!cliente; // Retorna true se o CPF existe, false caso contrário
  }

  async cadastrar(data: CreateClienteDto): Promise<ResultadoDto> {
    if (!data) {
      throw new Error('Dados inválidos');
    }

    const cpfExists = await this.clientesRepository.findOne({ where: { cpf: data.cpf } });
    if (cpfExists) {
      return { status: false, mensagem: 'CPF já cadastrado' };
    }

    try {
      const cliente = await this.clientesRepository.create(data);
      await this.clientesRepository.save(cliente);
      return { status: true, mensagem: 'Cliente cadastrado com sucesso' };
    } catch (error) {
      return { status: false, mensagem: 'Erro ao cadastrar cliente' };
    }
  }

  async alterar(cpf: string, data: UpdateClienteDto): Promise<ResultadoDto> {
    try {
      const cliente = await this.clientesRepository.findOne({ where: { cpf } });
      if (!cliente) {
        return { status: false, mensagem: 'Cliente não encontrado' };
      }

      await this.clientesRepository.update(cliente, data);
      return { status: true, mensagem: 'Cliente alterado com sucesso' };
    } catch (error) {
      return { status: false, mensagem: 'Erro ao alterar cliente' };
    }
  }

  

  async excluir(cpf: string): Promise<ResultadoDto> {
    const cliente = await this.clientesRepository.findOne({ where: { cpf } });
    if (!cliente) {
      return { status: false, mensagem: 'Cliente não encontrado' };
    }
  
    // Verifica se há compras associadas ao cliente
    const purchases = await this.purchaseRepository.find({ where: { cliente: { id: cliente.id } } });
    if (purchases.length > 0) {
      return { status: false, mensagem: 'Não é possível excluir o cliente, pois há compras associadas.' };
    }
  
    await this.clientesRepository.remove(cliente);
    return { status: true, mensagem: 'Cliente excluído com sucesso' };
  }
  

  
  
  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clientesRepository.findOne({ where: { id } });
    if (!cliente) {
      console.log(`Cliente with ID ${id} not found`);
    }
    return cliente;
  }

  async getClientsWithRelations() {
    return await this.clientesRepository
      .createQueryBuilder("clientes")
      .leftJoinAndSelect("clientes.enderecos", "enderecos")
      .leftJoinAndSelect("clientes.dependentes", "dependentes")
      .leftJoinAndSelect("clientes.telefones", "telefones")
      .getMany();
  }  
}
