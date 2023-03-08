import { Request, Response } from "express";
import Products from "../models/products.models";
import { createProduct } from "../services/product.services";

export async function getAll(req: Request, res: Response) {
  try {
    const findAll = await Products.find();
    if (!findAll) {
      res.status(404);
    } else {
      res.send(JSON.stringify(findAll));
    }
  } catch (error) {
    return res.status(404).send(error);
  }
}

export async function create(req: Request, res: Response) {
  if (!req.body) {
    res.sendStatus(406);
  } else {
    createProduct(req);
    res.send("Ressource Created Succesfully !");
  }
}