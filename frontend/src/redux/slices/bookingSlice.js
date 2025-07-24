import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import base_url from "../base_url";

export const addNewBooking = createAsyncThunk(
  "bookingSlice/addNewBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${base_url}/bookings/new`,
        serviceData,
        {
          headers: {
            Authorization: `token ${sessionStorage.getItem("token")}`,
          },
        }
      );
      const { message, bookingData } = response.data;
      console.log("Service added successfully:", response.data);
      return { message, bookingData };
    } catch (error) {
      console.error("ADD SERVICE ERROR:", error.response || error);
      return rejectWithValue({
        message: error.response?.data?.message || "Booking Adding Failed",
      });
    }
  }
);

export const getAllBookings = createAsyncThunk(
  "bookingSlice/getUserBookings",
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
        message: error.response?.data?.message || "Failed To retrieve All Bookings",
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
        message: error.response?.data?.message || "Failed To retrieve user Bookings",
      });
    }
  }
);


const bookingSlice = createSlice({
    name: "bookingSlice",
    initialState: {
        bookings: [],
        isLoading:false,
        isUpdating: false,
        error:null,
    },
    reducers: {

    },
    extraReducers: (builder) => {

    }
})

export default bookingSlice.reducer;