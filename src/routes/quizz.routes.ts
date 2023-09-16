import express, { NextFunction, Request, Response } from "express";
import {
  getAllController,
  getById,
  createController,
  updateController,
  deleteController,
} from "../controllers/quizz.controllers";

const router = express.Router();

router.get("/", getAllController);

router.get("/:id", getById);

router.post("/", createController);

router.put("/:id", updateController);

router.delete("/:id", deleteController);

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  return res.status(500).send("Erreur serveur");
});

export { router as quizzRouter };
