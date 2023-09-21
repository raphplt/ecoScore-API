import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import { productsRouter } from "./routes/products.routes";
import { categoriesRouter } from "./routes/categories.routes";
import { usersRouter } from "./routes/users.routes";
import { quizzRouter } from "./routes/quizz.routes";
const cookieSession = require("cookie-session");

const cors = require("cors");

export const app = express();

app.use(json());

// Utilisation de CORS
app.use(
  cors({
    origin: ["http://localhost:3000"],

    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Cookies session
app.use(
  cookieSession({
    name: "session",
    secret: "secret", // A changer pour une variable d'environnement
  })
);

// Route produitss
app.use("/products", productsRouter);

// Route categories
app.use("/categories", categoriesRouter);

// Route users
app.use("/users", usersRouter);

// Route quizz
app.use("/quizz", quizzRouter);

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