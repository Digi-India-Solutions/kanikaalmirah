import { AddToCart, getCartItem, updateQuanityToServer } from "@/services/cart";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const safeJSONParse = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

export const fetchCartItems = createAsyncThunk(
  "cart/getCartItem",
  async (thunkAPI) => {
    try {
      return await getCartItem();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantityToServer",
  async (payload, thunkAPI) => {
    try {
     
      await updateQuanityToServer(payload.productId, payload.action);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const AddToCartToServer = createAsyncThunk(
  "cart/updateQuantity",
  async (items, thunkAPI) => {
    try {
   
      await AddToCart(items);
      return items;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const initialState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart(state, action) {
      const { productId, quantity, image, price, name, color, size, stock } =
        action.payload;

      const existingItem = state.items?.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items?.push({
          productId,
          quantity,
          image,
          price,
          name,
          color,
          size,
        });
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    removeFromCart(state, action) {
      state.items = state.items?.filter((item) => {
        const id = item?.productId?._id || item?.productId;
        return id !== action.payload.productId;
      });

      if (!state.items?.[0]?.productId?._id) {
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(state.items));
        }
      }
    },
    clearCart(state) {
      state.items = [];
      localStorage.removeItem("cart");
    },
    increaseQuantity(state, action) {
      const { productId } = action.payload;
      const item = state.items?.find((item) => item.productId === productId);
      if (item) {
        item.quantity++;
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    increaseQuantityVal(state, action) {
      const { productId } = action.payload;
      const item = state.items?.find((item) => item.productId === productId);
      if (item) {
        item.quantity++;
      }
    },
  
    decreaseQuantity(state, action) {
      const { productId } = action.payload;

      const item = state?.items?.find((item) => item.productId === productId);

      if (item && item.quantity > 1) {
        item.quantity--;
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    decreaseQuantityVal(state, action) {
      const { productId } = action.payload;

      const item = state?.items?.find((item) => item.productId === productId);

      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
    setCartFromLocalStorage(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(AddToCartToServer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddToCartToServer.fulfilled, (state, action) => {
        state.loading = false;
        const incomingItem = action.payload;
        const index = state.items.findIndex(item => item._id === incomingItem._id);

        if (index == -1) {
          state.items.push(incomingItem);
          
          
        }
        
      })
      .addCase(AddToCartToServer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.loading = false;
       state.items=state.items
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
      
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  setCartFromLocalStorage,
  increaseQuantityVal,
  decreaseQuantityVal
} = cartSlice.actions;

export default cartSlice.reducer;
