import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = "http://localhost:3000/api/users";

export const loginUser = createAsyncThunk("auth/loginUser", async (loginData) => {
  const loginResponse = await axios.post(`${base_url}/login`, loginData);
  console.log(loginResponse);
  return loginResponse.data;
});

export const registerUser = createAsyncThunk("auth/registerUser", async (registerData) => {
  const registerResponse = await axios.post(`${base_url}/register`, registerData);
  console.log(registerResponse.data);
  return registerResponse.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
    });
    builder.addCase(loginUser.pending, (state, action) => {
        state.loading = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        // state.error = state.payload.status;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
    });
    builder.addCase(registerUser.pending, (state, action) => {
        state.loading = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        // state.error = state.payload.status;
    });
  },
});

export default authSlice.reducer;
