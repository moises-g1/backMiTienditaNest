import { RolUsuario } from "src/common/enums/usuario_rol.enum";
import { Venta } from "src/ventas/entities/venta.entity";
import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Usuario {
     @PrimaryGeneratedColumn()
    id:number

    @Column()
    nombre:string
    @Column()
    apellido:string
    @Column()
    imagen:string
    @Column()
    edad:number
    @Column({unique: true})
    email:string
    @Column()
    password:string

    @Column({
    type: 'enum',
    enum: RolUsuario,
    default: RolUsuario.EMPLEADO,
  })
  rol: RolUsuario;
  
    @CreateDateColumn()
    createdAt:Date

    @OneToMany(() => Venta, (venta) => venta.usuario)
    ventas: Venta[];

}
