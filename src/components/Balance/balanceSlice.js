import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useHttp from "../../hooks/useHttp";

const initialState = {
    cash: 0,
    cards: 0,
    activeType: "total",
};

export const fetchBalance = createAsyncThunk("balance/fetchBalance", () => {
    const { request } = useHttp();

    return request("http://localhost:3000/balance");
});

const balanceSlice = createSlice({
    name: "balance",
    initialState,
    reducers: {
        changeActiveType(state, action) {
            state.activeType = action.payload;
        },
        setCardsValue(state, action) {
            state.cards = action.payload;
        },
        subtractCardValue(state, action) {
            state.cards -= action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBalance.pending, (state) => {
                state.balanceLoading = "pending";
            })
            .addCase(fetchBalance.fulfilled, (state, action) => {
                state.cash = action.payload.cash;
                state.balanceLoading = "idle";
            })
            .addCase(fetchBalance.rejected, (state) => {
                state.balanceLoading = "rejected";
            })
            .addDefaultCase(() => {});
    },
});

export const { changeActiveType, setCardsValue, subtractCardValue } =
    balanceSlice.actions;

export default balanceSlice.reducer;
