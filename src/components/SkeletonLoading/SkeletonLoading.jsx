import React from "react";

import PropTypes from "prop-types";

import "./skeletonLoading.scss";

function SkeletonLoading({ type, count }) {
    const history =
        type === "history" ? <HistorySkeleton count={count} /> : null;

    const cards = type === "cards" ? <CardsSkeleton count={count} /> : null;

    const balance = type === "balance" ? <BalanceSkeleton /> : null;

    return (
        <div>
            {history}
            {cards}
            {balance}
        </div>
    );
}

SkeletonLoading.propTypes = {
    type: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
};

function HistorySkeleton({ count }) {
    const renderItems = () => {
        let items = [];

        let i = 0;

        while (i < count) {
            items.push(
                <div
                    className="history-skeleton-item"
                    key={`history-skeleton-item-${i}`}
                >
                    <div className="history-skeleton-item__title"></div>
                    <div className="history-skeleton-item__category"></div>
                    <div className="history-skeleton-item__date"></div>
                    <div className="history-skeleton-item__value"></div>
                </div>
            );

            i++;
        }

        return items;
    };

    return renderItems();
}

HistorySkeleton.propTypes = {
    count: PropTypes.number.isRequired,
};

function CardsSkeleton({ count }) {
    const renderItems = () => {
        let items = [];

        let i = 0;

        while (i < count) {
            items.push(
                <div className="card-skeleton" key={`card-skeleton-item-${i}`}>
                    <div className="card-skeleton__type"></div>

                    <div className="card-skeleton__value"></div>

                    <div className="card-skeleton__number"></div>
                </div>
            );

            i++;
        }

        return items;
    };

    return renderItems();
}

CardsSkeleton.propTypes = {
    count: PropTypes.number.isRequired,
};

function BalanceSkeleton() {
    return (
        <div className="balance-skeleton" key={`balance-skeleton-item`}></div>
    );
}

export default SkeletonLoading;
