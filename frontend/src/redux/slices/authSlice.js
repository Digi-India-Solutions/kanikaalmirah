import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signUp,
  signIn,
  forgotPassword,
  checkAuthUser,
  fetchBannerImages,
  fetchCertificateImages,
  fetchAllCoupons,
  axiosInstance,
} from "@/services/auth";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
 
    try {
      return await signUp(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
 
    try {
    const response=  await signIn(userData);
    const cart=JSON.parse(localStorage.getItem("cart")) || [];
    if(cart.length>0){
      try {
        await axiosInstance.post("/api/v1/cart/add-to-cart", { "items":cart });
        localStorage.removeItem("cart");
      } catch (error) {
        console.log(error?.response?.data?.message||"Not enough stock, skipping"); 
      }
    }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const forgotPasswordUser = createAsyncThunk(
  "auth/forgotPasswordUser",
  async (userData, thunkAPI) => {
  
    try {
      return await forgotPassword(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const checkUserAuth = createAsyncThunk(
  "auth/checkUserAuth",
  async (_, thunkAPI) => {
    try {
      const res = await checkAuthUser();
      return res.user; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const bannerImages = createAsyncThunk(
  "auth/bannerImages",
  async (_, thunkAPI) => {
    try {
      return await fetchBannerImages();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const certificateImages = createAsyncThunk(
  "auth/certificateImages",
  async (_, thunkAPI) => {
    try {
      return await fetchCertificateImages();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (payload, thunkAPI) => {
    try {
      return await axiosInstance.put("/api/v1/auth/update-profile", payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)
export const allCoupons = createAsyncThunk(
  "auth/allCoupons",
  async (_, thunkAPI) => {
    try {
      return await fetchAllCoupons();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    userDetails: null,
    error: null,
    loading: false,
    certificates: [],
    coupons: [],
    banners: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(forgotPasswordUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPasswordUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(forgotPasswordUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.user = null;
      })
      .addCase(bannerImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bannerImages.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload;
        state.error = null;
      })
      .addCase(bannerImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(certificateImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(certificateImages.fulfilled, (state, action) => {
        state.loading = false;
        state.certificates = action.payload.certificates;
        state.error = null;
      })
      .addCase(certificateImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(allCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
        state.error = null;
      })
      .addCase(allCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
