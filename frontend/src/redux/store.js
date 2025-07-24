import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice"
import serviceSlice from "./slices/serviceSlice";
import categorySlice from "./slices/categorySlice";
import bookingSlice from "./slices/bookingSlice"

const store = configureStore({
    reducer : {
        userSlice,
        serviceSlice,
        categorySlice,
        bookingSlice
    }
})

export default store;