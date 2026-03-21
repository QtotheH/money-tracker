import {createAsyncThunk, createSelector, createSlice, nanoid} from "@reduxjs/toolkit";
import {categoryService} from "@/api/services/categoryService.js";

const initialState = {
    categories: [],
    status: 'idle',   //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};

export const selectAllCategoriesState = (state) => state.categories;
export const getCategoriesStatus = (state) => state.categories.status;
export const selectCategoriesItems = (state) => state.categories.categories;

// Selector tạo bảng tra cứu (Chỉ tính toán lại khi mảng categories thay đổi)
// biến mảng categories thành một object (bảng tra cứu theo ID), để các file khác có thể sử dụng (useSelector)
export const selectCategoryDictionary = createSelector(
    [selectCategoriesItems],
    (items) => {
        const dict = {};
        items.forEach(category => {
            dict[category.id] = category;
        });
        return dict;
    }
);

// THUNK
// 1. Get All
export const fetchCategories = createAsyncThunk(
    'categories/fetchAll',
    async (_, { getState }) => {
        const user = getState().auth.user;
        const res = await categoryService.getAll();
        console.log(res)
        return res.data.filter(c => c.userId === user.id);
    }
)

// 2. CREATE
export const createCategory = createAsyncThunk(
    'categories/create',
    async ({categoryName, selectedIcon}, {getState, rejectWithValue}) => {
        try {
            const user = getState().auth.user;

            const existing = categoryService.getByNameAndUserId(categoryName, user.id);
            if (existing) {
                return rejectWithValue("Danh mục đã tồn tại!");
            }

            const newCategory = {
                id: nanoid(),
                userId: user.id,
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

            const current = state.categories.categories.find(c => String(c.id) === String(id));

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
                // Sắp xếp A-Z ngay khi tải xong
                // so sánh hai chuỗi và trả về giá trị -1, 1 hoặc 0 để hàm sort() biết từ nào đứng trước trong từ điển
                const sortedData = action.payload.sort((a, b) => a.categoryName.localeCompare(b.categoryName));
                state.categories = sortedData;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = "failed";
                // action.payload có khi là message (rejectWithValue), có khi là error.message
                state.error = action.payload || action.error?.message || "Lỗi không xác định!"
            })

            // CREATE
            .addCase(createCategory.fulfilled, (state, action) => {
                state.status = "succeeded";
                // cập nhật state -> UI render lại
                state.categories.push(action.payload);
                state.categories.sort((a, b) =>
                    a.categoryName.localeCompare(b.categoryName)
                );
            })
            // UPDATE
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.status = "succeeded";
                const updated = action.payload;

                // cập nhật state -> UI render lại (cập nhật đúng phần tử trong items, không thay cả mảng
                const index = state.categories.findIndex(c => String(c.id) === String(updated.id));
                if (index !== -1) {
                    state.categories[index] = updated;
                    // Tên danh mục có thể đã bị thay đổi, cần sắp xếp lại mảng
                    state.categories.sort((a, b) =>
                        a.categoryName.localeCompare(b.categoryName)
                    );
                }
            })
    }
});

export default categorySlice.reducer;