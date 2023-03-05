import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from "@reduxjs/toolkit";
import useHttp from "../../hooks/useHttp";

const historyAdapter = createEntityAdapter();
const initialState = historyAdapter.getInitialState({
    isLoading: "pending",
});

const { request } = useHttp();

export const fetchHistory = createAsyncThunk("history/fetchHistory", () => {
    return request("http://localhost:3000/history");
});

export const addHistory = createAsyncThunk("history/addHistory", (body) => {
    return request(
        "http://localhost:3000/history",
        "POST",
        { "Content-Type": "application/json" },
        JSON.stringify(body)
    );
});

const historySlice = createSlice({
    name: "history",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchHistory.pending, (state) => {
                state.isLoading = "pending";
            })
            .addCase(fetchHistory.fulfilled, (state, action) => {
                historyAdapter.setAll(state, action.payload);
                state.isLoading = "idle";
            })
            .addCase(fetchHistory.rejected, (state) => {
                state.isLoading = "rejected";
            })

            .addCase(addHistory.pending, (state) => {
                state.isLoading = "pending";
            })
            .addCase(addHistory.fulfilled, (state, action) => {
                historyAdapter.addOne(state, action.payload);
                state.isLoading = "idle";
            })
            .addCase(addHistory.rejected, (state) => {
                state.isLoading = "rejected";
            })
            .addDefaultCase(() => {});
    },
});

export const historySelectors = historyAdapter.getSelectors(
    (state) => state.history
);

export default historySlice.reducer;
