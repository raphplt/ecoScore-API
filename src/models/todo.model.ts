import mongoose from "mongoose";
import Itodo from "../interfaces/todo.interface";

interface todoModelInterface extends mongoose.Model<TodoDoc> {
  build(attr: Itodo): TodoDoc;
}

// Interface for the document
interface TodoDoc extends mongoose.Document {
  title: string;
  description: string;
}

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

todoSchema.statics.build = (attr: Itodo) => {
  return new Todo(attr);
};

const Todo = mongoose.model<TodoDoc, todoModelInterface>("Todo", todoSchema);

export default Todo;
