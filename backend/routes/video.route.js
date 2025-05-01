import { Router } from "express";
import { createVideo, deleteVideo, getAllVideos, getSingleVideo, updateVideo, } from "../controllers/video.controller.js";
import { uploadVideo } from "../middlewares/multerVideo.middleware.js";
import { multerErrorHandlerForVideo } from "../middlewares/multerErrorHandling.middleware.js";

const router= Router()

router.post("/create-video",uploadVideo.single("video"),multerErrorHandlerForVideo,createVideo)
router.put("/update-video/:id",uploadVideo.single("video"),multerErrorHandlerForVideo,updateVideo)
router.get("/get-all-videos",getAllVideos)
router.get("/get-video/:id",getSingleVideo)
router.delete("/delete-video/:id",deleteVideo)

export default router