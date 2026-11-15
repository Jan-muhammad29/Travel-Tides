import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout.jsx";
import Explore from "./pages/Explore.jsx";
import Details from "./pages/Details.jsx";
import Plan from "./pages/Plan.jsx";
import { Confirmation } from "./pages/info.jsx";
import { validateQuantity } from "./rules/booking.js";
import { experiences } from "./data/experience.js";
export default function App() {
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    name: "", email: "", age: "", pickup: "self", accepted: false,
  });
  const [booking, setBooking] = useState(null);
  function changeQuantity(id, quantity) {
    const item = experiences.find(item => item.id === id);
    if (!item || !validateQuantity(quantity, item.seats).valid) return;
    setCart(prev => prev.map(line => line.id === id ? { ...line, quantity } : line));
  }
  function completeBooking(result) {
    setBooking(result);
    setCart([]);
    setForm({ name: "", email: "", age: "", pickup: "self", accepted: false });
  }
  function add(item) {
    setCart(prev => {
      const found = prev.find(line => line.id === item.id);
      const quantity = (found?.quantity || 0) + 1;
      if (quantity > Math.min(6, item.seats)) return prev;
      return found ? prev.map(line => line.id === item.id ? {...line, quantity} : line)
        : [...prev, {id: item.id, quantity: 1}];
    });
  }
  return <BrowserRouter>
    <Layout count={cart.reduce((sum, line) => sum + line.quantity, 0)} status="ready">
      <Routes>
        <Route path="/" element={<Explore items={experiences} cart={cart} onAdd={add}/>} />
        <Route path="/experiences/:id" element={<Details items={experiences} cart={cart} onAdd={add}/>} />
        <Route path="/plan" element={<Plan
          items={experiences}
          cart={cart}
          onQuantity={changeQuantity}
          onRemove={id => setCart(prev => prev.filter(line => line.id !== id))}
          form={form}
          setForm={setForm}
          onComplete={completeBooking}
        />} />
        <Route path="/confirmation" element={<Confirmation booking={booking} />} />
        <Route path="*" element={<div className="wrap"><h1 tabIndex="-1">Page not implemented yet</h1></div>} />
      </Routes>
    </Layout>
  </BrowserRouter>;
}
