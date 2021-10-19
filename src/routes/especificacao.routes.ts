import { Router } from "express";
import createEspecificacaoController from "../modules/carros/useCase/createEspecificacao";

const routerEspecificacao = Router();

routerEspecificacao.post("/especificacao", (req, res) => {
  return createEspecificacaoController.handle(req, res);
});

export default routerEspecificacao;
