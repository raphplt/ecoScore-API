import express, { NextFunction, Request, Response } from "express";
import { create, getAll, update } from "../controllers/products.controllers";

// Instantiation du routeur
const router = express.Router();

// Route to get all products
router.get("/", getAll);

// Route to create a product
router.post("/", create);

// Route to update a product
router.put("/:id", update);

// middleware pour gérer les erreurs
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  return res.status(500).send("Erreur serveur");
});

export { router as productsRouter };
