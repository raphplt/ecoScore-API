import Iproducts from "../interfaces/products.interface";
import Products from "../models/products.model";
import { Request } from "express";

//Service to create a new product
export const createProduct = async (req: Request) => {
  const {
    title,
    type,
    tags,
    trendScore,
    image,
    scoreRecycled,
    scoreEnergy,
    scoreCarbon,
    scoreRepair,
  } = req.body;

  const productModelInterface: any = new Products({
    title,
    type,
    tags,
    trendScore,
    image,
    scoreRecycled,
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
    type,
    tags,
    trendScore,
    image,
    scoreRecycled,
    scoreEnergy,
    scoreCarbon,
    scoreRepair,
  } = req.body;
  const update = await Products.updateOne(
    { _id: req.params.id },
    {
      title,
      type,
      tags,
      trendScore,
      image,
      scoreRecycled,
      scoreEnergy,
      scoreCarbon,
      scoreRepair,
    }
  ).catch(() => false);
  return update;
};

// Service to delete a product of [Product] table by id
export const deleteProduct = async (req: Request) => {
  const findOne = await Products.findByIdAndDelete( req.params.id
  ).catch(() => false);;
  return findOne
};
