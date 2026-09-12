import { Check } from "lucide-react";
import { FUNDAMENTALS } from "../data";

export default function Fundamentals({ covered }) {
  return (
    <section className="cb-section">
      <div className="cb-fund-head">
        <h2 className="cb-h2 cb-display">Fundamentals</h2>
        <p className="cb-fund-count cb-num">
          {covered.length} of {FUNDAMENTALS.length} covered
        </p>
      </div>
      <div className="cb-progress" aria-hidden="true">
        <span style={{ width: `${(covered.length / FUNDAMENTALS.length) * 100}%` }} />
      </div>
      <ul className="cb-chips">
        {FUNDAMENTALS.map((f) => {
          const on = covered.includes(f.id);
          return (
            <li key={f.id} className={`cb-chip${on ? " is-on" : ""}`}>
              {on && <Check size={14} aria-hidden="true" />}
              {f.name}
              {on && <span className="cb-sr-only"> (covered)</span>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
