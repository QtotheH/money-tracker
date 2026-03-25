import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoryReducer from "@/store/slices/categorySlice.js";
import transactionReducer from "@/store/slices/transactionSlice.js";
import budgetReducer from "@/store/slices/budgetSlice.js";
import goalReducer from "@/store/slices/goalSlice.js";
import authReducer from "@/store/slices/authSlice.js";

// TODO: SỬA LẠI DB (THÊM USERID CHO CÁC OBJECT) + TẤT CẢ SLICE (CHƯA LỌC DỮ LIỆU THEO USERID)

/*
export const store = configureStore({
    reducer: {
        categories: categoryReducer,
        transactions: transactionReducer,
        budgets: budgetReducer,
        goals: goalReducer,
        auth: authReducer,
        dashboards: dashboardReducer
    }
})*/

// Gộp tất cả các reducer lại thành một (appReducer)
const appReducer = combineReducers({
  categories: categoryReducer,
  transactions: transactionReducer,
  budgets: budgetReducer,
  goals: goalReducer,
  auth: authReducer,
});

// Tạo một Root Reducer để can thiệp vào quá trình xử lý action
const rootReducer = (state, action) => {
  // 'auth/logout' là tên action tự động sinh ra từ slice 'auth'
  if (action.type === "auth/logout") {
    // Khi user đăng xuất, gán toàn bộ state thành undefined.
    // Redux sẽ tự động khởi tạo lại initialState cho tất cả các slice
    state = undefined;
  }

  // appReducer cầm undefined này đưa cho từng reducer (categoryReducer, budgetReducer...)
  // Các hàm reducer nhận thấy state truyền vào là undefined, nên JavaScript tự động kích hoạt tham số mặc định: nó lấy initialState (rỗng, 'idle') để làm state mới
  return appReducer(state, action);
};

// Đưa Root Reducer vào Store
export const store = configureStore({
  reducer: rootReducer,
});
