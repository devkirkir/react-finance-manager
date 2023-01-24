import { createPortal } from "react-dom";
import "./modal.scss";

function Modal({ children }) {
    return createPortal(
        <div className="modal-wrapper">
            <div className="modal-content">{children}</div>
        </div>,
        document.getElementById("modal")
    );
}

export default Modal;
