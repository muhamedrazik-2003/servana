import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import base_url from "../base_url";

export const getCategories = createAsyncThunk(
  "categorySlice/getCategories",
  async () => {
    const response = await axios.get(`${base_url}/categories`);
    const { message, categoriesList } = response.data;
    // console.log(categoriesList);
    return { message, categoriesList };
  }
);

const categorySlice = createSlice({
  name: "categorySlice",
  initialState: {
    categories: [],
    currentSubCategories: [],
    successResponse: "",
    isLoading: false,
    error: null,
  },
  reducers: {
    getCurrentSubCategories: (state, action) => {
      const selectedCategory = state.categories.find((category) => {
        return category.title === action.payload;
      });
      state.currentSubCategories = selectedCategory?.subCategories || []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload.categoriesList;
      state.isLoading = false;
      state.error = "";
      state.successResponse = action.payload.message;
    });
    builder.addCase(getCategories.pending, (state, action) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    });
  },
});

export const {getCurrentSubCategories} = categorySlice.actions
export default categorySlice.reducer;
