import { Cart } from "../model/cart.model.js";
import { Checkout } from "../model/checkout.model.js";
import ShortUniqueId from "short-unique-id";
import Razorpay from "razorpay";
import { Product } from "../model/product.model.js";

import { Coupon } from "../model/coupon.model.js";
import crypto from 'crypto';
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


const CreateCheckout = async (req, res) => {
  try {
    const { id: userId } = req?.user;
    if(!userId){
      return res.status(400).json({message:"userId is required"});
    }
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      landMark,
      couponCode,
      paymentMethod
    } = req.body || {};

    if (
      [
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        state,
        pincode,
        landMark,
      ].some((item) => !item)
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: "Cart is empty" });
    }
    let shippingCost = 50;
    let orderTotal = cart?.totalAmount;
    if (orderTotal >= 500) shippingCost = 0;

    const uid = new ShortUniqueId({ length: 6, dictionary: "alphanum_upper" });
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const now = new Date();
    const timePart = now
  .toTimeString()
  .split(" ")[0]
  .replace(/:/g, "");
    const orderId = `ORD-${datePart}${timePart}-${uid.rnd()}`;

    let discount=0
    if(couponCode){
    const coupon=  await Coupon.findOne({couponCode,isActive:true})
    if(!coupon){
      return res.status(404).json({message:"Coupon not found"})
    }
    if(coupon.discount>orderTotal){
      return res.status(400).json({message:"Coupon discount is greater than order total"})
    }
    discount=coupon.discount
    orderTotal=orderTotal-coupon.discount
    }

    orderTotal += shippingCost;


    let razorpayOrder = null;
    if (paymentMethod === "Online") {
     try {
       razorpayOrder = await razorpay.orders.create({
         amount: Math.round(orderTotal * 100), 
         currency: "INR",
         receipt: orderId,
         notes: {
           userId: userId.toString(),
           couponCode: couponCode || "",
         }
       });
     } catch (error) {
       console.error("Error in razorpay order:", error);
       return res.status(500).json({ message: error?.error?.description || "Internal server error" });
      
     }
    }
 
 const checkout =  await Checkout.create({
      orderUniqueId: orderId,
      userId,
      totalAmount: orderTotal *100,
      shippingCost,
      items: cart.items,
      couponCode: couponCode || null,
      couponDiscount: discount,
      paymentMethod,
      shippingAddress: {
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        state,
        pincode,
        landMark,
      },
      paymentStatus: paymentMethod === "COD" ? "Pending" : "Pending",
      paymentInfo: razorpayOrder
        ? {
            orderId: razorpayOrder.id,
          
          }
        : {},
    });

    if(paymentMethod==="COD"){
      const cart = await Cart.findOne({ userId: req?.user?.id });
      cart.items.length > 0 && cart.items.forEach(async (item) => {
       const product = await Product.findById(item.productId);
       if (product) {
         product.stock -= item.quantity;
         await product.save();
       }
      })
      cart.items = [];
      cart.totalAmount = 0;
      await cart.save();
    }
    return res.status(200).json({ message: "Order created successfully", checkout });
  } catch (error) {
    console.error("Error in CreateCheckout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verifyPayment = async(req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};

  const sign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (sign === razorpay_signature) {
   
    await Checkout.findOneAndUpdate(
      { "paymentInfo.orderId": razorpay_order_id },
      {
        $set: {
          "paymentStatus": "Paid",
          "paymentInfo.paymentId": razorpay_payment_id,
          "paymentInfo.razorpaySignature": razorpay_signature,
        }
      },
      { new: true }
    );
    const cart = await Cart.findOne({ userId: req?.user?.id });
 cart.items.length > 0 && cart.items.forEach(async (item) => {
  const product = await Product.findById(item.productId);
  if (product) {
    product.stock -= item.quantity;
    await product.save();
  }
 })
 cart.items = [];
 cart.totalAmount = 0;
 await cart.save();
    return res.status(200).json({ success: true, message: "Payment verified" });
  } else {
    return res.status(400).json({ success: false, message: "Invalid signature" });
  }
};

const GetAllOrders=async(req,res)=>{
  try {
    const orders=await Checkout.find();
    return res.status(200).json({message:"All orders",orders});
  } catch (error) {
    return res.status(500).json({message:"Internal server error",error});
  }
}

const GetSingleOrder=async(req,res)=>{
  try {
   const user=req?.user;
    const order=await Checkout.find({userId:user?.id}).populate("items.productId");
    return res.status(200).json({message:"Order found",order});
  } catch (error) {
    return res.status(500).json({message:"Internal server error",error});
  }
}

const GetOrderById=async(req,res)=>{
  try {
    const user=req?.user;
    if(user?.role!=="admin"){
      return res.status(403).json({message:"Unauthorized ! Don't try to be smart you are not admin"})
    }
    const {id}=req.params;
    const order=await Checkout.findById(id).populate("items.productId");
    return res.status(200).json({message:"Order found",order});
  } catch (error) {
    return res.status(500).json({message:"Internal server error",error});
  }
}
const UpdateCheckout=async(req,res)=>{
try {
  const user=req?.user;
  if(user?.role!=="admin"){
    return res.status(403).json({message:"Unauthorized ! Don't try to be smart you are not admin"})
  }
  const {id}=req.params;
  const {orderStatus,paymentStatus}=req.body || {};
  const checkout=await Checkout.findById(id)
  checkout.paymentStatus=paymentStatus ?? checkout.paymentStatus;
  checkout.orderStatus=orderStatus ?? checkout.orderStatus;
  await checkout.save()
} catch (error) {
  console.log("update checkout error",error);
  
  return res.status(500).json({message:"Internal server error",error});

}
}
export { CreateCheckout,GetAllOrders,GetSingleOrder,verifyPayment,GetOrderById,UpdateCheckout };