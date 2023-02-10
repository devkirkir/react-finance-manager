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

const goalsSlice = createSlice({
    name: "goals",
    initialState,
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
            .addDefaultCase(() => {});
    },
});

export const goalsSelectors = goalsAdapter.getSelectors((state) => state.goals);

export default goalsSlice.reducer;
