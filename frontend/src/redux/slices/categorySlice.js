import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import base_url from "../base_url";

export const getCategories = createAsyncThunk(
  "categorySlice/getCategories",
  async () => {
    const response = await axios.get(`${base_url}/categories`, {
      headers: {
        Authorization: `token ${sessionStorage.getItem("token")}`,
      },
    });
    const { message, categoriesList } = response.data;
    // console.log(categoriesList);
    return { message, categoriesList };
  }
);
export const updateCategory = createAsyncThunk(
  "categorySlice/updateCategory",
  async ({ categoryId, newData }, { rejectWithValue }) => {
    try {
      console.log(categoryId);
      console.log(newData)
      const response = await axios.put(
        `${base_url}/categories/update/${categoryId}`,
        newData,
        {
          headers: {
            Authorization: `token ${sessionStorage.getItem("token")}`,
          },
        }
      );
      const { message, categoryData } = response.data;
      console.log("category updated", response.data);
      return { message, categoryData };
    } catch (error) {
      console.error(error);
      return rejectWithValue({
        message: error.response?.data?.message || "Failed To Update Category",
      });
    }
  }
);
export const deleteCategory = createAsyncThunk(
  "categorySlice/deleteCategory",
  async ( categoryId , { rejectWithValue }) => {
    try {
      console.log(categoryId);
      const response = await axios.delete(
        `${base_url}/categories/delete/${categoryId}`,
        {
          headers: {
            Authorization: `token ${sessionStorage.getItem("token")}`,
          },
        }
      );
      const { message, deletedData } = response.data;
      console.log("category updated", response.data);
      return { message, deletedData };
    } catch (error) {
      console.error(error);
      return rejectWithValue({
        message: error.response?.data?.message || "Failed To Update Category",
      });
    }
  }
);
export const AddNewCategory = createAsyncThunk(
  "categorySlice/AddNewCategory",
  async (newData , { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${base_url}/categories/new`,
        newData,
        {
          headers: {
            Authorization: `token ${sessionStorage.getItem("token")}`,
          },
        }
      );
      const { message, newCategoryData } = response.data;
      // console.log("category updated", response.data);
      return { message, newCategoryData };
    } catch (error) {
      console.error(error);
      return rejectWithValue({
        message: error.response?.data?.message || "Failed To Update Category",
      });
    }
  }
);


const categorySlice = createSlice({
  name: "categorySlice",
  initialState: {
    categories: [],
    currentSubCategories: [],
    successResponse: "",
    isLoading: false,
    isUpdating: false,
    isDeleting: false,
    filteringCategory: "all",
    error: null,
  },
  reducers: {
    getCurrentSubCategories: (state, action) => {
      const selectedCategory = state.categories.find((category) => {
        return category.title === action.payload;
      });
      state.currentSubCategories = selectedCategory?.subCategories || [];
    },
    getCategoryBasedFilterData: (state, action) => {
      state.filteringCategory = action.payload;
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

    // update category
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      const filtered = state.categories.filter(
        (category) => category._id !== action.payload.categoryData._id
      );
      filtered.push(action.payload.categoryData);
      state.categories = filtered;
      console.log(state.categories)
      state.isUpdating = false;
      state.error = null;
    });
    builder.addCase(updateCategory.pending, (state, action) => {
      state.isUpdating = true;
      state.error = null;
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.isUpdating = false;
      state.error = action.payload?.message || "Failed to update category";
    });

    // delete category
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      const filtered = state.categories.filter(
        (category) => category._id !== action.payload.deletedData._id
      );
      state.categories = filtered;
      console.log(state.categories)
      state.isDeleting = false;
      state.error = null;
    });
    builder.addCase(deleteCategory.pending, (state, action) => {
      state.isDeleting = true;
      state.error = null;
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.isDeleting = false;
      state.error = action.payload?.message || "Failed to Delete category";
    });

    // add category
    builder.addCase(AddNewCategory.fulfilled, (state, action) => {
      state.categories.push(action.payload.newCategoryData);
      console.log(state.categories)
      state.isUpdating = false;
      state.error = null;
    });
    builder.addCase(AddNewCategory.pending, (state, action) => {
      state.isUpdating = true;
      state.error = null;
    });
    builder.addCase(AddNewCategory.rejected, (state, action) => {
      state.isUpdating = false;
      state.error = action.payload?.message || "Failed to Add new category";
    });
  },
});

export const { getCurrentSubCategories, getCategoryBasedFilterData } =
  categorySlice.actions;
export default categorySlice.reducer;
