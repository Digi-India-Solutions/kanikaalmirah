import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import categoryReducer from "./slices/categorySlice";

import contactReducer from "./slices/contactSlice";


import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,

    category: categoryReducer,
    contact: contactReducer,

    cart: cartReducer,

  },
});
