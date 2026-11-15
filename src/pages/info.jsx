import { Link } from "react-router-dom";
import { Check, ArrowRight, Mountain, Compass, Users } from "lucide-react";
import { Empty } from "../components/layout.jsx";
import { money, dateLabel } from "../components/TripCard.jsx";
export function About() {
  return (
    <div className="wrap page about">
      <span className="eyebrow">LESS DISTANCE. MORE DISCOVERY.</span>
      <h1 tabIndex="-1">
        Good days don’t have
        <br />
        to be far away.
      </h1>
      <p className="lead">
        Trail & Tide is a fictional day-trip business for university students
        and young professionals in Islamabad who want an easy way to spend time
        outside.
      </p>
      <div className="info-grid">
        <article>
          <Compass />
          <h2>A little closer</h2>
          <p>
            Guided day trips around Islamabad, Khanpur, Taxila and Galiyat.
            Fixed December 2026 demonstration departures make comparisons
            simple.
          </p>
        </article>
        <article>
          <Users />
          <h2>Thoughtfully small</h2>
          <p>
            One to six attendees per experience, limited by the spots shown.
            Minimum ages are stated before you add an experience.
          </p>
        </article>
        <article>
          <Mountain />
          <h2>Clear from the start</h2>
          <p>
            See the full price, choose a meeting option, review your details and
            reach a clear simulated confirmation.
          </p>
        </article>
      </div>
      <h2>Three simple operating rules</h2>
      <ol className="rules-list">
        <li>
          <strong>Capacity:</strong> 1–6 whole-number attendees per experience,
          never more than the available spots. Exactly six is allowed when six
          spots remain.
        </li>
        <li>
          <strong>Eligibility:</strong> the youngest attendee must meet every
          selected experience’s minimum age. Age exactly at the minimum is
          allowed; demonstration ages are limited to 100.
        </li>
        <li>
          <strong>Pricing & fulfilment:</strong> minimum experience subtotal PKR
          1,500. Meet at location for free or add the F-6 transfer for PKR 600
          once per plan. Transfer fees cannot satisfy the minimum.
        </li>
      </ol>
      <p>
        Our goal is a completed, understandable booking journey. This academic
        demonstration has no live weather, real inventory, payment processing or
        email delivery. Illustrations and all business content are original;
        they are not destination photographs.
      </p>
      <Link className="button" to="/">
        Find your little escape <ArrowRight size={18} />
      </Link>
    </div>
  );
}
export function Demo({ mode, setMode, seedCorrupt, seedRemoved }) {
  return (
    <div className="wrap page demo">
      <span className="eyebrow">FOR CHECKING THE LITTLE DETAILS.</span>
      <h1 tabIndex="-1">Demonstration controls</h1>
      <p className="lead">
        These controls change local mock data only. Your saved plan stays intact
        so you can test recovery.
      </p>
      <label htmlFor="demo-mode">Data scenario</label>
      <select
        id="demo-mode"
        value={mode}
        onChange={(e) => setMode(e.target.value)}
      >
        <option value="normal">Normal · 12 experiences</option>
        <option value="failure">Loading failure · retry needed</option>
        <option value="empty">Empty dataset · no published departures</option>
        <option value="changed">
          Changed availability · Margalla sold out
        </option>
        <option value="content">
          Lengthy title & missing artwork / description
        </option>
      </select>
      <p>
        After selecting a scenario, return to Explore or Your plan. Failure
        Retry switches to normal data and reloads it. Changed availability sets
        Margalla sunrise spots to zero.
      </p>
      <div className="demo-actions">
        <button className="button secondary" onClick={seedRemoved}>
          Add a removed item to saved plan
        </button>
        <button className="button secondary" onClick={seedCorrupt}>
          Demonstrate malformed saved data
        </button>
        <button className="button" onClick={() => setMode("normal")}>
          Restore normal data
        </button>
      </div>
      <p className="price-note">
        For capacity recovery: add Margalla, open this page, choose Changed
        availability, then open Your plan. The item remains visible with a
        conflict and confirmation is blocked until corrected.
      </p>
      <Link className="text-link" to="/plan">
        Inspect saved plan <ArrowRight size={16} />
      </Link>
      <Link className="text-link" to="/">
        Back to experiences <ArrowRight size={16} />
      </Link>
    </div>
  );
}
export function Confirmation({ booking }) {
  if (!booking)
    return (
      <div className="wrap page">
        <h1 tabIndex="-1">No confirmation to show yet.</h1>
        <Empty title="Let’s plan something first.">
          Confirmation details are kept only for this session. If you refreshed,
          start a new simulated booking.
        </Empty>
      </div>
    );
  return (
    <div className="wrap page confirmation">
      <span className="success-mark">
        <Check size={36} />
      </span>
      <span className="eyebrow">A LITTLE ESCAPE, ALL PLANNED.</span>
      <h1 tabIndex="-1">A good day is on the horizon.</h1>
      <p className="lead">
        Thanks, {booking.name}. Your simulated booking is complete.
      </p>
      <p className="confirmation-label">
        DEMO ONLY · No payment taken · No seats reserved · No email sent
      </p>
      <div className="confirmation-card">
        <span className="eyebrow">REFERENCE {booking.reference}</span>
        <h2>Your good-day lineup</h2>
        {booking.lines.map((line) => (
          <div className="confirmation-line" key={`${line.title}-${line.date}`}>
            <div>
              <strong>{line.title}</strong>
              <p>
                {dateLabel(line.date)} 2026 · {line.time} · {line.quantity}{" "}
                {line.quantity === 1 ? "attendee" : "attendees"}
              </p>
            </div>
            <strong>{money(line.quantity * line.price)}</strong>
          </div>
        ))}
        <p>
          {booking.pickup === "f6" ? "F-6 transfer" : "Meet at location"} ·{" "}
          {money(booking.summary.fee)}
        </p>
        <div className="confirmation-line">
          <strong>Total</strong>
          <strong>{money(booking.summary.total)}</strong>
        </div>
      </div>
      <p>
        For a real trip, check live conditions with an actual operator.
        <br />
        This page confirms completion of the assignment’s frontend journey.
      </p>
      <Link className="button" to="/">
        Explore a little more <ArrowRight size={18} />
      </Link>
    </div>
  );
}
