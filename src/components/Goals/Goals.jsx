import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Goal from "../Goal/Goal";
import Loader from "../Loader/Loader";
import "./goals.scss";
import { fetchGoals, goalsSelectors } from "./goalsSlice";

function Goals() {
    const dispatch = useDispatch();

    const getAllGoals = useSelector(goalsSelectors.selectAll);
    const isLoading = useSelector((state) => state.goals.goalsLoading);

    useEffect(() => {
        dispatch(fetchGoals());
    }, []);

    const renderGoals = () => getAllGoals.map((item) => <Goal key={item.id} {...item} />);

    const goals = useMemo(() => (getAllGoals.length !== 0 ? renderGoals() : <span className="empty">No goals</span>), [getAllGoals]);

    const error = isLoading === "rejected" ? "error" : null;
    const loading = isLoading === "pending" ? <Loader /> : null;
    const content = isLoading === "idle" ? goals : null;

    return (
        <div className="goals-wrapper">
            <div className="wrapper-header">
                <h3 className="wrapper-header__title">Goals</h3>

                <button className="wrapper-header__add">
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
        </div>
    );
}

export default Goals;
