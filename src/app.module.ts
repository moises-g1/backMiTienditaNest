import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasModule } from './categorias/categorias.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProductosModule } from './productos/productos.module';
import { DetallesVentasModule } from './detalles_ventas/detalles_ventas.module';
import { DetalleComprasModule } from './detalles_compras/detalles_compras.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { ComprasModule } from './compras/compras.module';
import { VentasModule } from './ventas/ventas.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirebaseModule } from './firebase/firebase.module';

// Permite activar Firestore y deshabilitar TypeORM con DATA_SOURCE=firestore
const dbModule =
  process.env['DATA_SOURCE'] === 'firestore'
    ? []
    : [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            type: 'mysql',
            host: configService.get<string>('DB_HOST', 'localhost'),
            port: configService.get<number>('DB_PORT', 3306),
            username: configService.get<string>('DB_USERNAME', 'root'),
            password: configService.get<string>('DB_PASSWORD', ''),
            database: configService.get<string>('DB_DATABASE', 'tiendita_db'),
            autoLoadEntities: true,
            synchronize: configService.get<string>('NODE_ENV') !== 'production',
          }),
          inject: [ConfigService],
        }),
      ];

// Importa FirebaseModule solo cuando se usa Firestore
const firebaseModule = process.env['DATA_SOURCE'] === 'firestore' ? [FirebaseModule] : [];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ...dbModule,
    ...firebaseModule,
    UsuariosModule,
    DetallesVentasModule,
    DetalleComprasModule,
    ProveedoresModule,
    ComprasModule,
    CategoriasModule,
    ProductosModule,
    VentasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
