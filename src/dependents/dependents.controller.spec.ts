import { Test, TestingModule } from '@nestjs/testing';
import { DependentController } from './dependents.controller';
import { DependentsService } from './dependents.service';

describe('DependentsController', () => {
  let controller: DependentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DependentController],
      providers: [DependentsService],
    }).compile();

    controller = module.get<DependentController>(DependentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
