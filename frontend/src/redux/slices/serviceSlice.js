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
            Authorization: `token ${sessionStorage.getItem("token")}`,
          },
        }
      );
      const { message, service } = response.data;
      // console.log("Service added successfully:", response.data);
      return { message, service };
    } catch (error) {
      console.error("ADD SERVICE ERROR:", error.response || error);
      return rejectWithValue({
        message: error.response?.data?.message || "service Adding Failed",
      });
    }
  }
);

export const getAllServices = createAsyncThunk(
  "serviceSlice/getAllServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/services/all`, {
        headers: {
          Authorization: `token ${sessionStorage.getItem("token")}`,
        },
      });
      const { message, allServices } = response.data;
      // console.log("All Services retrieved:", response.data);
      return { message, allServices };
    } catch (error) {
      console.log("An Error Occured", error);
      console.error(error);
      return rejectWithValue({
        message:
          error.response?.data?.message || "Failed retrieve all Services",
      });
    }
  }
);
export const getSampleServices = createAsyncThunk(
  "serviceSlice/getSampleServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/services/sample`);
      const { message, sampleServices } = response.data;
      // console.log("All sample Services retrieved:", response.data);
      return { message, sampleServices };
    } catch (error) {
      console.log("An Error Occured", error);
      console.error(error);
      return rejectWithValue({
        message:
          error.response?.data?.message || "Failed retrieve all Services",
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
          Authorization: `token ${sessionStorage.getItem("token")}`,
        },
      });
      const { message, serviceList } = response.data;
      // console.log("User Services retrieved:", response.data);
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
  async ({ serviceId, formData }, { rejectWithValue }) => {
    try {
      console.log(serviceId);
      const response = await axios.put(
        `${base_url}/services/update/${serviceId}`,
        formData,
        {
          headers: {
            Authorization: `token ${sessionStorage.getItem("token")}`,
          },
        }
      );
      const { message, updatedService } = response.data;
      // console.log("Service updated successfully:", response.data);
      return { message, updatedService };
    } catch (error) {
      console.error(error);
      return rejectWithValue({
        message: error.response?.data?.message || "Failed To Update Services",
      });
    }
  }
);
export const deleteService = createAsyncThunk(
  "serviceSlice/deleteService",
  async (serviceId, { rejectWithValue }) => {
    try {
      console.log(serviceId);
      const response = await axios.delete(
        `${base_url}/services/delete/${serviceId}`,
        {
          headers: {
            Authorization: `token ${sessionStorage.getItem("token")}`,
          },
        }
      );
      const { message, deletedService } = response.data;
      // console.log("Service deleted successfully:", response.data);
      return { message, deletedService };
    } catch (error) {
      console.error(error);
      return rejectWithValue({
        message: error.response?.data?.message || "Failed To Delete Services",
      });
    }
  }
);

export const changeServiceStatus = createAsyncThunk(
  "serviceSlice/changeServiceStatus",
  async ({ serviceId, serviceData }, { rejectWithValue }) => {
    console.log(serviceId, serviceData);
    try {
      const response = await axios.patch(
        `${base_url}/services/update/status/${serviceId}`,
        serviceData,
        {
          headers: {
            Authorization: `token ${sessionStorage.getItem("token")}`,
          },
        }
      );
      const { message, updatedService } = response.data;
      // console.log("service Status Updated:", response.data);
      return { message, updatedService };
    } catch (error) {
      console.error(error);
      return rejectWithValue({
        message:
          error.response?.data?.message || "Failed To update services status",
      });
    }
  }
);

const serviceSlice = createSlice({
  name: "serviceSlice",
  initialState: {
    services: [],
    servicesBackup: [],
    sampleServices: [],
    keywords: "",
    isLoading: false,
    isUpdating: false,
    isDeleting: false,
    successResponse: "",
    error: null,
  },
  reducers: {
    handleSearch: (state, action) => {
      const searchKeyword = action.payload.toLowerCase().trim();
      const filtered = state.servicesBackup.filter((service) => {
        const searchString =
          `${service.title} ${service.category} ${service.subCategory} ${service.location.city} ${service.location.state} ${service?.providerId?.fullName} ${service.price}`.toLowerCase();
        return searchString.includes(searchKeyword);
      });
      state.services = filtered;
      state.keywords = searchKeyword;
      console.log(action.payload);
      console.log(state.services);
    },
  },
  extraReducers: (builder) => {
    // get services
    builder.addCase(getUserServices.fulfilled, (state, action) => {
      state.services = action.payload.serviceList || [];
      state.servicesBackup = action.payload.serviceList || [];
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
    // get all services
    builder.addCase(getAllServices.fulfilled, (state, action) => {
      state.services = action.payload.allServices || [];
      state.servicesBackup = action.payload.allServices || [];
      state.isLoading = false;
      state.error = null;
      state.successResponse = action.payload.message;
    });
    builder.addCase(getAllServices.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllServices.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message || "Failed to retrieve services";
    });
    // get sample services
    builder.addCase(getSampleServices.fulfilled, (state, action) => {
      state.sampleServices = action.payload.sampleServices || [];
      state.isLoading = false;
      state.error = null;
      state.successResponse = action.payload.message;
    });
    builder.addCase(getSampleServices.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getSampleServices.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.payload.message || "Failed to retrieve sample services";
    });

    // add service
    builder.addCase(addService.fulfilled, (state, action) => {
      state.services.push(action.payload.service);
      state.servicesBackup.push(action.payload.service);
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
      const filtered = state.services.filter(
        (service) => service._id !== action.payload.updatedService._id
      );
      // just in case
      const BackupFiltered = state.servicesBackup.filter(
        (service) => service._id !== action.payload.updatedService._id
      );
      filtered.push(action.payload.updatedService);
      state.services = filtered;
      state.servicesBackup = BackupFiltered;
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

    // delete service
    builder.addCase(deleteService.fulfilled, (state, action) => {
      const filtered = state.services.filter(
        (service) => service._id !== action.payload.deletedService._id
      );
      const backupFiltered = state.servicesBackup.filter(
        (service) => service._id !== action.payload.deletedService._id
      );
      state.services = filtered;
      state.servicesBackup = backupFiltered;
      state.isDeleting = false;
      state.error = null;
      state.successResponse = action.payload.message;
    });
    builder.addCase(deleteService.pending, (state, action) => {
      state.isDeleting = true;
      state.error = null;
    });
    builder.addCase(deleteService.rejected, (state, action) => {
      state.isDeleting = false;
      state.error = action.payload?.message || "Failed to delete service";
    });

    // update service Satus
    builder.addCase(changeServiceStatus.fulfilled, (state, action) => {
      const filtered = state.services.filter(
        (service) => service._id !== action.payload.updatedService._id
      );
      const backupFiltered = state.servicesBackup.filter(
        (service) => service._id !== action.payload.updatedService._id
      );
      filtered.push(action.payload.updatedService);
      state.services = filtered;
      state.servicesBackup = backupFiltered;
      state.isUpdating = false;
      state.error = null;
    });
    builder.addCase(changeServiceStatus.pending, (state, action) => {
      state.isUpdating = true;
      state.error = null;
    });
    builder.addCase(changeServiceStatus.rejected, (state, action) => {
      state.isUpdating = false;
      state.error =
        action.payload?.message || "Failed to update service Status";
    });
  },
});
export const { handleSearch } = serviceSlice.actions;
export default serviceSlice.reducer;
