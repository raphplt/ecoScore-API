import Iusers from "../interfaces/users.interface";
import User from "../models/users.model";
import { Request } from "express";

//Service to create a new User
export const createUser = async (req: Request) => {
  const { username, email, password } = req.body;

  const userModelInterface = new User({
    username,
    email,
    password,
  });
  return await userModelInterface.save();
};

// Service pour mettre à jour un user de la table [User] par id
export const updateUser = async (req: Request) => {
  const { username, email, password } = req.body;
  const update = await User.updateOne(
    { _id: req.params.id },
    {
      username,
      email,
      password,
    }
  ).catch(() => false);
  return update;
};

// Service to delete a User of [User] table by id
export const deleteUser = async (req: Request) => {
  const findOne = await User.findByIdAndDelete(req.params.id).catch(
    () => false
  );
  return findOne;
};
