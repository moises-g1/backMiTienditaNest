import { Module, OnModuleInit } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolUsuario } from 'src/common/enums/usuario_rol.enum';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule implements OnModuleInit {
  constructor(private readonly usuariosService: UsuariosService) {}

  async onModuleInit() {
    const adminEmail = 'admin@email.com';
    const adminExists = await this.usuariosService.findByEmail(adminEmail);
    if (!adminExists) {
      await this.usuariosService.createUsuario({
        nombre: 'Admin',
        apellido: 'Principal',
        imagen: '',
        edad: 30,
        email: adminEmail,
        password: 'admin123',
        rol: RolUsuario.ADMIN,
      });
      console.log('Usuario admin creado por defecto');
    }
  }
}
