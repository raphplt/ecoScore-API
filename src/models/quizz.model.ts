import mongoose from "mongoose";
import Iquizz from "../interfaces/quizz.interface";

interface quizzModelInterface extends mongoose.Model<QuizzDoc> {
  update: any;
  build(attr: Iquizz): QuizzDoc;
}

// Interface for the document
interface QuizzDoc extends mongoose.Document {
  title: string;
  category: string;
  answers: Array<string>;
  answersType: string;
}

const quizzSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  answers: {
    type: Array<String>,
    required: false,
  },
  answersType: {
    type: String,
    required: false,
  },
});

quizzSchema.statics.build = (attr: Iquizz) => {
  return new Quizz(attr);
};

const Quizz = mongoose.model<QuizzDoc, quizzModelInterface>(
  "quizz",
  quizzSchema
);

export default Quizz;
