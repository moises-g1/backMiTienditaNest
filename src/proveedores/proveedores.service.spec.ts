import { Test, TestingModule } from '@nestjs/testing';
import { ProveedoresService } from './proveedores.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Proveedor } from './entities/proveedore.entity';

describe('ProveedoresService', () => {
  let service: ProveedoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProveedoresService,
        { provide: getRepositoryToken(Proveedor), useValue: {} },
      ],
    }).compile();

    service = module.get<ProveedoresService>(ProveedoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});