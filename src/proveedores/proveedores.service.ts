import { Injectable } from '@nestjs/common';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proveedor } from './entities/proveedore.entity';

@Injectable()
export class ProveedoresService {
  constructor(
    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,
  ) {}

  async create(createProveedoreDto: CreateProveedoreDto): Promise<Proveedor> {
    const proveedor = this.proveedorRepository.create(createProveedoreDto);
    return await this.proveedorRepository.save(proveedor);
  }

  findAll() {
    return this.proveedorRepository.find();
  }

  findOne(id: number) {
    return this.proveedorRepository.findOneBy({ id });
  }

  async update(id: number, updateProveedoreDto: UpdateProveedoreDto) {
    await this.proveedorRepository.update(id, updateProveedoreDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.proveedorRepository.delete(id);
  }
}
