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
      const { message, newBookingData } = response.data;
      console.log("Service added successfully:", response.data);
      return { message, newBookingData };
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
      console.log("seeker Bookings retrieved:", response.data);
      return { message, bookingList };
    } catch (error) {
      console.error(error);
      return rejectWithValue({
        message:
          error.response?.data?.message || "Failed To retrieve seeker Bookings",
      });
    }
  }
);

export const getProviderBookings = createAsyncThunk(
  "bookingSlice/getProviderBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/bookings/provider`, {
        headers: {
          Authorization: `token ${sessionStorage.getItem("token")}`,
        },
      });
      const { message, bookingList } = response.data;
      console.log("Provider Bookings retrieved:", response.data);
      return { message, bookingList };
    } catch (error) {
      console.error(error);
      return rejectWithValue({
        message:
          error.response?.data?.message ||
          "Failed To retrieve provider Bookings",
      });
    }
  }
);
export const changeBookingAndPaymentStatus = createAsyncThunk(
  "bookingSlice/changeBookingAndPaymentStatus",
  async ({ bookingId, bookingData }, { rejectWithValue }) => {
    console.log(bookingId, bookingData);
    try {
      const response = await axios.patch(
        `${base_url}/bookings/update/status/${bookingId}`,
        bookingData,
        {
          headers: {
            Authorization: `token ${sessionStorage.getItem("token")}`,
          },
        }
      );
      const { message, updatedBooking } = response.data;
      console.log("Booking Statusd Updated:", response.data);
      return { message, updatedBooking };
    } catch (error) {
      console.error(error);
      return rejectWithValue({
        message:
          error.response?.data?.message || "Failed To update Bookings status",
      });
    }
  }
);

const bookingSlice = createSlice({
  name: "bookingSlice",
  initialState: {
    bookings: [],
    bookingsBackup :[],
    isLoading: false,
    isBooking: false,
    isUpdating: false,
    error: null,
  },
  reducers: {
    handleBookingSearch: (state, action) => {
      const searchKeyword = action.payload.toLowerCase().trim();
      const filtered = state.bookingsBackup.filter((booking) => {
        const searchString =
          `${booking?.serviceId?.title} ${booking?.serviceId?.category} ${booking.serviceId?.subCategory} ${booking?.location?.city} ${booking?.location?.state} ${booking?.providerId?.fullName} ${booking.totalPrice} ${booking.bookingStatus} ${booking.paymentStatus} ${booking.providerId?.fullName} ${booking.scheduledTime} ${booking.scheduledDate} ${booking._id}`.toLowerCase();
          console.log(searchString)
        return searchString.includes(searchKeyword);
      });
      state.bookings = filtered;
      state.keywords = searchKeyword;
      console.log(action.payload);
      console.log(state.bookings);
    },
  },
  extraReducers: (builder) => {
    //add new Booking
    builder.addCase(addNewBooking.fulfilled, (state, action) => {
      state.bookings.push(action.payload.newBookingData);
      state.bookingsBackup.push(action.payload.newBookingData);
      state.isBooking = false;
      state.error = null;
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
      state.bookings = action.payload.bookingList || [];
      state.bookingsBackup = action.payload.bookingList || [];
      state.isLoading = false;
      state.error = null;
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
    // get provider Bookings
    builder.addCase(getProviderBookings.fulfilled, (state, action) => {
      state.bookings = action.payload.bookingList || [];
      state.bookingsBackup = action.payload.bookingList || [];
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(getProviderBookings.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getProviderBookings.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.payload.message || "Failed to retrieve Provider Bookings";
    });

    // get all Bookings
    builder.addCase(getAllBookings.fulfilled, (state, action) => {
      state.bookings = action.payload.bookingList || [];
      state.bookingsBackup = action.payload.bookingList || [];
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(getAllBookings.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllBookings.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message || "Failed to retrieve all Bookings";
    });

    // update booking and payment Satus
    builder.addCase(changeBookingAndPaymentStatus.fulfilled, (state, action) => {
        const filtered = state.bookings.filter(
          (booking) => booking._id !== action.payload.updatedBooking._id
        );
        const backupFiltered = state.bookingsBackup.filter(
          (booking) => booking._id !== action.payload.updatedBooking._id
        );
        filtered.push(action.payload.updatedBooking);
        state.bookings = filtered;
        state.bookingsBackup = backupFiltered;
        state.isUpdating = false;
        state.error = null;
      }
    );
    builder.addCase(changeBookingAndPaymentStatus.pending, (state, action) => {
      state.isUpdating = true;
      state.error = null;
    });
    builder.addCase(changeBookingAndPaymentStatus.rejected, (state, action) => {
      state.isUpdating = false;
      state.error =
        action.payload?.message || "Failed to update Booking Status";
    });
  },
});

export const {handleBookingSearch} = bookingSlice.actions;
export default bookingSlice.reducer;
