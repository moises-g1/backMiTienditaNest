import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { EstadoVenta } from 'src/common/enums/estado-venta.enum';
import { MetodoPago } from 'src/common/enums/metodo-pago.enum';

export class UpdateVentaDto {
        @IsOptional()
        @IsNumber()
        numero_venta: number;
    
        @IsOptional()
        @IsNumber()
        total: number;
    
        @IsOptional()
        @IsNumber()
        descuento: number;
    
        @IsEnum(MetodoPago, { message: 'Método de pago inválido' })
        @IsOptional() 
        metodo_pago?: MetodoPago;
    
        @IsEnum(EstadoVenta, { message: 'Estado inválido' })
        @IsOptional() 
        estado?: EstadoVenta;
    
        @IsNumber()
        @IsOptional()
        usuarioId: number; 
}
