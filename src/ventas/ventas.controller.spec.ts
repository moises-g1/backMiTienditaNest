import { Test, TestingModule } from '@nestjs/testing';
import { VentasController } from './ventas.controller';
import { VentasService } from './ventas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { DetallesVenta } from 'src/detalles_ventas/entities/detalles_venta.entity';
import { Producto } from 'src/productos/entities/producto.entity';

describe('VentasController', () => {
  let controller: VentasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VentasController],
      providers: [
        VentasService,
        { provide: getRepositoryToken(Venta), useValue: {} },
        { provide: getRepositoryToken(DetallesVenta), useValue: {} },
        { provide: getRepositoryToken(Producto), useValue: {} },
      ],
    }).compile();

    controller = module.get<VentasController>(VentasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
