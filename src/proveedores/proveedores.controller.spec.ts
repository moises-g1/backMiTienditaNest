import { Test, TestingModule } from '@nestjs/testing';
import { ProveedoresController } from './proveedores.controller';
import { ProveedoresService } from './proveedores.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Proveedor } from './entities/proveedore.entity';

describe('ProveedoresController', () => {
  let controller: ProveedoresController;

  const mockProveedorRepo = {
    find: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProveedoresController],
      providers: [
        ProveedoresService,
        {
          provide: getRepositoryToken(Proveedor),
          useValue: mockProveedorRepo,
        },
      ],
    }).compile();

    controller = module.get<ProveedoresController>(ProveedoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});