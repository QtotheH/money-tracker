import {createAsyncThunk, createSelector, createSlice, nanoid} from "@reduxjs/toolkit";
import {selectCategoryDictionary} from "@/store/slices/categorySlice.js";
import {selectAllTransactions} from "@/store/slices/transactionSlice.js";
import {budgetService} from "@/api/services/budgetService.js";

const initialState = {
    budgets: [],
    status: 'idle',
    error: null
}

export const fetchBudgets = createAsyncThunk(
    'budgets/fetchAll',
    async () => {
        const res = await budgetService.getAll();
        return res.data;
    }
);

export const createBudget = createAsyncThunk(
    'budgets/create',
    async ({ categoryId, total }, { rejectWithValue }) => {
        try {
            const newBudget = {
                id: nanoid(),
                categoryId: String(categoryId),
                total: Number(total),
                createdAt: new Date().toISOString() // Lưu thời gian tạo
            };
            const res = await budgetService.create(newBudget);
            return res.data;
        } catch (error) {
            return rejectWithValue("Thêm ngân sách thất bại: ", error);
        }
    }
);

const budgetSlice = createSlice({
    name: "budgets",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchBudgets.pending, (state) => { state.status = "loading"; })
            .addCase(fetchBudgets.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.budgets = action.payload;
            })
            // Create
            .addCase(createBudget.fulfilled, (state, action) => {
                const newBudget = {
                    ...action.payload,
                    spent: 0
                }
                state.budgets.push(newBudget);
            })
    }
});

export const getBudgetsStatus = (state) => state.budgets.status;
export const selectAllBudgets = (state) => state.budgets.budgets;

export const selectBudgetsWithCategories = createSelector(
    [selectAllBudgets, selectCategoryDictionary, selectAllTransactions],
    (budgets, categoryDict, transactions) => {
        return budgets.map(budget => {
            // thiết lập ngân sách cho toàn bộ tháng đó (không tính từ lúc tạo ngân sách mà tính từ đầu tháng -> cuối tháng)
            // Lấy ra tháng và năm của ngân sách
            const budgetDate = new Date(budget.createdAt);
            const budgetMonth = budgetDate.getMonth();
            const budgetYear = budgetDate.getFullYear();

            // TỰ ĐỘNG TÍNH TOÁN SPENT THEO THÁNG
            const calculatedSpent = transactions
                .filter(transaction => {
                    const transactionDate = new Date(transaction.date);
                    return (
                        transaction.categoryId === budget.categoryId &&
                        transaction.type === 'expense' &&
                        // So sánh xem giao dịch có cùng tháng và cùng năm với ngân sách không
                        transactionDate.getMonth() === budgetMonth &&
                        transactionDate.getFullYear() === budgetYear
                    );
                })
                .reduce((total, t) => total + t.amount, 0);

            return {
                ...budget,
                spent: calculatedSpent,
                category: categoryDict[budget.categoryId] || {
                    categoryName: "Chưa phân loại",
                    iconClass: "fa-regular fa-circle-question"
                }
            }
        });
    }
)

export default budgetSlice.reducer;