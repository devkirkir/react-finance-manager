import { useEffect, useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchHistory, historySelectors } from "./historySlice";

import HistoryItem from "../HistoryItem/HistoryItem";
import SkeletonLoading from "../SkeletonLoading/SkeletonLoading";
import HistoryNavigation from "../HistoryNavigation/HistoryNavigation";

import "./history.scss";

function History() {
    const dispatch = useDispatch();
    const getAllHistory = useSelector(historySelectors.selectAll);
    const isLoading = useSelector((state) => state.history.isLoading);

    useEffect(() => {
        dispatch(fetchHistory());
    }, []);

    const sortByField = (field) => {
        return (a, b) => (b[field] > a[field] ? 1 : -1);
    };

    const renderHistory = useMemo(() => {
        return getAllHistory
            .sort(sortByField("date"))
            .map((item, index) => (
                <HistoryItem
                    key={`history-${item.id}`}
                    {...item}
                    indexDelay={index}
                />
            ));
    });

    const history =
        getAllHistory.length !== 0 ? (
            renderHistory
        ) : (
            <span className="empty">No history</span>
        );

    const error = isLoading === "rejected" ? "error" : null;

    const loading =
        isLoading === "pending" ? (
            <SkeletonLoading type={"history"} count={12} />
        ) : null;

    const content = isLoading === "idle" ? history : null;

    return (
        <div className="history">
            <h3 className="history__title">Transaction History</h3>

            <div className="history-wrapper">
                <div className="history-wrapper__header">
                    <span className="history-wrapper__title">Title</span>
                    <span className="history-wrapper__category">Category</span>
                    <span className="history-wrapper__date">Date</span>
                    <span className="history-wrapper__value">Value</span>
                </div>

                <ul className="history-wrapper__list">
                    {error}
                    {loading}
                    {content}
                </ul>

                <div className="history-wrapper__footer">
                    <HistoryNavigation />
                </div>
            </div>
        </div>
    );
}

export default History;
