import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { EstadoVenta } from 'src/common/enums/estado-venta.enum';
import { MetodoPago } from 'src/common/enums/metodo-pago.enum';
import { CreateDetallesVentaDto } from 'src/detalles_ventas/dto/create-detalles_venta.dto';

export class CreateVentaDto {
    @IsNumber()
    @IsNotEmpty()
    numero_venta: number;

    @IsNumber()
    @IsNotEmpty()
    descuento: number;

    @IsEnum(MetodoPago, { message: 'Método de pago inválido' })
    @IsOptional() 
    metodo_pago?: MetodoPago;

    @IsEnum(EstadoVenta, { message: 'Estado inválido' })
    @IsOptional() 
    estado?: EstadoVenta;

    @IsNumber()
    @IsNotEmpty()
    usuarioId: number; 

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateDetallesVentaDto)
    detalles: CreateDetallesVentaDto[];
}
