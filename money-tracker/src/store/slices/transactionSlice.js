import {createAsyncThunk, createSelector, createSlice, nanoid} from "@reduxjs/toolkit";
import {transactionService} from "@/api/services/transactionService.js";
import {selectCategoryDictionary} from "@/store/slices/categorySlice.js";
import {selectCurrentUser} from "@/store/slices/authSlice.js";

const initialState = {
    transactions: [],
    status: 'idle',
    error: null
}

export const selectAllTransactions = (state) => state.transactions.transactions;

// Selector: Nối Transaction với Category
export const selectTransactionsWithCategories = createSelector(
    [selectAllTransactions, selectCategoryDictionary, selectCurrentUser],
    (transactions, categoryDict, currentUser) => {
        return transactions
            .filter(transaction => transaction.userId === currentUser.id)
            .map(transaction => ({
            ...transaction,
            // Lấy object category từ bảng tra cứu đắp vào
            // Nếu không tìm thấy, trả về null hoặc object mặc định để tránh lỗi UI
            category: categoryDict[transaction.categoryId] || {
                categoryName: "Chưa phân loại",
                iconClass: "fa-regular fa-circle-question"
            }
        }));
    }
);

export const getTransactionsStatus = (state) => state.transactions.status;

export const fetchAllTransactions = createAsyncThunk(
    'transactions/fetchAll',
    async () => {
        const res = await transactionService.getAll();
        return res.data;
    }
);

export const createTransaction = createAsyncThunk(
    'transactions/create',
    async (initialTransaction, {getState}) => {
        const user = getState().auth.user;
        const newTransaction = {
            id: nanoid(),
            userId: user.id,
            amount: Number(initialTransaction.amount),
            description: initialTransaction.description.trim(),
            categoryId: initialTransaction.category,
            date: initialTransaction.date,
            type: initialTransaction.type
        }

        const res = await transactionService.create(newTransaction);
        return res.data;
    }
)

export const updateTransaction = createAsyncThunk(
    "transactions/update",
    async ({id, transaction}, {rejectWithValue, getState}) => {
        try {
            const state = getState();
            const current = state.transactions.transactions.find(c => String(c.id) === String(id));

            const updatedTransaction = {
                ...(current || {}),
                id, // giữ nguyên id
                amount: Number(transaction.amount),
                description: transaction.description.trim(),
                categoryId: transaction.category,
                date: transaction.date,
                type: transaction.type
            }

            const res = await transactionService.update(id, updatedTransaction);
            return res.data;
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || "Cập nhật thất bại";
            return rejectWithValue(message);
        }
    }
)

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // GET ALL
            .addCase(fetchAllTransactions.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchAllTransactions.fulfilled, (state, action) => {
                state.status = "succeeded";
                // Sắp xếp mảng trả về từ API theo ngày (Mới nhất -> Cũ nhất)
                const sortedData = action.payload.sort((a, b) => {
                    return new Date(b.date) - new Date(a.date);
                });

                // Gán vào đúng biến state.transactions
                state.transactions = sortedData;
            })
            .addCase(fetchAllTransactions.rejected, (state, action) => {
                state.status = "failed";
                // action.payload có khi là message (rejectWithValue), có khi là error.message
                state.error = action.payload || action.error?.message || "Lỗi không xác định!"
            })
            // CREATE
            .addCase(createTransaction.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.status = "succeeded";
                // Dùng unshift() để nhét giao dịch MỚI NHẤT lên ĐẦU mảng
                // giữ nguyên thứ tự sắp xếp mà không cần sort lại toàn bộ mảng
                state.transactions.unshift(action.payload);
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.status = "failed";
                // action.payload có khi là message (rejectWithValue), có khi là error.message
                state.error = action.payload || action.error?.message || "Lỗi không xác định!"
            })
            // UPDATE
            .addCase(updateTransaction.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateTransaction.fulfilled, (state, action) => {
                state.status = "succeeded";
                const updated = action.payload;

                // cập nhật state -> UI render lại (cập nhật đúng phần tử trong items, không thay cả mảng
                const index = state.transactions.findIndex(t => String(t.id) === String(updated.id));
                if (index !== -1) {
                    state.transactions[index] = updated;
                    // Tên danh mục có thể đã bị thay đổi, cần sắp xếp lại mảng
                    state.transactions.sort((a, b) => new Date(b.date) - new Date(a.date)
                    );
                }
            })
            .addCase(updateTransaction.rejected, (state, action) => {
                state.status = "failed";
                // action.payload có khi là message (rejectWithValue), có khi là error.message
                state.error = action.payload || action.error?.message || "Lỗi không xác định!"
            })
    }
});


export default transactionSlice.reducer;