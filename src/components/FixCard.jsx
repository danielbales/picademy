import { FUND_BY_ID, SKILL_BY_ID } from "../data";

export default function FixCard({ fix, isMom }) {
  const f = FUND_BY_ID[fix.fundamental];
  const skill = f && f.skill ? SKILL_BY_ID[f.skill] : null;
  return (
    <div className="cb-fix">
      <div className="cb-fix-head">
        <div>
          <p className="cb-fix-kicker">{isMom ? "Try this habit" : "Try this"}</p>
          <p className="cb-fix-name">{f ? f.name : "Next step"}</p>
        </div>
        <span
          className="cb-pill"
          style={skill ? { background: skill.tint, color: skill.color } : { background: "rgba(39,173,117,.16)", color: "#27AD75" }}
        >
          {skill ? skill.label : "Habit"}
        </span>
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
    </div>
  );
}
