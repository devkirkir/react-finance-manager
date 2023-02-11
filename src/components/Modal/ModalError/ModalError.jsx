import "./modalError.scss";

function ModalError({ children, setErrorModalOpen }) {
    return (
        <>
            <span className="content">
                <h5 className="content__error-message">{children}</h5>
            </span>
            <div className="modal-btns">
                <button className="modal-btns__btn" onClick={() => setErrorModalOpen(false)}>
                    Got It
                </button>
            </div>
        </>
    );
}

export default ModalError;
