import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    bannerImage: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Banner = mongoose.model("Banner", bannerSchema);
