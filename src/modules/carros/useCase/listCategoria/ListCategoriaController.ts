import { Request, Response } from "express";
import ListCategoriaUseCase from "./ListCategoriaUseCase";
import { container } from "tsyringe";

class ListCategoriaController {
  /*  listCategoriaUseCase: ListCategoriaUseCase;

  constructor(listCategoriaUseCase: ListCategoriaUseCase) {
    this.listCategoriaUseCase = listCategoriaUseCase;
  } */

  async handle(req: Request, res: Response): Promise<Response> {
    const listCategoriaUseCase = container.resolve(ListCategoriaUseCase);

    const categorias = await listCategoriaUseCase.execute();

    return res.json(categorias);
  }
}

export default ListCategoriaController;
