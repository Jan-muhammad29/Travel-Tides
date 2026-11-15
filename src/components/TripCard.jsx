import { Link } from "react-router-dom";
import { ArrowUpRight, Clock, MapPin, Plus, Check } from "lucide-react";
import Scene from "./Scene.jsx";
export const money = (value) => `PKR ${value.toLocaleString("en-PK")}`;
export const dateLabel = (value) =>
  new Date(`${value}T12:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
export default function TripCard({ item, quantity, onAdd }) {
  return (
    <article className="trip-card">
      <Link
        to={`/experiences/${item.id}`}
        className="card-art"
        aria-label={`Explore ${item.title}`}
      >
        <Scene
          kind={item.art}
          label={`Original ${item.category.toLowerCase()} landscape illustration`}
        />
        <span className="art-tag">{item.tag}</span>
        <span className="art-arrow">
          <ArrowUpRight size={19} />
        </span>
      </Link>
      <div className="card-content">
        <div className="location">
          <MapPin size={13} />
          {item.location}
        </div>
        <h3>
          <Link to={`/experiences/${item.id}`}>{item.title}</Link>
        </h3>
        <p className="card-meta">
          <Clock size={14} />
          {item.hours} hours <span>·</span>
          {item.level}
          <span>·</span>Ages {item.minAge}+
        </p>
        <div className="departure">
          <span>
            {dateLabel(item.date)} · {item.time}
          </span>
          <span className={item.seats ? "available" : "sold-out"}>
            {item.seats ? `${item.seats} spots left` : "Fully booked"}
          </span>
        </div>
        <div className="card-bottom">
          <div>
            <strong>{money(item.price)}</strong>
            <small>per attendee · fees below</small>
          </div>
          <button
            className={quantity ? "add selected" : "add"}
            onClick={() => onAdd(item)}
            disabled={!item.seats || quantity >= Math.min(6, item.seats)}
            aria-label={`Add ${item.title} to plan`}
          >
            {quantity ? <Check size={17} /> : <Plus size={18} />}
            <span>{quantity ? `In plan (${quantity})` : "Add to plan"}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
