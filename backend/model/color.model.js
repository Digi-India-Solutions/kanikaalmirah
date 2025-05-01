import mongoose from "mongoose";

const colorSchema = new mongoose.Schema(
  {
    colorName: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Color = mongoose.model("Color", colorSchema);
