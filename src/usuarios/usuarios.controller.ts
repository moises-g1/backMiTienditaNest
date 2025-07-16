import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Reflector } from '@nestjs/core';
import { RolUsuario } from '../common/enums/usuario_rol.enum';
import { SetMetadata, UseGuards } from '@nestjs/common';

// Guard sencillo para proteger rutas por rol
@Injectable()
class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<string>('role', context.getHandler());
    if (!requiredRole) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    // Simulación: el usuario debería venir autenticado en request.user
    // Aquí solo para demo, se toma el rol de un header
    const userRole = request.headers['x-rol'] || request.headers['x-role'];
    if (userRole !== requiredRole) {
      throw new ForbiddenException('No tienes permisos para realizar esta acción');
    }
    return true;
  }
}

// Decorador para usar el guard y definir el rol requerido
function Role(role: RolUsuario) {
  return function (target: any, key?: any, descriptor?: any) {
    SetMetadata('role', role)(target, key, descriptor);
    UseGuards(RolesGuard)(target, key, descriptor);
  };
}

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.createUsuario(createUsuarioDto);
  }

  @Get('all')
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.updateUsuario(+id, updateUsuarioDto);
  }

  @Delete(':id')
  @Role(RolUsuario.ADMIN)
  remove(@Param('id') id: string) {
    return this.usuariosService.removeUsuario(+id);
  }
}
