import express from "express";
import {
  createColor,
  getAllColors,
  updateColor,
  deleteColor,
} from "../controllers/color.controller.js";

const router = express.Router();

router.post("/create-color", createColor);
router.get("/get-all-colors", getAllColors);
router.put("/update-color/:id", updateColor);
router.delete("/delete-color/:id", deleteColor);

export default router;
