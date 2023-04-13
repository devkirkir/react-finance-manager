import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useHttp from "../../hooks/useHttp";

const initialState = {
    cash: 0,
    cards: 0,
    activeType: "total",
};

const { request } = useHttp();

export const fetchBalance = createAsyncThunk("balance/fetchBalance", () => {
    return request("http://localhost:3000/balance");
});

export const changeCashBalance = createAsyncThunk(
    "balance/addCash",
    (value) => {
        const obj = { cash: value };

        return request(
            "http://localhost:3000/balance",
            "PATCH",
            { "Content-Type": "application/json" },
            JSON.stringify(obj)
        );
    }
);

const balanceSlice = createSlice({
    name: "balance",
    initialState,
    reducers: {
        changeActiveType(state, action) {
            state.activeType = action.payload;
        },
        setCardsBalance(state, action) {
            state.cards = action.payload;
        },
        subtractCardBalance(state, action) {
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

            .addCase(changeCashBalance.fulfilled, (state, action) => {
                state.cash = action.payload.cash;
                state.balanceLoading = "idle";
            })
            .addCase(changeCashBalance.rejected, (state) => {
                state.balanceLoading = "rejected";
            })
            .addDefaultCase(() => {});
    },
});

export const { changeActiveType, setCardsBalance, subtractCardBalance } =
    balanceSlice.actions;

export default balanceSlice.reducer;
