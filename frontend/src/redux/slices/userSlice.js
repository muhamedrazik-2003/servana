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

export const getAllSeekers = createAsyncThunk(
  "serviceSlice/getAllSeekers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/users/seekers`, {
        headers: {
          Authorization: `token ${sessionStorage.getItem("token")}`,
        },
      });
      const { message, allSeekers } = response.data;
      console.log("All Seekers Data retrieved:", response.data);
      return { message, allSeekers };
    } catch (error) {
      console.log("An Error Occured", error);
      console.error(error);
      return rejectWithValue({
        message:
          error.response?.data?.message || "Failed retrieve all Seekers data",
      });
    }
  }
);
export const getAllProviders = createAsyncThunk(
  "serviceSlice/getAllProviders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/users/providers`, {
        headers: {
          Authorization: `token ${sessionStorage.getItem("token")}`,
        },
      });
      const { message, allProviders } = response.data;
      console.log("All Providers Data retrieved:", response.data);
      return { message, allProviders };
    } catch (error) {
      console.log("An Error Occured", error);
      console.error(error);
      return rejectWithValue({
        message:
          error.response?.data?.message || "Failed retrieve all Providers Data",
      });
    }
  }
);
const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: {},
    seekers: [],
    providers: [],
    token: "",
    isAuthenticated: false,
    isLoading: false,
    isSeekerLoading: false,
    isProviderLoading: false,
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

    // get all seekers
        builder.addCase(getAllSeekers.fulfilled, (state, action) => {
          state.seekers = action.payload.allSeekers || []
          state.isSeekerLoading = false;
          state.error = null;
          state.successResponse = action.payload.message;
        });
        builder.addCase(getAllSeekers.pending, (state, action) => {
          state.isSeekerLoading = true;
          state.error = null;
        });
        builder.addCase(getAllSeekers.rejected, (state, action) => {
          state.isSeekerLoading = false;
          state.error = action.payload.message || "Failed to retrieve Seekers Data";
        });

    // get all Providers
        builder.addCase(getAllProviders.fulfilled, (state, action) => {
          state.providers = action.payload.allProviders || []
          state.isProviderLoading = false;
          state.error = null;
          state.successResponse = action.payload.message;
        });
        builder.addCase(getAllProviders.pending, (state, action) => {
          state.isProviderLoading = true;
          state.error = null;
        });
        builder.addCase(getAllProviders.rejected, (state, action) => {
          state.isProviderLoading = false;
          state.error = action.payload.message || "Failed to retrieve Providers Data";
        });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
