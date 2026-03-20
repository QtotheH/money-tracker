import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "@/store/slices/categorySlice.js";
import transactionReducer from "@/store/slices/transactionSlice.js";
import budgetReducer from "@/store/slices/budgetSlice.js";
import goalReducer from "@/store/slices/goalSlice.js";
import authReducer from "@/store/slices/authSlice.js";

// TODO: SỬA LẠI DB (THÊM USERID CHO CÁC OBJECT) + TẤT CẢ SLICE (CHƯA LỌC DỮ LIỆU THEO USERID)

export const store = configureStore({
    reducer: {
        categories: categoryReducer,
        transactions: transactionReducer,
        budgets: budgetReducer,
        goals: goalReducer,
        auth: authReducer,
    }
})