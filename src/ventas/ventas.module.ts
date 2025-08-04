import { Module } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { DetallesVenta } from 'src/detalles_ventas/entities/detalles_venta.entity';
import { Producto } from 'src/productos/entities/producto.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Venta, DetallesVenta, Producto])],
  controllers: [VentasController],
  providers: [VentasService],
})
export class VentasModule {}
