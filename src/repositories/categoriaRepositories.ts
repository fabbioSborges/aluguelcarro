import Categoria from "../model/categoriaModel";

interface ICategoria {
  nome: string;
  descricao: string;
}

class CategoriasRepositorio {
  private categorias: Categoria[];

  constructor() {
    this.categorias = [];
  }

  create({ nome, descricao }: ICategoria) {
    const categoria = new Categoria();
    Object.assign(categoria, { nome, descricao, created_at: new Date() });

    this.categorias.push(categoria);
  }

  list(): Categoria[] {
    return this.categorias;
  }

  findByName(nome: string): Categoria {
    const categoriaExiste = this.categorias.find((categoria) => {
      return categoria.nome === nome;
    });
    return categoriaExiste;
  }
}

export default CategoriasRepositorio;
