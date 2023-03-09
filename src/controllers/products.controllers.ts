import { Request, Response } from "express";
import Products from "../models/products.models";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../services/product.services";

export async function getAllController(req: Request, res: Response) {
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

export async function createController(req: Request, res: Response) {
  if (!req.body) {
    res.sendStatus(406);
  } else {
    createProduct(req);
    res.send("Ressource created succesfully.");
  }
}

export async function updateController(req: Request, res: Response) {
  const findOne = await Products.find({ where: { id: req.params._id } });
  if (!findOne) {
    res.sendStatus(406);
  } else {
    updateProduct(req);
    res.send(`Ressource ${req.body.title} updated successfully.`);
  }
}

export async function deleteController(req: Request, res: Response) {
  const findOne = await Products.find({ where: { id: req.params._id } });
  if (!findOne) {
    res.sendStatus(406);
  } else {
    deleteProduct(req);
    res.send(`Ressource deleted successfully.`);
  }
}
