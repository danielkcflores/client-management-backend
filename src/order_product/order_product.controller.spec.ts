import { Test, TestingModule } from '@nestjs/testing';
import { OrderProductController } from './order_product.controller';
import { OrderProductService } from './order_product.service';

describe('OrderProductController', () => {
  let controller: OrderProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderProductController],
      providers: [OrderProductService],
    }).compile();

    controller = module.get<OrderProductController>(OrderProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
