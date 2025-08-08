import { Test, TestingModule } from '@nestjs/testing';
import { DetalleComprasController } from './detalles_compras.controller';
import { DetalleComprasService } from './detalles_compras.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DetalleCompra } from './entities/detalles_compra.entity';

describe('DetalleComprasController', () => {
  let controller: DetalleComprasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetalleComprasController],
      providers: [
        DetalleComprasService,
        { provide: getRepositoryToken(DetalleCompra), useValue: {} },
      ],
    }).compile();

    controller = module.get<DetalleComprasController>(DetalleComprasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
