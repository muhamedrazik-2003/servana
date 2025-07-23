import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice"
import serviceSlice from "./slices/serviceSlice"

const store = configureStore({
    reducer : {
        authSlice,
        serviceSlice,
    }
})

export default store;