import { useMediaQuery } from "react-responsive";

import { Route, Routes } from "react-router-dom";

import DesktopMain from "../DesktopMain/DesktopMain";
import MobileMain from "../MobileMain/MobileMain";
import MobileNav from "../MobileNav/MobileNav";

import "./App.scss";
import History from "../History/History";

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
                <Routes>
                    <Route path="/" element={<DesktopMain />} />
                    <Route path="*" element={<DesktopMain />} />
                </Routes>
            )}

            {isMobile && (
                <>
                    <Routes>
                        <Route path="/" element={<MobileMain />} />
                        <Route path="/transactions" element={<History />} />
                        <Route path="*" element={<MobileMain />} />
                    </Routes>

                    <MobileNav />
                </>
            )}
        </div>
    );
}

export default App;
