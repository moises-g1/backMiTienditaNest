import { IsEnum, IsNumber, IsOptional, IsString, Length } from "class-validator"
import { RolUsuario } from "src/common/enums/usuario_rol.enum"

export class UpdateUsuarioDto {
    @IsOptional()
    @Length(3,20)
    @IsString()
    nombre:string

    @IsOptional()
    @Length(3,20)
    @IsString()
    apellido:string

    @IsOptional()
    @IsString()
    imagen:string

    @IsNumber()
    @IsOptional()
    edad:number

    @IsOptional()
    @Length(3,30)
    @IsString()
    password:string

    @IsOptional()
    @IsEnum(RolUsuario, { message: 'Rol debe ser admin o empleado' })
  rol?: RolUsuario; // opcional si tiene default

}
