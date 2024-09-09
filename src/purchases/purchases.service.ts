import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from './entities/purchase.entity';
import { Cliente } from 'src/clients/entities/client.entity';
import { OrderProduct } from 'src/order_product/entities/order_product.entity';
import { Product } from 'src/products/entities/product.entity';
import { CreatePurchaseDto } from './dto/create-purchase.dto';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(OrderProduct)
    private orderProductRepository: Repository<OrderProduct>,
  ) {}
  
  async createPurchase(createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    const { clienteId, products } = createPurchaseDto;

    // 1. Crie a compra (purchase)
    const purchase = new Purchase();
    purchase.cliente = await this.clienteRepository.findOne({ where: { id: clienteId } });
    await this.purchaseRepository.save(purchase);

    // 2. Itere sobre os produtos e crie entries na order_product
    for (const productDto of products) {
        const product = await this.productRepository.findOne({ where: { id: productDto.productId } });

        if (!product) {
            throw new NotFoundException(`Produto com ID ${productDto.productId} não encontrado`);
        }

        // 3. Calcule o total (preço unitário * quantidade)
        const totalPrice = product.price * productDto.quantity;

        // 4. Crie a entrada na order_product
        const orderProduct = new OrderProduct();
        orderProduct.purchase = purchase;
        orderProduct.product = product;
        orderProduct.quantity = productDto.quantity;
        orderProduct.productPrice = product.price; // Salva o preço unitário
        orderProduct.totalPrice = totalPrice; // Salva o total calculado

        await this.orderProductRepository.save(orderProduct);
    }

    return purchase;
}  

  async findAllWithDetails(): Promise<Purchase[]> {
    return this.purchaseRepository
      .createQueryBuilder('purchase')
      .innerJoinAndSelect('purchase.cliente', 'cliente')
      .leftJoinAndSelect('purchase.orderProducts', 'orderProduct')
      .leftJoinAndSelect('orderProduct.product', 'product')
      .select([
        'purchase.id',
        'purchase.quantity',
        'cliente.id',
        'cliente.name',
        'cliente.cpf',
        'orderProduct.id',
        'orderProduct.quantity',
        'orderProduct.productPrice',
        'orderProduct.totalPrice',
        'orderProduct.createdAt',
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
      .leftJoinAndSelect('purchase.orderProducts', 'orderProduct')
      .leftJoinAndSelect('orderProduct.product', 'product')
      .where('purchase.id LIKE :searchText', { searchText: `%${searchText}%` })
      .orWhere('cliente.name LIKE :searchText', { searchText: `%${searchText}%` })
      .orWhere('cliente.cpf LIKE :searchText', { searchText: `%${searchText}%` })
      .orWhere('product.name LIKE :searchText', { searchText: `%${searchText}%` })
      .select([
        'purchase.id',
        'cliente.id',
        'cliente.name',
        'cliente.cpf',
        'orderProduct.id',
        'orderProduct.quantity',
        'orderProduct.productPrice',
        'orderProduct.totalPrice',
        'orderProduct.createdAt',
        'product.id',
        'product.name',
      ])
      .getMany();
  }
}
