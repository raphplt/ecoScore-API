import Iproducts from "../interfaces/products.interface";
import Products from "../models/products.models";
import { Request } from "express";

//Service to create a new product
export const createProduct = async (req: Request) => {
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
  return await productModelInterface.save();
};
