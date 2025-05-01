import {
  fetchHomeCategories,
  getAllCategories,
  getCategoryDetails,
} from "@/services/category";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllCategories = createAsyncThunk(
  "category/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await getAllCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchHomeCategory = createAsyncThunk(
  "products/fetchHomeAll",
  async (_, thunkAPI) => {
    try {
      return await fetchHomeCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchCategoryDetails = createAsyncThunk(
  "category/fetchDetails",
  async (id, thunkAPI) => {
    try {

      return await getCategoryDetails(id); // pass id to API call
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const categorySlice = createSlice({
  name: "category",
  initialState: {
    allCategory: [],

    homeCategory:[],
    selectedCategory: [],

    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.allCategory = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchHomeCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.homeCategory = action.payload;
      })
      .addCase(fetchHomeCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCategoryDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCategory = action.payload;
    
      })
      .addCase(fetchCategoryDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
