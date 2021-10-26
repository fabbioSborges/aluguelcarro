import { Router } from "express";
import CreateCategoriaController from "../modules/carros/useCase/createCategoria/CreateCategoriaController";
import ListCategoriaController from "../modules/carros/useCase/listCategoria/ListCategoriaController";

const categoriasRotas = Router();

// Receber a requisição ----- Retornar uma reposta

const createCategoriaController = new CreateCategoriaController();
const listCategoriaController = new ListCategoriaController();

categoriasRotas.post("/categorias", createCategoriaController.handle);

categoriasRotas.get("/categorias", listCategoriaController.handle);

export default categoriasRotas;
