import { Injectable, Inject } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Purchase } from 'src/purchases/entities/purchase.entity';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productsRepository: Repository<Product>,
    @Inject('PURCHASE_REPOSITORY') // Injeção do repositório de compras
    private purchaseRepository: Repository<Purchase>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async buscar(searchText: string): Promise<Product[]> {
    return this.productsRepository.find({
      where: [
        {
          name: Like(`%${searchText}%`),
        },
      ],
    });
  }

  async cadastrar(data: CreateProductDto): Promise<ResultadoDto> {
    if (!data) {
      throw new Error('Dados inválidos');
    }

    try {
      const product = await this.productsRepository.create(data);
      await this.productsRepository.save(product);
      return { status: true, mensagem: 'Produto cadastrado com sucesso' };
    } catch (error) {
      return { status: false, mensagem: 'Erro ao cadastrar produto' };
    }
  }

  async verificarProduto(name: string, id?: string): Promise<boolean> {
    const query = this.productsRepository.createQueryBuilder('product')
      .where('product.name = :name', { name });
  
    if (id) {
      query.andWhere('product.id != :id', { id });
    }
  
    const product = await query.getOne();
    return !!product;
  }
  

  async alterar(id: number, data: UpdateProductDto): Promise<ResultadoDto> {
    try {
      const product = await this.productsRepository.findOne({ where: { id } });
      if (!product) {
        return { status: false, mensagem: 'Produto não encontrado' };
      }

      await this.productsRepository.update(product, data);
      return { status: true, mensagem: 'Produto alterado com sucesso' };
    } catch (error) {
      return { status: false, mensagem: 'Erro ao alterar produto' };
    }
  }

  async excluir(id: number): Promise<ResultadoDto> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      return { status: false, mensagem: 'Produto não encontrado' };
    }

    // Verifica se há compras associadas ao produto
    const purchases = await this.purchaseRepository.find({ where: { product: { id: product.id } } });
    if (purchases.length > 0) {
      return { status: false, mensagem: 'Não é possível excluir o produto, pois há compras associadas.' };
    }

    await this.productsRepository.remove(product);
    return { status: true, mensagem: 'Produto excluído com sucesso' };
  }
}