import { useSelector } from "react-redux";
import { cardSelectors } from "../../Cards/cardsSlice";
import "./modalGoal.scss";

function ModalGoal({ id, title, value, need, setGoalModalOpen }) {
    const cardsOption = useSelector(cardSelectors.selectAll).map((item) => (
        <option key={`card${item.lastNumbers}`}>
            Card **** {item.lastNumbers} ({item.value}$)
        </option>
    ));

    return (
        <>
            <div className="content">
                <h3 className="content__title">Goal "{title}"</h3>

                <form className="form-income form">
                    <h4 className="form__title">Income</h4>

                    <div className="form-income-section">
                        <div className="form-income-section__left">
                            <label>From</label>
                            <select className="">{cardsOption}</select>
                        </div>
                        <div className="form-income-section__right">
                            <label>Amount</label>
                            <input className="" />
                        </div>
                    </div>
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
