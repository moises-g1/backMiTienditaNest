import { Module } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { ComprasController } from './compras.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compra } from './entities/compra.entity';
import { Proveedor } from '../proveedores/entities/proveedor.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Compra, Proveedor, Usuario])],
  controllers: [ComprasController],
  providers: [ComprasService],
})
export class ComprasModule {}
