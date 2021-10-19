import express from "express";
import rotas from "./routes";

const app = express();
app.use(express.json());
app.use(rotas);

app.listen("3000", () => {
  console.log("servidor executando na porta 3000");
});
