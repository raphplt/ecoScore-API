import express, { Request, Response } from "express";
import Products from "../models/products.models";

const router = express.Router();

router.get("/products", [], async (req: Request, res: Response) => {
  const products = await Products.find();
  return res.status(200).send(products);
});

router.post("/products", async (req: Request, res: Response) => {
  const {
    title,
    type,
    image,
    scoreRecycled,
    scoreEnergy,
    scoreCarbon,
    scoreRepair,
  } = req.body;
  const productModelInterface = Products.build({
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
});

export { router as productsRouter };
