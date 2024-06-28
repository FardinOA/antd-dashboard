import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/layout/Main";
import Dashboard from "./components/pages/Dashboard";
import Products from "./components/pages/Products";
import NotFound from "./components/pages/NotFound";
import ProductDetails from "./components/pages/Products/ProductDetails";

function App() {
    return (
        <Router>
            <Main>
                <Routes>
                    <Route path="/" element={<Dashboard />} />{" "}
                    <Route path="/products" element={<Products />} />{" "}
                    <Route
                        path="/product/:productId"
                        element={<ProductDetails />}
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Main>
        </Router>
    );
}

export default App;
