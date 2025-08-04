import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetallesVenta } from './entities/detalles_venta.entity';
import { CreateDetallesVentaDto } from './dto/create-detalles_venta.dto';
import { Venta } from '../ventas/entities/venta.entity';
import { Producto } from '../productos/entities/producto.entity';

@Injectable()
export class DetallesVentasService {
  constructor(
    @InjectRepository(DetallesVenta)
    private readonly detalleRepo: Repository<DetallesVenta>,

    @InjectRepository(Producto)
    private readonly productoRepo: Repository<Producto>,

    @InjectRepository(Venta)
    private readonly ventaRepo: Repository<Venta>,
  ) {}
  async create(dto: CreateDetallesVentaDto) {
    const producto = await this.productoRepo.findOneBy({ id: dto.productoId });
    if (!producto) {
      throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
    }

    if (producto.stock_actual < dto.cantidad) {
      throw new HttpException(
        'Stock insuficiente para realizar la venta',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Restar stock
    producto.stock_actual -= dto.cantidad;
    await this.productoRepo.save(producto);

    const detalle = this.detalleRepo.create({
      cantidad: dto.cantidad,
      //precio_unitario: dto.precio_unitario,
      producto: { id: dto.productoId },
      // venta: { id: dto.ventaId },
    });

    return this.detalleRepo.save(detalle);
  }

  findAll() {
    return this.detalleRepo.find({ relations: ['venta', 'producto'] });
  }

  findOne(id: number) {
    return this.detalleRepo.findOne({
      where: { id },
      relations: ['venta', 'producto'],
    });
  }

  remove(id: number) {
    return this.detalleRepo.delete(id);
  }
}
