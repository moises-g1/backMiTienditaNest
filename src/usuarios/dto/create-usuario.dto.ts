import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { RolUsuario } from 'src/common/enums/usuario_rol.enum';

export class CreateUsuarioDto {
  @IsNotEmpty()
  @Length(3, 20)
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @Length(3, 20)
  @IsString()
  apellido: string;

  @IsNotEmpty()
  @IsString()
  imagen: string;

  @IsNumber()
  @IsNotEmpty()
  edad: number;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(3, 30)
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(RolUsuario, { message: 'El rol debe ser admin o empleado' })
  rol?: RolUsuario; // Puede venir vacío
}
