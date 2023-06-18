import { Request, Response } from "express";
import User from "../models/users.model";
import {
  createUser,
  deleteUser,
  updateUser,
  loginUser,
  registerUser,
} from "../services/user.services";
import Product from "../models/products.model";

export async function login(req: Request, res: Response) {
  try {
    const result = await loginUser(req);
    res.send(result);
  } catch (error) {
    res.send(false);
  }
}

export async function getAllController(req: Request, res: Response) {
  try {
    const findAll = await User.find();
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
    createUser(req);
    res.send("Ressource created succesfully.");
  }
}

export async function updateController(req: Request, res: Response) {
  const findOne = await User.find({ where: { id: req.params._id } });
  if (!findOne) {
    res.sendStatus(406);
  } else {
    updateUser(req);
    res.send(`Ressource ${req.body.title} updated successfully.`);
  }
}

export async function deleteController(req: Request, res: Response) {
  const findOne = await User.find({ where: { id: req.params._id } });
  if (!findOne) {
    res.sendStatus(406);
  } else {
    deleteUser(req);
    res.send(`Ressource deleted successfully.`);
  }
}

export async function search(req: Request, res: Response) {
  const { query } = req.query;

  const results = await User.find({
    $or: [{ title: query }, { type: query }],
  });

  res.json(results);
}

export const checkEmail = async (req: Request, res: Response) => {
  const email = req.body.email;
  const result = await User.findOne({ email }).catch(() => false);
  res.send(result ? true : false);
};

export const addProductToTrend = async (req: Request, res: Response) => {
  const { id, productId } = req.body;
  const findOne: any = await User.findOne({ _id: id });
  const products = findOne.trendProducts;
  if (products.includes(productId)) {
    res.send(false);
    return;
  }
  const result = await User.updateOne(
    { _id: id },
    { $push: { trendProducts: productId } }
  ).catch(() => false);
  await Product.updateOne(
    { _id: productId },
    { $inc: { trendScore: 1 } }
  ).catch(() => false);
  res.send(result ? true : false);
};