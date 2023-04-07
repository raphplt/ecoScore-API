import { Request, Response } from "express";
import Products from "../models/products.model";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../services/product.services";

export async function getAllController(req: Request, res: Response) {
  try {
    const findAll = await Products.find();
    if (!findAll) {
      res.status(404).send("No product found.");
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

export async function search(req: Request, res: Response) {
   const { query } = req.query;

   // Effectue une recherche dans la base de données en fonction des critères spécifiés
   const results = await Products.find({
     $or: [{ title: query }, { type: query }],
   });

   // Renvoie les résultats de la recherche au client
   res.json(results);
}

// permet chercher un objet dans la table Products en fonction de son Id
// export async function getById(req: Request, res: Response) {
//   try {
//     // console.log('1')
//     const findOne = await Products.find({ title: req.body.title }).exec();
//     if (findOne === null) {
//       // console.log('2')
//       return res.status(404);
//     } else {
//       // console.log('3')
//       return res.send(findOne);
//     }
//   } catch (error) {
//     console.log('4')
//     return res.status(404).send(error);
//   }
// }

//  suprime un objet dans la table products
//export async function deleteById(req: Request, res: Response) {
  //const query = await deleteProduct(req);
  //if (query === false) { res.sendStatus(400); } else { res.sendStatus(200); }
//}


