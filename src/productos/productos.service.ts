import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Categoria } from 'src/categorias/entities/categoria.entity';

@Injectable()
export class ProductosService {
  constructor(
      @InjectRepository(Producto)
    private productoRepo: Repository<Producto>,
   @InjectRepository(Categoria)
  private categoriaRepo: Repository<Categoria>,){ }
  
  
    async createProducto(createProductoDto: CreateProductoDto) {
  try {
    const { categoriaId, ...resto } = createProductoDto;

    const categoria = await this.categoriaRepo.findOneBy({ id: categoriaId });
    if (!categoria) {
      throw new NotFoundException(`Categoría con el id ${categoriaId} no encontrada`);
    }

    const newProducto = this.productoRepo.create({
      ...resto,
      categoria,
    });

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
  
  
   async updateProducto(id: number, updateProductoDto: UpdateProductoDto) {
  try {
    const producto = await this.productoRepo.findOneBy({ id });
    if (!producto) {
      throw new NotFoundException(`Producto con el id ${id} no encontrado`);
    }

    if (updateProductoDto.categoriaId) {
      const categoria = await this.categoriaRepo.findOneBy({ id: updateProductoDto.categoriaId });
      if (!categoria) {
        throw new NotFoundException(`Categoría con el id ${updateProductoDto.categoriaId} no encontrada`);
      }
      producto.categoria = categoria;
    }

    const { categoriaId, ...restoDto } = updateProductoDto;
    this.productoRepo.merge(producto, restoDto);

    return await this.productoRepo.save(producto);
  } catch (error) {
    if (error instanceof NotFoundException) throw error;
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
