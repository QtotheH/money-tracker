import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "@/store/slices/categorySlice.js";
import transactionReducer from "@/store/slices/transactionSlice.js";

export const store = configureStore({
    reducer: {
        categories: categoryReducer,
        transactions: transactionReducer,
    }
})