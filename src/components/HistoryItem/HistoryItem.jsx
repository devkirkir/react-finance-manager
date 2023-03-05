import PropTypes from "prop-types";
import "./historyItem.scss";

function HistoryItem({ title, category, date, value, type }) {
    const valueClassNames =
        type === "expense"
            ? "history-wrapper-item__value history-wrapper-item__value_expense"
            : "history-wrapper-item__value history-wrapper-item__value_income";

    return (
        <li className="history-wrapper__item history-wrapper-item">
            <span className="history-wrapper-item__title">{title}</span>
            <span className="history-wrapper-item__category">{category}</span>
            <span className="history-wrapper-item__date">{date}</span>
            <span className={valueClassNames}>
                {type === "expense" ? `-${value}$` : `+${value}$`}
            </span>
        </li>
    );
}

HistoryItem.propTypes = {
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default HistoryItem;
