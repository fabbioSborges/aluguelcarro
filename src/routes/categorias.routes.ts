import { Router } from "express";
import { createCategoriaController } from "../modules/carros/useCase/createCategoria";
import { listCategoriaController } from "../modules/carros/useCase/listCategoria";

const categoriasRotas = Router();

// Receber a requisição ----- Retornar uma reposta

categoriasRotas.post("/categorias", (req, res) => {
  return createCategoriaController.handle(req, res);
});

categoriasRotas.get("/categorias", (req, res) => {
  return listCategoriaController.handle(req, res);
});

export default categoriasRotas;
