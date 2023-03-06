import { useState } from "react";
import { motion } from "framer-motion";

import "./itemSelect.scss";

function ItemSelect({ selectData, setData }) {
    const categories = ["category1", "category2", "category3"];

    const [select, setSelect] = useState({
        open: false,
        category: "Select category",
    });

    const listItems = categories.map((item) => (
        <li
            className="item-select-dropdown__item item-select-dropdown-item"
            key={`select-item-${item}`}
            onClick={() => handleSelect(item)}
        >
            <span className="item-select-dropdown-item__value">{item}</span>
        </li>
    ));

    const handleSelect = (category) => {
        setSelect((select) => ({
            open: false,
            category,
        }));

        setData((selectData) => ({
            ...selectData,
            category,
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
                    {select.category}
                </span>
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
