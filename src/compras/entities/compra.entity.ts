import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Proveedor } from 'src/proveedores/entities/proveedor.entity';
import { DetalleCompra } from 'src/detalles_compras/entities/detalles_compra.entity';

export enum EstadoCompra {
  PENDIENTE = 'pendiente',
  COMPLETADA = 'completada',
  CANCELADA = 'cancelada',
}
@Entity('compras')
export class Compra {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero_factura: string;

  @ManyToOne(() => Proveedor)
  @JoinColumn({ name: 'proveedor_id' })
  proveedor: Proveedor;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column({
    type: 'enum',
    enum: EstadoCompra,
    default: EstadoCompra.COMPLETADA,
  })
  estado: EstadoCompra;

  @Column('text', { nullable: true })
  observaciones: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;
  @OneToMany(() => DetalleCompra, (detalle) => detalle.compra, {
    cascade: true,
  })
  detalles: DetalleCompra[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
