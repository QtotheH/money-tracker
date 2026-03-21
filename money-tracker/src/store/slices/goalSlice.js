import {createAsyncThunk, createSlice, nanoid} from "@reduxjs/toolkit";
import {goalService} from "@/api/services/goalService.js";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "@/store/slices/authSlice.js";

export const fetchGoals = createAsyncThunk(
    'goals/fetchAll',
    async (_, {getState}) => {
        const user = getState().auth.user;
        const res = await goalService.getAll();
        return res.data.filter(goal => goal.userId === user.id);
    }
);

export const createGoal = createAsyncThunk(
    'goals/create',
    async (initialGoal, { getState, rejectWithValue }) => {
        try {
            const user = getState().auth.user;
            const newGoal = {
                id: nanoid(),
                userId: user.id,
                name: initialGoal.name,
                iconClass: initialGoal.iconClass,
                iconName: initialGoal.iconName,
                current: Number(initialGoal.current) || 0,
                target: Number(initialGoal.target),
                targetDate: new Date(initialGoal.targetDate).toISOString(),
            };
            const res = await goalService.create(newGoal);
            return res.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Thêm mục tiêu tiết kiệm thất bại!");
        }
    }
);

export const addGoalFund = createAsyncThunk(
    'goals/addFund',
    async ({ id, amount }, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const currentGoal = state.goals.goals.find(g => String(g.id) === String(id));

            const updatedGoal = {
                ...(currentGoal || {}),
                id, // giữ nguyên id
                current: currentGoal.current + Number(amount),  // cộng dồn tiền
            }

            const res = await goalService.updateAmount(id, updatedGoal);
            return res.data;

        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Cập nhật mục tiêu thất bại!");
        }
    }
)

const initialState = {
    goals: [],
    status: "idle",
    error: null
}

const goalSlice = createSlice({
    name: "goals",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGoals.pending, (state) => { state.status = "loading"; })
            .addCase(fetchGoals.fulfilled, (state, action) => {
                state.status = "succeeded";
                // Sắp xếp A-Z theo tên
                state.goals = action.payload.sort((a, b) => a.name.localeCompare(b.name));
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.goals.push(action.payload);
                // Sắp xếp lại sau khi thêm
                state.goals.sort((a, b) => a.name.localeCompare(b.name));
            })
            .addCase(addGoalFund.fulfilled, (state, action) => {
                const index = state.goals.findIndex(g => String(g.id) === String(action.payload.id));
                if (index !== -1) {
                    state.goals[index] = action.payload;
                }
            })
    }
});

export const selectAllGoals = (state) => state.goals.goals;
export const getGoalsStatus = (state) => state.goals.status;

export default goalSlice.reducer;