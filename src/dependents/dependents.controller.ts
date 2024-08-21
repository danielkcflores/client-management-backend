import { Controller, Get, Post, Put, Delete, Param, Query, Body, Res, HttpStatus } from '@nestjs/common';
import { DependentsService } from './dependents.service';
import { Dependent } from './entities/dependent.entity';
import { CreateDependentDto } from './dto/create-dependent.dto';
import { UpdateDependentDto } from './dto/update-dependent.dto';

@Controller('dependents')
export class DependentController {
  constructor(private readonly dependentsService: DependentsService) {}

  @Get('/:clientId')
  async findAll(@Param('clientId') clientId: number, @Res() res): Promise<Dependent[]> {
    const dependents = await this.dependentsService.findByClientId(clientId);
    return res.status(HttpStatus.OK).json(dependents);
  }

  @Get('/:clientId/search')
  async search(
    @Param('clientId') clientId: number,
    @Query('searchText') searchText: string,
    @Res() res
  ): Promise<Dependent[]> {
    const dependents = await this.dependentsService.searchByClientId(clientId, searchText);
    return res.status(HttpStatus.OK).json(dependents);
  }

  @Post('/:clientId')
async create(
  @Param('clientId') clientId: number,
  @Body() createDependentDto: CreateDependentDto,
  @Res() res
): Promise<Dependent> {
  createDependentDto.clientId = clientId; // Assegura que o clientId é passado corretamente
  const dependent = await this.dependentsService.createForClient(createDependentDto);
  return res.status(HttpStatus.CREATED).json(dependent);
}


  @Put('/:clientId/:id')
  async update(@Param('id') id: number, @Body() updateDependentDto: UpdateDependentDto, @Res() res): Promise<Dependent> {
    const dependent = await this.dependentsService.update(id, updateDependentDto);
    if (!dependent) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Dependente não encontrado.' });
    }
    return res.status(HttpStatus.OK).json(dependent);
  }

  @Delete('/:clientId/:id')
  async delete(@Param('id') id: number, @Res() res): Promise<void> {
    await this.dependentsService.remove(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}