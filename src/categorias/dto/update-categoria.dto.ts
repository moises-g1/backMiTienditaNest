import { IsOptional, IsString, Length } from "class-validator"

export class UpdateCategoriaDto {
     @IsOptional()
     @Length(3,20)
     @IsString()
     nombre:string

     @IsOptional()
     @Length(3,50)
     @IsString()
     descripcion:string
}
