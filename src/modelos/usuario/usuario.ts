import { Materia } from 'src/modelos/materia/materia';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("usuarios", {schema: "public"})
export class Usuario {
    @PrimaryGeneratedColumn({ type: "integer", name: "cod_usuario" })
    codUsuario: number;
    @Column({type: "varchar", name: "nombre_usuario", length: 250, nullable: false })
    nombreUsuario: string;
    @Column({type: "varchar", name: "apellido_usuario", length: 250 })
    apellidoUsuario: string;
    @Column({type: "varchar", name: "correo_usuario", length: 250 })
    correoUsuario: string;
    @Column({type: "int", name: "cod_materia"})
    codMateria: number;

    //Relacion con Maertias, un usuario tiene muchas materias
    @ManyToOne(()=>Materia, (objetoMateria:Materia)=>objetoMateria.usuarios,
    {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
    })
    @JoinColumn({name:"cod_materia", referencedColumnName:"codMateria"})
    public codMateriaU?: Materia;




}
