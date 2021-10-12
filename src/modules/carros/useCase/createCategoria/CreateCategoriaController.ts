import { Request, Response } from "express";
import CreateCategoriaUseCase from "./CreateCategoriaUseCase";

class CreateCategoriaController {
  createCategoriaUseCase: CreateCategoriaUseCase;

  constructor(createCategoriaUseCase: CreateCategoriaUseCase) {
    this.createCategoriaUseCase = createCategoriaUseCase;
  }
  handle(req: Request, res: Response) {
    const { nome, descricao } = req.body;

    this.createCategoriaUseCase.execute({ nome, descricao });

    return res.status(200).json({ mensage: "Adicionada com sucesso" });
  }
}

export default CreateCategoriaController;
