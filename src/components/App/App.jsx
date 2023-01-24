import Balance from "../Balance/Balance";
import Cards from "../Cards/Cards";
import ControlButtons from "../ControlButtons/ControlButtons";

import "./App.scss";

function App() {
    return (
        <div className="App">
            <div className="left-column">
                <Balance />
                <ControlButtons />
                <Cards />
            </div>
            <div className="right-column"></div>
        </div>
    );
}

export default App;