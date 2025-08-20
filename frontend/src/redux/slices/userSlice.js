import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import base_url from "../base_url";

export const loginUser = createAsyncThunk(
  "userSlice/loginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const loginResponse = await axios.post(`${base_url}/users/login`,loginData);
      console.log(loginResponse);
      const { token, user, message } = loginResponse.data;
      // localStorage.setItem("token", token);
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
        `${base_url}/users/register`,
        registerData
      );
      const { token, user, message } = registerResponse.data;
      // localStorage.setItem("token", token);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
      return { token, user, message };
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Registration Failed",
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

export const deleteSeeker = createAsyncThunk(
  "userSlice/deleteSeeker",
  async (userId, { rejectWithValue }) => {
    try {
      console.log(userId);
      const response = await axios.delete(
        `${base_url}/users/delete/${userId}`,
        {
          headers: {
            Authorization: `token ${sessionStorage.getItem("token")}`,
          },
        }
      );
      const { message, deletedUser } = response.data;
      console.log("user deleted successfully:", response.data);
      return { message, deletedUser };
    } catch (error) {
      console.error(error);
      return rejectWithValue({
        message: error.response?.data?.message || "Failed To Delete User",
      });
    }
  }
);
export const deleteProvider = createAsyncThunk(
  "userSlice/deleteProvider",
  async (userId, { rejectWithValue }) => {
    try {
      console.log(userId);
      const response = await axios.delete(
        `${base_url}/users/delete/${userId}`,
        {
          headers: {
            Authorization: `token ${sessionStorage.getItem("token")}`,
          },
        }
      );
      const { message, deletedUser } = response.data;
      console.log("User deleted successfully:", response.data);
      return { message, deletedUser };
    } catch (error) {
      console.error(error);
      return rejectWithValue({
        message: error.response?.data?.message || "Failed To Delete User",
      });
    }
  }
);

export const changeSeekerAccountStatus = createAsyncThunk(
  "userSlice/changeSeekerAccountStatus",
  async ({ userId, updatedData }, { rejectWithValue }) => {
    console.log(updatedData);
    try {
      const response = await axios.patch(
        `${base_url}/users/update/status/${userId}`,
        updatedData,
        {
          headers: {
            Authorization: `token ${sessionStorage.getItem("token")}`,
          },
        }
      );
      const { message, updatedUser } = response.data;
      console.log("user Account Status Updated:", response.data);
      return { message, updatedUser };
    } catch (error) {
      console.error(error);
      return rejectWithValue({
        message:
          error.response?.data?.message ||
          "Failed To update User Account status",
      });
    }
  }
);
export const changeProviderAccountStatus = createAsyncThunk(
  "userSlice/changeProviderAccountStatus",
  async ({ userId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${base_url}/users/update/status/${userId}`,
        updatedData,
        {
          headers: {
            Authorization: `token ${sessionStorage.getItem("token")}`,
          },
        }
      );
      const { message, updatedUser } = response.data;
      console.log("user Account Status Updated:", response.data);
      return { message, updatedUser };
    } catch (error) {
      console.error(error);
      return rejectWithValue({
        message:
          error.response?.data?.message ||
          "Failed To update User Account status",
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
    isUpdating: false,
    isDeleting: false,
    error: "",
  },
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
    handleLogout: (state) => {
      state.isAuthenticated = false;
      state.token = "";
      state.user = {};
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    },
    handleAuthentication : (state) => {
      state.isAuthenticated = true
    }
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
      state.isAuthenticated = false;
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isAuthenticated = false;
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
      state.isAuthenticated = false;
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isAuthenticated = false;
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
      state.seekers = action.payload.allSeekers || [];
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
      state.providers = action.payload.allProviders || [];
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
      state.error =
        action.payload.message || "Failed to retrieve Providers Data";
    });

    // delete seeker
    builder.addCase(deleteSeeker.fulfilled, (state, action) => {
      const filtered = state.seekers.filter(
        (user) => user._id !== action.payload.deletedUser._id
      );
      state.seekers = filtered;
      state.isDeleting = false;
      state.error = null;
      state.successResponse = action.payload.message;
    });
    builder.addCase(deleteSeeker.pending, (state, action) => {
      state.isDeleting = true;
      state.error = null;
    });
    builder.addCase(deleteSeeker.rejected, (state, action) => {
      state.isDeleting = false;
      state.error = action.payload?.message || "Failed to delete User";
    });

    // delete provider
    builder.addCase(deleteProvider.fulfilled, (state, action) => {
      const filtered = state.providers.filter(
        (user) => user._id !== action.payload.deletedUser._id
      );
      state.providers = filtered;
      state.isDeleting = false;
      state.error = null;
      state.successResponse = action.payload.message;
    });
    builder.addCase(deleteProvider.pending, (state, action) => {
      state.isDeleting = true;
      state.error = null;
    });
    builder.addCase(deleteProvider.rejected, (state, action) => {
      state.isDeleting = false;
      state.error = action.payload?.message || "Failed to delete User";
    });

    // update seeker Account Status
    builder.addCase(changeSeekerAccountStatus.fulfilled, (state, action) => {
      const filtered = state.seekers.filter(
        (user) => user._id !== action.payload.updatedUser._id
      );

      filtered.push(action.payload.updatedUser);
      state.seekers = filtered;
      state.isUpdating = false;
      state.error = null;
    });
    builder.addCase(changeSeekerAccountStatus.pending, (state, action) => {
      state.isUpdating = true;
      state.error = null;
    });
    builder.addCase(changeSeekerAccountStatus.rejected, (state, action) => {
      state.isUpdating = false;
      state.error = action.payload?.message || "Failed to update user Status";
    });
    // update provider Account Status
    builder.addCase(changeProviderAccountStatus.fulfilled, (state, action) => {
      const filtered = state.providers.filter(
        (user) => user._id !== action.payload.updatedUser._id
      );

      filtered.push(action.payload.updatedUser);
      state.providers = filtered;
      state.isUpdating = false;
      state.error = null;
    });
    builder.addCase(changeProviderAccountStatus.pending, (state, action) => {
      state.isUpdating = true;
      state.error = null;
    });
    builder.addCase(changeProviderAccountStatus.rejected, (state, action) => {
      state.isUpdating = false;
      state.error = action.payload?.message || "Failed to update user Status";
    });
  },
});

export const { clearError, handleLogout, handleAuthentication } = userSlice.actions;
export default userSlice.reducer;
