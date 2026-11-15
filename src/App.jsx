import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout.jsx";
import Explore from "./pages/Explore.jsx";
import Details from "./pages/Details.jsx";
import { experiences } from "./data/experience.js";
export default function App() {
  const [cart, setCart] = useState([]);
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
        <Route path="/plan" element={<div className="wrap"><h1 tabIndex="-1">Your plan</h1>
          {cart.length === 0 ? <p>Add an experience first.</p> : <ul>{cart.map(line =>
            <li key={line.id}>{experiences.find(item => item.id === line.id)?.title} × {line.quantity}
              <button onClick={() => setCart(prev => prev.filter(item => item.id !== line.id))}>Remove</button>
            </li>)}</ul>}
          <p>Full booking form is the next milestone.</p></div>} />
        <Route path="*" element={<div className="wrap"><h1 tabIndex="-1">Page not implemented yet</h1></div>} />
      </Routes>
    </Layout>
  </BrowserRouter>;
}