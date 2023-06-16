import { Request, Response } from "express";
import User from "../models/users.model";
import {
  createUser,
  deleteUser,
  updateUser,
  loginUser,
  registerUser,
} from "../services/user.services";

export async function login(req: Request, res: Response) {
  try {
    const result = await loginUser(req);
    res.send(result);
    // return result;
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

