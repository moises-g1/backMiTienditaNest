import { Test, TestingModule } from '@nestjs/testing';
import { DetallesVentasService } from './detalles_ventas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DetallesVenta } from './entities/detalles_venta.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { Venta } from 'src/ventas/entities/venta.entity';

describe('DetallesVentasService', () => {
  let service: DetallesVentasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DetallesVentasService,
        { provide: getRepositoryToken(DetallesVenta), useValue: {} },
        { provide: getRepositoryToken(Producto), useValue: {} },
        { provide: getRepositoryToken(Venta), useValue: {} },
      ],
    }).compile();

    service = module.get<DetallesVentasService>(DetallesVentasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
