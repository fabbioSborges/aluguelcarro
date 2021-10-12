import { ICategoriaRepositorio } from "../../repositories/ICategoriaRepositorio";

interface IRequest {
  nome: string;
  descricao: string;
}

class CreateCategoriaUseCase {
  private categoriaRepositorio: ICategoriaRepositorio;
  constructor(categoriaRepositorio: ICategoriaRepositorio) {
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

export default CreateCategoriaUseCase;
