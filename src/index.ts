import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import { productsRouter } from "./routes/products.routes";
import { categoriesRouter } from "./routes/categories.routes";
import { usersRouter } from "./routes/users.routes";

const cors = require("cors");

const app = express();

app.use(json());

// Utilisation de CORS (pour permettre l'utilisation depuis un autre port)
app.use(
  cors({
    origin: ["http://localhost:3000"],

    credentials: true,
    methods: ["GET", "POST"],
  })
);

// Route produits
app.use("/products", productsRouter);

// Route categories
app.use("/categories", categoriesRouter);

// Route users
app.use("/users", usersRouter);

mongoose.connect("mongodb://0.0.0.0:27017/ecoscoredb").then(
  () => {
    console.log("Connexion à la base de données réussie !");
  },
  (err) => {
    console.log(`Erreur lors de la connexion ${err}`);
  }
);

const port: number = 3001;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});