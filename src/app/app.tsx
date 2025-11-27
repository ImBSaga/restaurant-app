import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./layout";
import Home from "../pages/home";
import Auth from "../pages/auth";
import RestaurantDetail from "../pages/restaurant-detail";
import Cart from "../pages/cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="auth" element={<Auth />} />
          <Route path="restaurant/:id" element={<RestaurantDetail />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
