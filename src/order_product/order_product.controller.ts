import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { OrderProductService } from './order_product.service';
import { OrderProduct } from './entities/order_product.entity';
import { CreateOrderProductDto } from './dto/create-order_product.dto';

@Controller('order-products')
export class OrderProductController {
  constructor(private readonly orderProductService: OrderProductService) {}

  @Post()
  async create(@Body() createOrderProductDto: CreateOrderProductDto): Promise<OrderProduct> {
    return this.orderProductService.createOrderProduct(
      createOrderProductDto.purchaseId,
      createOrderProductDto.productId,
      createOrderProductDto.quantity
    );
  }

  @Get()
  async findAll(): Promise<OrderProduct[]> {
    return this.orderProductService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<OrderProduct> {
    return this.orderProductService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateOrderProductDto: Partial<CreateOrderProductDto>,
  ): Promise<OrderProduct> {
    return this.orderProductService.update(id, updateOrderProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.orderProductService.remove(id);
  }
}
