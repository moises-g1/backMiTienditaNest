import { Test, TestingModule } from '@nestjs/testing';
import { DetallesVentasController } from './detalles_ventas.controller';
import { DetallesVentasService } from './detalles_ventas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DetallesVenta } from './entities/detalles_venta.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { Venta } from 'src/ventas/entities/venta.entity';

describe('DetallesVentasController', () => {
  let controller: DetallesVentasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetallesVentasController],
      providers: [
        DetallesVentasService,
        { provide: getRepositoryToken(DetallesVenta), useValue: {} },
        { provide: getRepositoryToken(Producto), useValue: {} },
        { provide: getRepositoryToken(Venta), useValue: {} },
      ],
    }).compile();

    controller = module.get<DetallesVentasController>(DetallesVentasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
