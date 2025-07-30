import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleCompra } from './entities/detalles_compra.entity';
import { DetallesComprasService } from './detalles_compras.service';
import { DetalleComprasController } from './detalles_compras.controller';
@Module({
  imports: [TypeOrmModule.forFeature([DetalleCompra])],
  controllers: [DetalleComprasController],
  providers: [DetallesComprasService],
})
export class DetallesComprasModule {}
