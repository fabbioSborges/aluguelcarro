import Categoria from "../model/categoriaModel";
import { ICategoriaRepositorio, ICategoria } from "./ICategoriaRepositorio";

class CategoriasRepositorio implements ICategoriaRepositorio {
  private categorias: Categoria[];

  private static INSTANCE: CategoriasRepositorio;

  private constructor() {
    this.categorias = [];
  }

  public static getInstance(): CategoriasRepositorio {
    if (!CategoriasRepositorio.INSTANCE) {
      CategoriasRepositorio.INSTANCE = new CategoriasRepositorio();
    }
    return CategoriasRepositorio.INSTANCE;
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
