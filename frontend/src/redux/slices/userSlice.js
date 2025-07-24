import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import base_url from "../base_url";

export const loginUser = createAsyncThunk(
  "userSlice/loginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const loginResponse = await axios.post(
        `${base_url}/users/login`,
        loginData
      );
      console.log(loginResponse);
      const { token, user, message } = loginResponse.data;
      localStorage.setItem("token", token);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
      return { token, user, message };
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "login Failed",
      });
    }
  }
);

export const registerUser = createAsyncThunk(
  "userSlice/registerUser",
  async (registerData, { rejectWithValue }) => {
    try {
      const registerResponse = await axios.post(
        `${base_url}/register`,
        registerData
      );
      const { token, user, message } = registerResponse.data;
      localStorage.setItem("token", token);
      sessionStorage.setItem("token", token);
      return { token, user, message };
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "login Failed",
      });
    }
  }
);

export const updateUser = createAsyncThunk(
  "userSlice/updateUser",
  async ({ userId, formData }, { rejectWithValue }) => {
    try {
      console.log(userId);
      const response = await axios.put(
        `${base_url}/users/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `token ${localStorage.getItem("token")}`,
          },
        }
      );
      const { message, updatedUser } = response.data;
      console.log("User updated successfully:", response.data);
      return { message, updatedUser };
    } catch (error) {
      console.error(error);
      return rejectWithValue({
        message: error.response?.data?.message || "Failed To Update User",
      });
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: {},
    token: "",
    isAuthenticated: false,
    isLoading: false,
    isUpdating : false,
    error: "",
  },
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    // login user
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

    // register user
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

    // update User
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload.updatedUser;
      state.isUpdating = false;
      state.error = null;
      // state.successResponse = action.payload.message;
    });
    builder.addCase(updateUser.pending, (state, action) => {
      state.isUpdating = true;
      state.error = null;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isUpdating = false;
      state.error = action.payload?.message || "Failed to update User";
    });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
