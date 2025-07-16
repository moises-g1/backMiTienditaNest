import { Injectable } from '@nestjs/common';
import { CreateDetallesCompraDto } from './dto/create-detalles_compra.dto';
import { UpdateDetallesCompraDto } from './dto/update-detalles_compra.dto';

@Injectable()
export class DetallesComprasService {
  create(createDetallesCompraDto: CreateDetallesCompraDto) {
    return 'This action adds a new detallesCompra';
  }

  findAll() {
    return `This action returns all detallesCompras`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detallesCompra`;
  }

  update(id: number, updateDetallesCompraDto: UpdateDetallesCompraDto) {
    return `This action updates a #${id} detallesCompra`;
  }

  remove(id: number) {
    return `This action removes a #${id} detallesCompra`;
  }
}
