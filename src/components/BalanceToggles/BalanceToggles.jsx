import "./balanceToggles.scss";

function BalanceToggles({ changeType, activeType }) {
    const types = ["Total", "Cards", "Cash"];
    activeType =
        activeType[0].toUpperCase() + activeType.slice(1, 5).toLowerCase();

    const filters = types.map((item, index) => {
        const classNames =
            item == activeType
                ? "control-btns__btn control-btns__btn--active"
                : "control-btns__btn";

        return (
            <button
                onClick={() => {
                    changeType(item);
                }}
                key={item + index}
                className={classNames}
            >
                {item}
            </button>
        );
    });

    return filters;
}

export default BalanceToggles;
