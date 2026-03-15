import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "@/store/slices/categorySlice.js";

export const store = configureStore({
    reducer: {
        categories: categoryReducer,
    }
})