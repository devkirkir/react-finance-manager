import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import balance from "./../components/Balance/balanceSlice.js";
import cards from "../components/Cards/cardsSlice.js";

const store = configureStore({
    reducer: { balance, cards },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true,
});

export default store;
