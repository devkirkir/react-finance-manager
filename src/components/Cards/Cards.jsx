import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCards, removeCard, selectAll } from "./cardsSlice.js";
import {
    fetchBalance,
    setCardsValue,
    subtractCardValue,
} from "../Balance/balanceSlice";

import Card from "../Card/Card";
import Loader from "../Loader/Loader";

import store from "./../../store/index.js";

import "./cards.scss";
import useHttp from "../../hooks/useHttp.js";
import { useRef } from "react";

function Cards() {
    const dispatch = useDispatch();
    const { request } = useHttp();

    const getAllCards = selectAll(store.getState());
    let cards = [];

    const myRef = useRef();

    useEffect(() => {
        dispatch(fetchCards());
    }, []);

    useEffect(() => {
        accumulateCardsBalance();
    }, [request]);

    const accumulateCardsBalance = () => {
        let cardsTotalValue = getAllCards.reduce(
            (accumulator, current) => accumulator + current.value,
            0
        );

        dispatch(setCardsValue(cardsTotalValue));
    };

    const handleRemoveCard = (id, value) => {
        myRef.current.style.height = myRef.current.clientHeight + "px";

        request(`http://localhost:3000/cards/${id}`, "DELETE")
            .then(dispatch(removeCard(id)))
            .then(dispatch(subtractCardValue(value)))
            .catch((err) => console.log("err: ", err));

        myRef.current.style.height = myRef.current.clientHeight - 120 + "px";
    };

    const isLoading = useSelector((state) => state.cards.cardsLoading);

    cards =
        getAllCards.length !== 0 ? (
            getAllCards.map((item) => {
                return (
                    <Card
                        key={`card${item.id}`}
                        {...item}
                        removeCard={handleRemoveCard}
                    />
                );
            })
        ) : (
            <span className="empty">No cards</span>
        );

    const content = isLoading == "idle" ? cards : <Loader />;

    return (
        <div className="cards-wrapper">
            <h3 className="cards-wrapper__title">Cards</h3>
            <div className="cards" ref={myRef}>
                {isLoading !== "rejected" ? content : "error"}
            </div>
        </div>
    );
}

export default Cards;
