import Iquizz from "../interfaces/quizz.interface";
import Quizz from "../models/quizz.model";
import { Request } from "express";

//Service to create a new quizz
export const createQuizz = async (req: Request) => {
  const { title, category, answers, answersType } = req.body;

  const quizzModelInterface: any = new Quizz({
    title,
    category,
    answers,
    answersType,
  });
  return await quizzModelInterface.save();
};

// Service pour mettre à jour un produit de la table [Quizz] par id
export const updateQuizz = async (req: Request) => {
  const { title, category, answers, answersType } = req.body;
  const update = await Quizz.updateOne(
    { _id: req.params.id },
    {
      title,
      category,
      answers,
      answersType,
    }
  ).catch(() => false);
  return update;
};

// Service to delete a quizz of [Quizz] table by id
export const deleteQuizz = async (req: Request) => {
  const findOne = await Quizz.findByIdAndDelete(req.params.id).catch(
    () => false
  );
  return findOne;
};
