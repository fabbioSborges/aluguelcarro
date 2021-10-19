import CategoriaRepository from "../../repositories/implementations/categoriaRepositories";
import CreateCategoriaUseCase from "./CreateCategoriaUseCase";
import CreateCategoriaController from "./CreateCategoriaController";

const categoriaRepositorio = CategoriaRepository.getInstance();
const createCategoriaUseCase = new CreateCategoriaUseCase(categoriaRepositorio);
const createCategoriaController = new CreateCategoriaController(
  createCategoriaUseCase
);

export { createCategoriaController };
