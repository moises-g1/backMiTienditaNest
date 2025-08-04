import { IsNumber, IsOptional, IsPositive } from 'class-validator';
export class CreateDetallesVentaDto {
  // @IsNumber()
  // @IsPositive()
  // @IsOptional()
  // ventaId: number;

  @IsNumber()
  @IsPositive()
  productoId: number;

  @IsNumber()
  @IsPositive()
  cantidad: number;

  // @IsNumber()
  // @IsPositive()
  // precio_unitario: number;
}
