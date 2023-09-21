import express, { NextFunction, Request, Response } from "express";
import {
  createController,
  getAllController,
  updateController,
  deleteController,
  search,
  login,
  checkEmail,
  addProductToTrend,
  changePassword,
  changeUsername,
} from "../controllers/users.controllers";

const router = express.Router();

router.get("/", getAllController);

router.get("/search", search);

router.post("/register", createController);

router.put("/addTrendProduct", addProductToTrend);

router.delete("/:id", deleteController);

router.post("/login", login);

router.post("/checkEmail", checkEmail);

router.post("/updatepassword", changePassword)

router.post("/:id/updateusername", changeUsername)

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  return res.status(500).send("Erreur serveur");
});

export { router as usersRouter };
