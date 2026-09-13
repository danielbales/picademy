import { FUND_BY_ID } from "../data";

export default function FixCard({ fix, isHabit }) {
  const f = FUND_BY_ID[fix.fundamental];
  return (
    <div className="cb-fix">
      <div className="cb-fix-head">
        <div>
          <p className="cb-fix-kicker">{isHabit ? "Try this habit" : "Try this"}</p>
          <p className="cb-fix-name">{f ? f.name : "Next step"}</p>
        </div>
      </div>
      {fix.steps.length > 0 && (
        <ol className="cb-steps">
          {fix.steps.map((step, i) => (
            <li key={i}>
              <span className="cb-step-num" aria-hidden="true">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      )}
      {fix.why && <p className="cb-why">{fix.why}</p>}
      {fix.bonus && <p className="cb-bonus">{fix.bonus}</p>}
    </div>
  );
}
