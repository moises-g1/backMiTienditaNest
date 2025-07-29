import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Compra } from './entities/compra.entity';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Proveedor } from 'src/proveedores/entities/proveedore.entity';

@Injectable()
export class ComprasService {
  constructor(
    @InjectRepository(Compra)
    private readonly compraRepository: Repository<Compra>,

    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(dto: CreateCompraDto): Promise<Compra> {
    const proveedor = await this.proveedorRepository.findOneBy({
      id: dto.proveedor_id,
    });
    if (!proveedor) {
      throw new NotFoundException('Proveedor no encontrado');
    }

    const usuario = await this.usuarioRepository.findOneBy({
      id: dto.usuario_id,
    });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const compra = this.compraRepository.create({
      numero_factura: dto.numero_factura,
      proveedor: proveedor,
      total: dto.total,
      estado: dto.estado,
      observaciones: dto.observaciones,
      usuario: usuario,
    });

    return this.compraRepository.save(compra);
  }

  async findAll(): Promise<Compra[]> {
    return this.compraRepository.find({
      relations: ['proveedor', 'usuario'],
    });
  }

  async findOne(id: number): Promise<Compra> {
    const compra = await this.compraRepository.findOne({
      where: { id },
      relations: ['proveedor', 'usuario'],
    });

    if (!compra) {
      throw new NotFoundException(`Compra con ID ${id} no encontrada`);
    }

    return compra;
  }

  async update(id: number, dto: UpdateCompraDto): Promise<Compra> {
    const compra = await this.findOne(id);

    if (dto.proveedor_id) {
      const proveedor = await this.proveedorRepository.findOneBy({
        id: dto.proveedor_id,
      });
      if (!proveedor) throw new NotFoundException('Proveedor no encontrado');
      compra.proveedor = proveedor;
    }

    if (dto.usuario_id) {
      const usuario = await this.usuarioRepository.findOneBy({
        id: dto.usuario_id,
      });
      if (!usuario) throw new NotFoundException('Usuario no encontrado');
      compra.usuario = usuario;
    }

    Object.assign(compra, dto);
    return this.compraRepository.save(compra);
  }

  async remove(id: number): Promise<void> {
    const compra = await this.findOne(id);
    await this.compraRepository.remove(compra);
  }
}
