import CategoriaRepository from "../../repositories/implementations/categoriaRepositories";
import ListCategoriaUseCase from "./ListCategoriaUseCase";
import ListCategoriaController from "./ListCategoriaController";

const categoriaRepositorio = CategoriaRepository.getInstance();
const listCategoriaUseCase = new ListCategoriaUseCase(categoriaRepositorio);
const listCategoriaController = new ListCategoriaController(
  listCategoriaUseCase
);

export { listCategoriaController };
