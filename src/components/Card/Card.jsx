import { useRef } from "react";
import PropTypes from "prop-types";

import useFormatNumber from "../../hooks/useFormatNumber";

import "./card.scss";

import visa from "../../assets/visa.png";
import mastercard from "../../assets/mastercard.png";

function Card({ id, value, lastNumbers, cardType, removeCard }) {
    value = +value;

    const formattedValue = useFormatNumber(value.toFixed(2));
    let logo = cardType === "visa" ? visa : mastercard;

    const cardRef = useRef();

    return (
        <div className="card" ref={cardRef}>
            <img className="card__type" src={logo} alt="system logo" />

            <span className="value">
                <span className="value__dollar">$</span>
                <span className="value__int">{formattedValue.number}</span>
                <span className="value__float">{formattedValue.float}</span>
            </span>

            <span className="card__number">{`**** **** **** ${lastNumbers}`}</span>

            <button className="card__remove" onClick={() => removeCard(id, value, cardRef.current)}>
                <svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M14.5828 2.51597H11.314C11.1509 1.102 9.94789 0 8.49086 0C7.03388 0 5.83102 1.10195 5.66796 2.51597H2.39897C1.0761 2.51597 0 3.59238 0 4.9152V5.0383C0 6.0492 0.62944 6.91443 1.51614 7.26698V18.6008C1.51614 19.9236 2.59237 21 3.91515 21H13.0667C14.3895 21 15.4656 19.9236 15.4656 18.6008V7.26703C16.3523 6.91444 16.9818 6.0492 16.9818 5.03835V4.91525C16.9818 3.59238 15.9056 2.51597 14.5828 2.51597ZM8.49086 1.13782C9.31954 1.13782 10.0112 1.73179 10.1643 2.51597H6.81776C6.97076 1.73174 7.66249 1.13782 8.49086 1.13782ZM14.3278 18.6008C14.3278 19.2963 13.7619 19.8622 13.0666 19.8622H3.91511C3.21981 19.8622 2.65392 19.2962 2.65392 18.6008V7.43753H14.3278V18.6008ZM15.8439 5.0383C15.8439 5.73382 15.2781 6.29975 14.5828 6.29975H2.39897C1.70367 6.29975 1.13778 5.73382 1.13778 5.0383V4.9152C1.13778 4.21968 1.70367 3.65375 2.39897 3.65375H14.5828C15.2781 3.65375 15.844 4.21968 15.844 4.9152L15.8439 5.0383Z"
                        fill="#BBBBBB"
                    />
                    <path
                        d="M5.44072 18.4071C5.75491 18.4071 6.00961 18.1523 6.00961 17.8383V11.4327C6.00961 11.1186 5.75487 10.8638 5.44072 10.8638C5.12656 10.8638 4.87183 11.1186 4.87183 11.4327V17.8383C4.87178 18.1524 5.12652 18.4071 5.44072 18.4071Z"
                        fill="#BBBBBB"
                    />
                    <path
                        d="M8.49089 18.4071C8.80508 18.4071 9.05982 18.1523 9.05982 17.8383V11.4327C9.05982 11.1186 8.805 10.8638 8.49089 10.8638C8.17673 10.8638 7.922 11.1186 7.922 11.4327V17.8383C7.922 18.1524 8.17669 18.4071 8.49089 18.4071Z"
                        fill="#BBBBBB"
                    />
                    <path
                        d="M11.541 18.4071C11.8551 18.4071 12.1098 18.1523 12.1098 17.8383V11.4327C12.1098 11.1186 11.8551 10.8638 11.541 10.8638C11.2267 10.8638 10.972 11.1186 10.972 11.4327V17.8383C10.972 18.1524 11.2268 18.4071 11.541 18.4071Z"
                        fill="#BBBBBB"
                    />
                </svg>
            </button>
        </div>
    );
}

Card.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    lastNumbers: PropTypes.string.isRequired,
    cardType: PropTypes.string.isRequired,
    removeCard: PropTypes.func,
};

export default Card;
