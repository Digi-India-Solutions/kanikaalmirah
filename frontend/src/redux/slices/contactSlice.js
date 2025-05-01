import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createContactEnquiry } from "@/services/contact"; // adjust path if needed

// Async thunk
export const contactEnquiry = createAsyncThunk(
  "contact/contactEnquiry",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await createContactEnquiry(formData);
      return response; // whole response with message and newInquiry
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(contactEnquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(contactEnquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(contactEnquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Something went wrong.";
      });
  },
});

export default contactSlice.reducer;
