import Iproducts from "../interfaces/products.interface";
import Products from "../models/products.models";
import { Request } from "express";

//Service to create a new product
export const createProduct = async (req: Request) => {
  const {
    title,
    image,
    brand,
    category,
    subcategory,
    isRecycled,
    scoreEnergy,
    scoreCarbon,
    scoreRepair,
  } = req.body;

  const productModelInterface: Iproducts = new Products({
    title,
    image,
    brand,
    category,
    subcategory,
    isRecycled,
    scoreEnergy,
    scoreCarbon,
    scoreRepair,
  });
  return await productModelInterface.save();
};

// Service pour mettre à jour un produit de la table [Product] par id
export const updateProduct = async (req: Request) => {
  const {
    title,
    image,
    brand,
    category,
    subcategory,
    isRecycled,
    scoreEnergy,
    scoreCarbon,
    scoreRepair,
  } = req.body;
  const update = await Products.updateOne({ _id : req.params.id },{
    title,
    image,
    brand,
    category,
    subcategory,
    isRecycled,
    scoreEnergy,
    scoreCarbon,
    scoreRepair,
  })
  .catch(() => false);
  return update;
};
