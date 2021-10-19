import { Request, Response } from "express";
import CreateEspecificacaoUseCase from "./createEspecificacaoUseCase";

class CreateEspecificacaoController {
  private createEspecificacaoUseCase: CreateEspecificacaoUseCase;
  constructor(createEspecificacaoUseCase: CreateEspecificacaoUseCase) {
    this.createEspecificacaoUseCase = createEspecificacaoUseCase;
  }

  handle(req: Request, res: Response) {
    const { nome, descricao } = req.body;

    //executar o caso de uso
    this.createEspecificacaoUseCase.execute({ nome, descricao });

    return res.status(201).send();
  }
}

export default CreateEspecificacaoController;
