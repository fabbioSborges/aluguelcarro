# Roteiro Modulo 02

## 1. Typescript

* Linguagem open source
* Criado pela Microsoftt
* Super conjunto do javascript
  * Melhorias do javascript
* Tipagem estática
* è possivel usar typescript e javascript no mesmo projeto
* Não é necessario tipar todas as variaveis

### 1.2 Porque Utilizar
**Com JavaScript**
  ``` js
  const user = {
    name: "Fabbio",
    username: "fabbioanderso",
    document: "333333333"
  }

  user.document = "recebe qualquer coisa"
  ```
**Com Typescript**

``` ts
  class User{
    name: string;
    username: string;
    document: string;
  }
  const user:User = {
    name: "Fabbio",
    username: "fabbioanderso",
    document: "333333333"
  }

  ```

``` ts
  function soma(num1: number, num2: number){
    return num1 + num2
  }
  console.log(soma(1,2));
  console.log(soma("1","2"));

  ```

## 1.2 Criando o primeiro Projeto

Passos

1. Criar o projeto com ```yarn init -y```

2. Instalar a dependencia do express ```yarn add express```
3. Criar pasta src e dentro criar o arquivo server.ts
4. 
   
   ```ts
   import express from "express";

    const app = express();

    app.get("/", (req, res) => {
      return res.json({ message: "Olá" });
    });

    app.listen("3333");

   ```

5. Para que seja possivel carregar os tipos de uma biblioteca  
   ``` yarn add @types/express -D```
6. Instalar a dependencia do typescript 
  ``` yarn add typescript -D```
7. Inicializar o typescript para criar o arquivo de configuração do typescript
   ``` yarn tsc --init```
9.  Mudar dentro do projeto a configuração typescript
    1.  Alterar a linha outDir="./" por outDir = ./dist
    2.  Essa alteração Alterar a pasta de destino dos arquivo js
  

10. Converter um código ts em java script
   ``` yarn tsc```
11. Executando o codigo js
    ``` node dist/server.js```

## 1.3 - Avançando no primeiro projeto

1. Criar uma rquivo de rotas routes.ts
   ```ts
  import { Request, Response } from "express";
  import createCourseService from "./CreateCourse";

  export function createCourse(req: Request, res: Response) {
    /* createCourseService.execute("fabbio", 10, "fabbio"); */
    createCourseService.execute({
      nome: "fabbio",
      duracao: 10,
      professor: "fabbio",
    });
    return res.send();
  }

   ```
2. Criar arquivo de CreateCourse.ts
  ```ts
  // Receba dados para criar um curso

  interface Course {
    nome: string;
    duracao?: number;
    professor: string;
  }
  class CreateCourseService {
    /* execute(nome: string, duracao: number, professor: string) {
      console.log(nome, duracao, professor);
    } */
    /* execute(data: Course) {
      console.log(data.nome, data.duracao, data.professor);
    } */
    execute({ duracao = 8, professor, nome }: Course) {
      console.log(nome, duracao, professor);
    }
  }

  export default new CreateCourseService();
   ```
  3. Alterar o server.ts
 ```ts
  import express from "express";
  import createCourse from "./routes";

  const app = express();

  app.get("/", createCourse);

  app.listen("3000");

  ```
 4. Converter um código ts em java script
   ``` yarn tsc```
5. Executando o codigo js
    ``` node dist/server.js```

## 2.0 Desenvolver uma aplicação

1. Configurar o TS-node-dev
``` yarn add ts-node-dev```
2. Adicionar o sript no package.json
   
  ``` ts
    "scripts": {
      "dev": "ts-node-dev --transpile-only --ignore-watch node_modules --respawn src/server.ts"
    },
  ```

3. Criar uma pasta routes e para cada nova funcionalidade da aplicação criar um arquivo para agrupar as rotas
   
   1. Criar categorias.routes.ts
   ```ts 
    import { Router } from "express";

    const categoriasRotas = Router();

    const categorias = [];

    categoriasRotas.post("/", (req, res) => {
      const { nome, descricao } = req.body;
      categorias.push({ nome, descricao });
      return res.status(201).send();
    });

    export { categoriasRotas };

   ```
   2. Alterar o server.js
   ```ts
    import express from "express";
    import { categoriasRotas } from "./routes/ categorias.routes";

    const app = express();

    app.use("/categorias", categoriasRotas);


    app.listen("3000", () => console.log("ok"));
   ```

### 2.1 Trabalhar com uuid
- Identificador unico universal
  1. Adicionar uuid
   ``` 
    yarn add uuid
    yarn add @types/uuid
   ```
  2. Alterar as rotas categorias
   ```ts
    import { Router } from "express";
    import { v4 as uuidv4 } from "uuid";

    const categoriasRotas = Router();

    const categorias = [];

    categoriasRotas.post("/", (req, res) => {
      const { nome, descricao } = req.body;
      categorias.push({ nome, descricao, id: uuidv4() });
      return res.status(201).send;
    });


    export { categoriasRotas };

  ```
### 2.3 inserindo tipagem no vetor
1. Criar a pasta model
2. Criar o model de categoria
```ts
  import { v4 as uuidV4 } from "uuid";

  class Categoria {
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
  export { Categoria };
```
3. Alterar a rota de categori
  
```ts

    import { Router } from "express";
    import { Categoria } from "../model/Categoria";

    const categoriasRotas = Router();

    const categorias: Categoria[] = [];

    categoriasRotas.post("/", (req, res) => {
      const { nome, descricao } = req.body;
      const categoria = new Categoria();
      Object.assign(categoria, {
        nome,
        descricao,
        created_at: new Date(),
      })
      categorias.push(categoria);
      return res.status(201).send();
    });

    export { categoriasRotas };

```

### 2.4 Repositorios
Camada que vai ser responsavel que vai fazer a manipulação de dados 
  Acesso ao banco de dados
  Busca no banco de dados
  Atualização
Uma rota chama o repositorio 


1. Criar uma pasta repositories
2. Criar o arquivo categoriasReposytory.ts
   ```ts
    import { Categoria } from "../model/Categoria";

    interface ICreateCategoriaDTO {
      nome: string;
      descricao: string;
    }

    class CategoriasRepository {
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
    }

    export { CategoriasRepository };

   ```
3. Alterar o categories.routes.ts
   ```ts
    import { Router } from "express";
    import { Categoria } from "../model/Categoria";
    import { CategoriasRepository } from "../repositories/CategoriasRepository";

    const categoriasRotas = Router();
    const categoriasRepository = new CategoriasRepository();

    categoriasRotas.post("/", (req, res) => {
      const { nome, descricao } = req.body;
      categoriasRepository.create({ nome, descricao });
      return res.status(201).send;
    });

    export { categoriasRotas };

   ```

## 2.5 Criando novas funcionalidades no repositoris Categorias

1. Listar todas as categorias
```js
      // Criar função list no repoCategorias
      list(): Categorcia[] {
       return this.categorias;
      }
      // criar função get no categorias rotas
      categoriasRotas.get("/", (req, res) => {
      const categorias = categoriasRepository.list();
      return res.json(categorias);
      
      });
```
2. Regra de negocio: não é possivel cadastrar duas categorias com o mesmo nome
   1. Criar uma função para buscar por nome no repo categorias
   ```js
     findByName(name: string): Categoria {
      const categoria = this.categorias.find(
        (categoria) => categoria.nome === name
      );
      return categoria;
    }
   ```
   2. Alterar a rota de post categorias
    ```js
    categoriasRotas.post("/", (req, res) => {
      const { nome, descricao } = req.body;
      const categoriaExiste = categoriasRepository.findByName(nome);
      if (!categoriaExiste) {
        return res.status(40).json({ erro: "categoria não existe" });
      }
      categoriasRepository.create({ nome, descricao });
      return res.status(201).send();
    });
    ```