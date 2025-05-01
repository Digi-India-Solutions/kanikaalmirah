import { Category } from "../model/category.model.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.util.js";

const CreateCategory = async (req, res) => {
  try {
    const {role}=req.user;
    if (role !== "admin") {
      return res.status(403).json({ message: "Unauthorized ! Don't try to be smart you are not admin" });
    }
    const { categoryName,showOnHome } = req.body || {};
    if (!categoryName) {
      return res.status(400).json({ message: "Category name is required" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Category image is required" });
    }

    const imageUrl = await uploadOnCloudinary(req.file.path);

    const newCategory = await Category.create({
      categoryName,
      categoryImage: imageUrl,
      showOnHome:showOnHome|| false
    });
    return res
      .status(201)
      .json({ message: "Category created successfully", newCategory });
  } catch (error) {
    console.log("create category error", error);
    res.status(500).json({ message: "create category server error" });
  }
};

const UpdateCategory = async (req, res) => {
  try {
    const {role}=req.user;
    if (role !== "admin") {
      return res.status(403).json({ message: "Unauthorized ! Don't try to be smart you are not admin" });
    }
    const { id } = req.params;
    const { categoryName,showOnHome } = req.body || {};
    if (!id) {
      return res.status(400).json({ message: "Category id is required" });
    }

    const category = await Category.findById(id);
    if (!category) {
      return res.status(400).json({ message: "Category not found" });
    }

    category.categoryName = categoryName ? categoryName : category.categoryName;
    if (req.file && req.file?.path) {
      await deleteFromCloudinary(category.categoryImage);
      const imageUrl = await uploadOnCloudinary(req.file.path);
      category.categoryImage = imageUrl ? imageUrl : category.categoryImage;
    }else{
      category.categoryImage = category.categoryImage;
    }
category.showOnHome = showOnHome ? showOnHome : category.showOnHome
    await category.save();
    return res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (error) {
    console.log("update category error", error);
    res.status(500).json({ message: "update category server error" });
  }
};

const GetSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Category id is required" });
    }
    const category = await Category.findById(id).populate("products");
    if (!category) {
      return res.status(400).json({ message: "Category not found" });
    }
    return res
      .status(200)
      .json({ message: "Single category", category });  
  } catch (error) {
    console.log("get single category error", error);
    res.status(500).json({ message: "get single category server error" });
  }
};

const GetAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({ message: "All categories", categories });
  } catch (error) {
    console.log("get all categories error", error);
    res.status(500).json({ message: "get all categories server error" });
  }
};

const DeleteCategory = async (req, res) => {
  try {
    const {role}=req.user;
    if (role !== "admin") {
      return res.status(403).json({ message: "Unauthorized ! Don't try to be smart you are not admin" });
    }
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Category id is required" });
    }
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(400).json({ message: "Category not found" });
    }
    return res
      .status(200)
      .json({ message: "Category deleted successfully", category });
  } catch (error) {
    console.log("delete category error", error);
    res.status(500).json({ message: "delete category server error" });
  }
};

const GetHomeCategories = async (req, res) => {
  try {
    const categories = await Category.find({ showOnHome: true });
    return res.status(200).json({ message: "All categories", categories });
  } catch (error) {
    console.log("get all categories error", error);
    res.status(500).json({ message: "get all categories server error" });
  }
}
export { CreateCategory, UpdateCategory, GetAllCategories,GetSingleCategory,DeleteCategory,GetHomeCategories };
