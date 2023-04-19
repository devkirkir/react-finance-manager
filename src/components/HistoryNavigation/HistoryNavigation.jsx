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

    return (
        <div className="history-navigation">
            {currentMonth < nowMonth && currentYear <= nowYear && (
                <button
                    className="history-navigation__button history-navigation-button"
                    onClick={handleNext}
                >
                    <div className="history-navigation-button__content">
                        <span className="history-navigation-button__month">
                            {nextMonthLabel}
                        </span>
                        <span className="history-navigation-button__year">
                            {nextYearLabel}
                        </span>
                    </div>
                </button>
            )}

            <div className="history-navigation__current history-navigation-current">
                <span className="history-navigation-current__month">
                    {months[currentMonth]}
                </span>

                <span className="history-navigation-current__year">
                    {currentYear}
                </span>
            </div>

            <button
                className="history-navigation__button history-navigation-button"
                onClick={handlePrev}
            >
                <div className="history-navigation-button__content">
                    <span className="history-navigation-button__month">
                        {prevMonthLabel}
                    </span>
                    <span className="history-navigation-button__year">
                        {prevYearLabel}
                    </span>
                </div>
            </button>
        </div>
    );
}

export default HistoryNavigation;
