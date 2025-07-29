import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ComprasService } from './compras.service';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';

@Controller('compras')
export class ComprasController {
  constructor(private readonly comprasService: ComprasService) {}

  @Post()
  async create(@Body() dto: CreateCompraDto) {
    try {
      const compra = await this.comprasService.create(dto);
      return {
        message: 'Compra registrada correctamente',
        data: compra,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al crear la compra',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const compras = await this.comprasService.findAll();
      return {
        message: 'Lista de compras',
        data: compras,
      };
    } catch (error) {
      throw new HttpException(
        'Error al obtener las compras',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const compra = await this.comprasService.findOne(+id);
      return {
        message: 'Compra encontrada',
        data: compra,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al buscar la compra',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCompraDto) {
    try {
      const updated = await this.comprasService.update(+id, dto);
      return {
        message: 'Compra actualizada correctamente',
        data: updated,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al actualizar la compra',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.comprasService.remove(+id);
      return {
        message: 'Compra eliminada correctamente',
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al eliminar la compra',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
