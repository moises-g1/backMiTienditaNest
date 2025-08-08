import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { DetalleComprasService } from './detalles_compras.service';
import { CreateDetallesCompraDto } from './dto/create-detalles_compra.dto';

@Controller('detalle-compras')
export class DetalleComprasController {
  constructor(private readonly service: DetalleComprasService) {}

  @Post()
  create(@Body() dto: CreateDetallesCompraDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
