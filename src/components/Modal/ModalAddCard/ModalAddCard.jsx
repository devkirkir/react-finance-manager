import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { addCard } from "./../../Cards/cardsSlice.js";

import ItemSelect from "../../ItemSelect/ItemSelect.jsx";

import PropTypes from "prop-types";

function ModalAddCard({ setCardModalOpen }) {
    const dispatch = useDispatch();

    const [selectData, setSelectData] = useState({
        selectItem: null,
        selectItemError: null,
    });

    const dispatchCard = (value, lastNumbers, cardType) => {
        dispatch(
            addCard({
                id: nanoid(),
                value,
                lastNumbers,
                cardType,
            })
        );
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        if (selectData.selectItem === null) {
            setSelectData((selectData) => ({
                ...selectData,
                selectItemError: "Select item",
            }));

            return;
        }

        dispatchCard(
            data.addCardFormBalance,
            data.addCardFormLastNumbers,
            selectData.selectItem.toLowerCase()
        );

        setCardModalOpen(false);
    };

    const cardType = ["Visa", "Mastercard"];

    return (
        <>
            <span className="content">
                <h3 className="content__title">Add Card</h3>

                <form
                    className="content__form content-form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <label
                        htmlFor="content-form__balance"
                        className="content-form__label"
                    >
                        Balance:
                    </label>

                    <input
                        id="content-form__balance"
                        className={
                            errors.addCardFormBalance
                                ? "content-form__input content-form__input_invalid"
                                : "content-form__input"
                        }
                        type="text"
                        placeholder="Balance"
                        {...register("addCardFormBalance", {
                            required: "Input cannot be empty!",
                            min: {
                                value: 0,
                                message: "Min balance 0",
                            },
                            pattern: {
                                value: /^(\d*.{2}\d|\d*)$/g,
                                message: "Wrong format",
                            },
                        })}
                    />

                    <p className="content-form__error">
                        {errors?.addCardFormBalance?.message}
                    </p>

                    <label
                        htmlFor="content-form__last"
                        className="content-form__label"
                    >
                        Last 4 digit:
                    </label>

                    <input
                        id="content-form__last"
                        className={
                            errors.addCardFormLastNumbers
                                ? "content-form__input content-form__input_invalid"
                                : "content-form__input"
                        }
                        type="number"
                        placeholder="Last 4 digit"
                        {...register("addCardFormLastNumbers", {
                            required: "Input cannot be empty!",
                            pattern: {
                                value: /^(\d*)$/g,
                                message: "Wrong format",
                            },
                            minLength: {
                                value: 4,
                                message: "Min lenght 4",
                            },
                            maxLength: {
                                value: 4,
                                message: "Max lenght 4",
                            },
                        })}
                    />

                    <p className="content-form__error">
                        {errors?.addCardFormLastNumbers?.message}
                    </p>

                    <label className="content-form__label">Card type:</label>

                    <ItemSelect items={cardType} setData={setSelectData} />

                    <p className="content-form__error">
                        {selectData?.selectItemError}
                    </p>

                    <input
                        type="submit"
                        className="content-form__submit"
                        value="Add Card"
                    />
                </form>
            </span>

            <div className="modal-btns">
                <button
                    className="modal-btns__btn"
                    onClick={() => setCardModalOpen(false)}
                >
                    Close
                </button>
            </div>
        </>
    );
}

ModalAddCard.propTypes = {
    setCardModalOpen: PropTypes.func.isRequired,
};

export default ModalAddCard;
