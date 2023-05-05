import { useParams } from "react-router-dom";
import Balance from "../Balance/Balance";
import Cards from "../Cards/Cards";

function MobileMain() {
    return (
        <>
            <Balance />
            <Cards />
        </>
    );
}

export default MobileMain;
