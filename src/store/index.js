import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import balance from "./../components/Balance/balanceSlice.js";
import cards from "../components/Cards/cardsSlice.js";
import history from "../components/History/historySlice.js";

const store = configureStore({
    reducer: { balance, cards, history },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true,
});

export default store;
