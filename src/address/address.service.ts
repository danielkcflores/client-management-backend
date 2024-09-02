import { Injectable, Inject } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Cliente } from 'src/clients/entities/client.entity';
import { ClientesService } from 'src/clients/clients.service';

@Injectable()
export class AddressesService {
  constructor(
    @Inject('ADDRESS_REPOSITORY')
    private addressesRepository: Repository<Address>,
    @Inject()
    private clientesService: ClientesService
  ) {
    console.log('Connected to the database');
  }


  findByClientId(clientId: number): Promise<Address[]> {
    return this.addressesRepository.find({
      where: { cliente: { id: clientId } },
      relations: ['cliente'],
    });
  }

  searchByClientId(clientId: number, searchText: string): Promise<Address[]> {
    return this.addressesRepository.find({
      where: {
        cliente: { id: clientId },
        rua: Like(`%${searchText}%`)
      },
      relations: ['cliente'],
    });
  }

  async createForClient(createAddressDto: CreateAddressDto): Promise<Address> {
    const cliente: Cliente = await this.clientesService.findOne(createAddressDto.clienteId);
  
    if (!cliente) {
      throw new Error(`Cliente with ID ${createAddressDto.clienteId} not found`);
    }
  
    const address: Address = this.addressesRepository.create(createAddressDto);
    address.cliente = cliente;
  
    return this.addressesRepository.save(address);
  }  

  async update(id: number, updateAddressDto: UpdateAddressDto): Promise<Address> {
    await this.addressesRepository.update(id, updateAddressDto);
    return this.addressesRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.addressesRepository.delete(id);
  }
}
