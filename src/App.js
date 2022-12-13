import { Route, Routes } from "react-router-dom";
import "./App.css";
import { MainProvider } from "./contexts/MainContext";
import ResponsiveAppBar from "./layouts/ResponsiveAppBar";
import CartPage from "./pages/cart/CartPage";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import OrderDetailsPage from "./pages/order/OrderDetailsPage";
import OrderPage from "./pages/order/OrderPage";
import ProductPage from "./pages/product/ProductPage";
import RegisterPage from "./pages/register/RegisterPage";

function App() {
  return (
    <MainProvider>
      <div className="App">
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products/:productId" element={<ProductPage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </MainProvider>
  );
}

export default App;
