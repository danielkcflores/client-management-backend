import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { Cliente } from './entities/cliente.entity';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Get('listar')
  async findAll(): Promise<Cliente[]> {
    return this.clientesService.findAll();
  }

  @Get('buscar')
  async buscar(@Query('searchText') searchText: string): Promise<Cliente[]> {
    return this.clientesService.buscar(searchText);
  }

  @Post('verificar-cpf')
  async verificarCpf(@Body('cpf') cpf: string): Promise<{ exists: boolean }> {
    const exists = await this.clientesService.verificarCpf(cpf);
    return { exists };
  }

  @Post('cadastrar')
  async cadastrar(@Body() data: CreateClienteDto): Promise<ResultadoDto> {
    return this.clientesService.cadastrar(data);
  }

  @Put('atualizar/:cpf')
  async alterar(
    @Param('cpf') cpf: string,
    @Body() data: UpdateClienteDto,
  ): Promise<ResultadoDto> {
    return this.clientesService.alterar(cpf, data);
  }

  @Delete('deletar/:cpf')
  async excluir(@Param('cpf') cpf: string): Promise<ResultadoDto> {
    return this.clientesService.excluir(cpf);
  }
}
