import mongoose from "mongoose";
import { Cart } from "../model/cart.model.js";
import { Product } from "../model/product.model.js";
import { User } from "../model/user.model.js";

const AddToCart = async (req, res) => {
  try {
    const { id: userId } = req?.user;
    const { items } = req.body || {};

    if (!userId || !items || items.length === 0) {
      return res.status(400).json({ message: "userId and items are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const cart =
      (await Cart.findOne({ userId })) ||
      new Cart({ userId, items: [], totalAmount: 0 });

    let totalAmount = cart.totalAmount;

    for (let i = 0; i < items.length; i++) {
      const { productId, quantity } = items[i];
      if (
        !productId ||
        !quantity ||
        quantity <= 0 ||
        !mongoose.Types.ObjectId.isValid(productId)
      ) {
        return res
          .status(400)
          .json({ message: "Valid productId and quantity are required" });
      }

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(400).json({ message: "Product not found" });
      }

      const existingItemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (existingItemIndex > -1) {
        const existingItem = cart.items[existingItemIndex];

        const newQuantity = existingItem.quantity + quantity;

        if (newQuantity > product.stock) {
   
          return res
            .status(400)
            .json({
              message: `Only ${product.stock} units available for ${product.productName}`,
            });
        }

        cart.items[existingItemIndex].quantity = newQuantity;
        totalAmount +=
          quantity * (product.price * (1 - product.discount / 100));
      } else {
        if (quantity > product.stock) {
          return res
            .status(400)
            .json({
              message: `Only ${product.stock} units available for ${product.productName}`,
            });
        }

        cart.items.push({ productId, quantity });
        totalAmount +=
          quantity * (product.price * (1 - product.discount / 100));
      }
    }

    cart.totalAmount = totalAmount;
 const updatedCart =   await cart.save();

    return res.status(200).json({ message: "Cart updated successfully",updatedCart });
  } catch (error) {
    console.error("Error in AddToCart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

 const UpdateCartQuantity = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { productId, action } = req.body || {};
    if (!action) {
      return res.status(400).json({ message: "action is required" });
    }
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(productId)
    ) {
      return res.status(400).json({ message: "Invalid userId or productId" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const item = cart.items[itemIndex];

    if (action === "increase") {
      if (item.quantity + 1 > product.stock) {
        return res
          .status(400)
          .json({
            message: `Cannot exceed stock. Available: ${product.stock}`,
          });
      }
      item.quantity += 1;
    } else if (action === "decrease") {
      if (item.quantity === 1) {
        return res
          .status(400)
          .json({ message: "Quantity cannot be less than 1" });
      }
      item.quantity -= 1;
    } else {
      return res
        .status(400)
        .json({ message: "Invalid action. Use 'increase' or 'decrease'" });
    }

    cart.totalAmount = 0;
    for (const cartItem of cart.items) {
      const productData = await Product.findById(cartItem.productId);
      if (productData) {
        const price =
          productData.price * (1 - (productData.discount || 0) / 100);
        cart.totalAmount += cartItem.quantity * price;
      }
    }

    await cart.save();

    return res.status(200).json({
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    console.error("Error in updateCartQuantity:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
const RemoveFromCart = async (req, res) => {
  try {
    const { id: userId } = req?.user;
    const { productId } = req.body || {};
    
    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: "userId and productId are required" });
    }
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "cart not found" });
    }
    const removedItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );
 
    if(!removedItem){
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (removedItem) {
      const product = await Product.findById(removedItem.productId);
      if (product) {
        cart.totalAmount -=
          removedItem.quantity * (product.price * (1 - product.discount / 100));
      }
    }

    cart.items = cart.items.filter(
      (item) => !(item.productId.toString() === productId)
    );

 const updatedCart =   await cart.save();
    return res
      .status(200)
      .json({ message: "Product removed from cart successfully", updatedCart});
  } catch (error) {
    console.error("Error in RemoveFromCart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const GetCart = async (req, res) => {
  try {
    const { id: userId } = req?.user;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    let subtotal = 0;

    for (let item of cart.items) {
      const product = await Product.findById(item.productId);
      const discountedPrice = product.price * (1 - product.discount / 100);
      subtotal += discountedPrice * item.quantity;
    }

    const shippingCharge = subtotal >= 500 ? 0 : 50;
    return res
      .status(200)
      .json({ message: "Cart found", cart, shippingCharge, subtotal });
  } catch (error) {
    console.error("Error in GetCart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const DeleteCart = async (req, res) => {
  try {
    const { id: userId } = req?.user;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    return res.status(200).json({ message: "Cart emptied successfully" });
  } catch (error) {
    console.error("Error in DeleteCart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { AddToCart, GetCart, DeleteCart, RemoveFromCart, UpdateCartQuantity };
