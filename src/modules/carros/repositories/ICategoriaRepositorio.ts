import Categoria from "../model/categoriaModel";

interface ICategoria {
  nome: string;
  descricao: string;
}

interface ICategoriaRepositorio {
  create({ nome, descricao }: ICategoria): void;
  list(): Categoria[];
  findByName(nome: string): Categoria;
}

export { ICategoriaRepositorio, ICategoria };
