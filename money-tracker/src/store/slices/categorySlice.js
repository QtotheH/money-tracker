import {createAsyncThunk, createSlice, nanoid} from "@reduxjs/toolkit";
import {categoryService} from "@/api/services/categoryService.js";

const initialState = {
    items: [],
    status: 'idle',   //'idle' | 'loading' | 'succeeded' | 'failed'
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
);

// 3. UPDATE
export const updateCategory = createAsyncThunk(
    'categories/update',
    async ({id, categoryName, selectedIcon}, {getState, rejectWithValue}) => {
        try {
            const state = getState();
            const current = state.categories.items.find(c => String(c.id) === String(id));

            const updatedCategory = {
                ...(current || {}),
                id, // giữ nguyên id
                categoryName: categoryName?.trim(),
                iconName: selectedIcon?.name || "",
                iconClass: selectedIcon?.className || "",
            }

            const res = await categoryService.update(id, updatedCategory);
            return res.data;
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || "Cập nhật thất bại";
            return rejectWithValue(message);
        }
    }
);

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // GET ALL
            .addCase(fetchCategories.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = "failed";
                // action.payload có khi là message (rejectWithValue), có khi là error.message
                state.error = action.payload || action.error?.message || "Lỗi không xác định!"
            })

            // CREATE
            .addCase(createCategory.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.status = "succeeded";
                // cập nhật state -> UI render lại
                state.items.unshift(action.payload);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.status = "failed";
                // action.payload có khi là message (rejectWithValue), có khi là error.message
                state.error = action.payload || action.error?.message || "Lỗi không xác định!"
            })

            // UPDATE
            .addCase(updateCategory.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.status = "succeeded";
                const updated = action.payload;

                // cập nhật state -> UI render lại (cập nhật đúng phần tử trong items, không thay cả mảng
                const index = state.items.findIndex(c => String(c.id) === String(updated.id));
                if (index !== -1) {
                    state.items[index] = updated;
                }
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.status = "failed";
                // action.payload có khi là message (rejectWithValue), có khi là error.message
                state.error = action.payload || action.error?.message || "Lỗi không xác định!"
            })
    }
});

export default categorySlice.reducer;