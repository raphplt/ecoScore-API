import { Request } from "express";
import Icategories from "../interfaces/categories.interface";
import Categories from "../models/categories.model";
import Category from "../models/categories.model";

//Service to create a new product
export const createCategory = async (req: Request) => {
  const { cat, subCat, image } = req.body;

  const categoryModelInterface = new Category({
    cat,
    subCat,
    image
  });
  return await categoryModelInterface.save();
};

// Service pour mettre à jour un produit de la table [Product] par id
export const updateCategory = async (req: Request) => {
  const { cat, subCat, image } = req.body;
  const update = await Categories.updateOne(
    { _id: req.params.id },
    {
      cat,
      subCat,
      image
    }
  ).catch(() => false);
  return update;
};

// Service to delete a product of [Product] table by id
export const deleteCategory = async (req: Request) => {
  const findOne = await Categories.findByIdAndDelete(req.params.id).catch(
    () => false
  );
  return findOne;
};
