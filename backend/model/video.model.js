import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
        videoUrl: {
            type: String,
            required: true,
        },
       productId:{
           type: mongoose.Schema.Types.ObjectId,
           ref: "Product",
           required: true,
       }
    },
    { timestamps: true }
);

export const Video = mongoose.model("Video", videoSchema);