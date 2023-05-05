import { NavLink } from "react-router-dom";

import "./mobileNav.scss";

function MobileNav() {
    const activeClass = ({ isActive }) => {
        console.log(isActive);
        return isActive
            ? "mobile-nav__link mobile-nav__link--active"
            : "mobile-nav__link";
    };

    return (
        <div className="mobile-nav">
            <nav className="mobile-nav__navigation">
                <ul className="mobile-nav__list">
                    <li className="mobile-nav__item">
                        <NavLink
                            to="/"
                            className={(isActive) => activeClass(isActive)}
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12.249 13.8428C12.249 13.5993 12.2132 13.3809 12.1416 13.1875C12.07 12.987 11.9375 12.8008 11.7441 12.6289C11.5508 12.457 11.2715 12.2852 10.9062 12.1133C10.5482 11.9342 10.0755 11.748 9.48828 11.5547C8.80078 11.3255 8.13835 11.0677 7.50098 10.7812C6.86361 10.4876 6.29427 10.1475 5.79297 9.76074C5.29167 9.36686 4.89421 8.90853 4.60059 8.38574C4.30697 7.85579 4.16016 7.23991 4.16016 6.53809C4.16016 5.86491 4.31055 5.25977 4.61133 4.72266C4.91211 4.17839 5.33105 3.71647 5.86816 3.33691C6.41243 2.9502 7.0498 2.65658 7.78027 2.45605C8.51074 2.24837 9.30924 2.14453 10.1758 2.14453C11.3216 2.14453 12.3314 2.34505 13.2051 2.74609C14.0859 3.13997 14.7734 3.70215 15.2676 4.43262C15.4286 4.66491 15.5637 4.91086 15.673 5.17049C16.0747 6.12465 15.1803 7 14.145 7H13.3529C12.7551 7 12.3106 6.48231 12.0234 5.95801V5.95801C11.8659 5.65723 11.626 5.4209 11.3037 5.24902C10.9814 5.07715 10.5768 4.99121 10.0898 4.99121C9.61719 4.99121 9.21973 5.06283 8.89746 5.20605C8.5752 5.34928 8.33171 5.54264 8.16699 5.78613C8.00228 6.02246 7.91992 6.28385 7.91992 6.57031C7.91992 6.80664 7.98438 7.02148 8.11328 7.21484C8.24935 7.40104 8.43913 7.5765 8.68262 7.74121C8.93327 7.90592 9.23405 8.06348 9.58496 8.21387C9.94303 8.36426 10.3441 8.51107 10.7881 8.6543C11.6188 8.91927 12.3564 9.21647 13.001 9.5459C13.6527 9.86816 14.2005 10.237 14.6445 10.6523C15.0957 11.0605 15.4359 11.526 15.665 12.0488C15.9014 12.5716 16.0195 13.1624 16.0195 13.8213C16.0195 14.5231 15.8835 15.1462 15.6113 15.6904C15.3392 16.2347 14.9489 16.6966 14.4404 17.0762C13.932 17.4486 13.3232 17.7314 12.6143 17.9248C11.9053 18.1182 11.1139 18.2148 10.2402 18.2148C9.43815 18.2148 8.64681 18.1146 7.86621 17.9141C7.09277 17.7064 6.39095 17.3913 5.76074 16.9688C5.13053 16.5391 4.62565 15.9912 4.24609 15.3252C4.15092 15.1531 4.0679 14.9729 3.99705 14.7845C3.62954 13.8071 4.53396 12.9297 5.57812 12.9297H6.28777C6.94001 12.9297 7.4163 13.4814 7.65137 14.0898V14.0898C7.77311 14.4049 7.95215 14.6592 8.18848 14.8525C8.4248 15.0387 8.71484 15.1748 9.05859 15.2607C9.40234 15.3395 9.79622 15.3789 10.2402 15.3789C10.7201 15.3789 11.1068 15.3109 11.4004 15.1748C11.694 15.0316 11.9089 14.8454 12.0449 14.6162C12.181 14.3799 12.249 14.1221 12.249 13.8428Z"
                                    fill="#D1D1D1"
                                />
                                <rect
                                    x="9"
                                    width="2"
                                    height="4"
                                    rx="1"
                                    fill="#D1D1D1"
                                />
                                <rect
                                    x="9"
                                    y="16"
                                    width="2"
                                    height="4"
                                    rx="1"
                                    fill="#D1D1D1"
                                />
                            </svg>

                            <span className="mobile-nav__label">Balance</span>
                        </NavLink>
                    </li>
                    <li className="mobile-nav__item">
                        <NavLink
                            to="/transactions"
                            className={(isActive) => activeClass(isActive)}
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_204_2)">
                                    <rect
                                        x="6"
                                        width="14"
                                        height="4"
                                        rx="1"
                                        fill="#d1d1d1"
                                    />
                                    <rect
                                        width="4"
                                        height="4"
                                        rx="1"
                                        fill="#d1d1d1"
                                    />
                                    <rect
                                        y="8"
                                        width="4"
                                        height="4"
                                        rx="1"
                                        fill="#d1d1d1"
                                    />
                                    <rect
                                        y="16"
                                        width="4"
                                        height="4"
                                        rx="1"
                                        fill="#d1d1d1"
                                    />
                                    <rect
                                        x="6"
                                        y="8"
                                        width="14"
                                        height="4"
                                        rx="1"
                                        fill="#d1d1d1"
                                    />
                                    <rect
                                        x="6"
                                        y="16"
                                        width="14"
                                        height="4"
                                        rx="1"
                                        fill="#d1d1d1"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_204_2">
                                        <rect
                                            width="20"
                                            height="20"
                                            fill="white"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>

                            <span className="mobile-nav__label">
                                Transactions
                            </span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default MobileNav;
