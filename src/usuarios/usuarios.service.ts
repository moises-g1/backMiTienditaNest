import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { RolUsuario } from 'src/common/enums/usuario_rol.enum';


@Injectable()
export class UsuariosService {
 constructor(
    @InjectRepository(Usuario)
  private usuarioRepo: Repository<Usuario>){ }


  async createUsuario(createUsuarioDto: CreateUsuarioDto) {
  try {
    // Asignar rol por defecto si no viene en el DTO
    if (!createUsuarioDto.rol) {
      createUsuarioDto.rol = RolUsuario.EMPLEADO;
    }

    const newUsuario = this.usuarioRepo.create(createUsuarioDto);
    await this.usuarioRepo.save(newUsuario);
    return newUsuario;
  } catch (error) {
    throw new InternalServerErrorException('Error al crear el usuario');
  }
}



    async findAll() {
    try {
      return await this.usuarioRepo.find();
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
      return usuario;
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
      const updateUsuario = this.usuarioRepo.merge(usuario, updateUsuarioDto);
      return await this.usuarioRepo.save(updateUsuario);
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
