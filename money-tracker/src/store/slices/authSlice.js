import {createAsyncThunk, createSlice, nanoid} from "@reduxjs/toolkit";
import {authService} from "@/api/services/authService.js";
import bcrypt from "bcryptjs";

// Lấy user từ localStorage nếu đã đăng nhập trước đó
const userFromLocalStorage = localStorage.getItem("MT_user") ? JSON.parse(localStorage.getItem("MT_user")) : null;

// Đăng ký
export const register = createAsyncThunk(
    'auth/register',
    async (userData, {rejectWithValue}) => {
        try {
            // Kiểm tra email đã tồn tại chưa
            const existingEmail = await authService.getUserByEmail(userData.email);
            if (existingEmail.data.length > 0) {
                return rejectWithValue("Email đã được sử dụng!");
            }

            // Hash mật khẩu
            const salt = bcrypt.genSaltSync(12);
            const hashedPasswrd = bcrypt.hashSync(userData.password, salt);

            // Cấu trúc object user
            const newUser = {
                id: nanoid(),
                fullname: userData.fullname.trim(),
                email: userData.email.trim(),
                dob: userData.dob,
                password: hashedPasswrd,
                phone: userData.phone.trim(),
                avatar: "",
                settings: {
                    theme: "light",
                    currency: "vnd",
                    budgetsAlert: false,
                    goalsAlert: false
                }
            };

            const res = await authService.register(newUser);
            return res.data;

        } catch (error) {
            console.error(error);
            return rejectWithValue("Đăng ký thất bại, vui lòng thử lại!");
        }
    }
);

// Đăng nhập
export const login = createAsyncThunk(
    'auth/login',
    async ({email, password}, {rejectWithValue}) => {
        try {

            const res = await authService.getUserByEmail(email);

            if (res.data.length === 0) {
                return rejectWithValue("Email không có trong hệ thống. Vui lòng thử lại!");
            }

            const user = res.data[0];
            // So sánh mật khẩu nhập vào với mật khẩu đã hash trong db
            const isMatch = bcrypt.compareSync(password, user.password);
            if (!isMatch) {
                return rejectWithValue("Mật khẩu không chính xác!");
            }

            // bỏ password trước khi lưu vào localStorage
            const {password: _, ...userWithoutPassword} = user;
            // Lưu phiên đăng nhập
            localStorage.setItem("MT_user", JSON.stringify(userWithoutPassword));
            return userWithoutPassword;
        } catch (error) {
            console.error("Lỗi đăng nhập: ", error);
            return rejectWithValue("Đăng nhập thất bại!");
        }
    }
);

// Thay đổi theme
export const syncThemeToDB = createAsyncThunk(
    'auth/syncTheme',
    async (themeStr, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const user = state.auth.user;

            if (!user) return rejectWithValue("Chưa đăng nhập");

            // Tạo object settings mới, giữ nguyên các cài đặt khác (currency, alerts...) và ghi đè theme
            const newSettings = {
                ...user.settings,
                theme: themeStr
            };

            // Gọi API chạy ngầm xuống DB
            await authService.updateSettings(user.id, newSettings);

            // Trả về themeStr để extraReducers cập nhật Redux state
            return themeStr;
        } catch (error) {
            console.error("Lỗi đồng bộ theme:", error);
            return rejectWithValue("Lỗi đồng bộ");
        }
    }
);

// Thay đổi currency
export const syncCurrencyToDB = createAsyncThunk(
    'auth/syncCurrency',
    async (currencyCode, { getState, rejectWithValue }) => {
        try {
            const user = getState().auth.user;
            if (!user) return rejectWithValue("Chưa đăng nhập");

            const newSettings = { ...user.settings, currency: currencyCode };

            // authService.updateSettings dùng phương thức PATCH
            await authService.updateSettings(user.id, newSettings);
            return currencyCode;
        } catch (error) {
            console.error("Lỗi thay đổi đơn vị tiền tệ: ", error);
            return rejectWithValue("Lỗi đồng bộ tiền tệ!");
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: userFromLocalStorage,
        status: 'idle',
        error: null
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("MT_user");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            // Xử lý khi đăng nhập thành công
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Cập nhật user vào kho Redux
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // BẮT SỰ KIỆN SYNC THEME THÀNH CÔNG
            .addCase(syncThemeToDB.fulfilled, (state, action) => {
                if (state.user && state.user.settings) {
                    // cập nhật redux store
                    state.user.settings.theme = action.payload;
                    // Cập nhật LocalStorage để đồng bộ hoàn toàn
                    localStorage.setItem("MT_user", JSON.stringify(state.user));
                }
            })
            // BẮT SỰ KIỆN SYNC CURRENCY THÀNH CÔNG
            .addCase(syncCurrencyToDB.fulfilled, (state, action) => {
                if (state.user && state.user.settings) {
                    // cập nhật redux store
                    state.user.settings.currency = action.payload;
                    // Cập nhật LocalStorage để đồng bộ hoàn toàn
                    localStorage.setItem("MT_user", JSON.stringify(state.user));
                }
            })
    }
});

export const selectCurrentUser = (state) => state.auth.user;
export const {logout, updateTheme} = authSlice.actions;
export default authSlice.reducer;