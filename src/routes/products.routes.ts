import express, { NextFunction, Request, Response } from "express";
import { create, getAll, getById } from "../controllers/products.controllers";
import Iproducts from "../interfaces/products.interface";
import Products from "../models/products.models";

const router = express.Router();

// Route to get all products
router.get("/", getAll);

// Route to create a product
router.post("/", create);

// Route to find a product 
router.get('/:id', getById);

// Route to delete a product 
//router.delete('/:id', authenticateJWT, deleteById);


// middleware pour gérer les erreurs
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  return res.status(500).send("Erreur serveur");
});

export { router as productsRouter };
