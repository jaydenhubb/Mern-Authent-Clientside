import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice"
import emailReducer from "../redux/features/email/emailSlice"
import searchReducer from "../redux/features/auth/searchSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        email:emailReducer,
        search:searchReducer,
    }
})