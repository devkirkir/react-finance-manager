import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchBalance, changeActiveType } from "./balanceSlice";

import formatNumber from "../../utils/formatNumber";

import BalanceToggles from "../BalanceToggles/BalanceToggles";
import SkeletonLoading from "../SkeletonLoading/SkeletonLoading";
import ControlButtons from "../ControlButtons/ControlButtons";

import "./balance.scss";

function Balance() {
    const balance = useSelector((state) => state.balance);
    const isLoading = balance.balanceLoading;

    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoading !== "idle") dispatch(fetchBalance());
    }, []);

    const changeType = (type) => {
        dispatch(changeActiveType(type.toLowerCase()));
    };

    const data = {
        typeLabel:
            balance.activeType[0].toUpperCase() +
            balance.activeType.slice(1, 5).toLowerCase(),
        cards: formatNumber(balance.cards.toFixed(2)),
        cash: formatNumber(balance.cash.toFixed(2)),
        total: formatNumber((balance.cards + balance.cash).toFixed(2)),
    };

    const error = isLoading === "rejected" ? "error" : null;

    const loading =
        isLoading === "pending" ? (
            <SkeletonLoading type={"balance"} count={1} />
        ) : null;

    const content =
        isLoading === "idle" ? (
            <View data={data} balance={balance} changeType={changeType} />
        ) : null;

    return (
        <div className="balance-wrapper">
            <h3 className="balance-wrapper__title">Balance</h3>
            <div className="balance-wrapper__balance balance-wrapper-balance">
                {error}
                {loading}
                {content}
            </div>

            <ControlButtons />
        </div>
    );
}

function View({ data, changeType, balance }) {
    return (
        <>
            <h3 className="balance-wrapper-balance__title">{data.typeLabel}</h3>

            <span className="balance-wrapper-balance__value">
                <span className="dollar">$</span>

                {data[balance.activeType].number}

                <span className="float">{data[balance.activeType].float}</span>
            </span>

            <div className="balance-wrapper-balance__control-btns balance-wrapper-balance-control-btns">
                <BalanceToggles
                    changeType={changeType}
                    activeType={balance.activeType}
                />
            </div>
        </>
    );
}

export default Balance;
