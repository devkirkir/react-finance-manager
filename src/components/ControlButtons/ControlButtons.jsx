import "./controlButtons.scss";

function ControlButtons() {
    return (
        <div className="control-btns-wrapper">
            <button className="control-btns-wrapper__btn">
                <span className="income">Income</span>
            </button>
            <button className="control-btns-wrapper__btn">
                <span className="expense">Expense</span>
            </button>
        </div>
    );
}

export default ControlButtons;
