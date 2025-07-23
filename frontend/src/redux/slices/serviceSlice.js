import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import base_url from "../base_url";
import axios from "axios";

export const addService = createAsyncThunk(
  "serviceSlice/addService",
  async (serviceData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${base_url}/services/add`,
        serviceData,
        {
          headers: {
            Authorization: `token ${localStorage.getItem("token")}`,
          },
        }
      );
      const { message, service } = response.data;
      console.log(response.data);
      return { message, service };
    } catch (error) {
      console.error("ADD SERVICE ERROR:", error.response || error);
      return rejectWithValue({
        message: error.response?.data?.message || "service Adding Failed",
      });
    }
  }
);

export const getUserServices = createAsyncThunk(
  "serviceSlice/getUserServices",
  async () => {
    try {
      const response = await axios.get(`${base_url}/services/`,
                {
          headers: {
            Authorization: `token ${localStorage.getItem("token")}`,
          },
        }
      );
      const { message, serviceList } = response.data;
      console.log(response.data);
      return { message, serviceList };
    } catch (error) {
      console.error(error);
    }
  }
);

const serviceSlice = createSlice({
  name: "serviceSlice",
  initialState: {
    services: [],
    isLoading: false,
    isUpdating: false,
    successResponse: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // get services
    builder.addCase(getUserServices.fulfilled, (state, action) => {
      state.services = action.payload.serviceList;
      state.isLoading= false;
      state.error = "";
      state.successResponse = action.payload.message;
    });
    builder.addCase(getUserServices.pending, (state, action) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(getUserServices.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    });

    // add service
    builder.addCase(addService.fulfilled, (state, action) => {
      state.services.push(action.payload.service);
      state.isUpdating = false;
      state.error = "";
      state.successResponse = action.payload.message;
    });
    builder.addCase(addService.pending, (state, action) => {
      state.isUpdating = true;
      state.error = "";
    });
    builder.addCase(addService.rejected, (state, action) => {
      state.isUpdating = false;
      state.error = action.payload.message;
    });
  },
});

export default serviceSlice.reducer;
