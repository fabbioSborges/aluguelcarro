# Upload de arquivos com stream

1. Multer - Leitura de arquivos dentro da aplicação
``` 
  yarn add multer 
  yarn add @types/multer -D
```
2.  Criar uma rota dentro de categoria 
   ```ts
   import { Router } from "express";
  import { createCategoriaController } from "../modules/cars/useCases/createCategoria";
  import { listCategoriaController } from "../modules/cars/useCases/listCategoria";
  import multer from "multer";

  const categoriasRotas = Router();

  const upload = multer({
    dest: "./tmp",
  });

  categoriasRotas.post("/", (req, res) => {
    return createCategoriaController.handle(req, res);
  });

  categoriasRotas.post("/import", (req, res) => {
    return createCategoriaController.handle(req, res);
  });

  categoriasRotas.get("/", upload.single("file"), (req, res) => {
    const { file } = req;
    console.log(file);

    return res.send();
  });

  export { categoriasRotas };

   ```

   3. Criar o imporCategorias dentro de UseCase
   4. criar importCategoriaController 
   ```ts
   import { Response, Request } from "express";
    import ImportCategoriaUseCase from "./importCategoriasUseCase";

    class ImportCategoriaController {
      constructor(private createCategoriaUseCase: ImportCategoriaUseCase) {}

      handle(req: Request, res: Response) {
        const { file } = req;

        this.createCategoriaUseCase.execute(file);

        return res.status(201).send();
      }
    }

    export default ImportCategoriaController;

   ```
   5. Criar o importCategoriasUseCase
   ```ts
   import { ICategoriasRepository } from "../../repositories/ICategoriasRepository";

    import fs from "fs";
    import csvParse from "csv-parse";
    interface IImportCategoria {
      nome: string;
      descricao: string;
    }

    class ImportCategoriaUseCase {
      constructor(private categoriasRepository: ICategoriasRepository) {}

      loadCategorias(file: Express.Multer.File): Promise<IImportCategoria[]> {
        return new Promise((resolve, reject) => {
          const stream = fs.createReadStream(file.path);
          const categorias: IImportCategoria[] = [];
          const parseFile = csvParse();
          stream.pipe(parseFile); //cada linha lida será armazenada em algum lugar
          parseFile
            .on("data", async (line: any) => {
              const [nome, descricao] = line;
              categorias.push({ nome, descricao });
            })
            .on("end", () => {
              resolve(categorias);
            })
            .on("error", (err: any) => {
              reject(err);
            });
        });
      }

      async execute(file: Express.Multer.File): Promise<void> {
        const categorias = await this.loadCategorias(file);

        categorias.map(async (categoria) => {
          const { nome, descricao } = categoria;
          const existeCategorias = this.categoriasRepository.findByName(nome);
          if (!existeCategorias) {
            this.categoriasRepository.create({
              nome,
              descricao,
            });
          }
        });
      }
    }

    export default ImportCategoriaUseCase;

   ```

   6. Criar o index do import use case

```ts
import { CategoriasRepository } from "../../repositories/implementations/CategoriasRepository";
import ImportCategoriaUseCase from "./importCategoriasUseCase";
import ImportCategoriaController from "./importCategoriaController";

/* const categoriasRepository = new CategoriasRepository(); */
const categoriasRepository = CategoriasRepository.getInstance();

const importCategoriaUseCase = new ImportCategoriaUseCase(categoriasRepository);

const importCategoriaController = new ImportCategoriaController(
  importCategoriaUseCase
);

export { importCategoriaController };

```

7. Alterar as rotas categorias
   ```ts
   import { Router } from "express";
  import { createCategoriaController } from "../modules/cars/useCases/createCategoria";
  import { listCategoriaController } from "../modules/cars/useCases/listCategoria";
  import { importCategoriaController } from "../modules/cars/useCases/importCategorias";
  import multer from "multer";

  const categoriasRotas = Router();

  const upload = multer({
    dest: "./tmp",
  });

  categoriasRotas.post("/", (req, res) => {
    return createCategoriaController.handle(req, res);
  });

  categoriasRotas.post("/import", (req, res) => {
    return listCategoriaController.handle(req, res);
  });

  categoriasRotas.get("/", upload.single("file"), (req, res) => {
    return importCategoriaController.handle(req, res);
  });

  export { categoriasRotas };

   ```