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

  async create(dto: CreateDetallesCompraDto) {
    // Transformamos los ids planos a objetos para TypeORM
    const detalle = this.detalleRepo.create({
      cantidad: dto.cantidad,
      precio_unitario: dto.precioUnitario,
      subtotal: dto.subtotal,
      compra: { id: dto.compraId },
      producto: { id: dto.productoId },
    });
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
