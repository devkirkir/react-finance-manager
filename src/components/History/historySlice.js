import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from "@reduxjs/toolkit";
import useHttp from "../../hooks/useHttp";

const historyAdapter = createEntityAdapter();

const initialState = historyAdapter.getInitialState({
    isLoading: "pending",
    nowYear: new Date().getFullYear(),
    nowMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth(),
});

const { request } = useHttp();

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
            `http://localhost:3000/history?date_gte=${dateGte}&date_lte=${dateLte}`
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
            state.currentMonth = action.payload;
        },
        prevYear(state) {
            state.currentYear--;
        },
        nextMonth(state, action) {
            state.currentMonth = action.payload;
        },
        nextYear(state) {
            state.currentYear++;
        },
    },
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

export const { prevMonth, prevYear, nextMonth, nextYear } =
    historySlice.actions;

export default historySlice.reducer;
