import { useState } from "react";
import ModalIncome from "../Modal/ModalIncome/ModalIncome";

import Modal from "./../Modal/Modal";

import "./controlButtons.scss";

function ControlButtons() {
    const [modal, setModal] = useState({
        isOpen: false,
        type: null,
    });

    return (
        <div className="control-btns-wrapper">
            <button className="control-btns-wrapper__btn" onClick={() => setModal((modal) => ({ isOpen: true, type: "income" }))}>
                <span className="income">Income</span>
            </button>
            <button className="control-btns-wrapper__btn" onClick={() => setModal((modal) => ({ isOpen: true, type: "expense" }))}>
                <span className="expense">Expense</span>
            </button>

            {modal.isOpen && modal.type === "income" && (
                <Modal>
                    <ModalIncome setModal={setModal} />
                </Modal>
            )}
            {modal.isOpen && modal.type === "expense" && <Modal>Expense</Modal>}
        </div>
    );
}

export default ControlButtons;
