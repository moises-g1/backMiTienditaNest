import { Test, TestingModule } from '@nestjs/testing';
import { ComprasService } from './compras.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Compra } from './entities/compra.entity';
import { Proveedor } from 'src/proveedores/entities/proveedore.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

describe('ComprasService', () => {
  let service: ComprasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ComprasService,
        { provide: getRepositoryToken(Compra), useValue: {} },
        { provide: getRepositoryToken(Proveedor), useValue: {} },
        { provide: getRepositoryToken(Usuario), useValue: {} },
      ],
    }).compile();

    service = module.get<ComprasService>(ComprasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

