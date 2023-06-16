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
  tags: {
    type: Array<String>,
    required: false,
  },
  trendScore: {
    type: Number,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  scoreRecycled: {
    type: Boolean,
    required: false,
  },
  scoreEnergy: {
    type: Number,
    required: false,
  },
  scoreCarbon: {
    type: Number,
    required: false,
  },
  scoreRepair: {
    type: Number,
    required: false,
  },
});

productSchema.statics.build = (attr: Iproducts) => {
  return new Product(attr);
};

const Product = mongoose.model<ProductsDoc, productModelInterface>(
  "products",
  productSchema
);

export default Product;
