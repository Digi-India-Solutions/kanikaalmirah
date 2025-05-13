import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectDB } from "./db/index.js";
import cookieParser from "cookie-parser";

const app = express();
const allowedOrigins = ["https://kanikaalmirah.com", "https://www.kanikaalmirah.com", "https://admin.kanikaalmirah.com"];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

connectDB();

import UserRouter from "./routes/user.route.js"
import ProductRouter from "./routes/product.route.js"
import CategoryRouter from "./routes/category.route.js"
import BannerRouter from "./routes/banner.route.js"
import CartRouter from "./routes/cart.route.js"
import ColorRouter from "./routes/color.route.js"
import CouponRouter from "./routes/coupon.route.js"
import CheckoutRouter from "./routes/checkout.route.js"
import CertificateRouter from "./routes/certificate.route.js"
import InquiryRouter from "./routes/inquiry.route.js"
import VideoRouter from "./routes/video.route.js"
app.use("/api/v1/auth",UserRouter)
app.use("/api/v1/product",ProductRouter)
app.use("/api/v1/category",CategoryRouter)
app.use("/api/v1/banner",BannerRouter)
app.use("/api/v1/cart",CartRouter)
app.use("/api/v1/color",ColorRouter)
app.use("/api/v1/coupon",CouponRouter)
app.use("/api/v1/checkout",CheckoutRouter)
app.use("/api/v1/certificate",CertificateRouter)
app.use("/api/v1/inquiry",InquiryRouter)
app.use("/api/v1/video",VideoRouter)

app.get("/",(req,res)=>{
  res.send("Server is running")
})
app.get("/developer", (req, res) => {
  res.send(
    `<h1>It is great to see you on server of <a href="https://www.linkedin.com/in/nitin-gupta-b7a9a02a1/">Nitin Gupta</a> </h1>`
  );
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
