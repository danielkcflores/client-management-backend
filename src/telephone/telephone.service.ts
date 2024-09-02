import { Injectable, Inject } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Cliente } from 'src/clients/entities/client.entity';
import { ClientesService } from 'src/clients/clients.service';
import { Telephone } from './entities/telephone.entity';
import { CreateTelephoneDto } from './dto/create-telephone.dto';
import { UpdateTelephoneDto } from './dto/update-telephone.dto';

@Injectable()
export class TelephonesService {
  constructor(
    @Inject('TELEPHONE_REPOSITORY')
    private telephonesRepository: Repository<Telephone>,
    @Inject()
    private clientesService: ClientesService
  ) {
    console.log('Connected to the database');
  }

  // Função para verificar se o telefone já está cadastrado para o cliente
  async isTelephoneRegistered(clientId: number, number: string): Promise<boolean> {
    return !!await this.telephonesRepository.findOne({
      where: {
        cliente: { id: clientId },
        numero: number
      }
    });
  }

  async findByClientId(clientId: number): Promise<Telephone[]> {
    try {
      if (!clientId) {
        throw new Error('Client ID is required');
      }

      const client: Cliente = await this.clientesService.findOne(clientId);

      if (!client) {
        throw new Error(`Client with ID ${clientId} not found`);
      }

      return this.telephonesRepository.find({
        where: { cliente: { id: clientId } },
        relations: ['cliente'],
      });
    } catch (error) {
      throw new Error(`Failed to find telephones for client with ID ${clientId}: ${error.message}`);
    }
  }

  searchByClientId(clientId: number, searchText: string): Promise<Telephone[]> {
    return this.telephonesRepository.find({
      where: {
        cliente: { id: clientId },
        numero: Like(`%${searchText}%`)
      },
      relations: ['cliente'],
    });
  }

  async createForClient(createTelephoneDto: CreateTelephoneDto): Promise<Telephone> {
    const cliente: Cliente = await this.clientesService.findOne(createTelephoneDto.clientId);
  
    if (!cliente) {
      throw new Error(`Cliente with ID ${createTelephoneDto.clientId} not found`);
    }

    if (await this.isTelephoneRegistered(createTelephoneDto.clientId, createTelephoneDto.numero)) {
      throw new Error(`O telefone ${createTelephoneDto.numero} já está cadastrado para o cliente com ID ${createTelephoneDto.clientId}`);
    }
  
    const telephone: Telephone = this.telephonesRepository.create(createTelephoneDto);
    telephone.cliente = cliente;
  
    return this.telephonesRepository.save(telephone);
  }  

  async update(id: number, updateTelephoneDto: UpdateTelephoneDto): Promise<Telephone> {
    await this.telephonesRepository.update(id, updateTelephoneDto);
    return this.telephonesRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.telephonesRepository.delete(id);
  }
}
