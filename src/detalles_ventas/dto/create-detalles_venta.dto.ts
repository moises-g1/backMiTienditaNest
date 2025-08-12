import { IsNumber, IsOptional, IsPositive } from 'class-validator';
export class CreateDetallesVentaDto {
  @IsNumber()
  @IsPositive()
  productoId: number;

  @IsNumber()
  @IsPositive()
  cantidad: number;
}
