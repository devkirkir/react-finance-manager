import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCards, removeCard, cardSelectors } from "./cardsSlice.js";
import { setCardsValue, subtractCardValue } from "../Balance/balanceSlice";

import useHttp from "../../hooks/useHttp.js";

import Card from "../Card/Card";
import Loader from "../Loader/Loader";

import "./cards.scss";

function Cards() {
    const dispatch = useDispatch();
    const { request } = useHttp();

    let getAllCards = useSelector(cardSelectors.selectAll);

    const cardsRef = useRef();

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

    const handleRemoveCard = (id, value, card) => {
        cardsRef.current.style.height = cardsRef.current.clientHeight + "px";

        request(`http://localhost:3000/cards/${id}`, "DELETE")
            .then(dispatch(removeCard(id)))
            .then(dispatch(subtractCardValue(value)))
            .catch((err) => console.log("err: ", err));

        cardsRef.current.style.height =
            cardsRef.current.clientHeight - 120 + "px";
    };

    const cards =
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

    const isLoading = useSelector((state) => state.cards.cardsLoading);

    const content = isLoading == "idle" ? cards : <Loader />;

    return (
        <div className="cards-wrapper">
            <h3 className="cards-wrapper__title">Cards</h3>
            <div className="cards" ref={cardsRef}>
                {isLoading !== "rejected" ? content : "error"}
            </div>
        </div>
    );
}

export default Cards;
