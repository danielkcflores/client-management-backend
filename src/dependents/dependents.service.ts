import { Injectable, Inject } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { ClientesService } from 'src/clientes/clientes.service';
import { Dependent } from './entities/dependent.entity';
import { CreateDependentDto } from './dto/create-dependent.dto';
import { UpdateDependentDto } from './dto/update-dependent.dto';

@Injectable()
export class DependentsService {
  constructor(
    @Inject('DEPENDENT_REPOSITORY')
    private dependentsRepository: Repository<Dependent>,
    @Inject()
    private clientesService: ClientesService
  ) {
    console.log('Connected to the database');
  }


  findByClientId(clientId: number): Promise<Dependent[]> {
    return this.dependentsRepository.find({
      where: { cliente: { id: clientId } },
      relations: ['cliente'],
    });
  }

  searchByClientId(clientId: number, searchText: string): Promise<Dependent[]> {
    return this.dependentsRepository.find({
      where: {
        cliente: { id: clientId },
        nome: Like(`%${searchText}%`)
      },
      relations: ['cliente'],
    });
  }

  async createForClient(createDependentDto: CreateDependentDto): Promise<Dependent> {
    const cliente: Cliente = await this.clientesService.findOne(createDependentDto.clientId);
  
    if (!cliente) {
      throw new Error(`Cliente with ID ${createDependentDto.clientId} not found`);
    }
  
    const dependent: Dependent = this.dependentsRepository.create(createDependentDto);
    dependent.cliente = cliente;
  
    return this.dependentsRepository.save(dependent);
  }  

  async update(id: number, updateDependentDto: UpdateDependentDto): Promise<Dependent> {
    await this.dependentsRepository.update(id, updateDependentDto);
    return this.dependentsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.dependentsRepository.delete(id);
  }
}
