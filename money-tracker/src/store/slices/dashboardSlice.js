// dashboardSlice.js
import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { dashboardService } from "@/api/services/dashboardService";
import { selectCurrentUser } from "./authSlice";
import { selectAllGoals } from "./goalSlice";

const initialState = {
  transactions: [], // luôn là array
  status: "idle",
  error: null,
};

// Thunk fetch transactions theo userId
export const fetchDashboardCards = createAsyncThunk(
  "dashboard/fetchDashboardCards",
  async (userId, thunkAPI) => {
    if (!userId) return []; // tránh lỗi nếu userId undefined
    try {
      const res = await dashboardService.getDashboardCards(userId);
      return res.data || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardCards.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDashboardCards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transactions = action.payload || [];
      })
      .addCase(fetchDashboardCards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Selector trạng thái
export const getCardsStatus = (state) => state.dashboards?.status || "idle";
export const selectDashboardTransactions = (state) =>
  state.dashboards?.transactions || [];

// Selector tổng hợp dữ liệu card
export const selectDashboardCards = createSelector(
  [selectDashboardTransactions, selectCurrentUser, selectAllGoals],
  (transactions, currentUser, goals) => {
    if (!currentUser)
      return { balance: 0, income: 0, expense: 0, savingsRate: 0 };

    const userTransactions = transactions.filter(
      (t) => t.userId === currentUser.id,
    );

    const income = userTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = userTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
      
    const allGoal = goals
      .filter((g) => g.userId === currentUser.id)
      .reduce(
        (sum, g) => {
          sum.totalTarget += g.target;
          sum.totalCurrent += g.current;
          return sum;
        },
        { totalTarget: 0, totalCurrent: 0 },
      );

    const balance = income - expense;
    const savingsRate = (allGoal.totalCurrent / allGoal.totalTarget) * 100;

    return { balance, income, expense, savingsRate };
  },
);

export default dashboardSlice.reducer;
