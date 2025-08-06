import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice"
import serviceSlice from "./slices/serviceSlice";
import categorySlice from "./slices/categorySlice";
import bookingSlice from "./slices/bookingSlice";
import reviewSlice from "./slices/reviewSlice";
import feedbackSlice from "./slices/feedbackSlice"

const store = configureStore({
    reducer : {
        userSlice,
        serviceSlice,
        categorySlice,
        bookingSlice,
        reviewSlice,
        feedbackSlice
    }
})

export default store;