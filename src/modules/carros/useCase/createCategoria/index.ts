import CategoriaRepository from "../../repositories/categoriaRepositories";
import CreateCategoriaUseCase from "./CreateCategoriaUseCase";
import CreateCategoriaController from "./CreateCategoriaController";

const categoriaRepositorio = CategoriaRepository.getInstance();
const createCategoriaUseCase = new CreateCategoriaUseCase(categoriaRepositorio);
const createCategoriaController = new CreateCategoriaController(
  createCategoriaUseCase
);

export { createCategoriaController };
