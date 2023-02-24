import Balance from "../Balance/Balance";
import Cards from "../Cards/Cards";
import ControlButtons from "../ControlButtons/ControlButtons";
import History from "../History/History";

import "./App.scss";

function App() {
    return (
        <div className="App">
            <div className="left-column">
                <Balance />
                <ControlButtons />
                <Cards />
            </div>
            <div className="right-column">
                <History />
            </div>
        </div>
    );
}

export default App;
