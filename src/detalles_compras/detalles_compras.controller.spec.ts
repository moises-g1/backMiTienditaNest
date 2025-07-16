import { Test, TestingModule } from '@nestjs/testing';
import { DetallesComprasController } from './detalles_compras.controller';
import { DetallesComprasService } from './detalles_compras.service';

describe('DetallesComprasController', () => {
  let controller: DetallesComprasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetallesComprasController],
      providers: [DetallesComprasService],
    }).compile();

    controller = module.get<DetallesComprasController>(DetallesComprasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
