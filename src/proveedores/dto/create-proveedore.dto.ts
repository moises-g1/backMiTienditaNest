import {
  IsString,
  IsEmail,
  IsBoolean,
  IsOptional,
  IsInt,
  Min,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class CreateProveedoreDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsInt()
  @Min(18)
  edad: number;

  @IsString()
  @IsNotEmpty()
  tipo_producto: string;

  @IsString()
  @MaxLength(15)
  telefono: string;

  @IsEmail()
  email: string;

  @IsString()
  direccion: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
