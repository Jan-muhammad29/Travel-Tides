import { useState } from "react";
import { experiences } from "./data/experiences.js";
export default function App() {
  const [query, setQuery] = useState("");
  const shown = experiences.filter(item =>
    `${item.title} ${item.location}`.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <main className="wrap">
      <h1>Explore Trail & Tide</h1>
      <label htmlFor="search">Search experiences</label>
      <input id="search" value={query} onChange={e => setQuery(e.target.value)} />
      <p>{shown.length} results</p>
      <ul>{shown.map(item => (
        <li key={item.id}>{item.title} — PKR {item.price} — ages {item.minAge}+</li>
      ))}</ul>
    </main>
  );
}