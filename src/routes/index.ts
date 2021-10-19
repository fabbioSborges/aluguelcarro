import { Router } from "express";
import categoriasRotas from "./categorias.routes";
import especificacaoRotas from "./especificacao.routes";

const rotas = Router();

rotas.use(categoriasRotas);
rotas.use(especificacaoRotas);

export default rotas;
