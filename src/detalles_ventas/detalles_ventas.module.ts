import { Module } from '@nestjs/common';
import { DetallesVentasService } from './detalles_ventas.service';
import { DetallesVentasController } from './detalles_ventas.controller';

@Module({
  controllers: [DetallesVentasController],
  providers: [DetallesVentasService],
})
export class DetallesVentasModule {}
