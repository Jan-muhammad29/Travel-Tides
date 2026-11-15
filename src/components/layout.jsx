import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowUpRight, ShoppingBag, Mountain, ArrowRight } from "lucide-react";
export function RouteFocus({ status }) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const heading = document.querySelector("main h1");
    heading?.focus({ preventScroll: true });
    document.title = `${heading?.textContent || "Explore"} | Trail & Tide`;
  }, [pathname, status]);
  return null;
}
export default function Layout({
  count,
  children,
  storageWarning,
  notice,
  status,
}) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <div className="top-strip">
        A little closer to the outdoors.{" "}
        <span>Fictional business · Simulated bookings only</span>
      </div>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" to="/" aria-label="Trail and Tide home">
            <span className="brand-mark">
              <Mountain size={26} />
            </span>
            <span>
              trail <i>&</i> tide<small>SMALL TRIPS. GOOD STORIES.</small>
            </span>
          </Link>
          <nav aria-label="Main navigation">
            <NavLink to="/" end>
              Explore
            </NavLink>
            <NavLink to="/about">Our approach</NavLink>
            <NavLink
              to="/plan"
              aria-label={`Your plan ${count}`}
              className="plan-nav"
            >
              <ShoppingBag size={17} />
              <span>Your plan</span>
              <b>{count}</b>
            </NavLink>
          </nav>
        </div>
      </header>
      {storageWarning && (
        <div className="global-message" role="status">
          {storageWarning}
        </div>
      )}
      <div className="sr-only" role="status" aria-live="polite">
        {notice}
      </div>
      <main id="main">
        <RouteFocus status={status} />
        {children}
      </main>
      <section className="closing">
        <div>
          <span className="eyebrow">CLOSE TO HOME. FAR FROM ORDINARY.</span>
          <h2>Make room for a little outside.</h2>
        </div>
        <Link to="/" className="button light">
          Find your next little escape <ArrowUpRight size={18} />
        </Link>
      </section>
      <footer>
        <Link className="brand footer-brand" to="/">
          <Mountain size={27} /> trail & tide
        </Link>
        <p>
          Fictional guided day trips around Islamabad.
          <br />
          No payments, real reservations or emails are sent.
        </p>
        <div>
          <Link to="/about">
            How it works <ArrowRight size={14} />
          </Link>
          <Link to="/demo">Demonstration controls</Link>
          <small>CS4032 · Assignment 02 · Fall 2026</small>
        </div>
      </footer>
    </>
  );
}
export function Empty({
  title,
  children,
  action = "Explore experiences",
  to = "/",
}) {
  return (
    <section className="empty-state">
      <Mountain size={36} />
      <h2>{title}</h2>
      <p>{children}</p>
      <Link className="button" to={to}>
        {action}
        <ArrowRight size={17} />
      </Link>
    </section>
  );
}
