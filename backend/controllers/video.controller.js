import { Video } from "../model/video.model.js";
import { Product } from "../model/product.model.js";
import { uploadVideoOnCloudinary } from "../utils/cloudinary.util.js";

const createVideo = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res
        .status(400)
        .json({ message: "Video URL and Product ID are required" });
    }
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Video file is required" });
    }
    const videoUrl = await uploadVideoOnCloudinary(req.file.path);

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const newVideo = await Video.create({ videoUrl, productId });
    return res.status(201).json({
      message: "Video created successfully",
      newVideo,
    });
  } catch (error) {
    console.log("create video error", error);
    fs.unlink(req?.file.path, (err) => {
      if (err) {
        console.log("fs delete video error", err);
      }
    })
    return res.status(500).json({
      message: "Failed to create video",
      error: error.message,
    });
  }
};

const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate("productId");
    return res.status(200).json({
      message: "Videos retrieved successfully",
      videos,
    });
  } catch (error) {
    console.log("get all videos error", error);
    return res.status(500).json({
      message: "Failed to retrieve videos",
      error: error.message,
    });
  }
};

const getSingleVideo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Video ID is required" });
    }
    const video = await Video.findById(id).populate("productId");
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    return res.status(200).json({
      message: "Video retrieved successfully",
      video,
    });
  } catch (error) {
    console.log("get single video error", error);
    return res.status(500).json({
      message: "Failed to retrieve video",
      error: error.message,
    });
  }
};

const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const {  productId } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Video ID is required" });
    }
    let videoUrl
    if(req.file && req.file.path){
       videoUrl = await uploadVideoOnCloudinary(req.file.path);
      
    }

    const video = await Video.findById(
      id
    );
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    video.videoUrl = videoUrl ?? video.videoUrl;
    video.productId = productId ?? video.productId;
    const updatedVideo = await video.save();
   
    return res.status(200).json({
      message: "Video updated successfully",
      updatedVideo,
    });
  } catch (error) {
    console.log("update video error", error);
    if(req.file && req.file.path){
      fs.unlink(req?.file.path, (err) => {
        if (err) {
          console.log("fs delete video error", err);
        }
      })
    }
    return res.status(500).json({
      message: "Failed to update video",
      error: error.message,
    });
  }
};

const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Video ID is required" });
    }
    const deletedVideo = await Video.findByIdAndDelete(id);
    if (!deletedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }
    return res.status(200).json({
      message: "Video deleted successfully",
      deletedVideo,
    });
  } catch (error) {
    console.log("delete video error", error);
    return res.status(500).json({
      message: "Failed to delete video",
      error: error.message,
    });
  }
};

export { createVideo, getAllVideos, getSingleVideo, updateVideo, deleteVideo };
