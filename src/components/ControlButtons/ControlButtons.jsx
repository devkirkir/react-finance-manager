import "./controlButtons.scss";

function ControlButtons() {
    return (
        <div className="control-btns-wrapper">
            <button className="control-btns-wrapper__btn">
                <svg
                    className="icon"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect x="6" width="2" height="14" fill="#333333" />
                    <rect
                        y="8"
                        width="2"
                        height="14"
                        transform="rotate(-90 0 8)"
                        fill="#333333"
                    />
                </svg>
                Income
            </button>
            <button className="control-btns-wrapper__btn">
                <svg
                    className="icon"
                    width="14"
                    height="2"
                    viewBox="0 0 14 2"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        y="2"
                        width="2"
                        height="14"
                        transform="rotate(-90 0 2)"
                        fill="#333333"
                    />
                </svg>
                Expense
            </button>
        </div>
    );
}

export default ControlButtons;
