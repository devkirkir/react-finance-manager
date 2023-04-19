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

function ModalIncomeExpense({ type, setModal }) {
    const dispatch = useDispatch();
    const cashValue = useSelector((state) => state.balance.cash);

    const categories = ["category1", "category2", "category3"];

    const [selectData, setSelectData] = useState({
        id: "cash",
        value: cashValue,
        selectItem: null,
        selectItemError: null,
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const historyGenerator = (title, value, selectItem) => {
        return {
            id: nanoid(),
            title,
            category: selectItem,
            date: Date.now(),
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

        if (selectData.selectItem === null) {
            setSelectData((selectData) => ({
                ...selectData,
                selectItemError: "Select item",
            }));

            return;
        }

        if (obj.id === "cash") dispatch(changeCashBalance(+obj.body.value));

        if (obj.id !== "cash") dispatch(changeCardBalance(obj));

        dispatch(
            addHistory(
                historyGenerator(
                    data.incomeFormTitle,
                    data.incomeFormAmount,
                    selectData.selectItem
                )
            )
        );

        setModal({ isOpen: false, type: null });
    };

    const amountInputValid =
        type === "income"
            ? {
                  required: "Input cannot be empty!",
                  pattern: /^(\d*.{2}\d|\d*)$/,
                  min: {
                      value: 1,
                      message: "Min value 1",
                  },
              }
            : {
                  required: "Input cannot be empty!",
                  pattern: /^(\d*.{2}\d|\d*)$/,
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
                    className="content__form content-form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <label
                        htmlFor="content-form__title"
                        className="content-form__label"
                    >
                        Title:
                    </label>

                    <input
                        id="content-form__title"
                        className={
                            errors.incomeFormTitle
                                ? "content-form__input content-form__input_invalid"
                                : "content-form__input"
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

                    <p className="content-form__error">
                        {errors?.incomeFormTitle?.message}
                    </p>

                    <label className="content-form__label">Categories:</label>

                    <ItemSelect
                        items={categories}
                        setData={setSelectData}
                        error={selectData?.selectItemError}
                    />

                    <p className="content-form__error">
                        {selectData?.selectItemError}
                    </p>

                    <label
                        htmlFor="content-form__amount"
                        className="content-form__label"
                    >
                        Amount:
                    </label>

                    <input
                        id="content-form__amount"
                        className={
                            errors.incomeFormAmount
                                ? "content-form__input content-form__input_invalid"
                                : "content-form__input"
                        }
                        type="text"
                        inputMode="decimal"
                        placeholder="Amount"
                        {...register("incomeFormAmount", amountInputValid)}
                    />

                    <p className="content-form__error">
                        {errors?.incomeFormAmount?.message}
                    </p>

                    <label className="content-form__label">
                        Select {type === "income" ? "deposit " : "withdraw "}
                        account:
                    </label>

                    <AccountSelect data={selectData} setData={setSelectData} />

                    <input
                        type="submit"
                        className="content-form__submit"
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
