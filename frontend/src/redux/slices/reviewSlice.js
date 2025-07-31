import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import base_url from "../base_url";

export const addNewReview = createAsyncThunk(
  "reviewSlice/addNewReview",
  async (newReview, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}/reviews/new`, newReview, {
        headers: {
          Authorization: `token ${sessionStorage.getItem("token")}`,
        },
      });
      const { message, newReviewData } = response.data;
      console.log("Review added successfully:", response.data);
      return { message, newReviewData };
    } catch (error) {
      console.error("ADD REVIEW ERROR:", error.response || error);
      return rejectWithValue({
        message: error.response?.data?.message || "Review Adding Failed",
      });
    }
  }
);

export const getAllReviews = createAsyncThunk(
  "reviewSlice/getAllReviews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/reviews/all`, {
        headers: {
          Authorization: `token ${sessionStorage.getItem("token")}`,
        },
      });
      const { message, reviewList } = response.data;
      console.log("All reviews retrieved:", response.data);
      return { message, reviewList };
    } catch (error) {
      console.error(error);
      return rejectWithValue({
        message:
          error.response?.data?.message || "Failed To retrieve All reviews",
      });
    }
  }
);
export const getAllProviderReviews = createAsyncThunk(
  "reviewSlice/getAllProviderReviews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/reviews/all/provider`, {
        headers: {
          Authorization: `token ${sessionStorage.getItem("token")}`,
        },
      });
      const { message, reviewList } = response.data;
      console.log("All Provider reviews retrieved:", response.data);
      return { message, reviewList };
    } catch (error) {
      console.error(error);
      return rejectWithValue({
        message:
          error.response?.data?.message || "Failed To retrieve All Provider reviews",
      });
    }
  }
);
export const getServiceReviews = createAsyncThunk(
  "reviewSlice/getServiceReviews",
  async (serviceId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/reviews/${serviceId}`, {
        headers: {
          Authorization: `token ${sessionStorage.getItem("token")}`,
        },
      });
      const { message, reviewList } = response.data;
      console.log("service Reviews retrieved:", response.data);
      return { message, reviewList };
    } catch (error) {
      console.error(error);
      return rejectWithValue({
        message:
          error.response?.data?.message || "Failed To retrieve service Reviews",
      });
    }
  }
);

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState: {
    reviews: [],
    isReviewLoading: false,
    isAdding: false,
    isUpdating: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //add new review
    builder.addCase(addNewReview.fulfilled, (state, action) => {
      state.reviews.push(action.payload.newReviewData);
      state.isAdding = false;
      state.error = null;
    });
    builder.addCase(addNewReview.pending, (state, action) => {
      state.isAdding = true;
      state.error = null;
    });
    builder.addCase(addNewReview.rejected, (state, action) => {
      state.isAdding = false;
      state.error = action.payload.message || "Failed to Add Booking";
    });

    // get all reviews
    builder.addCase(getAllReviews.fulfilled, (state, action) => {
      state.reviews = action.payload.reviewList || [];
      state.isReviewLoading = false;
      state.error = null;
    });
    builder.addCase(getAllReviews.pending, (state, action) => {
      state.isReviewLoading = true;
      state.error = null;
    });
    builder.addCase(getAllReviews.rejected, (state, action) => {
      state.isReviewLoading = false;
      state.error = action.payload.message || "Failed to retrieve all Reviews";
    });
    // get all Provider reviews
    builder.addCase(getAllProviderReviews.fulfilled, (state, action) => {
      state.reviews = action.payload.reviewList || [];
      state.isReviewLoading = false;
      state.error = null;
    });
    builder.addCase(getAllProviderReviews.pending, (state, action) => {
      state.isReviewLoading = true;
      state.error = null;
    });
    builder.addCase(getAllProviderReviews.rejected, (state, action) => {
      state.isReviewLoading = false;
      state.error = action.payload.message || "Failed to retrieve all Reviews";
    });

    // get user reviews
    builder.addCase(getServiceReviews.fulfilled, (state, action) => {
      state.reviews = action.payload.reviewList || [];
      state.isReviewLoading = false;
      state.error = null;
    });
    builder.addCase(getServiceReviews.pending, (state, action) => {
      state.isReviewLoading = true;
      state.error = null;
    });
    builder.addCase(getServiceReviews.rejected, (state, action) => {
      state.isReviewLoading = false;
      state.error =
        action.payload.message || "Failed to retrieve service reviews";
    });
  },
});

export default reviewSlice.reducer;
