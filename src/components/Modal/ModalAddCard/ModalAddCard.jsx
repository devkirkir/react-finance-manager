import { useEffect, useReducer } from "react";

import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import PropTypes from "prop-types";

import { addCard } from "./../../Cards/cardsSlice.js";

import useFormatNumber from "../../../hooks/useFormatNumber.js";

import visa from "../../../assets/visa.png";
import mastercard from "../../../assets/mastercard.png";

import "./modalAddCard.scss";

const initialState = {
    data: {
        balance: "",
        lastNumbers: "",
        cardType: "visa",
    },
    index: 0,
    currentValue: null,
    errorLabel: null,
};

function reducer(state, action) {
    switch (action.type) {
        case "next":
            return {
                ...state,
                index: state.index + 1,
            };
        case "back":
            return {
                ...state,
                index: state.index - 1,
            };
        case "onError":
            return {
                ...state,
                errorLabel: action.payload,
            };
        case "setCurrentValue":
            return {
                ...state,
                currentValue: action.payload,
            };
        case "onBalanceChange":
            return {
                ...state,
                data: {
                    ...state.data,
                    balance: action.payload,
                },
                currentValue: action.payload,
            };
        case "onNumbersChange":
            return {
                ...state,
                data: {
                    ...state.data,
                    lastNumbers: action.payload,
                },
                currentValue: action.payload,
            };
        case "onCardTypeChange":
            return {
                ...state,
                data: {
                    ...state.data,
                    cardType: action.payload,
                },
                currentValue: action.payload,
            };
        default: {
            return state;
        }
    }
}

function ModalAddCardView({ setCardModalOpen }) {
    const reduxDispatch = useDispatch();

    const [state, dispatch] = useReducer(reducer, initialState);

    const addCards = () => {
        reduxDispatch(
            addCard({
                id: nanoid(),
                value: state.data.balance,
                lastNumbers: state.data.lastNumbers,
                cardType: state.data.cardType.toLowerCase(),
            })
        );
    };

    const setCurrentValue = (data, stateIndex) => {
        return Object.values(data).filter((item, index) => (index === stateIndex ? item : ""))[0];
    };

    const handleNextBtnClick = () => {
        if (state.index === views.length - 1) {
            addCards();
            setCardModalOpen(false);
            return;
        }

        if (!state.currentValue) {
            dispatch({ type: "onError", payload: "Input cannot be empty!" });
            return;
        }

        dispatch({
            type: "setCurrentValue",
            payload: setCurrentValue(state.data, state.index + 1),
        });

        dispatch({ type: "next" });
        dispatch({ type: "onError", payload: null });
    };

    const handleBackBtnClick = () => {
        if (state.index === 0) return;

        dispatch({
            type: "setCurrentValue",
            payload: setCurrentValue(state.data, state.index - 1),
        });

        dispatch({ type: "back" });
        dispatch({ type: "onError", payload: null });
    };

    const views = [
        <BalanceInput dispatch={dispatch} value={state.data.balance} error={state.errorLabel} />,
        <LastNumbersInput dispatch={dispatch} value={state.data.lastNumbers} error={state.errorLabel} />,
        <CardTypeSelect dispatch={dispatch} value={state.data.cardType} />,
        <ConfirmCard value={state.data.balance} cardType={state.data.cardType} lastNumbers={state.data.lastNumbers} />,
    ];

    let btnLabel = state.index !== views.length - 1 ? "Next" : "Done";
    let disabled = state.errorLabel === null ? false : true;

    return (
        <>
            <div className="content">
                <h3 className="content__title">Add Card </h3>
                {views[state.index]}
            </div>

            <div className="modal-btns">
                <button className="modal-btns__btn" onClick={() => handleNextBtnClick()} disabled={disabled}>
                    {btnLabel}
                </button>
                <button className="modal-btns__btn" onClick={() => handleBackBtnClick()}>
                    Back
                </button>
                <button className="modal-btns__btn" onClick={() => setCardModalOpen(false)}>
                    Close
                </button>
            </div>
        </>
    );
}

function BalanceInput({ dispatch, value, error }) {
    const formattedValue = (value) => {
        return value.match(/(\d*.{2}\d|\d*)/g)[0];
    };

    return (
        <>
            <input
                id="card-balance-input"
                type="number"
                value={value}
                className={error ? "input-form invalid" : "input-form"}
                onChange={(event) => {
                    if (event.target.value.length > 0) {
                        dispatch({ type: "onError", payload: null });
                    }

                    dispatch({
                        type: "onBalanceChange",
                        payload: formattedValue(event.target.value),
                    });
                }}
                placeholder="Balance"
            />
            <span className="error">{error}</span>
        </>
    );
}

BalanceInput.propTypes = {
    dispatch: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
};

function LastNumbersInput({ dispatch, value, error }) {
    const formattedValue = (value) => {
        return value.length > 0 ? value.match(/\d{1,4}/)[0] : "";
    };

    const valid = (value) => {
        if (value.length < 4) {
            dispatch({
                type: "onError",
                payload: "Value length cannot be less then 4!",
            });
            return;
        }

        if (value.length > 4) {
            dispatch({
                type: "onError",
                payload: "Value length cannot be more then 4!",
            });
            return;
        }

        if (value.length == 4) {
            dispatch({ type: "onError", payload: null });
            return true;
        }
    };

    return (
        <>
            <input
                className={error ? "input-form invalid" : "input-form"}
                type="number"
                placeholder="Last 4 digit"
                value={value}
                maxLength="4"
                onChange={(event) => {
                    valid(event.target.value);

                    dispatch({
                        type: "onNumbersChange",
                        payload: formattedValue(event.target.value),
                    });
                }}
            />
            <span className="error">{error}</span>
        </>
    );
}

LastNumbersInput.propTypes = {
    dispatch: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
};

function CardTypeSelect({ dispatch }) {
    return (
        <select
            className="select-form"
            onChange={(event) =>
                dispatch({
                    type: "onCardTypeChange",
                    payload: event.target.value,
                })
            }
        >
            <option>Visa</option>
            <option>Mastercard</option>
        </select>
    );
}

function ConfirmCard({ value, lastNumbers, cardType }) {
    const formattedValue = useFormatNumber((+value).toFixed(2));

    let logo = cardType.toLowerCase() === "visa" ? visa : mastercard;

    return (
        <>
            <div className="card confirm-card">
                <img className="card__type" src={logo} alt="system logo" />

                <span className="value">
                    <span className="value__dollar">$</span>
                    <span className="value__int">{formattedValue.number}</span>
                    <span className="value__float">{formattedValue.float}</span>
                </span>

                <span className="card__number">{`**** **** **** ${lastNumbers}`}</span>
            </div>
        </>
    );
}

ConfirmCard.propTypes = {
    value: PropTypes.string.isRequired,
    lastNumbers: PropTypes.string.isRequired,
    cardType: PropTypes.string.isRequired,
};

export default ModalAddCardView;
