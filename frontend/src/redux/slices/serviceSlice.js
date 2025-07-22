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
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("ADD SERVICE ERROR:", error.response || error);
      return rejectWithValue({
        message: error.response?.data?.message || "service Adding Failed",
      });
    }
  }
);

const serviceSlice = createSlice({
  name: "serviceSlice",
  initialState: {
    services: {},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addService.fulfilled, (state, action) => {
      state.services = action.payload;
      state.isLoading = false;
      state.error = "";
    });
    builder.addCase(addService.pending, (state, action) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(addService.failed, (state, action) => {
      state.isLoading = false;
      //   state.error = action.payload.message;
    });
  },
});
