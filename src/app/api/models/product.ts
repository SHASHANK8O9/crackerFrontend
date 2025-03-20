import mongoose, { Schema, model, Document } from "mongoose";
import Category from "./category"; // Import the Category model

// Define the Product interface
interface IProduct extends Document {
  title: string;
  price: number;
  discount: number;
  banner?: object;
  slug?: string;
  stockStatus?: string;
  category?: mongoose.Schema.Types.ObjectId; // Reference to Category
  quantity?: string;
  description?: string;
}

// Define the schema
const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      minlength: [1, "Min Length For Title is 1"],
      maxlength: [2000, "Max Length For Title is 2000"],
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0, // Default discount is 0 if not provided
    },
    banner: {
      type: Object,
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
    },
    stockStatus: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Reference the Category model
    },
    quantity: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Add the virtual field with rounding
productSchema.virtual("finalPrice").get(function (this: IProduct) {
  const discount = this.discount || 0; // Default to 0 if discount is null/undefined
  const finalPrice = this.price - this.price * (discount / 100);
  return Math.round(finalPrice); // Round to the nearest integer
});

// Create and export the model
const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);
export default Product;
