import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import { todoRouter } from "./routes/todo.route";
import { productsRouter } from "./routes/products.routes";

const app = express();

app.use(json());

app.use(todoRouter);

app.use("/products", productsRouter);

mongoose.connect("mongodb://localhost:27017/ecoscoredb").then(
  () => {
    console.log("Connexion à la base de données réussie !");
  },
  (err) => {
    console.log(`Erreur lors de la connexion ${err}`);
  }
);

const port: Number = 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});