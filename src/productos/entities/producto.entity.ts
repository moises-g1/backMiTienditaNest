import { Categoria } from "src/categorias/entities/categoria.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
  @Column()
  descripcion: string;
  @Column()
  imagen: string;
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_venta: number;
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_compra: number;
  @Column()
  stock_actual: number;

  @Column({
    default: true,
  })
  activo: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  categoria: Categoria;
}
