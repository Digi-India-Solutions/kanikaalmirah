import { Router } from "express";
import { AddToCart, DeleteCart, GetCart, RemoveFromCart, UpdateCartQuantity } from "../controllers/cart.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
const router= Router();

router.post("/add-to-cart",verifyToken,AddToCart)
router.put("/update-cart-quantity",verifyToken,UpdateCartQuantity)
router.get("/get-cart",verifyToken,GetCart)
router.post("/remove-from-cart",verifyToken,RemoveFromCart)
router.delete("/delete-cart",verifyToken,DeleteCart)


export default router