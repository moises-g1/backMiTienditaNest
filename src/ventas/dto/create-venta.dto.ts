import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { EstadoVenta } from 'src/common/enums/estado-venta.enum';
import { MetodoPago } from 'src/common/enums/metodo-pago.enum';

export class CreateVentaDto {
    @IsNumber()
    @IsNotEmpty()
    numero_venta: number;

    @IsNumber()
    @IsNotEmpty()
    total: number;

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
}
