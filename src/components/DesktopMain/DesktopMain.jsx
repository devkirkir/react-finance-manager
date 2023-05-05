import React from "react";
import Balance from "../Balance/Balance";
import Cards from "../Cards/Cards";
import History from "../History/History";

function DesktopMain() {
    return (
        <>
            <div className="left-column">
                <Balance /> <Cards />
            </div>
            <div className="right-column">
                <History />
            </div>
        </>
    );
}

export default DesktopMain;
