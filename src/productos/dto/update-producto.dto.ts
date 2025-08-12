import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class UpdateProductoDto {
  @IsOptional()
  @Length(3, 20)
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion: string;

  @IsOptional()
  @IsString()
  imagen: string;

  @IsOptional()
  @IsNumber()
  precio_venta: number;

  @IsOptional()
  @IsNumber()
  precio_compra: number;

  @IsOptional()
  @IsNumber()
  stock_actual: number;

  @IsOptional()
  @IsNumber()
  categoriaId?: number;

  @IsOptional()
  activo: boolean;
}
