# Continuando

## criando o service de especificação

1. Criar o model de especificação
   ```ts
   import { v4 as uuidV4 } from "uuid";

    class Especificacao {
      id?: string;
      nome: string;
      descricao: string;
      created_at: Date;

      constructor() {
        if (!this.id) {
          this.id = uuidV4();
        }
      }
    }

    export { Especificacao };

   ```
2. Estruturar a aplicação em forma de modulos
   1. Pequenos modulos da aplicação
      1. Especificação e modulo são relacionados a carros
   2. Criar uma pasta modules
      1. Criar um modulo de carros
      2. Colocar os model e repositorys relacionados aos carros
3. Criando repositorio de especificacao
   1. Criar interface de especificação
   ```ts
      import { Especificacao } from "../model/Especificacao";

      interface ICreateEspecificacaoDTO {
        nome: string;
        descricao: string;
      }

      interface IEspecificacaoRepository {
        
        findByName(nome: string): Especificacao;
        create({ nome, descricao }: ICreateEspecificacaoDTO): void;
      }

      export { IEspecificacaoRepository, ICreateEspecificacaoDTO };

   ```
   2.  Criar o EspecificacaoRepository
  ```ts
    import { Especificacao } from "../model/Especificacao";
    import {
      IEspecificacaoRepository,
      ICreateEspecificacaoDTO,
    } from "./IEspecificacaoRepository";

    class EspecificacaoRepository implements IEspecificacaoRepository {
      private epecificacoes: Especificacao[];

      constructor() {
        this.epecificacoes = [];
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
  3. Criar o service de especificação
   ```ts
      import { IEspecificacaoRepository } from "../repositories/IEspecificacaoRepository";
      interface IRequest {
        nome: string;
        descricao: string;
      }

      class CreateEspecificacaoService {
        private especificacaoRepository: IEspecificacaoRepository;
        constructor(especificacaoRepository: IEspecificacaoRepository) {
          this.especificacaoRepository = especificacaoRepository;
        }
        execute({ nome, descricao }: IRequest): void {
          const especificacaoExiste = this.especificacaoRepository.findByName(nome);
          if (especificacaoExiste) {
            throw new Error("especificacao já existe");
          }
          this.especificacaoRepository.create({ nome, descricao });
        }
      }

      export default CreateEspecificacaoService;

   ```
   5. criar a rota de especificacao
   ```ts
   import { Router } from "express";
    import EspecificacaoRepository from "../modules/cars/repositories/EspecificacaoRepository";
    import CreateEspecificacaoServices from "../modules/cars/services/CreateEspecificacaoService.";

    const especificacaoRotas = Router();
    const especificacaoRepository = new EspecificacaoRepository();

    especificacaoRotas.post("/", (req, res) => {
      const { nome, descricao } = req.body;

      const createEspecificacaoServices = new CreateEspecificacaoServices(
        especificacaoRepository
      );
      createEspecificacaoServices.execute({ nome, descricao });

      return res.status(201).send();
    });

    export { especificacaoRotas };

   ```
  6. Criar a rota no server
   
4. Pasta de use case - regras de negocios da aplicação
   1. criar a pasata createCAtegoria
   2. Colocar na pasta CreateCategoria o arquivo createCategoriaService.ts e renomear para createCategoriaUseCase.ts
   ```ts
   import { ICategoriasRepository } from "../../repositories/ICategoriasRepository";
    interface IRequest {
      nome: string;
      descricao: string;
    }

    class CreateCategoriaUseCase {
      private categoriasRepository: ICategoriasRepository;
      constructor(categoriasRepository: ICategoriasRepository) {
        this.categoriasRepository = categoriasRepository;
      }
      execute({ nome, descricao }: IRequest): void {
        const categoriaExiste = this.categoriasRepository.findByName(nome);
        if (!categoriaExiste) {
          throw new Error("categoria não existe");
        }
        this.categoriasRepository.create({ nome, descricao });
      }
    }

    export default CreateCategoriaUseCase;

   ```
   3. Criar o arquivo CreateCategoryController.ts
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
    4. Criar o index dentro do useCase
    ```ts
    import { CategoriasRepository } from "../../repositories/CategoriasRepository";
    import CreateCategoriaUseCase from "./CreateCategoriaUseCase";
    import CreateCategoriaController from "./CreateCategoryController";

    const categoriasRepository = new CategoriasRepository();

    const createCategoriaUseCase = new CreateCategoriaUseCase(categoriasRepository);

    const createCategoriaController = new CreateCategoriaController(
      createCategoriaUseCase
    );

    export { createCategoriaController };

    ```
    4. alterar a rota categoria
    ```ts
    import { Router } from "express";
    import { CategoriasRepository } from "../modules/cars/repositories/CategoriasRepository";
    import { createCategoriaController } from "../modules/cars/useCases/createCategoria";

    const categoriasRotas = Router();
    const categoriasRepository = new CategoriasRepository();

    categoriasRotas.post("/", (req, res) => {
      return createCategoriaController.handle(req, res);
    });

    categoriasRotas.get("/", (req, res) => {
      const categorias = categoriasRepository.list();
      return res.json(categorias);
    });

    export { categoriasRotas };

    ```

