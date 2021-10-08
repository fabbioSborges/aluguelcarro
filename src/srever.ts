import express from "express";
import categoriasRotas from "./routes/categorias.routes";

const app = express();
app.use(express.json());

app.use(categoriasRotas);

app.listen("3000", () => {
  console.log("servidor executando na porta 3000");
});
