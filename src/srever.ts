import "reflect-metadata";
import express from "express";
import rotas from "./routes";

import "./database";

import "./shared/container";

const app = express();
app.use(express.json());
app.use(rotas);

app.listen("3333", () => {
  console.log("servidor executando na porta 3333");
});
