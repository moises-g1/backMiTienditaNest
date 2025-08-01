import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Param,
  Delete,
} from '@nestjs/common';
import { DetallesVentasService } from './detalles_ventas.service';
import { CreateDetallesVentaDto } from './dto/create-detalles_venta.dto';

@Controller('detalles-ventas')
export class DetallesVentasController {
  constructor(private readonly detallesVentasService: DetallesVentasService) {}

  @Post()
  async create(@Body() dto: CreateDetallesVentaDto) {
    try {
      return await this.detallesVentasService.create(dto);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error al crear el detalle de venta',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.detallesVentasService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error al obtener los detalles de ventas',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const detalle = await this.detallesVentasService.findOne(+id);
      if (!detalle) {
        throw new HttpException('Detalle no encontrado', HttpStatus.NOT_FOUND);
      }
      return detalle;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error al obtener el detalle de venta',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.detallesVentasService.remove(+id);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error al eliminar el detalle de venta',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
