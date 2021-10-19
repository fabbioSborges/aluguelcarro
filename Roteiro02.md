# SOLID

SOLID são cinco princípios da programação orientada a objetos que facilitam no desenvolvimento de softwares, tornando-os fáceis de manter e estender. Esses princípios podem ser aplicados a qualquer linguagem de POO.

Esses princípios ajudam o programador a escrever códigos mais limpos,

S.O.L.I.D: Os 5 princípios da POO
S — SRP Single Responsiblity Principle (Princípio da responsabilidade única)
O — OPC Open-Closed Principle (Princípio Aberto-Fechado)
L — LSP Liskov Substitution Principle (Princípio da substituição de Liskov)
I — ISP Interface Segregation Principle (Princípio da Segregação da Interface)
D — DIP Dependency Inversion Principle (Princípio da inversão da dependência)

## SRP

Princípio da Responsabilidade Única — Uma classe deve ter um, e somente um, motivo para mudar.

Esse princípio declara que uma classe deve ser especializada em um único assunto e possuir apenas uma responsabilidade dentro do software, ou seja, a classe deve ter uma única tarefa ou ação para executar.

Exemplo: Rota de post categorias tem muitas responsabilidades
  - Recebendo a requisição
  - Fazendo validação
  - criando a categoria
  - Retornando o valor 

Criar um serviço para criar a categorias
1. Criar a pasta service
2. Criar o serice Create Categoria
   ```ts
   interface IRequest {
      nome: string;
      descricao: string;
    }

    class CreateCategoryService {
      execute({ nome, descricao }: IRequest)  {
        const catcategoriasRepository = new CatcategoriasRepository();
        const categoriaExiste = categoriasRepository.findByName(nome);
        if (!categoriaExiste) {
          throw new Error("categoria não existe")
        }
        categoriasRepository.create();
      }
    }

    export default CreateCategoryService;
   ```

## DIP  

Princípio da Inversão de Dependência — Dependa de abstrações e não de implementações.
De acordo com Uncle Bob, esse princípio pode ser definido da seguinte forma:
1. Módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender da abstração.
2. Abstrações não devem depender de detalhes. Detalhes devem depender de abstrações.

quando instancio o objeto de categoriasRepositorios estamos criando um novo objeto vazio

Alterar o service de criar categoria

```ts
import { CategoriasRepository } from "../repositories/CategoriasRepository";
interface IRequest {
  nome: string;
  descricao: string;
}

class CreateCategoryService {
  private categoriasRepository: CategoriasRepository;
  constructor(categoriasRepository: CategoriasRepository) {
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

export default CreateCategoryService;

```

Alterar a rota post
```ts
categoriasRotas.post("/", (req, res) => {
  const { nome, descricao } = req.body;

  const createCategoriasServices = new CreateCategoriasServices(
    categoriasRepository
  );
  createCategoriasServices.execute({ nome, descricao });

  return res.status(201).send();
});

```


## LSP

Princípio da substituição de Liskov — Uma classe derivada deve ser substituível por sua classe base.
O princípio da substituição de Liskov foi introduzido por Barbara Liskov em sua conferência “Data abstraction” em 1987. A definição formal de Liskov diz que:

Se para cada objeto o1 do tipo S há um objeto o2 do tipo T de forma que, para todos os programas P definidos em termos de T, o comportamento de P é inalterado quando o1 é substituído por o2 então S é um subtipo de T

Um exemplo mais simples e de fácil compreensão dessa definição. Seria:

se S é um subtipo de T, então os objetos do tipo T, em um programa, podem ser substituídos pelos objetos de tipo S sem que seja necessário alterar as propriedades deste programa. — Wikipedia.

CriateCategoryService está atrelado ao repositorio que implementa um estrutura em memoria
  Se quiser mudar essa implementação, exemplo adiconar um banco teremos que mudar a classe reposytores categorias.
  Então o correto é implementar uma interface que define uma classe pai e as classes filhos herdam os métodos e tipos da classe pai. 
  Todo metodo que depende do repositorio vai receber a interface 

  ### implementação
  1. Criar ICategoriaRepositorio.ts na pasta repositorio/categorias
   ```ts
   import { Categoria } from "../model/Categoria";

    interface ICreateCategoriaDTO {
      nome: string;
      descricao: string;
    }

    interface ICategoriasRepository {
      findByName(nome: string): Categoria;
      list(): Categoria[];
      create({ nome, descricao }: ICreateCategoriaDTO): void;
    }

    export { ICategoriasRepository, ICreateCategoriaDTO };

   ```

   2. Alterar o categoriaRepositori.ts para extender a interface
  ```ts
  import { Categoria } from "../model/Categoria";
  import {
    ICategoriasRepository,
    ICreateCategoriaDTO,
  } from "./ICategoriasRepository";

  class CategoriasRepository implements ICategoriasRepository {
    private categorias: Categoria[];

    constructor() {
      this.categorias = [];
    }

    create({ nome, descricao }: ICreateCategoriaDTO): void {
      const categoria = new Categoria();

      Object.assign(categoria, {
        nome,
        descricao,
        created_at: new Date(),
      });
      this.categorias.push(categoria);
    }

    list(): Categoria[] {
      return this.categorias;
    }

    findByName(name: string): Categoria {
      const categoria = this.categorias.find(
        (categoria) => categoria.nome === name
      );
      return categoria;
    }
  }

  export { CategoriasRepository };

  ```
  3. Alterar o servece para receber a interface
   ```ts
   import { ICategoriasRepository } from "../repositories/ICategoriasRepository";
    interface IRequest {
      nome: string;
      descricao: string;
    }

    class CreateCategoryService {
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

    export default CreateCategoryService;

   ```

   4. Quando adicionar o banco de dados basta implementar um repo que acessa esse banco e chamar ele na rotas
   ```ts
    import { Categoria } from "../model/Categoria";
    import {
      ICategoriasRepository,
      ICreateCategoriaDTO,
    } from "./ICategoriasRepository";

    class CategoriasRepository implements ICategoriasRepository {
      findByName(nome: string): Categoria {
        throw new Error("Method not implemented.");
      }
      list(): Categoria[] {
        throw new Error("Method not implemented.");
      }
      create({ nome, descricao }: ICreateCategoriaDTO): void {
        throw new Error("Method not implemented.");
      }
    }

    export { CategoriasRepository };

   ```