import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import { productsRouter } from "./routes/products.routes";

const cors = require("cors");

const app = express();

app.use(json());

// Utilisation de CORS (pour permettre l'utilisation depuis un autre port)
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"],
  })
);

// Route produits
app.use("/products", productsRouter);

mongoose.connect("mongodb://localhost:27017/ecoscoredb").then(
  () => {
    console.log("Connexion à la base de données réussie !");
  },
  (err) => {
    console.log(`Erreur lors de la connexion ${err}`);
  }
);

const port: Number = 3001;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});