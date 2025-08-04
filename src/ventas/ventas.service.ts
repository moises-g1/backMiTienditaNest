import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { Repository } from 'typeorm';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { DetallesVenta } from 'src/detalles_ventas/entities/detalles_venta.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { MetodoPago } from 'src/common/enums/metodo-pago.enum';
import { EstadoVenta } from 'src/common/enums/estado-venta.enum';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private ventaRepo: Repository<Venta>,

    @InjectRepository(DetallesVenta)
    private detalleRepo: Repository<DetallesVenta>,

    @InjectRepository(Producto)
    private productoRepo: Repository<Producto>,) { }


async createVenta(createVentaDto: CreateVentaDto) {
  const {
    usuarioId,
    descuento = 0,
    metodo_pago = MetodoPago.EFECTIVO,
    estado = EstadoVenta.COMPLETADA,
    detalles,
  } = createVentaDto;

  // Crear la venta con total temporal = 0
  const venta = this.ventaRepo.create({
    descuento,
    metodo_pago,
    estado,
    usuario: { id: usuarioId },
    total: 0,
  });

  await this.ventaRepo.save(venta);

  let totalVenta = 0;

  // Procesar cada detalle
  for (const detalle of detalles) {
    const producto = await this.productoRepo.findOneBy({ id: detalle.productoId });

    if (!producto) {
      throw new NotFoundException(`Producto con id ${detalle.productoId} no encontrado`);
    }

    if (producto.stock_actual < detalle.cantidad) {
      throw new BadRequestException(`Stock insuficiente para el producto ${detalle.productoId}`);
    }

    const subtotal = producto.precio_venta * detalle.cantidad;
    totalVenta += subtotal;

    producto.stock_actual -= detalle.cantidad;
    await this.productoRepo.save(producto);

    const nuevoDetalle = this.detalleRepo.create({
      cantidad: detalle.cantidad,
      producto: { id: detalle.productoId },
      venta: { id: venta.id },
      precio_unitario: producto.precio_venta, 
    });

    await this.detalleRepo.save(nuevoDetalle);
  }

  // Actualizar total de la venta (aplicando descuento)
  venta.total = Math.max(totalVenta - descuento, 0);
  await this.ventaRepo.save(venta);

  // Retornar la venta con relaciones
  return this.ventaRepo.findOne({
    where: { id: venta.id },
    relations: ['usuario', 'detalles', 'detalles.producto'],
  });
}



  async findAll() {
    try {
      return await this.ventaRepo.find({
        relations: ['usuario'] // Carga la relación con usuario
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener las ventas');
    }
  }

  async findOne(id: number) {
    try {
      const venta = await this.ventaRepo.findOne({
        where: { id },
        relations: ['usuario'] // Carga la relación con usuario
      });
      if (!venta) {
        throw new NotFoundException(`venta con el id: ${id} no encontrada`);
      }
      return venta;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al buscar la venta');
    }
  }


  async updateVenta(id: number, UpdateVentaDto: UpdateVentaDto) {
    try {
      const venta = await this.ventaRepo.findOneBy({ id });
      if (!venta) {
        throw new NotFoundException(`producto con el id: ${id} no encontrado`);
      }
      const updateVenta = this.ventaRepo.merge(venta, UpdateVentaDto);
      return await this.ventaRepo.save(updateVenta);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al actualizar la venta');
    }
  }


  async removeVenta(id: number) {
    try {
      const venta = await this.ventaRepo.findOneBy({ id });
      if (!venta) {
        throw new NotFoundException(`venta con el id: ${id} no encontrada`);
      }
      await this.ventaRepo.remove(venta);
      return { message: `venta con el id: ${id} eliminada` };

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al eliminar la venta');
    }
  }

}
