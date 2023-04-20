import { useEffect, useMemo, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchHistory, historySelectors, loadMore } from "./historySlice";

import HistoryItem from "../HistoryItem/HistoryItem";
import SkeletonLoading from "../SkeletonLoading/SkeletonLoading";
import HistoryNavigation from "../HistoryNavigation/HistoryNavigation";

import "./history.scss";

function History() {
    const dispatch = useDispatch();

    const getAllHistory = useSelector(historySelectors.selectAll);
    const selectTotalHistory = useSelector(historySelectors.selectTotal);
    const state = useSelector((state) => state.history);
    const isLoading = state.isLoading;

    const monthsList = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    useEffect(() => {
        dispatch(fetchHistory());
    }, []);

    const sortByField = (field) => {
        return (a, b) => (b[field] > a[field] ? 1 : -1);
    };

    const renderHistory = useMemo(() => {
        return getAllHistory
            .sort(sortByField("date"))
            .map((item) => (
                <HistoryItem key={`history-${item.id}`} {...item} />
            ));
    });

    const prefTotalLength = useRef(selectTotalHistory);

    const handleLoadMore = () => {
        dispatch(loadMore());
        dispatch(fetchHistory());
        prefTotalLength.current = selectTotalHistory;
    };

    const history = getAllHistory.length ? (
        renderHistory
    ) : (
        <span className="history-wrapper__label">Not found</span>
    );

    const error =
        isLoading === "rejected" ? (
            <span className="history-wrapper__label">Error</span>
        ) : null;

    const loading =
        isLoading === "pending" ? (
            <SkeletonLoading type={"history"} count={6} />
        ) : null;

    console.log(prefTotalLength.current);
    console.log("selectTotalHistory", selectTotalHistory);

    return (
        <div className="history">
            <h3 className="history__title">Transaction History</h3>

            <div className="history-wrapper">
                {getAllHistory.length !== 0 && (
                    <div className="history-wrapper__header">
                        <span className="history-wrapper__title">Title</span>
                        <span className="history-wrapper__category">
                            Category
                        </span>
                        <span className="history-wrapper__date">Date</span>
                        <span className="history-wrapper__value">Value</span>
                    </div>
                )}

                <ul className="history-wrapper__list">
                    {error}
                    {history}
                    {loading}
                </ul>

                {selectTotalHistory <= prefTotalLength.current && (
                    <button
                        className="history-wrapper__more"
                        onClick={handleLoadMore}
                    >
                        More
                    </button>
                )}

                <HistoryNavigation months={monthsList} {...state} />
            </div>
        </div>
    );
}

export default History;
