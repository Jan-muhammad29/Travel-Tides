import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  ArrowRight,
  MapPin,
  Clock,
  Users,
  Plus,
} from "lucide-react";
import Scene from "../components/Scene.jsx";
import { money, dateLabel } from "../components/TripCard.jsx";
import { Empty } from "../components/layout.jsx";
export default function Details({ items, cart, onAdd }) {
  const { id } = useParams(),
    item = items.find((x) => x.id === id);
  if (!item)
    return (
      <div className="wrap page">
        <h1 tabIndex="-1">This path doesn’t lead anywhere.</h1>
        <Empty title="Experience not found">
          It may have moved or is no longer listed. Your other choices are still
          in your plan.
        </Empty>
      </div>
    );
  const quantity = cart.find((x) => x.id === id)?.quantity || 0;
  return (
    <div className="wrap page">
      <Link className="back-link" to="/">
        <ArrowLeft size={16} />
        Back to experiences
      </Link>
      <div className="details-layout">
        <div>
          <Scene
            kind={item.art}
            label={`Illustrated ${item.category.toLowerCase()} landscape; not a destination photograph`}
            className="detail-art"
          />
          <p className="image-caption">
            Original landscape illustration · fictional experience
          </p>
          <span className="eyebrow">
            {item.category} / {item.location}
          </span>
          <h1 tabIndex="-1" className="detail-title">
            {item.title}
          </h1>
          <p className="lead">
            {item.description ||
              "The detailed description is being updated. Review the key facts and inclusions before choosing."}
          </p>
          <h2>A good day includes</h2>
          <ul className="included">
            {item.includes.map((text) => (
              <li key={text}>
                <Check size={17} />
                {text}
              </li>
            ))}
          </ul>
          <h2>Come prepared</h2>
          <p>{item.bring}</p>
          <p>
            Meet at the named destination unless you choose the optional F-6
            transfer. Any transport listed in the inclusions is already covered
            by the experience price. The optional transfer connects F-6 to the
            starting meeting point.
          </p>
        </div>
        <aside className="booking-card">
          <span className="eyebrow">YOUR LITTLE ESCAPE</span>
          <h2>
            {money(item.price)}
            <small>per attendee</small>
          </h2>
          <p className={item.seats ? "status available" : "status sold-out"}>
            {item.seats ? `${item.seats} spots remaining` : "Fully booked"}
          </p>
          <dl className="facts">
            <div>
              <dt>Departure</dt>
              <dd>
                {dateLabel(item.date)} 2026 · {item.time}
              </dd>
            </div>
            <div>
              <dt>
                <Clock size={15} />
                Duration
              </dt>
              <dd>{item.hours} hours</dd>
            </div>
            <div>
              <dt>Difficulty</dt>
              <dd>{item.level}</dd>
            </div>
            <div>
              <dt>Minimum age</dt>
              <dd>{item.minAge} years</dd>
            </div>
            <div>
              <dt>
                <Users size={15} />
                Group limit
              </dt>
              <dd>1–6 attendees</dd>
            </div>
          </dl>
          <div className="rule-note">
            <strong>Know before you choose</strong>
            <p>
              Every attendee must be {item.minAge}+. Your plan needs at least
              PKR 1,500 in experiences. Meeting here is free; the optional F-6
              transfer is PKR 600 per plan.
            </p>
          </div>
          <button
            className="button full"
            onClick={() => onAdd(item)}
            disabled={!item.seats || quantity >= Math.min(6, item.seats)}
          >
            <Plus size={18} />
            {item.seats
              ? quantity
                ? `Add another · ${quantity} in plan`
                : "Add to your plan"
              : "This departure is full"}
          </button>
          <Link className="text-link" to="/plan">
            Review your plan <ArrowRight size={16} />
          </Link>
          <small className="muted">
            Simulated inventory. No real booking is made.
          </small>
        </aside>
      </div>
    </div>
  );
}
