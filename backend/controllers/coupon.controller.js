import { Coupon } from "../model/coupon.model.js";

const createCoupon = async (req, res) => {
  try {
    const { couponCode, discount,title,isActive } = req.body || {};
    if (!couponCode) {
      return res.status(400).json({ message: "Coupon code is required" });
    }
    const couponExist = await Coupon.findOne({ couponCode });
    if (couponExist) {
      return res.status(400).json({ message: "Coupon code already exist" });
    }
    if (!discount) {
      return res.status(400).json({ message: "Discount is required" });
    }
    if(!title){
      return res.status(400).json({ message: "Title is required" });
    }
    if (discount < 0) {
      return res
        .status(400)
        .json({ message: "Discount should be greater than or equal to 0" });
    }
    const newCoupon = await Coupon.create({ couponCode, discount,title,isActive });
    return res
      .status(201)
      .json({ message: "Coupon created successfully", newCoupon });
  } catch (error) {
    console.log("create coupon error", error);
    res.status(500).json({ message: "create coupon server error" });
  }
};

const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Coupon id is required" });
    }
    const { couponCode, discount,title,isActive } = req.body || {};

    const couponExist = await Coupon.findOne({ couponCode });
    if (couponExist && couponExist._id.toString() !== id) {
      return res.status(400).json({ message: "Coupon code already exist" });
    }
    const updatedCoupon = await Coupon.findByIdAndUpdate(id, {
      couponCode,
      discount,
      title,
      isActive
    }, { new: true });
    return res.status(200).json({
      message: "coupon updated successfully",
      updatedCoupon,
    });
  } catch (error) {
    console.log("update coupon error", error);
    return res.status(500).json({
      message: "coupon update error",
      error: error.message,
    });
  }
};

const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    return res.status(200).json({
      message: "Coupons retrieved successfully",
      coupons,
    });
  } catch (error) {
    console.log("get all coupons error", error);
    return res.status(500).json({
      message: "Failed to retrieve coupons",
      error: error.message,
    });
  }
};

const getSingleCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Coupon ID is required" });
    }
    const coupon = await Coupon.findById(id);
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    return res.status(200).json({
      message: "Coupon retrieved successfully",
      coupon,
    });
  } catch (error) {
    console.log("get single coupon error", error);
    return res.status(500).json({
      message: "Failed to retrieve coupon",
      error: error.message,
    });
  }
};

const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Coupon ID is required" });
    }
    const deletedCoupon = await Coupon.findByIdAndDelete(id);
    if (!deletedCoupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    return res.status(200).json({
      message: "Coupon deleted successfully",
      deletedCoupon,
    });
  } catch (error) {
    console.log("delete coupon error", error);
    return res.status(500).json({
      message: "Failed to delete coupon",
      error: error.message,
    });
  }
};

export {
  createCoupon,
  updateCoupon,
  getAllCoupons,
  getSingleCoupon,
  deleteCoupon,
};
