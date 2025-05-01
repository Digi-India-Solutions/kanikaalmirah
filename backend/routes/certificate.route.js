import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { multerErrorHandler } from "../middlewares/multerErrorHandling.middleware.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import { createCertificate, deleteCertificate, getAllCertificates, getSingleCertificate, updateCertificate } from "../controllers/certificate.controller.js";

const router = Router();

router.post("/create-certificate",verifyToken,upload.single("image"),multerErrorHandler, createCertificate);
router.put("/update-certificate/:id",verifyToken,upload.single("image"),multerErrorHandler, updateCertificate);
router.get("/get-certificate/:id", getSingleCertificate);
router.get("/get-all-certificates", getAllCertificates);
router.delete("/delete-certificate/:id",verifyToken, deleteCertificate);

export default router;