import React from "react";
import { useDispatch } from "react-redux";
import { addCard } from "./../../Cards/cardsSlice.js";
import "./modalAddCardView.scss";

function ModalAddCardView({ setModalOpen }) {
    const dispatch = useDispatch();

    const addCards = () => {
        dispatch(
            addCard({
                id: "100",
                value: "100",
                lastDigits: "5581",
                type: "mastercard",
            })
        );
    };
    return (
        <>
            <div className="content">
                <input
                    className="input-balance"
                    type="number"
                    placeholder="Type card's balance"
                />
            </div>

            <div className="modal-btns">
                <button className="modal-btns__btn" onClick={() => addCards()}>
                    Done
                </button>
                <button
                    className="modal-btns__btn"
                    onClick={() => setModalOpen(false)}
                >
                    Close
                </button>
            </div>
        </>
    );
}

export default ModalAddCardView;
