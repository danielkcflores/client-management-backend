import { Controller, Get, Post, Put, Delete, Param, Query, Body, Res, HttpStatus } from '@nestjs/common';
import { TelephonesService } from './telephone.service';
import { Telephone } from './entities/telephone.entity';
import { CreateTelephoneDto } from './dto/create-telephone.dto';
import { UpdateTelephoneDto } from './dto/update-telephone.dto';

@Controller('telephones')
export class TelephoneController {
  constructor(private readonly telephonesService: TelephonesService) {}

  @Get('/:clientId')
  async findAll(
    @Param('clientId') clientId: number,
    @Res() res
  ): Promise<Telephone[]> {
    const telephones = await this.telephonesService.findByClientId(clientId);
    return res.status(HttpStatus.OK).json(telephones);
  }

  @Get('/:clientId/search')
  async search(
    @Param('clientId') clientId: number, 
    @Query('searchText') searchText: string, 
    @Res() res
  ): Promise<Telephone[]> {
    const telephones = await this.telephonesService.searchByClientId(clientId, searchText);
    return res.status(HttpStatus.OK).json(telephones);
  }

  @Post('/:clientId')
  async create(
    @Param('clientId') clientId: number,
    @Body() createTelephoneDto: CreateTelephoneDto,
    @Res() res
  ): Promise<Telephone> {
    createTelephoneDto.clientId = clientId;
    const telephone = await this.telephonesService.createForClient(createTelephoneDto);
    return res.status(HttpStatus.CREATED).json(telephone);
  }

  @Put('/:clientId/:id')
  async update(
    @Param('id') id: number, 
    @Body() updateTelephoneDto: UpdateTelephoneDto, 
    @Res() res
  ): Promise<Telephone> {
    const telephone = await this.telephonesService.update(id, updateTelephoneDto);
    if (!telephone) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Telefone não encontrado.' });
    }
    return res.status(HttpStatus.OK).json(telephone);
  }

  @Delete('/:clientId/:id')
  async delete(
    @Param('id') id: number,
    @Res() res
  ): Promise<void> {
    await this.telephonesService.remove(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
