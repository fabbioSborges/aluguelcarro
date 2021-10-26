import { Request, Response } from "express";
import CreateCategoriaUseCase from "./CreateCategoriaUseCase";
import { container } from "tsyringe";

class CreateCategoriaController {
  /* createCategoriaUseCase: CreateCategoriaUseCase;

  constructor(createCategoriaUseCase: CreateCategoriaUseCase) {
    this.createCategoriaUseCase = createCategoriaUseCase;
  } */

  async handle(req: Request, res: Response): Promise<Response> {
    const { nome, descricao } = req.body;

    const createCategoriaUseCase = container.resolve(CreateCategoriaUseCase);

    await createCategoriaUseCase.execute({ nome, descricao });

    return res.status(200).json({ mensage: "Adicionada com sucesso" });
  }
}

export default CreateCategoriaController;
