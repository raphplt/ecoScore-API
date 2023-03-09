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

// permet chercher un objet dans la table Products en fonction de sont Id
export async function getById(req: Request, res: Response) {
  const findOne = await Products.findOne({where: {id:req.params.id}}).catch(() => {
    res.sendStatus(400);
  });
  res.status(200).send(findOne);
}

//  suprime un objet dans la table products
//export async function deleteById(req: Request, res: Response) {
  //const query = await deleteProduct(req);
  //if (query === false) { res.sendStatus(400); } else { res.sendStatus(200); }
//}



