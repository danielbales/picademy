import { FUND_BY_ID } from "../data";
import { detectPlatform } from "../api";

const EDITOR_LABEL = detectPlatform() === "ios" ? "Apple Photos" : detectPlatform() === "android" ? "Google Photos" : "photo editor";

export default function FixCard({ fix, isHabit }) {
  const f = FUND_BY_ID[fix.fundamental];
  return (
    <div className="cb-fix">
      {fix.postTip && (
        <div className="cb-post-tip">
          <p className="cb-fix-kicker">Fix in {EDITOR_LABEL}</p>
          <p className="cb-post-tip-body">{fix.postTip}</p>
        </div>
      )}
      <div className="cb-fix-head">
        <div>
          <p className="cb-fix-kicker">{isHabit ? "Try this habit" : "Next time"}</p>
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
      {fix.reference && <p className="cb-reference">{fix.reference}</p>}
      {fix.bonus && <p className="cb-bonus">{fix.bonus}</p>}
    </div>
  );
}
