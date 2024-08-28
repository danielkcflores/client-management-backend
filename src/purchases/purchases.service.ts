import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from './entities/purchase.entity';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    const { clienteId, productId } = createPurchaseDto;
    const cliente = await this.clienteRepository.findOne({ where: { id: clienteId } });
    const product = await this.productRepository.findOne({ where: { id: productId } });

    if (!cliente || !product) {
      throw new Error('Invalid cliente or product ID');
    }

    const purchase = new Purchase();
    purchase.cliente = cliente;
    purchase.product = product;

    return this.purchaseRepository.save(purchase);
  }

  async findAllWithDetails(): Promise<Purchase[]> {
    return this.purchaseRepository
      .createQueryBuilder('purchase')
      .innerJoinAndSelect('purchase.cliente', 'cliente')
      .innerJoinAndSelect('purchase.product', 'product')
      .select([
        'purchase.id',
        'cliente.id',
        'cliente.name',
        'cliente.cpf',
        'product.id',
        'product.name',
        'product.price',
      ])
      .getMany();
  }

  async search(searchText: string): Promise<Purchase[]> {
    return this.purchaseRepository
      .createQueryBuilder('purchase')
      .innerJoinAndSelect('purchase.cliente', 'cliente')
      .innerJoinAndSelect('purchase.product', 'product')
      .where('purchase.id LIKE :searchText', { searchText: `%${searchText}%` })
      .orWhere('cliente.name LIKE :searchText', { searchText: `%${searchText}%` })
      .orWhere('cliente.cpf LIKE :searchText', { searchText: `%${searchText}%` })
      .orWhere('product.name LIKE :searchText', { searchText: `%${searchText}%` })
      .select([
        'purchase.id',
        'cliente.id',
        'cliente.name',
        'cliente.cpf',
        'product.id',
        'product.name',
        'product.price',
      ])
      .getMany();
  }
  
}
