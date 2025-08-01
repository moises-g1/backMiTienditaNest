import { EstadoVenta } from 'src/common/enums/estado-venta.enum';
import { MetodoPago } from 'src/common/enums/metodo-pago.enum';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Venta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero_venta: number;
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  descuento: number;

  @Column({
    type: 'enum',
    enum: MetodoPago,
    default: MetodoPago.EFECTIVO,
  })
  metodo_pago: MetodoPago;

  @Column({
    type: 'enum',
    enum: EstadoVenta,
    default: EstadoVenta.COMPLETADA,
  })
  estado: EstadoVenta;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.ventas)
  usuario: Usuario;
  detalles: any;
}
