import { RolUsuario } from "src/common/enums/usuario_rol.enum";
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Usuario {
     @PrimaryGeneratedColumn()
    id:number

    @Column()
    nombre:string
    @Column()
    apellido:string
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
}
