import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/app/layout";
import Home from "@/pages/home";
import Auth from "@/pages/auth";
import RestaurantDetail from "@/pages/restaurant-detail";
import Cart from "@/pages/cart";
import Checkout from "@/pages/checkout";
import Success from "@/pages/success";
import Orders from "@/pages/orders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="auth" element={<Auth />} />
          <Route path="restaurant/:id" element={<RestaurantDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="success" element={<Success />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
