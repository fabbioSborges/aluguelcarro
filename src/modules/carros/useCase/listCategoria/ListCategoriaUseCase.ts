import { ICategoriaRepositorio } from "../../repositories/ICategoriaRepositorio";
import Categoria from "../../model/categoriaModel";
import { inject, injectable } from "tsyringe";

@injectable()
class ListCategoriaUseCase {
  /* private categoriaRepositorio: ICategoriaRepositorio;
  constructor(categoriaRepositorio: ICategoriaRepositorio) {
    this.categoriaRepositorio = categoriaRepositorio;
  } */

  constructor(
    @inject("CategoriaRepositorio")
    private categoriaRepositorio: ICategoriaRepositorio
  ) {}

  async execute(): Promise<Categoria[]> {
    return await this.categoriaRepositorio.list();
  }
}

export default ListCategoriaUseCase;
