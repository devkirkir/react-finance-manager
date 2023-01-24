import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from "@reduxjs/toolkit";

import useHttp from "../../hooks/useHttp";

const cardsAdapter = createEntityAdapter();
const initialState = cardsAdapter.getInitialState({
    cardsLoading: "pending",
});

export const fetchCards = createAsyncThunk("cards/fetchCards", () => {
    const { request } = useHttp();

    return request("http://localhost:3000/cards");
});

export const addCard = createAsyncThunk("cards/addCard", (body) => {
    const { request } = useHttp();

    console.log(JSON.stringify(body));

    return request(
        "http://localhost:3000/cards",
        "POST",
        { "Content-Type": "application/json" },
        JSON.stringify(body)
    );
});

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
            .addCase(addCard.pending, (state) => {
                console.log("pending");
            })
            .addCase(addCard.fulfilled, (state) => {
                console.log("fulfilled");
            })
            .addCase(addCard.rejected, (state) => {
                console.log("rejected");
            })
            .addDefaultCase(() => {});
    },
});
export const { removeCard } = cardsSlice.actions;

// export const { selectAll } = cardsAdapter.getSelectors((state) => state.cards);

export const cardSelectors = cardsAdapter.getSelectors((state) => state.cards);

export default cardsSlice.reducer;