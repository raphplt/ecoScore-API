import { Request, Response } from "express";
import Products from "../models/products.models";

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
