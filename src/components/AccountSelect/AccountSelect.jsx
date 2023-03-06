import { useState } from "react";
import { motion } from "framer-motion";

import { useSelector } from "react-redux";
import { cardSelectors } from "../Cards/cardsSlice";

import "./accountSelect.scss";

function AccountSelect({ setData }) {
    const getAllCards = useSelector(cardSelectors.selectAll);
    const cashValue = useSelector((state) => state.balance.cash);

    const [select, setSelect] = useState({
        open: false,
        title: "Cash",
        value: cashValue,
    });

    const listItems = getAllCards.map((item) => (
        <li
            className="account-select-dropdown__item account-select-dropdown-item"
            key={`select-item-${item.id}`}
            onClick={() =>
                handleSelect(`Card ${item.lastNumbers}`, item.value, item.id)
            }
        >
            <span className="account-select-dropdown-item__title">
                Card {item.lastNumbers}
            </span>
            <span className="account-select-dropdown-item__value">
                {item.value}$
            </span>
        </li>
    ));

    const handleSelect = (title, value, id = "cash") => {
        setSelect((select) => ({
            open: false,
            title,
            value,
        }));

        setData({ id, value });
    };

    const animation = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
        },
    };

    return (
        <div className="account-select">
            <div
                className="account-select__selected account-select-selected"
                onClick={() =>
                    setSelect((select) => ({
                        ...select,
                        open: !select.open,
                    }))
                }
            >
                <span className="account-select-selected__title">
                    {select.title}
                </span>
                <span className="account-select-selected__value">
                    {select.value}$
                </span>
            </div>

            {select.open && (
                <motion.div
                    variants={animation}
                    initial="hidden"
                    animate="show"
                    className="account-select__dropdown account-select-dropdown"
                >
                    <ul className="account-select-dropdown__list">
                        {listItems}
                        <li
                            className="account-select-dropdown__item account-select-dropdown-item"
                            onClick={() => handleSelect("Cash", cashValue)}
                        >
                            <span className="account-select-dropdown-item__title">
                                Cash
                            </span>
                            <span className="account-select-dropdown-item__value">
                                {cashValue}$
                            </span>
                        </li>
                    </ul>
                </motion.div>
            )}
        </div>
    );
}

export default AccountSelect;
