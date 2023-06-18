import mongoose from "mongoose";
import Iusers from "../interfaces/users.interface";

interface userModelInterface extends mongoose.Model<UsersDoc> {
  update: any;
  build(attr: Iusers): UsersDoc;
}

// Interface for the document
interface UsersDoc extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  role: string;
  trendProducts: Array<string>;
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
  role: {
    type: String,
    required: true,
  },
  trendProducts: {
    type: Array,
    required: false,
  },
});

userSchema.statics.build = (attr: Iusers) => {
  return new User(attr);
};

const User = mongoose.model<UsersDoc, userModelInterface>("users", userSchema);

export default User;
