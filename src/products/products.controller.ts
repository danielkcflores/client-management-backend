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
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('listar')
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }


  @Get('buscar')
  async buscar(@Query('searchText') searchText: string): Promise<Product[]> {
    return this.productsService.buscar(searchText);
  }

  @Post('cadastrar')
  async cadastrar(@Body() data: CreateProductDto): Promise<ResultadoDto> {
    return this.productsService.cadastrar(data);
  }

  @Post('verificar-produto')
  async verificarProduto(@Body() body: { name: string, id?: string }): Promise<{ exists: boolean }> {
    const { name, id } = body;
    const exists = await this.productsService.verificarProduto(name, id);
    return { exists };
  }
  

  @Put('atualizar/:id')
  async alterar(
    @Param('id') id: number,
    @Body() data: UpdateProductDto,
  ): Promise<ResultadoDto> {
    return this.productsService.alterar(id, data);
  }

  @Delete('deletar/:id')
  async excluir(@Param('id') id: number): Promise<ResultadoDto> {
    return this.productsService.excluir(id);
  }

}