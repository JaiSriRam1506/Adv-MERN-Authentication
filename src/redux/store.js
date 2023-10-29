import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import emailSlice from './email/emailSlice'
import filterReducer from './auth/filteredItem'

const store=configureStore({
    reducer:{
        auth:authSlice,
        email:emailSlice,
        filter:filterReducer
    }
});

export default store;