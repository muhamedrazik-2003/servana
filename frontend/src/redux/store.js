import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice"
import serviceSlice from "./slices/serviceSlice";
import categorySlice from "./slices/categorySlice";

const store = configureStore({
    reducer : {
        authSlice,
        serviceSlice,
        categorySlice
    }
})

export default store;