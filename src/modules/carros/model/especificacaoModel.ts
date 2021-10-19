import { v4 as uuidv4 } from "uuid";

class Especificacao {
  id: string;
  nome: string;
  descricao: string;
  created_at: string;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export default Especificacao;
