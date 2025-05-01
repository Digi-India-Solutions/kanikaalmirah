import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (image) => {
const result=  await cloudinary.uploader
.upload(image)
.catch((error) => {
    console.log("cloudinary error", error);
  });
  if(result){
    fs.unlink(image,(err)=>{
      if(err){
        console.log("fs delete image error",err);
      }
    })
  }
  return result.url
};

export const uploadVideoOnCloudinary= async (video) => {
  try {
    const result=  await cloudinary.uploader
    .upload(video,{ resource_type: "video", folder: "videos" })
    if (result) {
      fs.unlink(video, (err) => {
        if (err) {
          console.log("fs delete video error", err);
        }
      });
    }
    return result.secure_url; 
  } catch (error) {
    console.log("cloudinary video error", error);
    return null;
  }
}
  function extractPublicIdFromUrl(cloudinaryUrl) {
    const parts = cloudinaryUrl.split('/');
    const filenameWithExt = parts[parts.length - 1];
    const publicId = filenameWithExt.split('.')[0];  
    return publicId;
  }
export const deleteFromCloudinary = async (image) => {
    try {
     let publicId =  extractPublicIdFromUrl(image)
      const result = await cloudinary.uploader.destroy(publicId);
      if(result){
        console.log("cloudinary delete result",result);
      }
      return result;
    } catch (error) {
      throw new Error("Cloudinary deletion failed: " + error.message);
    }
  };

