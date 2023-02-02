import { useReducer } from "react";

import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { addCard } from "./../../Cards/cardsSlice.js";

import useFormatNumber from "../../../hooks/useFormatNumber.js";

import visa from "../../../assets/visa.png";
import mastercard from "../../../assets/mastercard.png";

import "./modalAddCardView.scss";

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

function ModalAddCardView({ setModalOpen }) {
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
        return Object.values(data).filter((item, index) =>
            index === stateIndex ? item : ""
        )[0];
    };

    const handleNextBtnClick = () => {
        if (state.index === views.length - 1) {
            addCards();
            setModalOpen(false);
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
        <BalanceInput
            dispatch={dispatch}
            value={state.data.balance}
            error={state.errorLabel}
        />,
        <LastNumbersInput
            dispatch={dispatch}
            value={state.data.lastNumbers}
            error={state.errorLabel}
        />,
        <CardTypeSelect dispatch={dispatch} value={state.data.cardType} />,
        <ConfirmCard
            value={state.data.balance}
            cardType={state.data.cardType}
            lastNumbers={state.data.lastNumbers}
        />,
    ];

    let btnLabel = state.index !== views.length - 1 ? "Next" : "Done";
    let disabled = state.errorLabel === null ? false : true;

    return (
        <>
            <div className="content">{views[state.index]}</div>

            <div className="modal-btns">
                <button
                    className="modal-btns__btn"
                    onClick={() => handleNextBtnClick()}
                    disabled={disabled}
                >
                    {btnLabel}
                </button>
                <button
                    className="modal-btns__btn"
                    onClick={() => handleBackBtnClick()}
                >
                    Back
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

function BalanceInput({ dispatch, value, error }) {
    const formattedValue = (value) => {
        return value.match(/(\d*.{2}\d|\d*)/g)[0];
    };

    return (
        <>
            <input
                className="input-balance"
                type="number"
                value={value}
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
                className="input-balance"
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

function CardTypeSelect({ dispatch, value }) {
    return (
        <select
            className="input-balance"
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
    value = +value;
    const formattedValue = useFormatNumber(value.toFixed(2));
    const logo = cardType === "visa" ? visa : mastercard;

    return (
        <>
            <span className="confirm-label">Confirmation</span>

            <div className="card confirm-card">
                <img className="card__type" src={logo} alt="system logo" />

                <span className="card__value">
                    <span className="dollar">$</span>
                    {formattedValue.number}
                    <span className="float">{formattedValue.float}</span>
                </span>

                <span className="card__number">{`**** **** **** ${lastNumbers}`}</span>
            </div>
        </>
    );
}

export default ModalAddCardView;
