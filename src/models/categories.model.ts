import mongoose from "mongoose";
import Icategories from "../interfaces/categories.interface";

interface categoryModelInterface extends mongoose.Model<CategoriesDoc> {
  update: any;
  build(attr: Icategories): CategoriesDoc;
}

// Interface for the document
interface CategoriesDoc extends mongoose.Document {
  cat: string;
  subCat: Array<string>;
}

const categorySchema = new mongoose.Schema({
  cat: {
    type: String,
    required: true,
  },
  subCat: {
    type: Array<string>,
    required: true,
  },
});

categorySchema.statics.build = (attr: Icategories) => {
  return new Category(attr);
};

const Category = mongoose.model<CategoriesDoc, categoryModelInterface>(
  "categories",
  categorySchema
);

export default Category;
