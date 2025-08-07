import { Test, TestingModule } from '@nestjs/testing';
import { DetalleComprasController } from './detalles_compras.controller';
import { DetallesComprasService } from './detalles_compras.service';

describe('DetallesComprasController', () => {
  let controller: DetalleComprasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetalleComprasController],
      providers: [DetallesComprasService],
    }).compile();

    controller = module.get<DetalleComprasController>(DetalleComprasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
