import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/layout/Main";

function App() {
    return (
        <Router>
            <Main>
                <Routes>
                    <Route path="/" element={<div>hi</div>} />{" "}
                </Routes>
            </Main>
        </Router>
    );
}

export default App;
