import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
  FullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  EnquiryType: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
},{
    timestamps: true
});

export const Inquiry = mongoose.model("Inquiry", inquirySchema);
