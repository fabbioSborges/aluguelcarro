import { inject, injectable } from "tsyringe";
import { ICategoriaRepositorio } from "../../repositories/ICategoriaRepositorio";

interface IRequest {
  nome: string;
  descricao: string;
}

@injectable()
class CreateCategoriaUseCase {
  /* private categoriaRepositorio: ICategoriaRepositorio;
  constructor(categoriaRepositorio: ICategoriaRepositorio) {
    this.categoriaRepositorio = categoriaRepositorio;
  }
 */
  constructor(
    @inject("CategoriaRepositorio")
    private categoriaRepositorio: ICategoriaRepositorio
  ) {}

  async execute({ nome, descricao }: IRequest): Promise<void> {
    const categoriaExist = await this.categoriaRepositorio.findByName(nome);

    if (categoriaExist) {
      throw new Error(`Categoria ${nome} já existe`);
    }

    await this.categoriaRepositorio.create({ nome, descricao });
  }
}

export default CreateCategoriaUseCase;
