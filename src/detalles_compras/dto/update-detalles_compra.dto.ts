import { PartialType } from '@nestjs/mapped-types';
import { CreateDetallesCompraDto } from './create-detalles_compra.dto';

export class UpdateDetallesCompraDto extends PartialType(CreateDetallesCompraDto) {}
