import express, { NextFunction, Request, Response } from "express";
import { getAll } from "../controllers/products.controllers";
import Iproducts from "../interfaces/products.interface";
import Products from "../models/products.models";

const router = express.Router();

router.get("/", getAll);

router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      title,
      type,
      image,
      scoreRecycled,
      scoreEnergy,
      scoreCarbon,
      scoreRepair,
    } = req.body;
    const productModelInterface: Iproducts = new Products({
      title,
      type,
      image,
      scoreRecycled,
      scoreEnergy,
      scoreCarbon,
      scoreRepair,
    });
    await productModelInterface.save();
    return res.status(201).send(productModelInterface);
  } catch (error) {
    return res.status(404).send(error);
  }
});

// middleware pour gérer les erreurs
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  return res.status(500).send("Erreur serveur");
});

export { router as productsRouter };
