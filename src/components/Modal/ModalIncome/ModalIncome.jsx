import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { changeCashBalance } from "../../Balance/balanceSlice";
import { changeCardBalance } from "../../Cards/cardsSlice";
import { addHistory } from "../../History/historySlice";

import Select from "../../Select/Select";

import "./ModalIncome.scss";

function ModalIncome({ setModal }) {
    const dispatch = useDispatch();
    const cashValue = useSelector((state) => state.balance.cash);

    const [selectData, setSelectData] = useState({ id: "cash", value: cashValue });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const historyGenerator = (title, value) => {
        return {
            id: nanoid(),
            title,
            category: "history category",
            date: "date",
            value,
            type: "income",
        };
    };

    const onSubmit = (data) => {
        const obj = {
            id: selectData.id,
            body: {
                value: String(+selectData.value + +data.incomeFormAmount),
            },
        };

        if (obj.id === "cash") {
            dispatch(changeCashBalance(+obj.body.value));
            dispatch(addHistory(historyGenerator(data.incomeFormTitle, data.incomeFormAmount)));

            setModal({ isOpen: false, type: null });

            return;
        }

        dispatch(changeCardBalance(obj));
        setModal({ isOpen: false, type: null });
    };

    return (
        <>
            <span className="content">
                <h3 className="content__title">Income</h3>

                <form className="content__form income-form" onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="income-form__title" className="income-form__label">
                        Title:
                    </label>

                    <input
                        id="income-form__title"
                        className={errors.incomeFormTitle ? "income-form__input income-form__input_invalid" : "income-form__input"}
                        type="text"
                        placeholder="Title"
                        {...register("incomeFormTitle", {
                            required: "Input cannot be empty!",
                            minLength: {
                                value: 2,
                                message: "Min length 2",
                            },
                            maxLength: {
                                value: 20,
                                message: "Max length 20",
                            },
                        })}
                    />

                    <p className="income-form__error">{errors?.incomeFormTitle?.message}</p>

                    <label htmlFor="income-form__amount" className="income-form__label">
                        Amount:
                    </label>

                    <input
                        id="income-form__amount"
                        className={errors.incomeFormAmount ? "income-form__input income-form__input_invalid" : "income-form__input"}
                        type="number"
                        placeholder="Amount"
                        {...register("incomeFormAmount", {
                            required: "Input cannot be empty!",
                            min: {
                                value: 1,
                                message: "Min value 1",
                            },
                        })}
                    />

                    <p className="income-form__error">{errors?.incomeFormAmount?.message}</p>

                    <label className="income-form__label">Select deposit account:</label>
                    <Select setData={setSelectData} />

                    <input type="submit" className="income-form__submit" value="Deposit" />
                </form>
            </span>

            <div className="modal-btns">
                <button className="modal-btns__btn" onClick={() => setModal({ isOpen: false, type: null })}>
                    Close
                </button>
            </div>
        </>
    );
}

export default ModalIncome;
