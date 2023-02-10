import useFormatNumber from "../../hooks/useFormatNumber";
import "./goal.scss";

function Goal({ id, title, value, need }) {
    value = +value;

    const formattedValue = useFormatNumber(value.toFixed(2));
    const percent = (value / (need / 100)).toFixed(0);

    return (
        <div className="goal">
            <span className="goal__title">{title}</span>
            <span className="value">
                <span className="value__dollar">$</span>

                <span className="value__int">{formattedValue.number}</span>

                <span className="value__float">{formattedValue.float}</span>
            </span>

            <div className="progress">
                <div className="bar">
                    <div className="bar__inner" style={{ width: `${percent}%` }}>
                        <span className="percentage">{percent}%</span>
                    </div>
                </div>

                <div className="count">
                    <span className="count__start">$0</span>
                    <span className="count__need">${need}</span>
                </div>
            </div>
        </div>
    );
}

export default Goal;
