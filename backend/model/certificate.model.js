import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
    certificateImage: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
},{timestamps:true});

export const Certificate = mongoose.model("Certificate", certificateSchema);