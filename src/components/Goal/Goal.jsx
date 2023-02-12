import { useState } from "react";

import useFormatNumber from "../../hooks/useFormatNumber";

import { motion } from "framer-motion";

import Modal from "../Modal/Modal";
import ModalGoal from "../Modal/ModalGoal/ModalGoal";

import "./goal.scss";

function Goal(props) {
    const [isGoalModalOpen, setGoalModalOpen] = useState(false);

    const { id, title, value, need } = props;

    const formattedValue = useFormatNumber((+value).toFixed(2));
    const percent = (value / (need / 100)).toFixed(0);

    const percentWidth = percent <= 100 ? percent : "100%";
    const percentColor = percent > 5 ? "#fff" : "$text";

    const animation = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
        },
    };

    return (
        <motion.div variants={animation} initial="hidden" animate="show" className="goal" onClick={() => setGoalModalOpen(true)}>
            <span className="goal__title">{title}</span>

            <span className="value">
                <span className="value__dollar">$</span>

                <span className="value__int">{formattedValue.number}</span>

                <span className="value__float">{formattedValue.float}</span>
            </span>

            <div className="progress">
                <div className="bar">
                    <div className="bar__inner" style={{ width: `${percentWidth}%` }}>
                        <span className="percentage" style={{ color: `${percentColor}` }}>
                            {percent}%
                        </span>
                    </div>
                </div>

                <div className="count">
                    <span className="count__start">$0</span>
                    <span className="count__need">${need}</span>
                </div>
            </div>

            {isGoalModalOpen && (
                <Modal>
                    <ModalGoal {...props} setGoalModalOpen={setGoalModalOpen} />
                </Modal>
            )}
        </motion.div>
    );
}

export default Goal;
