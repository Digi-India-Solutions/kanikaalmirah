import { Router } from "express";
import { ForgotPassword, GetAllUsers, GetSingleUser, LogOut, ResetPassword, SignIn, SignUp,AdminSignIn,verifyAdminLoggedIn, verifyLoggedIn,updateProfile } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { multerErrorHandler } from "../middlewares/multerErrorHandling.middleware.js";

const router=Router()

router.post("/sign-up",SignUp)
router.post("/sign-in",SignIn)
router.post("/forgot-password",ForgotPassword)
router.post("/reset-password/:id/:token",ResetPassword)
router.get("/get-all-users",verifyToken,GetAllUsers)
router.get("/get-single-user/:id",GetSingleUser)
router.get("/logout",verifyToken,LogOut)
router.get("/verify-user",verifyToken,verifyLoggedIn)
router.put("/update-profile",upload.single("image"),multerErrorHandler,verifyToken,updateProfile)

//admin routes
router.post("/admin/sign-in",AdminSignIn)
router.get("/admin/verify-admin",verifyToken,verifyAdminLoggedIn)
export default router