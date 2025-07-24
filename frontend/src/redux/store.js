import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice"
import serviceSlice from "./slices/serviceSlice";
import categorySlice from "./slices/categorySlice";

const store = configureStore({
    reducer : {
        userSlice,
        serviceSlice,
        categorySlice
    }
})

export default store;