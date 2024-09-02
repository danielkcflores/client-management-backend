import { Test, TestingModule } from '@nestjs/testing';
import { TelephonesService } from './telephone.service';

describe('TelephoneService', () => {
  let service: TelephonesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelephonesService],
    }).compile();

    service = module.get<TelephonesService>(TelephonesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
