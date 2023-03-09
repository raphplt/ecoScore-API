import express, { NextFunction, Request, Response } from "express";
import {
  createController,
  getAllController,
  updateController,
  deleteController,
  getById,
} from "../controllers/products.controllers";

// Instantiation du routeur
const router = express.Router();

// Route to get all products
//router.get("/", getAllController);

// Route to get by Id
router.get('/', getById);

// Route to create a product
router.post("/", createController);

// Route to update a product
router.put("/:id", updateController);

// Route to delete a product
router.delete("/:id", deleteController);

// middleware pour gérer les erreurs
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  return res.status(500).send("Erreur serveur");
});

export { router as productsRouter };
