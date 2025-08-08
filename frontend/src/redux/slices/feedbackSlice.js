import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import base_url from "../base_url";

export const addNewFeedback = createAsyncThunk(
  "feedbackSlice/addNewFeedback",
  async (newFeedback, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${base_url}/feedbacks/new`,
        newFeedback
      );
      const { message, newFeedbackData } = response.data;
      // console.log("feedback added successfully:", response.data);
      return { message, newFeedbackData };
    } catch (error) {
      console.error("ADD FEEDBACK ERROR:", error.response || error);
      return rejectWithValue({
        message: error.response?.data?.message || "Feedback Adding Failed",
      });
    }
  }
);

export const getAllFeedbacks = createAsyncThunk(
  "feedbackSlice/getAllFeedbacks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/feedbacks/all`);
      const { message, feedbackList } = response.data;
      // console.log("All feedbacks retrieved:", response.data);
      return { message, feedbackList };
    } catch (error) {
      console.error(error);
      return rejectWithValue({
        message:
          error.response?.data?.message || "Failed To retrieve All feedbacks",
      });
    }
  }
);

const feedbackSlice = createSlice({
  name: "feedbackSlice",
  initialState: {
    feedbacks: [],
    isFeedbackLoading: false,
    error: null,
    isfeedbackAdding: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    //add new feedback
    builder.addCase(addNewFeedback.fulfilled, (state, action) => {
      state.feedbacks.push(action.payload.newFeedbackData);
      state.isfeedbackAdding = false;
      state.error = null;
    });
    builder.addCase(addNewFeedback.pending, (state, action) => {
      state.isfeedbackAdding = true;
      state.error = null;
    });
    builder.addCase(addNewFeedback.rejected, (state, action) => {
      state.isfeedbackAdding = false;
      state.error = action.payload.message || "Failed to Add Booking";
    });

    // get all feedbacks
    builder.addCase(getAllFeedbacks.fulfilled, (state, action) => {
      state.feedbacks = action.payload.feedbackList || [];
      state.isFeedbackLoading = false;
      state.error = null;
    });
    builder.addCase(getAllFeedbacks.pending, (state, action) => {
      state.isFeedbackLoading = true;
      state.error = null;
    });
    builder.addCase(getAllFeedbacks.rejected, (state, action) => {
      state.isFeedbackLoading = false;
      state.error =
        action.payload.message || "Failed to retrieve all feedbacks";
    });
  },
});

export default feedbackSlice.reducer;
