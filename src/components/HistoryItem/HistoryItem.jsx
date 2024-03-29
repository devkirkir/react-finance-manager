import PropTypes from "prop-types";

import { motion } from "framer-motion";

import "./historyItem.scss";

function HistoryItem({ title, category, date, value, type }) {
    const valueClassNames =
        type === "expense"
            ? "history-wrapper-item__value history-wrapper-item__value_expense"
            : "history-wrapper-item__value history-wrapper-item__value_income";

    const convertDate = new Date(date).toLocaleDateString("en-US");

    return (
        <motion.li
            initial={{ opacity: 0, translateY: -5 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.2, delay: 0.3 }}
            className="history-wrapper__item history-wrapper-item"
        >
            <span className="history-wrapper-item__title">{title}</span>
            <span className="history-wrapper-item__category">{category}</span>
            <span className="history-wrapper-item__date">{convertDate}</span>
            <span className={valueClassNames}>
                {type === "expense" ? `-${value}$` : `+${value}$`}
            </span>
        </motion.li>
    );
}

HistoryItem.propTypes = {
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default HistoryItem;
