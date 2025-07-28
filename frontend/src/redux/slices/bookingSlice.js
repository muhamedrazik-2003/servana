import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import base_url from "../base_url";

export const addNewBooking = createAsyncThunk(
  "bookingSlice/addNewBooking",
  async (updatedBookingData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${base_url}/bookings/new`,
        updatedBookingData,
        {
          headers: {
            Authorization: `token ${sessionStorage.getItem("token")}`,
          },
        }
      );
      const { message, bookingList } = response.data;
      console.log("Service added successfully:", response.data);
      return { message, bookingList };
    } catch (error) {
      console.error("ADD SERVICE ERROR:", error.response || error);
      return rejectWithValue({
        message: error.response?.data?.message || "Booking Adding Failed",
      });
    }
  }
);

export const getAllBookings = createAsyncThunk(
  "bookingSlice/getAllBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/bookings/`, {
        headers: {
          Authorization: `token ${sessionStorage.getItem("token")}`,
        },
      });
      const { message, bookingList } = response.data;
      console.log("All Services retrieved:", response.data);
      return { message, bookingList };
    } catch (error) {
      console.error(error);
      return rejectWithValue({
        message:
          error.response?.data?.message || "Failed To retrieve All Bookings",
      });
    }
  }
);
export const getUserBookings = createAsyncThunk(
  "bookingSlice/getUserBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/bookings/user`, {
        headers: {
          Authorization: `token ${sessionStorage.getItem("token")}`,
        },
      });
      const { message, bookingList } = response.data;
      console.log("Services retrieved:", response.data);
      return { message, bookingList };
    } catch (error) {
      console.error(error);
      return rejectWithValue({
        message:
          error.response?.data?.message || "Failed To retrieve user Bookings",
      });
    }
  }
);

const bookingSlice = createSlice({
  name: "bookingSlice",
  initialState: {
    bookings: [],
    isLoading: false,
    isBooking: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //add new Booking
    builder.addCase(addNewBooking.fulfilled, (state, action) => {
      state.bookings.push(action.payload.bookingList);
      state.isBooking = false;
      state.error = null;
      state.successResponse = action.payload.message;
    });
    builder.addCase(addNewBooking.pending, (state, action) => {
      state.isBooking = true;
      state.error = null;
    });
    builder.addCase(addNewBooking.rejected, (state, action) => {
      state.isBooking = false;
      state.error = action.payload.message || "Failed to Add Booking";
    });

    // get user Bookings
    builder.addCase(getUserBookings.fulfilled, (state, action) => {
      state.bookings= action.payload.bookingList || [];
      state.isLoading = false;
      state.error = null;
      state.successResponse = action.payload.message;
    });
    builder.addCase(getUserBookings.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getUserBookings.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.payload.message || "Failed to retrieve user Bookings";
    });

    // get all Bookings
    builder.addCase(getAllBookings.fulfilled, (state, action) => {
      state.bookings = action.payload.bookingList || [];
      state.isLoading = false;
      state.error = null;
      state.successResponse = action.payload.message;
    });
    builder.addCase(getAllBookings.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllBookings.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message || "Failed to retrieve all Bookings";
    });
  },
});

export default bookingSlice.reducer;
