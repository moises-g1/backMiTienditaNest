import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetallesComprasService } from './detalles_compras.service';
import { CreateDetallesCompraDto } from './dto/create-detalles_compra.dto';
import { UpdateDetallesCompraDto } from './dto/update-detalles_compra.dto';

@Controller('detalles-compras')
export class DetallesComprasController {
  constructor(private readonly detallesComprasService: DetallesComprasService) {}

  @Post()
  create(@Body() createDetallesCompraDto: CreateDetallesCompraDto) {
    return this.detallesComprasService.create(createDetallesCompraDto);
  }

  @Get()
  findAll() {
    return this.detallesComprasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detallesComprasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetallesCompraDto: UpdateDetallesCompraDto) {
    return this.detallesComprasService.update(+id, updateDetallesCompraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detallesComprasService.remove(+id);
  }
}
