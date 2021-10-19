import EspecificacaoRepositorio from "../../repositories/implementations/especificacaoRepositorio";
import CreateEspecificacaoUseCase from "./createEspecificacaoUseCase";
import CreateEspecificacaoController from "./createEspecificacaoController";

/* const especificacaoRepositorio = new EspecificacaoRepositorio(); */
const especificacaoRepositorio = EspecificacaoRepositorio.getEspecicacao();

const createEspecificacaoUseCase = new CreateEspecificacaoUseCase(
  especificacaoRepositorio
);

const createEspecificacaoController = new CreateEspecificacaoController(
  createEspecificacaoUseCase
);

export default createEspecificacaoController;
