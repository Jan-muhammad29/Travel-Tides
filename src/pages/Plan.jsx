import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  Trash2,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import Scene from "../components/Scene.jsx";
import { money, dateLabel } from "../components/TripCard.jsx";
import { Empty } from "../components/layout.jsx";
import {
  validateBooking,
  validateQuantity,
  calculateSummary,
} from "../rules/booking.js";
export default function Plan({
  items,
  cart,
  onQuantity,
  onRemove,
  form,
  setForm,
  onComplete,
}) {
  const [errors, setErrors] = useState({}),
    [review, setReview] = useState(false),
    errorRef = useRef(null),
    navigate = useNavigate();
  const lines = cart.map((line) => ({
      ...line,
      item: items.find((item) => item.id === line.id),
    })),
    summary = calculateSummary(lines, form.pickup);
  const conflicts = lines.filter(
    (line) =>
      !line.item || !validateQuantity(line.quantity, line.item.seats).valid,
  );
  function change(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setReview(false);
  }
  function submit(e) {
    e.preventDefault();
    const next = validateBooking(lines, form);
    setErrors(next);
    if (Object.keys(next).length) {
      setReview(false);
      requestAnimationFrame(() => errorRef.current?.focus());
      return;
    }
    setReview(true);
  }
  function confirm() {
    const next = validateBooking(lines, form);
    if (Object.keys(next).length) {
      setErrors(next);
      setReview(false);
      return;
    }
    onComplete({
      reference: `TT-${Date.now().toString(36).toUpperCase()}`,
      name: form.name.trim(),
      lines: lines.map((line) => ({
        title: line.item.title,
        date: line.item.date,
        time: line.item.time,
        quantity: line.quantity,
        price: line.item.price,
      })),
      summary,
      pickup: form.pickup,
    });
    navigate("/confirmation");
  }
  function editQuantity(id, q) {
    onQuantity(id, q);
    setReview(false);
  }
  const fieldError = (name) =>
    errors[name] ? (
      <p className="field-error" id={`${name}-error`}>
        {errors[name]}
      </p>
    ) : null;
  return (
    <div className="wrap page">
      <Link className="back-link" to="/">
        <ArrowLeft size={16} />
        Keep exploring
      </Link>
      <span className="eyebrow">A GOOD DAY STARTS WITH A LITTLE PLAN.</span>
      <h1 tabIndex="-1">Your next little escape.</h1>
      <p className="lead">A few choices now. A good story later.</p>
      <ol className="steps" aria-label="Booking steps">
        <li className="done">01 · Choose</li>
        <li className={review ? "done" : "current"}>02 · Your details</li>
        <li className={review ? "current" : ""}>03 · Review & confirm</li>
      </ol>
      {!lines.length ? (
        <Empty title="Your day is still a blank canvas.">
          Add an experience you love. Your plan is saved on this device, so you
          can come back to it.
        </Empty>
      ) : (
        <div className="plan-layout">
          <div>
            <section aria-labelledby="selection-title">
              <div className="inline-heading">
                <h2 id="selection-title">The good-day lineup</h2>
                <span>
                  {cart.length}{" "}
                  {cart.length === 1 ? "experience" : "experiences"}
                </span>
              </div>
              {conflicts.length > 0 && (
                <div className="error-box" role="alert">
                  <strong>Your saved plan needs a little attention.</strong>
                  <p>
                    Availability has changed or an experience is no longer
                    listed. Review the messages below before continuing.
                  </p>
                  <Link to="/">Find an alternative</Link>
                </div>
              )}
              {lines.map((line) => {
                const result = line.item
                  ? validateQuantity(line.quantity, line.item.seats)
                  : {
                      valid: false,
                      message:
                        "This experience is no longer listed. Remove it to continue.",
                    };
                return (
                  <article
                    className={`plan-item ${!result.valid ? "conflict" : ""}`}
                    key={line.id}
                  >
                    <Scene kind={line.item?.art || "missing"} />
                    <div className="plan-item-info">
                      <span className="eyebrow">
                        {line.item?.category || "Unavailable"}
                      </span>
                      <h3>
                        {line.item ? (
                          <Link to={`/experiences/${line.id}`}>
                            {line.item.title}
                          </Link>
                        ) : (
                          "Experience no longer available"
                        )}
                      </h3>
                      <p>
                        {line.item
                          ? `${dateLabel(line.item.date)} · ${line.item.time} · Ages ${line.item.minAge}+`
                          : "Previously saved item"}
                      </p>
                      <strong>
                        {money(line.item?.price || 0)} <small>/ attendee</small>
                      </strong>
                      <div className="quantity-row">
                        <div
                          className="quantity"
                          role="group"
                          aria-label={`Attendees for ${line.item?.title || line.id}`}
                        >
                          <button
                            aria-label={`Decrease attendees for ${line.item?.title || line.id}`}
                            onClick={() =>
                              editQuantity(line.id, line.quantity - 1)
                            }
                            disabled={line.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <output aria-label="Attendee quantity">
                            {line.quantity}
                          </output>
                          <button
                            aria-label={`Increase attendees for ${line.item?.title || line.id}`}
                            onClick={() =>
                              editQuantity(line.id, line.quantity + 1)
                            }
                            disabled={
                              !line.item ||
                              line.quantity >= Math.min(6, line.item.seats)
                            }
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span>1–6 · {line.item?.seats || 0} spots left</span>
                        <button
                          className="remove-button"
                          onClick={() => {
                            onRemove(line.id);
                            setReview(false);
                          }}
                          aria-label={`Remove ${line.item?.title || line.id}`}
                        >
                          <Trash2 size={16} />
                          <span>Remove</span>
                        </button>
                      </div>
                      {!result.valid && (
                        <p className="field-error">{result.message}</p>
                      )}
                    </div>
                  </article>
                );
              })}
            </section>
            <form onSubmit={submit} noValidate className="booking-form">
              <span className="eyebrow">LET’S MAKE IT YOURS.</span>
              <h2>A few details, then you’re out.</h2>
              <p>
                Use fictional details for this demonstration. Only your trip
                selection is saved on this device.
              </p>
              {Object.keys(errors).length > 0 && (
                <div
                  className="error-box"
                  ref={errorRef}
                  tabIndex="-1"
                  role="alert"
                >
                  <strong>A few things to put right</strong>
                  <ul>
                    {Object.entries(errors).map(([name, message]) => (
                      <li key={name}>
                        {[
                          "name",
                          "email",
                          "age",
                          "pickup",
                          "accepted",
                        ].includes(name) ? (
                          <a href={`#${name}`}>{message}</a>
                        ) : (
                          message
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="form-grid">
                <div>
                  <label htmlFor="name">Lead explorer’s name</label>
                  <input
                    id="name"
                    name="name"
                    autoComplete="off"
                    maxLength="80"
                    value={form.name}
                    onChange={change}
                    placeholder="Demo Explorer"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {fieldError("name")}
                </div>
                <div>
                  <label htmlFor="email">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="off"
                    maxLength="150"
                    value={form.email}
                    onChange={change}
                    placeholder="explorer@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {fieldError("email")}
                </div>
                <div>
                  <label htmlFor="age">Youngest attendee’s age</label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    min="1"
                    max="100"
                    value={form.age}
                    onChange={change}
                    placeholder="e.g. 18"
                    aria-invalid={!!errors.age}
                    aria-describedby="age-help age-error"
                  />
                  <small id="age-help">
                    Every attendee must meet each trip’s minimum age.
                  </small>
                  {fieldError("age")}
                </div>
                <div>
                  <label htmlFor="pickup">Meeting option</label>
                  <select
                    id="pickup"
                    name="pickup"
                    value={form.pickup}
                    onChange={change}
                  >
                    <option value="self">Meet at location · Free</option>
                    <option value="f6">F-6 transfer · PKR 600 / plan</option>
                  </select>
                  {fieldError("pickup")}
                </div>
              </div>
              <label className="check-label agreement">
                <input
                  id="accepted"
                  name="accepted"
                  type="checkbox"
                  checked={form.accepted}
                  onChange={change}
                  aria-invalid={!!errors.accepted}
                  aria-describedby={
                    errors.accepted ? "accepted-error" : undefined
                  }
                />
                <span>
                  I understand this is a simulated booking. No payment is taken
                  and no real places are reserved.
                </span>
              </label>
              {fieldError("accepted")}
              {!review ? (
                <button className="button" type="submit">
                  Review your plan <ArrowRight size={18} />
                </button>
              ) : (
                <section
                  className="review-panel"
                  aria-label="Final booking review"
                >
                  <span className="eyebrow">
                    <CheckCircle2 size={16} /> READY FOR A FINAL LOOK
                  </span>
                  <h3>{form.name.trim()}, here’s your day.</h3>
                  <p>
                    {form.email} · Youngest attendee: {form.age}
                    <br />
                    {form.pickup === "f6"
                      ? "F-6 transfer included"
                      : "Meet at each experience’s location"}
                  </p>
                  <ul>
                    {lines.map((line) => (
                      <li key={line.id}>
                        {line.quantity} × {line.item?.title} ·{" "}
                        {dateLabel(line.item?.date)}
                      </li>
                    ))}
                  </ul>
                  <p>
                    <strong>Total: {money(summary.total)}</strong>
                  </p>
                  <div className="review-actions">
                    <button type="button" className="button" onClick={confirm}>
                      Confirm simulated booking <ArrowRight size={18} />
                    </button>
                    <button
                      type="button"
                      className="button secondary"
                      onClick={() => setReview(false)}
                    >
                      Edit details
                    </button>
                  </div>
                </section>
              )}
            </form>
          </div>
          <aside className="summary-card">
            <span className="eyebrow">THE FULL PICTURE</span>
            <h2>Your plan, at a glance.</h2>
            <dl>
              <div>
                <dt>Experiences</dt>
                <dd>{lines.length}</dd>
              </div>
              <div>
                <dt>Attendee places</dt>
                <dd>{summary.attendees}</dd>
              </div>
              <div>
                <dt>Experience subtotal</dt>
                <dd>{money(summary.subtotal)}</dd>
              </div>
              <div>
                <dt>
                  {form.pickup === "f6"
                    ? "F-6 transfer (once)"
                    : "Meet at location"}
                </dt>
                <dd>{summary.fee ? money(summary.fee) : "Free"}</dd>
              </div>
              <div className="summary-total">
                <dt>Total</dt>
                <dd>{money(summary.total)}</dd>
              </div>
            </dl>
            <p className="price-note">
              Minimum experience subtotal: PKR 1,500 before transfer fees. All
              stated activity charges included. No additional checkout fees.
            </p>
            {summary.subtotal < 1500 && (
              <p className="field-error">
                Add PKR {1500 - summary.subtotal} in experiences to meet the
                minimum.
              </p>
            )}
            <div className="safe-note">
              <ShieldCheck size={20} />
              <span>
                Just a little planning.
                <br />
                No payment details required.
              </span>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
