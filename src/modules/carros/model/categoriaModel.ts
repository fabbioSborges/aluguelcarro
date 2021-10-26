/*
nome
descricao
id
data que criada
*/
import { v4 as uuidv4 } from "uuid";
import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";

@Entity("Categorias")
class Categoria {
  @PrimaryColumn()
  id?: string;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    this.id = uuidv4();
  }
}

export default Categoria;
