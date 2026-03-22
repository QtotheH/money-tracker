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
            // rest ...
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

// Cập nhật Alert của user
export const syncAlertSettingsToDB = createAsyncThunk(
    "auth/syncAlertSettings",
    async ({ type, value }, { getState, rejectWithValue }) => {
        try {
            const user = getState().auth.user;
            if (!user) {
                return rejectWithValue("Chưa đăng nhập!");
            }

            // Tạo settings mới nhưng chỉ ghi đè key (budgetsAlert hoặc goalsAlert)
            const newSettings = {
                ...user.settings,
                [type]: value
            }

            await authService.updateSettings(user.id, newSettings);
            return { type, value };
        } catch (error) {
            console.error("Lỗi đồng bộ cài đặt thông báo: ", error);
            return rejectWithValue("Lỗi đồng bộ cài đặt!");
        }
    }
)

// UPDATE: Cập nhật thông tin cá nhân
export const updatePersonalInfo = createAsyncThunk(
    'auth/profile/updatePersonalInfo',
    async ({userId, fullname, email, phone, dob}, {getState,rejectWithValue}) => {
        try{
            const state = getState();
            const currentInfo = state.auth.user;
            // Lấy user từ DB để có thông tin đầy đủ (đặc biệt là password đã hash)
            const resUser = await authService.getUserByEmail(currentInfo.email);
            const dbUser = resUser.data[0];

            const updatedPersonalInfo = {
                ...dbUser,
                fullname: fullname.trim(),
                email: email.trim(),
                phone: phone.trim(),
                dob,
            }

            const res = await authService.updatePersonalInfo(userId, updatedPersonalInfo);
            const user = res.data;

            // bỏ password
            const {password: _, ...userWithoutPassword} = user;

            localStorage.setItem("MT_user", JSON.stringify(userWithoutPassword));    

            return userWithoutPassword;
        }catch (err){
            const message = err?.response?.data?.message || err?.message || "Cập nhật thất bại!";
            return rejectWithValue(message);
        }
    }
)

// Change Password
export const changePassword = createAsyncThunk(
    'auth/profile/changePassword',
    async ({ currentPassword, newPassword }, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const user = state.auth.user;

            if (!user) {
                return rejectWithValue("Chưa đăng nhập!");
            }

            // Lấy user 
            const res = await authService.getUserByEmail(user.email);
            const dbUser = res.data[0];

            // So sánh mật khẩu hiện tại
            const isMatch = bcrypt.compareSync(currentPassword, dbUser.password);
            if (!isMatch) {
                return rejectWithValue("Mật khẩu hiện tại không chính xác!");
            }

            // Hash mật khẩu mới
            const salt = bcrypt.genSaltSync(12);
            const hashedPassword = bcrypt.hashSync(newPassword, salt);

            // Tạo user mới 
            const updatedUser = {
                ...dbUser,
                password: hashedPassword
            };

            const updateRes = await authService.updatePersonalInfo(user.id, updatedUser);
            const newUser = updateRes.data;

            // bỏ password
            const { password: _, ...userWithoutPassword } = newUser;

            localStorage.setItem("MT_user", JSON.stringify(userWithoutPassword));
            return userWithoutPassword;

        } catch (error) {
            const message = error?.response?.data?.message || error?.message || "Đổi mật khẩu thất bại!";
            return rejectWithValue(message);
        }
    }
);

// UPDATE AVATAR
export const updateAvatar = createAsyncThunk(
  "auth/profile/updateAvatar",
  async ({ userId, avatar }, { rejectWithValue }) => {
    try {
      const res = await authService.updateAvatar(userId, avatar);
      const updatedUser = res.data;

      const { password: _, ...userWithoutPassword } = updatedUser;

      localStorage.setItem("MT_user", JSON.stringify(userWithoutPassword));

      return userWithoutPassword;

    } catch (error) {
      console.error("Lỗi cập nhật ảnh đại diện:", error);
      return rejectWithValue("Cập nhật avatar thất bại");
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
            // BẮT SỰ KIỆN SYNC ALERT THÀNH CÔNG
            .addCase(syncAlertSettingsToDB.fulfilled, (state, action) => {
                if (state.user && state.user.settings) {
                    // cập nhật redux store
                    state.user.settings[action.payload.type] = action.payload.value;
                    // Cập nhật LocalStorage để đồng bộ hoàn toàn
                    localStorage.setItem("MT_user", JSON.stringify(state.user));
                }
            })
            // UPDATE PERSONAL INFO SUCCESS
            .addCase(updatePersonalInfo.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updatePersonalInfo.fulfilled, (state, action) => {
                state.status ="succeeded";
                state.user = action.payload;   
            })
            .addCase(updatePersonalInfo.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // CHANGE PASSWORD
            .addCase(changePassword.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // UPDATE AVATAR
            .addCase(updateAvatar.pending, (state) => {
              state.status = "loading";
                state.error = null;
            })
            .addCase(updateAvatar.fulfilled, (state, action) => {
              state.status = "succeeded";
              // Chỉ cập nhật field avatar, giữ nguyên phần còn lại
              state.user = action.payload;              
            })
            .addCase(updateAvatar.rejected, (state, action) => {
              state.status = "failed";
              state.error = action.payload;
            })
    }
});

export const selectCurrentUser = (state) => state.auth.user;
export const {logout, updateTheme} = authSlice.actions;
export default authSlice.reducer;