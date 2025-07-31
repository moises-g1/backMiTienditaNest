import { IsNumber, IsPositive } from 'class-validator';

export class CreateDetallesCompraDto {
  @IsNumber()
  @IsPositive()
  cantidad: number;

  @IsNumber()
  @IsPositive()
  precioUnitario: number;

  @IsNumber()
  subtotal: number;

  @IsNumber()
  compraId: number;

  @IsNumber()
  productoId: number;
}
