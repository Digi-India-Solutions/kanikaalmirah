import mongoose from "mongoose";
import { cartItemsSchema } from "./cart.model.js";

const addressSchema = new mongoose.Schema({
 
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  landMark: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
});

const checkoutSchema = new mongoose.Schema(
  {
    orderUniqueId: {
      type: String,
      trim: true,
      default: "",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    items: [cartItemsSchema],
    shippingAddress: addressSchema,
    shippingCost: {
      type: Number,
      default: 0,
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    couponCode: {
      type: String,
      default: null,
    },
    couponDiscount: {
      type: Number,
      default: 0,
    },

    paymentInfo: {
      transactionId: {
        type: String,
      },
      orderId: {
        type: String,
      },
      paymentId: {
        type: String,
      },
      razorpaySignature: {
        type: String,
      },
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["COD", "Online"],
    },
    orderStatus: {
      type: String,
      enum: ["Placed", "Shipped", "Delivered", "Cancelled","Confirmed"],
      default: "Placed",
    },
  },
  { timestamps: true }
);

export const Checkout = mongoose.model("Checkout", checkoutSchema);
