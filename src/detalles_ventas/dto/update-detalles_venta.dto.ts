import { PartialType } from '@nestjs/mapped-types';
import { CreateDetallesVentaDto } from './create-detalles_venta.dto';

export class UpdateDetallesVentaDto extends PartialType(
  CreateDetallesVentaDto,
) {}
