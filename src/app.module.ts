import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasModule } from './categorias/categorias.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProductosModule } from './productos/productos.module';
import { DetallesVentasModule } from './detalles_ventas/detalles_ventas.module';
import { DetallesComprasModule } from './detalles_compras/detalles_compras.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { ComprasModule } from './compras/compras.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'tiendita_db',
      autoLoadEntities:true,
      synchronize: true,
    }),
    UsuariosModule,
    DetallesVentasModule,
    DetallesComprasModule,
    ProveedoresModule,
    ComprasModule,
    CategoriasModule,
    CategoriasModule,
    UsuariosModule,
    ProductosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
