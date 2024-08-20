import { Test, TestingModule } from '@nestjs/testing';
import { DependentsService } from './dependents.service';

describe('DependentsService', () => {
  let service: DependentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DependentsService],
    }).compile();

    service = module.get<DependentsService>(DependentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
