import { useMediaQuery } from "react-responsive";

import Balance from "../Balance/Balance";
import Cards from "../Cards/Cards";
import History from "../History/History";

import "./App.scss";

function App() {
    const isDesktop = useMediaQuery({
        query: "(min-width: 769px)",
    });

    const isMobile = useMediaQuery({
        query: "(max-width: 768px)",
    });

    return (
        <div className="App">
            {isDesktop && (
                <>
                    <div className="left-column">
                        <Balance /> <Cards />
                    </div>
                    <div className="right-column">
                        <History />
                    </div>
                </>
            )}

            {isMobile && (
                <>
                    <Balance />
                    <Cards />
                </>
            )}
        </div>
    );
}

export default App;
