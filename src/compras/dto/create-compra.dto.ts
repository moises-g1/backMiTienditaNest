import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsPositive,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';
import { EstadoCompra } from '../entities/compra.entity';

export class CreateCompraDto {
  @IsString()
  @IsNotEmpty()
  numero_factura: string;

  @IsInt()
  @Min(1)
  proveedor_id: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  total: number;

  @IsEnum(EstadoCompra)
  @IsOptional()
  estado?: EstadoCompra;

  @IsString()
  @IsOptional()
  observaciones?: string;

  @IsInt()
  @Min(1)
  usuario_id: number;
}
