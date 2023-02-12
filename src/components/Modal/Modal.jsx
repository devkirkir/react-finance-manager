import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import "./modal.scss";

function Modal({ children }) {
    const animation = {
        hidden: { y: 100, opacity: 0 },
        show: {
            opacity: 1,
            y: 0,
        },
    };

    return createPortal(
        <div className="modal-overlay">
            <motion.div variants={animation} initial="hidden" animate="show" className="modal">
                {children}
            </motion.div>
        </div>,
        document.getElementById("modal-container")
    );
}

export default Modal;
