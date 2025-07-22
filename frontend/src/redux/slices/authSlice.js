import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import base_url from "../base_url";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const loginResponse = await axios.post(`${base_url}/users/login`, loginData);
      console.log(loginResponse);
      const { token, user, message } = loginResponse.data;
      localStorage.setItem("token", token);
      return { token, user, message };
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "login Failed",
      });
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (registerData, { rejectWithValue }) => {
    try {
      const registerResponse = await axios.post(
        `${base_url}/register`,
        registerData
      );
      const { token, user, message } = registerResponse.data;
      localStorage.setItem("token", token);
      return { token, user, message };
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "login Failed",
      });
    }
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: {},
    token: "",
    isAuthenticated: false,
    isLoading: false,
    error: "",
  },
  reducers: {
    clearError : (state) => {
      state.error = ""
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = "";
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = "";
    });
    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    });
  },
});

export const {clearError} = authSlice.actions;
export default authSlice.reducer;
