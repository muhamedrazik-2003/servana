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
      console.log("Service added successfully:", response.data);
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
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/services/`, {
        headers: {
          Authorization: `token ${localStorage.getItem("token")}`,
        },
      });
      const { message, serviceList } = response.data;
      console.log("Services retrieved:", response.data);
      return { message, serviceList };
    } catch (error) {
      console.error(error);
      return rejectWithValue({
        message: error.response?.data?.message || "Failed To retrieve Services",
      });
    }
  }
);

export const updateServices = createAsyncThunk(
  "serviceSlice/updateServices",
  async ({serviceId, formData}, { rejectWithValue }) => {
    try {
      console.log(serviceId)
      const response = await axios.put(
        `${base_url}/services/update/${serviceId}`,
        formData,
        {
          headers: {
            Authorization: `token ${localStorage.getItem("token")}`,
          },
        }
      );
      const { message, service } = response.data;
      console.log("Service added successfully:", response.data);
      return { message, service };
    } catch (error) {
      console.error(error);
      return rejectWithValue({
        message: error.response?.data?.message || "Failed To Update Services",
      });
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
      state.services = action.payload.serviceList || [];
      state.isLoading = false;
      state.error = null;
      state.successResponse = action.payload.message;
    });
    builder.addCase(getUserServices.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getUserServices.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message || "Failed to retrieve services";
    });

    // add service
    builder.addCase(addService.fulfilled, (state, action) => {
      state.services.push(action.payload.service);
      state.isUpdating = false;
      state.error = null;
      state.successResponse = action.payload.message;
    });
    builder.addCase(addService.pending, (state, action) => {
      state.isUpdating = true;
      state.error = null;
    });
    builder.addCase(addService.rejected, (state, action) => {
      state.isUpdating = false;
      state.error = action.payload?.message || "Failed to add service";
    });

    // update service
    builder.addCase(updateServices.fulfilled, (state, action) => {
      state.services.push(action.payload.service);
      state.isUpdating = false;
      state.error = null;
      state.successResponse = action.payload.message;
    });
    builder.addCase(updateServices.pending, (state, action) => {
      state.isUpdating = true;
      state.error = null;
    });
    builder.addCase(updateServices.rejected, (state, action) => {
      state.isUpdating = false;
      state.error = action.payload?.message || "Failed to update service";
    });
  },
});

export default serviceSlice.reducer;
