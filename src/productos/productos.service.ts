import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {
  constructor(
      @InjectRepository(Producto)
    private productoRepo: Repository<Producto>){ }
  
  
    async createProducto(CreateProductoDto: CreateProductoDto) {
      try {
        const newProducto = this.productoRepo.create(CreateProductoDto);
        await this.productoRepo.save(newProducto);
        return newProducto;
      } catch (error) {
        throw new InternalServerErrorException('Error al crear el producto');
      }
    }
  
      async findAll() {
      try {
        return await this.productoRepo.find();
      } catch (error) {
        throw new InternalServerErrorException('Error al obtener los productos');
      }
    }
  
  
    async findOne(id: number) {
      try {
        const producto = await this.productoRepo.findOneBy({ id });
        if (!producto) {
          throw new NotFoundException(`producto con el id: ${id} no encontrado`);
        }
        return producto;
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException('Error al buscar el producto');
      }
    }
  
  
    async updateProducto(id: number, UpdateProductoDto: UpdateProductoDto) {
      try {
        const producto = await this.productoRepo.findOneBy({ id });
        if (!producto) {
          throw new NotFoundException(`producto con el id: ${id} no encontrado`);
        }
        const updateProducto = this.productoRepo.merge(producto, UpdateProductoDto);
        return await this.productoRepo.save(updateProducto);
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException('Error al actualizar el producto');
      }
    }
  
  
     async removeProducto(id: number) {
      try {
        const producto = await this.productoRepo.findOneBy({id});
        if(!producto){
          throw new NotFoundException(`producto con el id: ${id} no encontrado`);
        }
        await this.productoRepo.remove(producto);
        return {message:`producto con el id: ${id} eliminado`};
  
      } catch (error){
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException('Error al eliminar el producto');
      }
    }
}
