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
import { ProveedoresService } from './proveedores.service';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';

@Controller('proveedores')
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  @Post()
  async create(@Body() createProveedoreDto: CreateProveedoreDto) {
    try {
      const proveedor =
        await this.proveedoresService.create(createProveedoreDto);
      return {
        message: 'Proveedor creado correctamente',
        data: proveedor,
      };
    } catch (error) {
      throw new HttpException(
        'Error al crear el proveedor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const proveedores = await this.proveedoresService.findAll();
      return {
        message: 'Listado de proveedores',
        data: proveedores,
      };
    } catch (error) {
      throw new HttpException(
        'Error al obtener los proveedores',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const proveedor = await this.proveedoresService.findOne(+id);
      if (!proveedor) {
        throw new HttpException(
          'Proveedor no encontrado',
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        message: 'Proveedor encontrado',
        data: proveedor,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al buscar el proveedor',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProveedoreDto: UpdateProveedoreDto,
  ) {
    try {
      const updated = await this.proveedoresService.update(
        +id,
        updateProveedoreDto,
      );
      return {
        message: 'Proveedor actualizado correctamente',
        data: updated,
      };
    } catch (error) {
      throw new HttpException(
        'Error al actualizar el proveedor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.proveedoresService.remove(+id);
      return {
        message: 'Proveedor eliminado correctamente',
      };
    } catch (error) {
      throw new HttpException(
        'Error al eliminar el proveedor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
