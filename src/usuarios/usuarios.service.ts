import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { RolUsuario } from 'src/common/enums/usuario_rol.enum';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UsuariosService {
 constructor(
    @InjectRepository(Usuario)
  private usuarioRepo: Repository<Usuario>,
private jwtService: JwtService,
){
 }
   

  async login(email: string, password: string) {
    const usuario = await this.usuarioRepo.findOne({ where: { email } });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const passwordValid = await bcrypt.compare(password, usuario.password);
    if (!passwordValid) {
      throw new NotFoundException('Credenciales incorrectas');
    }
    const { password: _, ...userWithoutPassword } = usuario;

    // Genera el JWT real
    const payload = { sub: usuario.id, email: usuario.email, rol: usuario.rol };
    const token = this.jwtService.sign(payload);

    return {
      user: userWithoutPassword,
      token,
    };
    
  }

 async createUsuario(createUsuarioDto: CreateUsuarioDto) {
  try {
    if (!createUsuarioDto.rol) {
      createUsuarioDto.rol = RolUsuario.EMPLEADO;
    }

    // Encriptar la contraseña antes de guardar
    const salt = await bcrypt.genSalt(); // o bcrypt.genSalt(10)
    createUsuarioDto.password = await bcrypt.hash(createUsuarioDto.password, salt);

    const newUsuario = this.usuarioRepo.create(createUsuarioDto);
    await this.usuarioRepo.save(newUsuario);
    return newUsuario;
  } catch (error) {
    throw new InternalServerErrorException('Error al crear el usuario');
  }
}


    async findAll() {
    try {
      const usuarios = await this.usuarioRepo.find();
      // Ocultar el campo password en la respuesta
      return usuarios.map(({ password, ...rest }) => rest);
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los usuarios');
    }
  }


  async findOne(id: number) {
    try {
      const usuario = await this.usuarioRepo.findOneBy({ id });
      if (!usuario) {
        throw new NotFoundException(`usuario con el id: ${id} no encontrado`);
      }
      // Ocultar el campo password en la respuesta
      const { password, ...rest } = usuario;
      return rest;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al buscar el usuario');
    }
  }



 async updateUsuario(id: number, updateUsuarioDto: UpdateUsuarioDto) {
  try {
    const usuario = await this.usuarioRepo.findOneBy({ id });
    if (!usuario) {
      throw new NotFoundException(`usuario con el id: ${id} no encontrado`);
    }

    // Si el DTO tiene una nueva contraseña, se encripta
    if (updateUsuarioDto.password) {
      const salt = await bcrypt.genSalt();
      updateUsuarioDto.password = await bcrypt.hash(updateUsuarioDto.password, salt);
    }

    const updateUsuario = this.usuarioRepo.merge(usuario, updateUsuarioDto);
    const savedUsuario = await this.usuarioRepo.save(updateUsuario);
    // Ocultar el campo password en la respuesta
    const { password, ...rest } = savedUsuario;
    return rest;
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw error;
    }
    throw new InternalServerErrorException('Error al actualizar el usuario');
  }
}


  async removeUsuario(id: number) {
    try {
      const usuario = await this.usuarioRepo.findOneBy({id});
      if(!usuario){
        throw new NotFoundException(`usuario con el id: ${id} no encontrado`);
      }
      await this.usuarioRepo.remove(usuario);
      return {message:`usuario con el id: ${id} se ha eliminado`};

    } catch (error){
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al eliminar el usuario');
    }
  }
}
