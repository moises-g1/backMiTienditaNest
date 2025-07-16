import { Test, TestingModule } from '@nestjs/testing';
import { DetallesComprasService } from './detalles_compras.service';

describe('DetallesComprasService', () => {
  let service: DetallesComprasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetallesComprasService],
    }).compile();

    service = module.get<DetallesComprasService>(DetallesComprasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
