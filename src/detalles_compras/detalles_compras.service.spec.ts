import { Test, TestingModule } from '@nestjs/testing';
import { DetallesComprasService } from './detalles_compras.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DetalleCompra } from './entities/detalles_compra.entity';

describe('DetallesComprasService', () => {
  let service: DetallesComprasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DetallesComprasService,
        { provide: getRepositoryToken(DetalleCompra), useValue: {} },
      ],
    }).compile();

    service = module.get<DetallesComprasService>(DetallesComprasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
