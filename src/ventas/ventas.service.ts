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

   // Usar una transacción para garantizar que todo se complete o se revierta.
  return await this.ventaRepo.manager.transaction(async (manager) => {

    // 1. Crear la venta con total temporal = 0
    const venta = manager.create(Venta, {
      descuento,
      metodo_pago,
      estado,
      usuario: { id: usuarioId },
      total: 0,
    });

    await manager.save(venta);

    let totalVenta = 0;
    const detallesVentaEntities: DetallesVenta[] = []; // 👈 Tipo explícito

    // 2. Procesar cada detalle
    for (const detalle of detalles) {
      const producto = await manager.findOne(Producto, {
        where: { id: detalle.productoId }
      });

      if (!producto) {
        throw new NotFoundException(`Producto con id ${detalle.productoId} no encontrado`);
      }

      if (producto.stock_actual < detalle.cantidad) {
        throw new BadRequestException(`Stock insuficiente para el producto ${producto.nombre}`);
      }

      const subtotal = producto.precio_venta * detalle.cantidad;
      totalVenta += subtotal;

      producto.stock_actual -= detalle.cantidad;
      await manager.save(producto);

      const nuevoDetalle = manager.create(DetallesVenta, {
        cantidad: detalle.cantidad,
        producto: { id: detalle.productoId },
        venta: { id: venta.id }, // ESTO ES CLAVE
        precio_unitario: producto.precio_venta, 
      });

      detallesVentaEntities.push(nuevoDetalle);
    }

    await manager.save(detallesVentaEntities);

    // 3. Actualizar total de la venta (aplicando descuento)
    venta.total = Math.max(totalVenta - descuento, 0);
    await manager.save(venta);

    // 4. Retornar la venta con relaciones
    return manager.findOne(Venta, {
      where: { id: venta.id },
      relations: ['usuario', 'detalles', 'detalles.producto'],
    });
  });
}



  async findAll() {
    try {
      return await this.ventaRepo.find({
        relations: ['usuario', 'detalles', 'detalles.producto'], // traer usuario, detalles y productos en detalles
        order: { createdAt: 'DESC' }, // opcional, ordenar por fecha
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener ventas');
    }
  }

  async findOne(id: number) {
  try {
    const venta = await this.ventaRepo.findOne({
      where: { id },
      relations: [
        'usuario',
        'detalles',
        'detalles.producto' // 👈 Esto es clave para traer los nombres
      ]
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
