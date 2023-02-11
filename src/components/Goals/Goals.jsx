import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchGoals, goalsSelectors, removeGoal } from "./goalsSlice";

import Goal from "../Goal/Goal";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
import ModalError from "../Modal/ModalError/ModalError";
import ModalAddGoal from "../Modal/ModalAddGoal/ModalAddGoal";

import "./goals.scss";
import useHttp from "../../hooks/useHttp";

function Goals() {
    const dispatch = useDispatch();
    const { request } = useHttp();

    const getAllGoals = useSelector(goalsSelectors.selectAll);
    const isLoading = useSelector((state) => state.goals.goalsLoading);
    const maxGoals = useSelector((state) => state.goals.maxGoals);

    const [isModalOpen, setModalOpen] = useState(false);
    const [isErrorModalOpen, setErrorModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchGoals());
    }, []);

    const handleRemoveGoal = (id) => {
        request(`http://localhost:3000/goals/${id}`, "DELETE")
            .then(dispatch(removeGoal(id)))
            .catch((err) => {
                throw new Error(err);
            });
    };

    const renderGoals = () => getAllGoals.map((item) => <Goal key={`goal${item.id}`} {...item} />);

    const goals = useMemo(() => (getAllGoals.length !== 0 ? renderGoals() : <span className="empty">No goals</span>), [getAllGoals]);

    const error = isLoading === "rejected" ? "error" : null;
    const loading = isLoading === "pending" ? <Loader /> : null;
    const content = isLoading === "idle" ? goals : null;

    return (
        <div className="goals-wrapper">
            <div className="wrapper-header">
                <h3 className="wrapper-header__title">Goals</h3>

                <button
                    className="wrapper-header__add"
                    onClick={() => {
                        if (getAllGoals.length < maxGoals) {
                            setModalOpen(true);
                            return;
                        }

                        setErrorModalOpen(true);
                    }}
                >
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="13" cy="13" r="13" fill="#F1F1F1" />
                        <rect x="12" y="6" width="2" height="14" fill="#333333" />
                        <rect x="6" y="14" width="2" height="14" transform="rotate(-90 6 14)" fill="#333333" />
                    </svg>
                </button>
            </div>
            <div className="goals">
                {error}
                {loading}
                {content}
            </div>

            {isModalOpen && (
                <Modal>
                    <ModalAddGoal setModalOpen={setModalOpen} />
                </Modal>
            )}

            {isErrorModalOpen && (
                <Modal>
                    <ModalError setErrorModalOpen={setErrorModalOpen}>Bro, max limit 3 goals :c</ModalError>
                </Modal>
            )}
        </div>
    );
}

export default Goals;
