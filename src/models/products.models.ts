import mongoose from "mongoose";
import Iproducts from "../interfaces/products.interface";

interface productModelInterface extends mongoose.Model<ProductsDoc> {
  update: any;
  build(attr: Iproducts): ProductsDoc;
}

// Interface for the document
interface ProductsDoc extends mongoose.Document {
  title: string;
  type: string;
  image: string;
  scoreRecycled: boolean;
  scoreEnergy: number;
  scoreCarbon: number;
  scoreRepair: number;
}

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  scoreRecycled: {
    type: Boolean,
    required: true,
  },
  scoreEnergy: {
    type: Number,
    required: false,
  },
  scoreCarbon: {
    type: Number,
    required: true,
  },
  scoreRepair: {
    type: Number,
    required: true,
  },
});

productSchema.statics.build = (attr: Iproducts) => {
  return new Products(attr);
};

const Products = mongoose.model<ProductsDoc, productModelInterface>(
  "products",
  productSchema
);

export default Products;