import { container } from "tsyringe";

import { ICategoriaRepositorio } from "../../modules/carros/repositories/ICategoriaRepositorio";

import CategoriaRepositorio from "../../modules/carros/repositories/implementations/categoriaRepositories";

container.registerSingleton<ICategoriaRepositorio>(
  "CategoriaRepositorio",
  CategoriaRepositorio
);
