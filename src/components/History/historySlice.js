import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from "@reduxjs/toolkit";
import http from "../../utils/http";

const historyAdapter = createEntityAdapter();

const initialState = historyAdapter.getInitialState({
    isLoading: "pending",
    historyLimit: 5,
    offsetStart: 0,
    offsetEnd: 5,
    nowYear: new Date().getFullYear(),
    nowMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth(),
});

const { request } = http();

export const fetchHistory = createAsyncThunk(
    "history/fetchHistory",
    (arg, { getState }) => {
        const state = getState();

        const dateGte = new Date(
            state.history.currentYear,
            state.history.currentMonth,
            1
        ).getTime();

        const dateLte = new Date(
            state.history.currentYear,
            state.history.currentMonth + 1,
            0
        ).getTime();

        return request(
            `http://localhost:3000/history?_start=${state.history.offsetStart}&_end=${state.history.offsetEnd}&date_gte=${dateGte}&date_lte=${dateLte}&_sort=date&_order=desc`
        );
    }
);

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
    reducers: {
        prevMonth(state, action) {
            historyAdapter.removeAll(state);

            state.offsetStart = 0;
            state.offsetEnd = 5;

            state.currentMonth = action.payload;
            state.isLoading = state.isLoading;
        },
        prevYear(state) {
            state.currentYear--;
        },
        nextMonth(state, action) {
            historyAdapter.removeAll(state);

            state.offsetStart = 0;
            state.offsetEnd = 5;

            state.currentMonth = action.payload;
            state.isLoading = state.isLoading;
        },
        nextYear(state) {
            state.currentYear++;
        },
        loadMore(state) {
            state.offsetStart += 5;
            state.offsetEnd += 5;

            state.isLoading = "pending";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHistory.pending, (state) => {
                state.isLoading = state.isLoading;
            })
            .addCase(fetchHistory.fulfilled, (state, action) => {
                historyAdapter.addMany(state, action.payload);
                state.isLoading = "idle";
            })
            .addCase(fetchHistory.rejected, (state) => {
                state.isLoading = "rejected";
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

export const { prevMonth, prevYear, nextMonth, nextYear, loadMore } =
    historySlice.actions;

export default historySlice.reducer;
