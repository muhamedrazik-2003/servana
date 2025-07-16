import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = "http://localhost:3000/api/users";

export const loginUser = createAsyncThunk("auth/loginUser", async (loginData) => {
  const loginResponse = await axios.post(`${base_url}/login`, loginData);
  console.log(loginResponse.data);
  return loginResponse.data;
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
    });
  },
});

export default authSlice.reducer;
