import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderProduct } from './entities/order_product.entity';
import { CreateOrderProductDto } from './dto/create-order_product.dto';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(OrderProduct)
    private orderProductRepository: Repository<OrderProduct>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  // Cria um novo OrderProduct
  // Cria um novo OrderProduct
  async createOrderProduct(purchase: any, productId: number, quantity: number) {
    const orderProduct = new OrderProduct();
    orderProduct.purchase = purchase;
    const product = await this.productRepository.findOne({ where: { id: productId } });
    orderProduct.product = product;
    orderProduct.quantity = quantity;
    return this.orderProductRepository.save(orderProduct);
  }

  // Encontra todos os OrderProducts
  async findAll(): Promise<OrderProduct[]> {
    return this.orderProductRepository.find({
      relations: ['product', 'purchase'], // Adiciona as relações conforme necessário
    });
  }

  // Encontra um OrderProduct por ID
  async findOne(id: number): Promise<OrderProduct> {
    return this.orderProductRepository.findOne({
      where: { id },
      relations: ['product', 'purchase'], // Adiciona as relações conforme necessário
    });
  }

  // Atualiza um OrderProduct
  async update(id: number, updateOrderProductDto: Partial<CreateOrderProductDto>): Promise<OrderProduct> {
    await this.orderProductRepository.update(id, updateOrderProductDto);
    return this.findOne(id);
  }

  // Exclui um OrderProduct
  async remove(id: number): Promise<void> {
    await this.orderProductRepository.delete(id);
  }
}
