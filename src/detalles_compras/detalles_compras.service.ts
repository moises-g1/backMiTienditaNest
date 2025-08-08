import { Injectable } from '@nestjs/common';
import { CreateDetallesCompraDto } from './dto/create-detalles_compra.dto';
import { DetalleCompra } from './entities/detalles_compra.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class DetalleComprasService {
  constructor(
    @InjectRepository(DetalleCompra)
    private detalleRepo: Repository<DetalleCompra>,
  ) {}

  create(dto: CreateDetallesCompraDto) {
    const detalle = this.detalleRepo.create(dto);
    return this.detalleRepo.save(detalle);
  }

  findAll() {
    return this.detalleRepo.find({ relations: ['compra', 'producto'] });
  }

  findOne(id: number) {
    return this.detalleRepo.findOne({
      where: { id },
      relations: ['compra', 'producto'],
    });
  }

  remove(id: number) {
    return this.detalleRepo.delete(id);
  }
}
