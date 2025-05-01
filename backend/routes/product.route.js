import { Router } from "express";
import { CreateProduct, DeleteProduct, GetAllColors, GetAllProducts, GetFeatureProducts, GetSingleProduct, UpdateProduct } from "../controllers/product.controller.js";
import {verifyToken} from "../middlewares/verifyToken.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { multerErrorHandler } from "../middlewares/multerErrorHandling.middleware.js";

const router = Router();

router.post("/create-product",verifyToken,
    upload.fields([
        {name:"coverImage",maxCount:1},
        {name:"images",maxCount:4}
    ]), multerErrorHandler,CreateProduct)

router.put("/update-product/:id",verifyToken,
    upload.fields([
        {name:"coverImage",maxCount:1},
        {name:"images",maxCount:4}
    ])
    ,multerErrorHandler,UpdateProduct)
    
router.get("/get-all-products",GetAllProducts)
router.get("/get-single-product/:id",GetSingleProduct)
router.get("/get-feature-products",GetFeatureProducts)
router.delete("/delete-product/:id",DeleteProduct)
router.get("/get-all-colors",GetAllColors)

export default router