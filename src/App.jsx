import { Routes, Route, Link } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CartPage from "./pages/CartPage";
import { useCart } from "./context/CartContext";
import CheckoutPage from "./pages/CheckoutPage";
import PanelAdministrador from "./pages/PanelAdministrador";
import { ProtectedRoute } from "./components/ProtectedRoute";

export default function App() {
  const { items } = useCart();

  return (
    <div>
      <header>
        <Link to="/">Home</Link>
        <Link to="/cart">Carrinho ({items.length})</Link>

        <Link to="/login">Login</Link>
        <Link to="/register">Registrar</Link>
        <Link to="/panel-administrador">Panel Administrador</Link>
      </header>

      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/panel-administrador" element={<PanelAdministrador />} />
      </Routes>
    </div>
  );
}
