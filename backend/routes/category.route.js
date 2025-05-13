import {Router} from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { CreateCategory, DeleteCategory, GetAllCategories, GetHomeCategories, GetSingleCategory, UpdateCategory } from "../controllers/category.controller.js";
import { multerErrorHandler } from "../middlewares/multerErrorHandling.middleware.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

const router=Router()

router.post("/create-category",upload.single("image"),multerErrorHandler,CreateCategory)
router.put("/update-category/:id",verifyToken,upload.single("image"),multerErrorHandler,UpdateCategory)
router.get("/get-single-category/:id",GetSingleCategory)
router.get("/get-all-categories",GetAllCategories)
router.delete("/delete-category/:id",verifyToken,DeleteCategory)
router.get("/get-home-categories",GetHomeCategories)
export default router