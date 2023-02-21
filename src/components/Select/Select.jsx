import { useState } from "react";
import { motion } from "framer-motion";
import "./select.scss";

function Select({ items, cashValue, setSelectData }) {
    const [select, setSelect] = useState({
        open: false,
        title: "Cash",
        value: cashValue,
    });

    const listItems = items.map((item) => (
        <li
            className="custom-select-dropdown__item custom-select-dropdown-item"
            key={`select-item-${item.id}`}
            onClick={() => handleSelect(`Card ${item.lastNumbers}`, item.value, item.id)}
        >
            <span className="custom-select-dropdown-item__title">Card {item.lastNumbers}</span>
            <span className="custom-select-dropdown-item__value">{item.value}$</span>
        </li>
    ));

    const handleSelect = (title, value, id = "cash") => {
        setSelect((select) => ({
            open: false,
            title,
            value,
        }));

        setSelectData({ id, value });
    };

    const animation = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
        },
    };

    return (
        <div className="custom-select">
            <div
                className="custom-select__selected custom-select-selected"
                onClick={() =>
                    setSelect((select) => ({
                        ...select,
                        open: !select.open,
                    }))
                }
            >
                <span className="custom-select-selected__title">{select.title}</span>
                <span className="custom-select-selected__value">{select.value}$</span>
            </div>

            {select.open && (
                <motion.div variants={animation} initial="hidden" animate="show" className="custom-select__dropdown custom-select-dropdown">
                    <ul className="custom-select-dropdown__list">
                        {listItems}
                        <li className="custom-select-dropdown__item custom-select-dropdown-item" onClick={() => handleSelect("Cash", cashValue)}>
                            <span className="custom-select-dropdown-item__title">Cash</span>
                            <span className="custom-select-dropdown-item__value">{cashValue}$</span>
                        </li>
                    </ul>
                </motion.div>
            )}
        </div>
    );
}

export default Select;
