import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, Length } from "class-validator"
import { RolUsuario } from "src/common/enums/usuario_rol.enum"

export class CreateUsuarioDto {
    @IsNotEmpty()
    @Length(3,20)
    @IsString()
    nombre:string

    @IsNotEmpty()
    @Length(3,20)
    @IsString()
    apellido:string

    @IsNumber()
    @IsNotEmpty()
    edad:number

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @Length(3,30)
    @IsString()
    password:string

    @IsEnum(RolUsuario, { message: 'Rol debe ser admin o empleado' })
  rol?: RolUsuario; // opcional si tiene default

}
