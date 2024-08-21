import { Test, TestingModule } from '@nestjs/testing';
import { TelephoneController } from './telephone.controller';
import { TelephonesService } from './telephone.service';

describe('TelephoneController', () => {
  let controller: TelephoneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelephoneController],
      providers: [TelephonesService],
    }).compile();

    controller = module.get<TelephoneController>(TelephoneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
