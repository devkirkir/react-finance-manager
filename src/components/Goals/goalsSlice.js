import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import useHttp from "../../hooks/useHttp";

const goalsAdapter = createEntityAdapter();
const initialState = goalsAdapter.getInitialState({
    goalsLoading: "pending",
    maxGoals: 3,
});

export const fetchGoals = createAsyncThunk("goals/fetchGoals", () => {
    const { request } = useHttp();

    return request("http://localhost:3000/goals");
});

export const addGoal = createAsyncThunk("goals/addGoal", (body) => {
    const { request } = useHttp();

    return request("http://localhost:3000/goals", "POST", { "Content-Type": "application/json" }, JSON.stringify(body));
});

const goalsSlice = createSlice({
    name: "goals",
    initialState,
    reducers: {
        removeGoal(state, action) {
            goalsAdapter.removeOne(state, action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGoals.pending, (state) => {
                state.goalsLoading = "pending";
            })
            .addCase(fetchGoals.fulfilled, (state, action) => {
                state.goalsLoading = "idle";
                goalsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchGoals.rejected, (state) => {
                state.goalsLoading = "rejected";
            })
            .addCase(addGoal.pending, (state) => {
                state.goalsLoading = "pending";
            })
            .addCase(addGoal.fulfilled, (state, action) => {
                goalsAdapter.addOne(state, action.payload);
                state.goalsLoading = "idle";
            })
            .addCase(addGoal.rejected, (state) => {
                state.goalsLoading = "rejected";
            })
            .addDefaultCase(() => {});
    },
});

export const { removeGoal } = goalsSlice.actions;

export const goalsSelectors = goalsAdapter.getSelectors((state) => state.goals);

export default goalsSlice.reducer;
