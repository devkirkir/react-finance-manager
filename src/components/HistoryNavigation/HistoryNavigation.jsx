import { useDispatch } from "react-redux";
import {
    fetchHistory,
    nextMonth,
    nextYear,
    prevMonth,
    prevYear,
} from "../History/historySlice";

import "./historyNavigation.scss";

function HistoryNavigation({
    months,
    nowYear,
    nowMonth,
    currentYear,
    currentMonth,
}) {
    const dispatch = useDispatch();

    const handleNext = () => {
        if (currentMonth == 11) {
            dispatch(nextMonth(0));
            dispatch(nextYear());
            dispatch(fetchHistory());
            return;
        }

        dispatch(nextMonth(++currentMonth));
        dispatch(fetchHistory());
    };

    const handlePrev = () => {
        if (currentMonth == 0) {
            dispatch(prevMonth(11));
            dispatch(prevYear());
            dispatch(fetchHistory());
            return;
        }

        dispatch(prevMonth(--currentMonth));
        dispatch(fetchHistory());
    };

    const prevMonthLabel =
        currentMonth == 0 ? months[11] : months[currentMonth - 1];

    const prevYearLabel = currentMonth == 0 ? currentYear - 1 : currentYear;

    const nextMonthLabel =
        currentMonth == 11 ? months[0] : months[currentMonth + 1];

    const nextYearLabel = currentMonth == 11 ? currentYear + 1 : currentYear;

    const conditionNextButton =
        new Date(currentYear, currentMonth + 1, 0).getTime() <
        new Date().getTime();

    return (
        <div className="history-navigation">
            <div className="history-navigation__button-container button-container">
                <button
                    className="button-container__button button-container-button"
                    onClick={handleNext}
                    disabled={!conditionNextButton}
                >
                    <span className="button-container-button__month">
                        {nextMonthLabel}
                    </span>
                    <span className="button-container-button__year">
                        {nextYearLabel}
                    </span>
                </button>
            </div>

            <div className="history-navigation__current history-navigation-current">
                <span className="history-navigation-current__month">
                    {months[currentMonth]}
                </span>

                <span className="history-navigation-current__year">
                    {currentYear}
                </span>
            </div>

            <div className="history-navigation__button-container button-container">
                <button
                    className="button-container__button button-container-button"
                    onClick={handlePrev}
                >
                    <span className="button-container-button__month">
                        {prevMonthLabel}
                    </span>
                    <span className="button-container-button__year">
                        {prevYearLabel}
                    </span>
                </button>
            </div>
        </div>
    );
}

export default HistoryNavigation;
