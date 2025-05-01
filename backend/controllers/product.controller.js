import mongoose from "mongoose";
import { Category } from "../model/category.model.js";
import { Product } from "../model/product.model.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.util.js";

const CreateProduct = async (req, res) => {
  try {
    const {
      productName,
      description,
      category,
      material,
      doors,
      size,
      colorName,
    } = req.body || {};
  
    const price = Number(req.body?.price);
    const stock = Number(req.body?.stock);
    const discount = Number(req.body?.discount);
    const isFeaturedProduct = req.body?.isFeaturedProduct === "true";

    const errorMessage = [];

    if (!productName) errorMessage.push("product name is required");
    if (!description) errorMessage.push("description is required");
    if (!category) errorMessage.push("category is required");
    if (!material) errorMessage.push("material is required");
    if (!doors) errorMessage.push("doors is required");
    if (!colorName) errorMessage.push("colorName is required");
    if (!size) errorMessage.push("size is required");
    if (price === undefined || isNaN(price)) errorMessage.push("price is required");
    if (discount === undefined || isNaN(discount)) errorMessage.push("discount is required");
    if (stock === undefined || isNaN(stock)) errorMessage.push("stock is required");
    if (discount < 0 || discount > 100) {
      return res.status(400).json({ message: "Discount must be between 0 and 100" });
    }
    if (errorMessage.length > 0) {
      return res.status(400).json({ message: errorMessage.join(", ") });
    }

    const existedCategory = await Category.findById(category);
    if (!existedCategory) {
      return res.status(400).json({ message: "Category not found" });
    }
    let coverImageLocalPath = req?.files?.coverImage?.[0]?.path;
    if (!coverImageLocalPath) {
      return res.status(400).json({ message: "Cover image is required" });
    }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if (!coverImage) {
      return res.status(500).json({ message: "Cover image upload failed" });
    }

    let images = [];

    if (req.files && req.files?.images?.length > 0) {
      const imagePromises = req.files.images.map((image) =>
        uploadOnCloudinary(image.path)
      );

      try {
        const imageUrls = await Promise.all(imagePromises);
        images = imageUrls;
      } catch (error) {
        return res.status(500).json({ message: "Image upload failed", error });
      }
    }
    let finalPrice = price - (price * discount) / 100;

    const newProduct = 
      {
        productName,
        description,
        coverImage,
        images,
        category,
        material,
        doors,
        size,
        price,
        discount,
        stock,
        colorName,
        finalPrice,
        isFeaturedProduct,
      }

      const product = new Product(newProduct);
      await product.save();
   
const updatedCategory = await Category.findByIdAndUpdate(category, {
      $push: { products: product._id },
    },{
      new: true,});

    return res.status(201).json({
      message: "Product created successfully",
      product,
      updatedCategory
          });
  } catch (error) {
    console.log("create product error", error);
    res.status(500).json({ message: "create product server error" });
  }
};

const UpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Product id is required" });
    }
    const {
      productName,
      description,
      category,
      material,
      doors,
      size,
      colorName,
    } = req.body || {};

    const price = Number(req.body?.price);
    const stock = Number(req.body?.stock);
    const discount = Number(req.body?.discount);
    const isFeaturedProduct = req.body?.isFeaturedProduct === "true" ;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.productName = productName ? productName : product.productName;
    product.description = description ? description : product.description;
    product.price = price ? price : product.price;
    product.category = category ? category : product.category;
    product.material = material ? material : product.material;
    product.doors = doors ? doors : product.doors;
    product.size = size ? size : product.size;
    product.discount = discount ? discount : product.discount;
    product.stock = stock ? stock : product.stock;
    product.colorName = colorName ? colorName : product.colorName;
    product.isFeaturedProduct = isFeaturedProduct
      ? isFeaturedProduct
      : product.isFeaturedProduct;

    if (discount) {
      let priceVal = price ?? product.price;
      product.finalPrice = priceVal * (1 - discount / 100);
    }
    if (price) {
      let discountVal = discount ?? product.discount;
      product.finalPrice = price * (1 - discountVal / 100);
    }
    const coverImageLocalPath = req?.files?.coverImage?.[0]?.path;
    if (coverImageLocalPath) {
      const coverImageUrl = await uploadOnCloudinary(coverImageLocalPath);
      if (!coverImageUrl) {
        return res.status(500).json({ message: "Cover image upload failed" });
      }
      product.coverImage = coverImageUrl;
    } else {
      product.coverImage = product.coverImage;
    }

    if (req.files && req.files?.images?.length > 0) {
      const imagesPromises = req.files.images.map(async (image) => {
        const imageUrl = uploadOnCloudinary(image.path);
        return imageUrl;
      });
      try {
        const imageUrls = await Promise.all(imagesPromises);
     const imagesDeletePromises=   product.images.map(async (image) => {
          await deleteFromCloudinary(image);
        })
        await Promise.all(imagesDeletePromises);
        product.images = imageUrls;
      } catch (error) {
        return res.status(500).json({ message: "Image upload failed", error });
      }
    } else {
      product.images = product.images;
    }

    const updatedProduct = await product.save();

    return res
      .status(200)
      .json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.log("update product error", error);
    res.status(500).json({ message: "update product server error" });
  }
};

const GetAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .populate([
        {
          path: "category",
        }
      ]);
    return res.status(200).json({ message: "All products", products });
  } catch (error) {
    console.log("get all products error", error);
    res.status(500).json({ message: "get all products server error" });
  }
};

const GetSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Product id is required" });
    }
    const product = await Product.findById(id).sort({ createdAt: -1 });
    return res.status(200).json({ message: "Single product", product });
  } catch (error) {
    console.log("get single product error", error);
    res.status(500).json({ message: "get single product server error" });
  }
};

const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Product id is required" });
    }
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    await Category.findByIdAndUpdate(product.category, {
      $pull: { products: product._id },
    });
    return res
      .status(200)
      .json({ message: "Product deleted successfully", product });
  } catch (error) {
    console.log("delete product error", error);
    res.status(500).json({ message: "delete product server error" });
  }
};

const GetAllColors = async (req, res) => {
  try {
    const uniqueColors = await Product.distinct("colorName");
  return res.status(200).json({ colors: uniqueColors });
  } catch (error) {
    console.log("get all colors error", error);
    res.status(500).json({ message: "get all colors server error" });
  }
}

const GetFeatureProducts = async (req, res) => {
  try {
    const featureProducts = await Product.find({ isFeaturedProduct: true });
    return res.status(200).json({ message: "Feature products", featureProducts });
  } catch (error) {
    console.log("get feature products error", error);
    res.status(500).json({ message: "get feature products server error" });
  }   
}


export {
  CreateProduct,
  UpdateProduct,
  GetAllProducts,
  GetSingleProduct,
  DeleteProduct,
  GetAllColors,
  GetFeatureProducts
};
