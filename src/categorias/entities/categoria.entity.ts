import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Categoria {
     @PrimaryGeneratedColumn()
    id:number

    @Column()
    nombre:string
    @Column()
    descripcion:string

    @CreateDateColumn()
    createdAt:Date
}
