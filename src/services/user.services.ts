import Iusers from "../interfaces/users.interface";
import User from "../models/users.model";
import { Request } from "express";

//Service to create a new User
export const createUser = async (req: Request) => {
  const { username, email, password, role } = req.body;
  console.log(req.body);
  const userModelInterface = new User({
    username,
    email,
    password,
    role,
  });
  return await userModelInterface.save();
};

// Service pour mettre à jour un user de la table [User] par id
export const updateUser = async (req: Request) => {
  const { username, email, password, role } = req.body;
  const update = await User.updateOne(
    { _id: req.params.id },
    {
      username,
      email,
      password,
      role,
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

// Service for login
export const loginUser = async (req: Request) => {
  const { email, password } = req.body;
  const findOne: any = await User.findOne({ email, password }).catch(
    () => false
  );
  let userInfos = null;
  if (findOne) {
    userInfos = {
      email: findOne?.email,
      username: findOne?.username,
      role: findOne?.role,
    };
  }
  return userInfos;
};

// Service for register
export const registerUser = async (req: Request) => {
  const { username, email, password, role } = req.body;
  const userModelInterface = new User({
    username,
    email,
    password,
    role,
  });
  return await userModelInterface.save();
};