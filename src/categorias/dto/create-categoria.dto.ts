import { IsNotEmpty, IsString, Length } from "class-validator"

export class CreateCategoriaDto {
    @IsNotEmpty()
    @Length(3,20)
    @IsString()
    nombre:string

    @IsNotEmpty()
    @Length(3,50)
    @IsString()
    descripcion:string
}
