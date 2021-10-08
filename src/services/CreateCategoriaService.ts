import CategoriasRepositorio from "../repositories/categoriaRepositories";

interface IRequest {
  nome: string;
  descricao: string;
}

class CreateCategoriaService {
  private categoriaRepositorio: CategoriasRepositorio;
  constructor(categoriaRepositorio: CategoriasRepositorio) {
    this.categoriaRepositorio = categoriaRepositorio;
  }

  execute({ nome, descricao }: IRequest): void {
    const categoriaExist = this.categoriaRepositorio.findByName(nome);

    if (categoriaExist) {
      throw new Error(`Categoria ${nome} já existe`);
    }

    this.categoriaRepositorio.create({ nome, descricao });
  }
}

export default CreateCategoriaService;
