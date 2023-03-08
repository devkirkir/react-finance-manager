import { useState } from "react";
import { motion } from "framer-motion";

import "./itemSelect.scss";

function ItemSelect({ items, setData }) {
    const [select, setSelect] = useState({
        open: false,
        selectItem: "Select",
    });

    const listItems = items.map((item, index) => (
        <li
            className="item-select-dropdown__item item-select-dropdown-item"
            key={`select-item-${item}-${index}`}
            onClick={() => handleSelect(item)}
        >
            <span className="item-select-dropdown-item__value">{item}</span>
        </li>
    ));

    const handleSelect = (selectItem) => {
        setSelect((select) => ({
            open: false,
            selectItem,
        }));

        setData((selectData) => ({
            ...selectData,
            selectItem,
        }));
    };

    const animation = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
        },
    };

    return (
        <div className="item-select">
            <div
                className="item-select__selected item-select-selected"
                onClick={() =>
                    setSelect((select) => ({
                        ...select,
                        open: !select.open,
                    }))
                }
            >
                <span className="item-select-selected__value">
                    {select.selectItem}
                </span>
                <span
                    className={
                        select.open
                            ? "item-select-selected__arrow item-select-selected__arrow--up"
                            : "item-select-selected__arrow item-select-selected__arrow--down"
                    }
                ></span>
            </div>

            {select.open && (
                <motion.div
                    variants={animation}
                    initial="hidden"
                    animate="show"
                    className="item-select__dropdown item-select-dropdown"
                >
                    <ul className="item-select-dropdown__list">{listItems}</ul>
                </motion.div>
            )}
        </div>
    );
}

export default ItemSelect;
