import { Controller, Get, Post, Put, Delete, Param, Query, Body, Res, HttpStatus } from '@nestjs/common';
import { AddressesService } from './address.service';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('clients/:clientId/addresses')
export class AddressController {
  constructor(private readonly addressService: AddressesService) {}

  @Get()
  async findAll(@Param('clientId') clientId: number, @Res() res): Promise<Address[]> {
    const addresses = await this.addressService.findByClientId(clientId);
    return res.status(HttpStatus.OK).json(addresses);
  }

  @Get('search')
  async search(@Param('clientId') clientId: number, @Query('searchText') searchText: string, @Res() res): Promise<Address[]> {
    const addresses = await this.addressService.searchByClientId(clientId, searchText);
    return res.status(HttpStatus.OK).json(addresses);
  }

  @Post()
async create(
  @Param('clientId') clientId: number,
  @Body() createAddressDto: CreateAddressDto,
  @Res() res
): Promise<Address> {
  createAddressDto.clienteId = clientId; // Assegura que o clientId é passado corretamente
  const address = await this.addressService.createForClient(createAddressDto);
  return res.status(HttpStatus.CREATED).json(address);
}


  @Put(':id')
  async update(@Param('id') id: number, @Body() updateAddressDto: UpdateAddressDto, @Res() res): Promise<Address> {
    const address = await this.addressService.update(id, updateAddressDto);
    if (!address) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Endereço não encontrado.' });
    }
    return res.status(HttpStatus.OK).json(address);
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Res() res): Promise<void> {
    await this.addressService.remove(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
