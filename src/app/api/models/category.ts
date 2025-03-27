import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    banner: {
      type: {},
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models?.Categories ||
  mongoose.model("Categories", categorySchema);
