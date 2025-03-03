import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../usuario/usuario";

@Entity("materias", {schema: "public"})
export class Materia {
    @PrimaryGeneratedColumn({ type: "integer", name: "cod_materia" })
    codMateria: number;
    @Column({type: "varchar", name: "nombre_materia", length: 250 })
    nombreMateria: string;
    @Column({type: "varchar", name: "descripcion_materia", length: 250 })
    descripcionMateria: string;

    //Relacion con usuarios, una materia tiene muchos usuarios recibo el objeto usuario
    @OneToMany(()=>Usuario, (objetoUsuario:Usuario)=>objetoUsuario.codMateria)
    public usuarios?: Usuario[];   
}
