import { axiosInstance } from "./auth.js";

export const getCartItem = async () => {
  const res = await axiosInstance.get("/api/v1/cart/get-cart");

  return res?.data?.cart?.items;
};

export const updateQuanityToServer = async (productId,action) => {

  const res = await axiosInstance.put("/api/v1/cart/update-cart-quantity", { productId,action });

  return res;
};
export const AddToCart = async (items) => {
  const res = await axiosInstance.post("/api/v1/cart/add-to-cart", {
    items: [items],
  });

  return res.updatedCart;
};
