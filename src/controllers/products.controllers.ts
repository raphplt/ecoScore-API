import { Request, Response } from "express";
import Products from "../models/products.models";
import { createProduct, updateProduct } from "../services/product.services";

export async function getAll(req: Request, res: Response) {
  try {
    const findAll = await Products.find();
    if (!findAll) {
      res.status(404);
    } else {
      res.send(findAll);
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

export async function update(req: Request, res: Response) {
  const findOne = await Products.find({ where: { id: req.params._id } });
  // console.log(req.params.id);
  if (!findOne) {
    res.send("Marche pas");
  } else {
    updateProduct(req);
    res.send("Ressource updated successfully.");
  }
}