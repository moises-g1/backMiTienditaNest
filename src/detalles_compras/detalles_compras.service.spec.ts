import { Test, TestingModule } from '@nestjs/testing';
import { DetalleComprasService } from './detalles_compras.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DetalleCompra } from './entities/detalles_compra.entity';

describe('DetalleComprasService', () => {
  let service: DetalleComprasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DetalleComprasService,
        { provide: getRepositoryToken(DetalleCompra), useValue: {} },
      ],
    }).compile();

    service = module.get<DetalleComprasService>(DetalleComprasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
