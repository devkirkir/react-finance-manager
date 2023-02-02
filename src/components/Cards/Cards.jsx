import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCards, removeCard, cardSelectors } from "./cardsSlice.js";
import { setCardsValue, subtractCardValue } from "../Balance/balanceSlice";

import useHttp from "../../hooks/useHttp.js";

import Card from "../Card/Card";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal.jsx";
import ModalAddCardView from "../Modal/ModalAddCardView/ModalAddCardView.jsx";

import "./cards.scss";

function Cards() {
    const dispatch = useDispatch();
    const { request } = useHttp();

    const getAllCards = useSelector(cardSelectors.selectAll);
    const isLoading = useSelector((state) => state.cards.cardsLoading);

    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchCards());
    }, []);

    useEffect(() => {
        accumulateCardsBalance();
    }, [request]);

    const accumulateCardsBalance = () => {
        let cardsTotalValue = getAllCards.reduce(
            (accumulator, current) => accumulator + +current.value,
            0
        );

        dispatch(setCardsValue(cardsTotalValue));
    };

    const handleRemoveCard = (id, value, card) => {
        request(`http://localhost:3000/cards/${id}`, "DELETE")
            .then(dispatch(removeCard(id)))
            .then(dispatch(subtractCardValue(value)))
            .catch((err) => {
                throw new Error(err);
            });
    };

    const renderCards = useMemo(() => {
        return getAllCards.map((item) => {
            return (
                <Card
                    key={`card${item.id}`}
                    {...item}
                    removeCard={handleRemoveCard}
                />
            );
        });
    }, [getAllCards]);

    const cards =
        getAllCards.length !== 0 ? (
            renderCards
        ) : (
            <span className="empty">No cards</span>
        );

    const error = isLoading === "rejected" ? "error" : null;
    const loading = isLoading === "pending" ? <Loader /> : null;
    const content = isLoading === "idle" ? cards : null;

    return (
        <div className="cards-wrapper">
            <div className="wrapper-header">
                <h3 className="wrapper-header__title">Cards</h3>

                <button
                    className="wrapper-header__add"
                    onClick={() => setModalOpen((isModalOpen) => !isModalOpen)}
                >
                    <svg
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="13" cy="13" r="13" fill="#F1F1F1" />
                        <rect
                            x="12"
                            y="6"
                            width="2"
                            height="14"
                            fill="#333333"
                        />
                        <rect
                            x="6"
                            y="14"
                            width="2"
                            height="14"
                            transform="rotate(-90 6 14)"
                            fill="#333333"
                        />
                    </svg>
                </button>
            </div>
            <div className="cards">
                {error}
                {loading}
                {content}
            </div>

            {isModalOpen && (
                <Modal>
                    <ModalAddCardView setModalOpen={setModalOpen} />
                </Modal>
            )}
        </div>
    );
}

export default Cards;
