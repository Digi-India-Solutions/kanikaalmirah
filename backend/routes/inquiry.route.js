import { Router } from "express";
import { createInquiry, deleteInquiry, getAllInquiries } from "../controllers/inquiry.controller.js";
const router= Router()

router.post("/create-inquiry",createInquiry)
router.get("/get-all-inquiries",getAllInquiries)
router.delete("/delete-inquiry/:id",deleteInquiry)

export default router