import { Router } from "express";
import { createCoupon, deleteCoupon, getAllCoupons, getSingleCoupon, updateCoupon } from "../controllers/coupon.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

const router = Router();

router.post("/create-coupon",verifyToken,createCoupon)
router.put("/update-coupon/:id",verifyToken,updateCoupon)
router.get("/get-all-coupons",getAllCoupons)
router.get("/get-coupon/:id",getSingleCoupon)
router.delete("/delete-coupon/:id",verifyToken,deleteCoupon)

export default router
