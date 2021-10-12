import { ICategoriaRepositorio } from "../../repositories/ICategoriaRepositorio";
import Categoria from "../../model/categoriaModel";

class ListCategoriaUseCase {
  private categoriaRepositorio: ICategoriaRepositorio;
  constructor(categoriaRepositorio: ICategoriaRepositorio) {
    this.categoriaRepositorio = categoriaRepositorio;
  }

  execute(): Categoria[] {
    return this.categoriaRepositorio.list();
  }
}

export default ListCategoriaUseCase;
