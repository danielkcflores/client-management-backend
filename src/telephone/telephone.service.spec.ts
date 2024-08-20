import { Test, TestingModule } from '@nestjs/testing';
import { TelephoneService } from './telephone.service';

describe('TelephoneService', () => {
  let service: TelephoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelephoneService],
    }).compile();

    service = module.get<TelephoneService>(TelephoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
