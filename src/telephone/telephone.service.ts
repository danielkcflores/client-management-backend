import { Injectable, Inject } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { ClientesService } from 'src/clientes/clientes.service';
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


  findByClientId(clientId: number): Promise<Telephone[]> {
    return this.telephonesRepository.find({
      where: { cliente: { id: clientId } },
      relations: ['cliente'],
    });
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
