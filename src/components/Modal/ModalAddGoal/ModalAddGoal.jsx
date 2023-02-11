import { nanoid } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addGoal } from "../../Goals/goalsSlice";
import "./modalAddGoal.scss";

function ModalAddGoal({ setModalOpen }) {
    const dispatch = useDispatch();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        const goalObj = {
            id: nanoid(),
            title: data.goalTitle,
            value: data.goalHave,
            need: data.goalNeed,
        };

        dispatch(addGoal(goalObj));
        setModalOpen(false);
    };

    const validPattern = /^(\d*.{2}\d|\d*)$/g;

    return (
        <>
            <div className="content">
                <span className="content__title">Add New Goal</span>

                <form className="form">
                    <label htmlFor="goal-title">Title</label>
                    <input
                        {...register("goalTitle", {
                            required: "Input cannot be empty!",
                            maxLength: {
                                value: 9,
                                message: "Title must be less than 10 chars",
                            },
                        })}
                        className={errors.goalTitle ? "invalid" : null}
                        type="text"
                        id="goal-title"
                        placeholder="Title"
                    />

                    <span className="form__error">{errors.goalTitle?.message}</span>

                    <label htmlFor="goal-need">You need</label>
                    <input
                        {...register("goalNeed", {
                            required: "Input cannot be empty!",
                            pattern: {
                                value: validPattern,
                                message: "Wrong value",
                            },
                        })}
                        className={errors.goalNeed ? "invalid" : null}
                        type="number"
                        id="goal-need"
                        placeholder="0.00$"
                    />

                    <span className="form__error">{errors.goalNeed?.message}</span>

                    <label htmlFor="goal-have">You have</label>
                    <input
                        {...register("goalHave", {
                            required: "Input cannot be empty!",
                            pattern: {
                                value: validPattern,
                                message: "Wrong value",
                            },
                        })}
                        className={errors.goalHave ? "invalid" : null}
                        type="number"
                        id="goal-have"
                        placeholder="0.00$"
                    />

                    <span className="form__error">{errors.goalHave?.message}</span>
                </form>
            </div>
            <div className="modal-btns">
                <button className="modal-btns__btn" onClick={handleSubmit(onSubmit)}>
                    Done
                </button>
                <button className="modal-btns__btn" onClick={() => setModalOpen(false)}>
                    Close
                </button>
            </div>
        </>
    );
}

export default ModalAddGoal;
