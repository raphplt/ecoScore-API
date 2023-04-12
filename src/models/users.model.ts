import mongoose from "mongoose";
import Iusers from "../interfaces/users.interface";

interface userModelInterface extends mongoose.Model<UsersDoc> {
  update: any;
  build(attr: Iusers): UsersDoc;
}

// Interface for the document
interface UsersDoc extends mongoose.Document {
  title: string;
  type: string;
  image: string;
  scoreRecycled: boolean;
  scoreEnergy: number;
  scoreCarbon: number;
  scoreRepair: number;
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attr: Iusers) => {
  return new User(attr);
};

const User = mongoose.model<UsersDoc, userModelInterface>("users", userSchema);

export default User;
