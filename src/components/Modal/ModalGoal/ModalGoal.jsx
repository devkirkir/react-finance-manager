import { useSelector } from "react-redux";
import { cardSelectors } from "../../Cards/cardsSlice";
import "./modalGoal.scss";

function ModalGoal({ id, title, value, need, setGoalModalOpen }) {
    const cardsOption = useSelector(cardSelectors.selectAll).map((item) => (
        <option key={`card${item.id}`}>
            Card **** {item.lastNumbers} ({item.value}$)
        </option>
    ));

    const cashValue = useSelector((state) => state.balance.cash);

    return (
        <>
            <div className="content">
                <h3 className="content__title">Goal "{title}"</h3>

                <form className="form-income form">
                    <h4 className="form__title">Income</h4>

                    <div className="form-income-section">
                        <div className="form-income-section__left">
                            <label htmlFor="income-goal-from-input">From</label>
                            <select id="income-goal-from-input" className="select-form">
                                {cardsOption}
                                <option>Cash ({cashValue}$)</option>
                            </select>
                        </div>
                        <div className="form-income-section__right">
                            <label htmlFor="income-goal-amount-input">Amount</label>
                            <input id="income-goal-amount-input" type="number" className="input-form" placeholder="0.00$" />
                        </div>
                    </div>

                    <input type="submit" value="Add" />
                </form>

                <div className="modal-btns">
                    <button
                        className="modal-btns__btn"
                        onClick={(event) => {
                            event.stopPropagation();
                            setGoalModalOpen(false);
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </>
    );
}

export default ModalGoal;
