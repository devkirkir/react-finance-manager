import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import balance from "./../components/Balance/balanceSlice.js";
import cards from "../components/Cards/cardsSlice.js";
import goals from "../components/Goals/goalsSlice.js";

const store = configureStore({
    reducer: { balance, cards, goals },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true,
});

export default store;
