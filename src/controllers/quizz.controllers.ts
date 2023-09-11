import Quizz from "../models/quizz.model";
import { Request, Response } from "express";
import {
  createQuizz,
  updateQuizz,
  deleteQuizz,
} from "../services/quizz.services";

export async function getAllController(req: Request, res: Response) {
  try {
    const findAll = await Quizz.find();
    if (!findAll) {
      res.status(404).send("No product found.");
    } else {
      res.send(findAll);
    }
  } catch (error) {
    return res.status(404).send(error);
  }
}

export async function getById(req: Request, res: Response) {
  let _id = req.params.id;
  if (_id === "undefined") {
    res.status(200).send("No id provided.");
    return;
  }
  const findOne = await Quizz.findOne({ _id });
  if (!findOne) {
    res.status(200).send("No product found.");
  } else {
    res.send(findOne);
  }
}

export async function createController(req: Request, res: Response) {
  if (!req.body) {
    res.sendStatus(406);
  } else {
    createQuizz(req);
    res.send("Ressource created succesfully.");
  }
}

export async function updateController(req: Request, res: Response) {
  const findOne = await Quizz.find({ where: { id: req.params._id } });
  if (!findOne) {
    res.sendStatus(406);
  } else {
    updateQuizz(req);
    res.send(`Ressource ${req.body.title} updated successfully.`);
  }
}

export async function deleteController(req: Request, res: Response) {
  const findOne = await Quizz.find({ where: { id: req.params._id } });
  if (!findOne) {
    res.sendStatus(406);
  } else {
    deleteQuizz(req);
    res.send(`Ressource ${req.body.title} deleted successfully.`);
  }
}
