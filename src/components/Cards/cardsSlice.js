import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from "@reduxjs/toolkit";

import useHttp from "../../hooks/useHttp";

const { request } = useHttp();

const cardsAdapter = createEntityAdapter();
const initialState = cardsAdapter.getInitialState({
    cardsLoading: "pending",
    cardsLimit: 3,
});

export const fetchCards = createAsyncThunk("cards/fetchCards", () => {
    return request("http://localhost:3000/cards");
});

export const addCard = createAsyncThunk("cards/addCard", (body) => {
    return request(
        "http://localhost:3000/cards",
        "POST",
        { "Content-Type": "application/json" },
        JSON.stringify(body)
    );
});

export const changeCardBalance = createAsyncThunk(
    "cards/addCardBalance",
    (data) => {
        return request(
            `http://localhost:3000/cards/${data.id}`,
            "PATCH",
            { "Content-Type": "application/json" },
            JSON.stringify(data.body)
        );
    }
);

const cardsSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {
        removeCard(state, action) {
            cardsAdapter.removeOne(state, action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCards.pending, (state) => {
                state.cardsLoading = "pending";
            })
            .addCase(fetchCards.fulfilled, (state, action) => {
                state.cardsLoading = "idle";
                cardsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchCards.rejected, (state) => {
                state.cardsLoading = "rejected";
            })

            .addCase(addCard.fulfilled, (state, action) => {
                cardsAdapter.addOne(state, action.payload);
                state.cardsLoading = "idle";
            })
            .addCase(addCard.rejected, (state) => {
                state.cardsLoading = "rejected";
            })

            .addCase(changeCardBalance.pending, (state) => {
                state.cardsLoading = "pending";
            })
            .addCase(changeCardBalance.fulfilled, (state, action) => {
                cardsAdapter.upsertOne(state, action.payload);
                state.cardsLoading = "idle";
            })
            .addCase(changeCardBalance.rejected, (state) => {
                state.cardsLoading = "rejected";
            })
            .addDefaultCase(() => {});
    },
});
export const { removeCard } = cardsSlice.actions;

export const cardSelectors = cardsAdapter.getSelectors((state) => state.cards);

export default cardsSlice.reducer;
