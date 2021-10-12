/*
nome
descricao
id
data que criada
*/
import { v4 as uuidv4 } from "uuid";

class Categoria {
  id?: string;
  nome: string;
  descricao: string;
  created_at: Date;

  constructor() {
    this.id = uuidv4();
  }
}

export default Categoria;
