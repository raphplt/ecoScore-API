import mongoose from "mongoose";
import Icategories from "../interfaces/categories.interface";

interface categoryModelInterface extends mongoose.Model<CategoriesDoc> {
  update: any;
  build(attr: Icategories): CategoriesDoc;
}

// Interface for the document
interface CategoriesDoc extends mongoose.Document {
  category: string;
  slug: string;
  subCats: Array<string>;
  image: string;
}

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  subCats: {
    type: Array<string>,
    required: true,
  },
  image: {
    type: String,
    required: false,
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
