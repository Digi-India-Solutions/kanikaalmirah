import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts, getProductByCategory, getProductDetails } from "@/services/products";

// Fetch all products
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await getAllProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch product details by ID
export const fetchProductDetails = createAsyncThunk(
  "products/fetchDetails",
  async (id, thunkAPI) => {
    try {
      return await getProductDetails(id); // pass id to API call
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (categoryId, thunkAPI) => {
    try {
      return await getProductByCategory(categoryId); // pass category to API call
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)
const productSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    categoryProducts:[],
    categoryName:"",
    selectedProduct: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // All products
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Single product
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchProductByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryProducts = action.payload?.products;
        state.categoryName=action.payload?.categoryName
      })
      .addCase(fetchProductByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default productSlice.reducer;
