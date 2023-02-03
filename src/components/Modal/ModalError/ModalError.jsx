import "./modalError.scss";

function ModalError({ children, setErrorModalOpen }) {
    return (
        <>
            <span className="content">
                <span className="content__error-message">{children}</span>
            </span>
            <div className="modal-btns">
                <button
                    className="modal-btns__btn"
                    onClick={() => setErrorModalOpen(false)}
                >
                    Got It
                </button>
            </div>
        </>
    );
}

export default ModalError;
