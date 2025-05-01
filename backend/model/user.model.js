import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema(
  {
    profileImage: {
      type: String,
      required: true,
      default: function () {
        return `https://picsum.photos/200?random=${Math.floor(Math.random() * 1000)}`;
      },
    },
    fullName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    landMark: {
      type: String,
    },
    pincode: {
      type: String
    },
    address: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    role:{
        type: String,
        required: true,
        enum: ["admin", "user"],
        default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { id: this._id, email: this.email,role:this.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "20d",
    }
  );
  return token;
};

export const User = mongoose.model("User", userSchema);
