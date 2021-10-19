# Continuando

## separando as classes da interface no repositorios

1. Criar uma pasta de implementação e mover todas as implementações de classes para dentro da pasta

## Criando a use case de especificação
1. Criar a pasta de createEspecificacao dentro de useCase
2. Criar o aruivo CreateEspecificacaoUseCase.ts
   ```ts
  import { IEspecificacaoRepository } from "../../repositories/IEspecificacaoRepository";
  interface IRequest {
    nome: string;
    descricao: string;
  }

  class CreateEspecificacaoUseCase {
    constructor(private especificacaoRepository: IEspecificacaoRepository) {}
    execute({ nome, descricao }: IRequest): void {
      const especificacaoExiste = this.especificacaoRepository.findByName(nome);
      if (especificacaoExiste) {
        throw new Error("especificacao já existe");
      }
      this.especificacaoRepository.create({ nome, descricao });
    }
  }

  export default CreateEspecificacaoUseCase;

   ```

   3.. Criar o aruivo CreateEspecificacaoController.ts
   ```ts
    import { Response, Request } from "express";
    import CreateCategoriaUseCase from "./CreateCategoriaUseCase";

    class CreateCategoriaController {
      constructor(private createCategoriaUseCase: CreateCategoriaUseCase) {}

      handle(req: Request, res: Response) {
        const { nome, descricao } = req.body;

        this.createCategoriaUseCase.execute({ nome, descricao });

        return res.status(201).send();
      }
    }

    export default CreateCategoriaController;

   ```

   4. Criar o arquivo index.js

```ts
import EspecificacaoRepository from "../../repositories/implementations/EspecificacaoRepository";
import CreateEspecificacaoUseCase from "./CreateEspecificacaoUseCase";
import CreateEspecificacaoController from "./CreateEspecificacaoController";

/* const categoriasRepository = new CategoriasRepository(); */
const especificacaoRepository = EspecificacaoRepository.getInstance();

const createEspecificacaoUseCase = new CreateEspecificacaoUseCase(
  especificacaoRepository
);

const createEspecificacaoController = new CreateEspecificacaoController(
  createEspecificacaoUseCase
);

export { createEspecificacaoController };

```

1. alterar o repositorio de especificaçõa para nstanciar o repositorio 

```ts
import { Especificacao } from "../../model/Especificacao";
import {
  IEspecificacaoRepository,
  ICreateEspecificacaoDTO,
} from "../IEspecificacaoRepository";

class EspecificacaoRepository implements IEspecificacaoRepository {
  private epecificacoes: Especificacao[];

  private static INSTANCE: EspecificacaoRepository;

  private constructor() {
    this.epecificacoes = [];
  }

  public static getInstance(): EspecificacaoRepository {
    if (!EspecificacaoRepository.INSTANCE) {
      EspecificacaoRepository.INSTANCE = new EspecificacaoRepository();
    }
    return EspecificacaoRepository.INSTANCE;
  }

  findByName(nome: string): Especificacao {
    const especificacao = this.epecificacoes.find(
      (epecificacao) => epecificacao.nome === nome
    );
    return especificacao;
  }

  create({ nome, descricao }: ICreateEspecificacaoDTO): void {
    const epecificacao = new Especificacao();

    Object.assign(epecificacao, {
      nome,
      descricao,
      created_at: new Date(),
    });
    this.epecificacoes.push(epecificacao);
  }
}

export default EspecificacaoRepository;

```

2. Alterar as rotas de especificação
  ```ts
  import { Router } from "express";
  import { createEspecificacaoController } from "../modules/cars/useCases/createEspecificacao";
  const especificacaoRotas = Router();

  especificacaoRotas.post("/", (req, res) => {
    createEspecificacaoController.handle(req, res);
  });

  export { especificacaoRotas };

  ```

  ## refatorando rotas para

  1. Criar um index dentro do arquivo de rotas
   ```ts
   import { Router } from "express";
  import { categoriasRotas } from "./categorias.routes";
  import { especificacaoRotas } from "./especificacao.routes";

  const router = Router();

  router.use("/categorias", categoriasRotas);
  router.use("/especificacao", especificacaoRotas);

  export default router;

   ```
  2. Alterar o server

```ts
import express from "express";
import routes from "./routes";

const app = express();
app.use(express.json());
app.use(routes);

app.listen("3000", () => console.log("ok"));

```