import {createAsyncThunk, createSlice, nanoid} from "@reduxjs/toolkit";
import {categoryService} from "@/api/services/categoryService.js";

const initialState = {
    items: [],
    fetchStatus: 'idle',   // riêng cho fetchCategories - 'idle' | 'loading' | 'succeeded' | 'failed'
    createStatus: 'idle',  // rieng cho createCategory
    error: null
};

export const selectAllCategoriesState = (state) => state.categories;

// THUNK
// 1. Get All
export const fetchCategories = createAsyncThunk(
    'categories/fetchAll',
    async () => {
        const res = await categoryService.getAll();
        return res.data;
    }
)

// 2. CREATE
export const createCategory = createAsyncThunk(
    'categories/create',
    async ({categoryName, selectedIcon}, {rejectWithValue}) => {
        try {
            const newCategory = {
                id: nanoid(),
                categoryName: categoryName?.trim(),
                iconName: selectedIcon?.name || "",
                iconClass: selectedIcon?.className || "",
            }

            const res = await categoryService.create(newCategory);
            return res.data; // json-server trả về object vừa tạo
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                err?.response?.statusText ||
                err?.message ||
                "Thêm danh mục thất bại!";

            return rejectWithValue(message);
        }
    }
)

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // GET ALL
            .addCase(fetchCategories.pending, (state) => {
                state.fetchStatus = "loading";
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.fetchStatus = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.fetchStatus = "failed";
                // action.payload có khi là message (rejectWithValue), có khi là error.message
                state.error = action.payload || action.error?.message || "Lỗi không xác định!"
            })

            // CREATE
            .addCase(createCategory.pending, (state) => {
                state.createStatus = "loading";
                state.error = null;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.createStatus = "succeeded";
                // cập nhật state -> UI render lại
                state.items.unshift(action.payload);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.createStatus = "failed";
                // action.payload có khi là message (rejectWithValue), có khi là error.message
                state.error = action.payload || action.error?.message || "Lỗi không xác định!"
            })
    }
});

export default categorySlice.reducer;