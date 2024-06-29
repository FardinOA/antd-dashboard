import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
    Navigate,
} from "react-router-dom";
import Main from "./components/layout/Main";
import Dashboard from "./components/pages/Dashboard";
import Products from "./components/pages/Products";
import NotFound from "./components/pages/NotFound";
import ProductDetails from "./components/pages/Products/ProductDetails";
import UpdateProduct from "./components/pages/Products/UpdateProduct";
import Login from "./components/Auth/Login";

const ProtectedRoutes = () => {
    const isAuth = true;

    return isAuth ? (
        <Main>
            <Outlet />
        </Main>
    ) : (
        <Navigate to="/login" />
    );
};
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path="/" element={<Dashboard />} />{" "}
                    <Route path="/products" element={<Products />} />{" "}
                    <Route
                        path="/product/:productId"
                        element={<ProductDetails />}
                    />
                    <Route
                        path="/product/edit/:productId"
                        element={<UpdateProduct />}
                    />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
