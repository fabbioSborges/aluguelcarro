import Categoria from "../model/categoriaModel";

interface ICategoria {
  nome: string;
  descricao: string;
}

interface ICategoriaRepositorio {
  create({ nome, descricao }: ICategoria): Promise<void>;
  list(): Promise<Categoria[]>;
  findByName(nome: string): Promise<Categoria>;
}

export { ICategoriaRepositorio, ICategoria };
