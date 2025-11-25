import { Routes, Route, Link } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CartPage from "./pages/CartPage";
import { useCart } from "./context/CartContext";
import CheckoutPage from "./pages/CheckoutPage";

export default function App() {
  const { items } = useCart();

  return (
    <div>
      <header>
        <Link to="/">Home</Link>
        <Link to="/cart">Carrinho ({items.length})</Link>
      </header>

      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </div>
  );
}
