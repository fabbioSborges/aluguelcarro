import { Router } from "express";
import CategoriasRepositorio from "../repositories/categoriaRepositories";

import CreateCategoriaService from "../services/CreateCategoriaService";

const categoriasRepositorio = new CategoriasRepositorio();

const categoriasRotas = Router();

// Receber a requisição ----- Retornar uma reposta

categoriasRotas.post("/categorias", (req, res) => {
  const { nome, descricao } = req.body;

  const createCategoriaService = new CreateCategoriaService(
    categoriasRepositorio
  );
  createCategoriaService.execute({ nome, descricao });

  return res.status(200).json({ mensage: "Adicionada com sucesso" });
});

categoriasRotas.get("/categorias", (req, res) => {
  return res.json({ Categorias: categoriasRepositorio.list() });
});

export default categoriasRotas;
