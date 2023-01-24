import { createPortal } from "react-dom";
import "./modal.scss";

function Modal({ children }) {
    return createPortal(
        <div className="modal-overlay">
            <div className="modal">{children}</div>
        </div>,
        document.getElementById("modal")
    );
}

export default Modal;
