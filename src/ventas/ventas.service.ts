import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { Repository } from 'typeorm';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private ventaRepo: Repository<Venta>) { }

  async createVenta(createVentaDto: CreateVentaDto) {
    try {
      const { usuarioId, ...rest } = createVentaDto;

      const newVenta = this.ventaRepo.create({
        ...rest,
        usuario: { id: usuarioId }, //relación
      });

      await this.ventaRepo.save(newVenta);
      return newVenta;
    } catch (error) {
      throw new InternalServerErrorException('Error al crear la venta');
    }
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
