import { Test, TestingModule } from '@nestjs/testing';
import { ComprasController } from './compras.controller';
import { ComprasService } from './compras.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Compra } from './entities/compra.entity';
import { Proveedor } from 'src/proveedores/entities/proveedor.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

describe('ComprasController', () => {
  let controller: ComprasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComprasController],
      providers: [
        ComprasService,
        { provide: getRepositoryToken(Compra), useValue: {} },
        { provide: getRepositoryToken(Proveedor), useValue: {} },
        { provide: getRepositoryToken(Usuario), useValue: {} },
      ],
    }).compile();

    controller = module.get<ComprasController>(ComprasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
