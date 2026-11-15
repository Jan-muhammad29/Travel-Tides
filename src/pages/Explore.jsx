import { useSearchParams, Link } from "react-router-dom";
import {
  Search,
  ArrowUpRight,
  ArrowRight,
  Compass,
  Users,
  CheckCircle2,
} from "lucide-react";
import Scene from "../components/Scene.jsx";
import TripCard from "../components/TripCard.jsx";
export default function Explore({ items, cart, onAdd }) {
  const [params, setParams] = useSearchParams();
  const search = params.get("q") || "",
    category = params.get("category") || "All",
    sort = params.get("sort") || "recommended",
    available = params.get("available") === "1";
  function change(key, value) {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value && value !== "All" && value !== "recommended")
          next.set(key, value);
        else next.delete(key);
        return next;
      },
      { replace: false },
    );
  }
  const filtered = items
    .filter(
      (item) =>
        (category === "All" || item.category === category) &&
        (!available || item.seats > 0) &&
        `${item.title} ${item.location} ${item.category} ${item.level}`
          .toLowerCase()
          .includes(search.trim().toLowerCase()),
    )
    .sort((a, b) =>
      sort === "price-up"
        ? a.price - b.price
        : sort === "price-down"
          ? b.price - a.price
          : sort === "duration"
            ? a.hours - b.hours
            : 0,
    );
  const hidden = cart.filter(
    (line) => !filtered.some((item) => item.id === line.id),
  ).length;
  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="tiny-sun">✳</span> WEEKENDS, A LITTLE WILDER.
          </span>
          <h1 tabIndex="-1">
            A little escape.
            <br />
            <em>A lasting story.</em>
          </h1>
          <p>
            Forest trails, lakeside mornings and streets with stories.
            Thoughtfully small day trips, right here around Islamabad.
          </p>
          <a className="button" href="#experiences">
            Find your kind of outside <ArrowUpRight size={18} />
          </a>
          <div className="hero-note">
            <span className="round-icon">
              <Compass size={19} />
            </span>
            <span>
              Made for curious people.
              <br />
              <strong>Just pick a day. We’ll take it from there.</strong>
            </span>
          </div>
        </div>
        <div className="hero-art">
          <Scene
            kind="hills"
            label="Original illustrated forest hills, winding trail and sunrise"
          />
          <span className="hero-stamp">
            GO SLOW.
            <br />
            <MountainMark />
            LOOK AROUND.
          </span>
          <div className="hero-art-caption">
            <div>
              <small>YOUR NEXT CHAPTER</small>
              <strong>Somewhere beyond your usual.</strong>
            </div>
            <span>
              33.73° N<br />
              73.05° E
            </span>
          </div>
        </div>
      </section>
      <section className="promise-bar wrap" aria-label="Our promises">
        <span>
          <Users size={19} />
          <strong>Small groups</strong>
          <small>Six attendees per experience</small>
        </span>
        <span>
          <CheckCircle2 size={19} />
          <strong>Clear from the start</strong>
          <small>Age, price & spots upfront</small>
        </span>
        <span>
          <Compass size={19} />
          <strong>Close to home</strong>
          <small>Islamabad & a little beyond</small>
        </span>
      </section>
      <section className="catalogue wrap" id="experiences">
        <div className="section-heading">
          <div>
            <span className="eyebrow">LESS SCROLLING. MORE EXPLORING.</span>
            <h2>Find your kind of day.</h2>
          </div>
          <p>
            Good company. Fresh air. A plan that fits.
            <br />
            Choose an experience and make it yours.
          </p>
        </div>
        <div className="search-row">
          <label className="search-field">
            <Search size={19} />
            <span className="sr-only">Search experiences</span>
            <input
              value={search}
              onChange={(e) => change("q", e.target.value)}
              placeholder="Try ‘Margalla’, ‘easy’ or ‘culture’"
              type="search"
            />
          </label>
          <label className="sort-field">
            Sort by
            <select
              value={sort}
              onChange={(e) => change("sort", e.target.value)}
            >
              <option value="recommended">Our favourites</option>
              <option value="price-up">Price: low to high</option>
              <option value="price-down">Price: high to low</option>
              <option value="duration">Shortest first</option>
            </select>
          </label>
        </div>
        <div className="filter-row">
          <div className="chips" aria-label="Experience categories">
            {["All", "Hiking", "Water", "Culture", "Creative", "Nature"].map(
              (c) => (
                <button
                  key={c}
                  className={category === c ? "chip active" : "chip"}
                  aria-pressed={category === c}
                  onClick={() => change("category", c)}
                >
                  {c === "All" ? "All experiences" : c}
                </button>
              ),
            )}
          </div>
          <label className="check-label">
            <input
              type="checkbox"
              checked={available}
              onChange={(e) => change("available", e.target.checked ? "1" : "")}
            />
            Available only
          </label>
        </div>
        <div className="results-caption">
          <span role="status">
            {filtered.length}{" "}
            {filtered.length === 1 ? "experience" : "experiences"} to make a day
            of
          </span>
          <span>From PKR 1,200 / attendee</span>
        </div>
        {hidden > 0 && (
          <p className="info-message">
            {hidden} selected{" "}
            {hidden === 1 ? "experience is" : "experiences are"} hidden by these
            filters. Your plan is saved.{" "}
            <Link to="/plan">
              View your plan <ArrowRight size={14} />
            </Link>
          </p>
        )}
        {items.length === 0 ? (
          <div className="empty-state">
            <h3>No departures published yet</h3>
            <p>
              There are no experiences in this dataset. Return to normal data in{" "}
              <Link to="/demo">demonstration controls</Link>.
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <Search size={30} />
            <h3>No paths found, yet.</h3>
            <p>
              Try another place, a broader category or show fully booked trips.
            </p>
            <button className="button" onClick={() => setParams({})}>
              Clear search & filters
            </button>
          </div>
        ) : (
          <div className="trip-grid">
            {filtered.map((item) => (
              <TripCard
                key={item.id}
                item={item}
                quantity={
                  cart.find((line) => line.id === item.id)?.quantity || 0
                }
                onAdd={onAdd}
              />
            ))}
          </div>
        )}
        <p className="price-note">
          All prices are fictional and include stated activities. Minimum
          experience subtotal: PKR 1,500. Optional F-6 transfer: PKR 600 per
          plan; meet-at-location is free. Fixed departures shown on each card.
        </p>
      </section>
    </>
  );
}
function MountainMark() {
  return (
    <svg width="45" height="25" viewBox="0 0 45 25" aria-hidden="true">
      <path
        d="m2 23 13-20 12 20 7-12 9 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
