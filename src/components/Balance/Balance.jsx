import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchBalance, changeActiveType } from "./balanceSlice";

import useFormatNumber from "../../hooks/useFormatNumber";

import BalanceToggles from "../BalanceToggles/BalanceToggles";
import Loader from "../Loader/Loader";

import "./balance.scss";

function Balance() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBalance());
    }, []);

    const balance = useSelector((state) => state.balance);

    const changeType = (type) => {
        dispatch(changeActiveType(type.toLowerCase()));
    };

    const data = {
        typeLabel:
            balance.activeType[0].toUpperCase() +
            balance.activeType.slice(1, 5).toLowerCase(),
        cards: useFormatNumber(balance.cards.toFixed(2)),
        cash: useFormatNumber(balance.cash.toFixed(2)),
        total: useFormatNumber((balance.cards + balance.cash).toFixed(2)),
    };

    const error = balance.balanceLoading === "rejected" ? "error" : null;
    const loading = balance.balanceLoading === "pending" ? <Loader /> : null;
    const content =
        balance.balanceLoading === "idle" ? (
            <View data={data} balance={balance} changeType={changeType} />
        ) : null;

    return (
        <div className="balance-wrapper">
            <h3 className="balance-wrapper__title">Balance</h3>
            <div className="balance">
                {error}
                {loading}
                {content}
            </div>
        </div>
    );
}

function View({ data, changeType, balance }) {
    return (
        <>
            <h3 className="balance__title">{data.typeLabel}</h3>

            <span className="balance__value">
                <span className="dollar">$</span>

                {data[balance.activeType].number}

                <span className="float">{data[balance.activeType].float}</span>
            </span>

            <div className="control-btns">
                <BalanceToggles
                    changeType={changeType}
                    activeType={balance.activeType}
                />
            </div>
        </>
    );
}

export default Balance;
