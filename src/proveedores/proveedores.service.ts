import { Injectable } from '@nestjs/common';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proveedor } from './entities/proveedor.entity';

@Injectable()
export class ProveedoresService {
  constructor(
    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,
  ) {}

  async create(createProveedorDto: CreateProveedorDto): Promise<Proveedor> {
    const proveedor = this.proveedorRepository.create(createProveedorDto);
    return await this.proveedorRepository.save(proveedor);
  }

  findAll() {
    return this.proveedorRepository.find();
  }

  findOne(id: number) {
    return this.proveedorRepository.findOneBy({ id });
  }

  async update(id: number, updateProveedorDto: UpdateProveedorDto) {
    await this.proveedorRepository.update(id, updateProveedorDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.proveedorRepository.delete(id);
  }
}
