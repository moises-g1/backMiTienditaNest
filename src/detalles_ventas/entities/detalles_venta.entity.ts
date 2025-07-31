import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Venta } from 'src/ventas/entities/venta.entity';
import { Producto } from 'src/productos/entities/producto.entity';

@Entity('detalle_ventas')
export class DetallesVenta {
  @PrimaryGeneratedColumn()
  id: number;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @ManyToOne(() => Venta, (venta) => venta.detalles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'venta_id' })
  venta: Venta;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_unitario: number;
}
