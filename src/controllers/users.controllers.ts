import bcrypt from 'bcrypt';
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


// Fonction pour changer le mot de passe de l'utilisateur
export const changePassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user: any = await User.findById(req.body.id);

    // Vérifier si l'utilisateur existe
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    // Permet de modifier un mot de passe si le mot de passe n'est pas encrypter 
    if (currentPassword != user.password) {
      // a decommenter si le mdp pas crypter
      //return res.status(401).json({ message: 'Mot de passe actuel incorrect' });
    }
    else {
      console.log(currentPassword)
      console.log(user.password)
    }

    // verif si le mot de passe actuelle correspond 
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Mot de passe actuel incorrect' });
    }

    // Hasher et enregistrer le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Mot de passe changé avec succès' });
  } catch (error) {
    console.error('Erreur lors du changement de mot de passe :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors du changement de mot de passe' });
  }
};

// Fonction pour changer le nom d'utilisateur de l'utilisateur
export const changeUsername = async (req: Request, res: Response) => {
  try {
    const { newUsername } = req.body;
    const user: any = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    user.username = newUsername;
    await user.save();

    res.status(200).json({ message: 'Nom d\'utilisateur changé avec succès' });
  } catch (error) {
    console.error('Erreur lors du changement de nom d\'utilisateur :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors du changement de nom d\'utilisateur' });
  }
};

