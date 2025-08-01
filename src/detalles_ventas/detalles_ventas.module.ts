import { Module } from '@nestjs/common';
import { DetallesVentasService } from './detalles_ventas.service';
import { DetallesVentasController } from './detalles_ventas.controller';
import { Venta } from 'src/ventas/entities/venta.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallesVenta } from './entities/detalles_venta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetallesVenta, Producto, Venta])],
  controllers: [DetallesVentasController],
  providers: [DetallesVentasService],
})
export class DetallesVentasModule {}
