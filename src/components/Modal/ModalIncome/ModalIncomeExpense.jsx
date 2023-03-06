import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { changeCashBalance } from "../../Balance/balanceSlice";
import { changeCardBalance } from "../../Cards/cardsSlice";
import { addHistory } from "../../History/historySlice";

import PropTypes from "prop-types";

import AccountSelect from "../../AccountSelect/AccountSelect";
import ItemSelect from "../../ItemSelect/ItemSelect";

import "./ModalIncomeExpense.scss";

function ModalIncomeExpense({ type, setModal }) {
    const dispatch = useDispatch();
    const cashValue = useSelector((state) => state.balance.cash);

    const [selectData, setSelectData] = useState({
        id: "cash",
        value: cashValue,
        category: null,
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const historyGenerator = (title, value, category) => {
        return {
            id: nanoid(),
            title,
            category,
            date: new Date().toLocaleDateString(),
            value,
            type,
        };
    };

    const onSubmit = (data) => {
        const obj = {
            id: selectData.id,
            body: {
                value:
                    type === "income"
                        ? String(+selectData.value + +data.incomeFormAmount)
                        : String(+selectData.value - +data.incomeFormAmount),
            },
        };

        if (obj.id === "cash") dispatch(changeCashBalance(+obj.body.value));

        if (obj.id !== "cash") dispatch(changeCardBalance(obj));

        dispatch(
            addHistory(
                historyGenerator(
                    data.incomeFormTitle,
                    data.incomeFormAmount,
                    selectData.category
                )
            )
        );

        setModal({ isOpen: false, type: null });
    };

    const amountInputValid =
        type === "income"
            ? {
                  required: "Input cannot be empty!",
                  min: {
                      value: 1,
                      message: "Min value 1",
                  },
              }
            : {
                  required: "Input cannot be empty!",
                  min: {
                      value: 1,
                      message: "Min value 1",
                  },
                  max: {
                      value: selectData.value,
                      message: `Max value ${selectData.value}`,
                  },
              };

    return (
        <>
            <span className="content">
                <h3 className="content__title">
                    {type === "income" ? "Income" : "Expense"}
                </h3>

                <form
                    className="content__form income-expense-form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <label
                        htmlFor="income-expense-form__title"
                        className="income-expense-form__label"
                    >
                        Title:
                    </label>

                    <input
                        id="income-expense-form__title"
                        className={
                            errors.incomeFormTitle
                                ? "income-expense-form__input income-expense-form__input_invalid"
                                : "income-expense-form__input"
                        }
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

                    <p className="income-expense-form__error">
                        {errors?.incomeFormTitle?.message}
                    </p>

                    <label className="income-expense-form__label">
                        Categories:
                    </label>

                    <ItemSelect
                        selectData={selectData}
                        setData={setSelectData}
                    />

                    <label
                        htmlFor="income-expense-form__amount"
                        className="income-expense-form__label"
                    >
                        Amount:
                    </label>

                    <input
                        id="income-expense-form__amount"
                        className={
                            errors.incomeFormAmount
                                ? "income-expense-form__input income-expense-form__input_invalid"
                                : "income-expense-form__input"
                        }
                        type="number"
                        placeholder="Amount"
                        {...register("incomeFormAmount", amountInputValid)}
                    />

                    <p className="income-expense-form__error">
                        {errors?.incomeFormAmount?.message}
                    </p>

                    <label className="income-expense-form__label">
                        Select {type === "income" ? "deposit " : "withdraw "}
                        account:
                    </label>

                    <AccountSelect setData={setSelectData} />

                    <input
                        type="submit"
                        className="income-expense-form__submit"
                        value={type === "income" ? "Deposit" : "Withdraw"}
                    />
                </form>
            </span>

            <div className="modal-btns">
                <button
                    className="modal-btns__btn"
                    onClick={() => setModal({ isOpen: false, type: null })}
                >
                    Close
                </button>
            </div>
        </>
    );
}

ModalIncomeExpense.propTypes = {
    type: PropTypes.string.isRequired,
    setModal: PropTypes.func.isRequired,
};

export default ModalIncomeExpense;
