import Categoria from "../../model/categoriaModel";
import { ICategoriaRepositorio, ICategoria } from "../ICategoriaRepositorio";
import { Repository, getRepository } from "typeorm";

class CategoriasRepositorio implements ICategoriaRepositorio {
  /* private categorias: Categoria[]; */

  private repository: Repository<Categoria>;

  /* private static INSTANCE: CategoriasRepositorio; */

  constructor() {
    /* this.categorias = []; */
    this.repository = getRepository(Categoria);
  }

  /*   public static getInstance(): CategoriasRepositorio {
    if (!CategoriasRepositorio.INSTANCE) {
      CategoriasRepositorio.INSTANCE = new CategoriasRepositorio();
    }
    return CategoriasRepositorio.INSTANCE;
  } */

  async create({ nome, descricao }: ICategoria): Promise<void> {
    /*  Sem BD
    const categoria = new Categoria();
    Object.assign(categoria, { nome, descricao, created_at: new Date() });

    this.categorias.push(categoria); */

    // COm BD
    const categoria = this.repository.create({ nome, descricao });

    await this.repository.save(categoria);
  }

  async list(): Promise<Categoria[]> {
    // BD em memoria
    /* return this.categorias; */

    //Banco relacional
    const categorias = await this.repository.find();
    return categorias;
  }

  async findByName(nome: string): Promise<Categoria> {
    //BD em memoria
    /* const categoriaExiste = this.categorias.find((categoria) => {
      return categoria.nome === nome;
    });
    return categoriaExiste; */

    // Bd relacional
    const categoria = await this.repository.findOne({ nome });
    return categoria;
  }
}

export default CategoriasRepositorio;
