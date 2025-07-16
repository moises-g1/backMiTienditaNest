import { Module } from '@nestjs/common';
import { DetallesComprasService } from './detalles_compras.service';
import { DetallesComprasController } from './detalles_compras.controller';

@Module({
  controllers: [DetallesComprasController],
  providers: [DetallesComprasService],
})
export class DetallesComprasModule {}
