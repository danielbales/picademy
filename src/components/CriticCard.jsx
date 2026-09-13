import { fmt } from "../helpers";
import FixCard from "./FixCard";
import FACES from "./faces";

function Skel({ w, h = 14, r = 8, style }) {
  return <span className="cb-skel" style={{ width: w, height: h, borderRadius: r, ...style }} aria-hidden="true" />;
}

export default function CriticCard({ critic, result, status }) {
  const judging = status === "judging";
  const r = result ? result[critic.id] : null;
  const isHabit = critic.id === "mom";
  const score = r
    ? isHabit
      ? 10
      : Math.round(((result.skills[critic.skills[0]] + result.skills[critic.skills[1]]) / 2) * 10) / 10
    : null;
  const Face = FACES[critic.id];

  return (
    <article className="cb-critic">
      <div className="cb-critic-head">
        <span className="cb-avatar cb-avatar-face" style={{ background: critic.tint }} aria-hidden="true">
          {Face ? <Face /> : critic.initials}
        </span>
        <div className="cb-row-main">
          <h3 className="cb-row-title">{critic.name}</h3>
          <p className="cb-row-sub">{critic.role}</p>
        </div>
        <div className="cb-critic-score">
          {judging ? <Skel w={32} h={18} /> : r ? fmt(score) : <span style={{ color: "var(--text-2)" }}>&ndash;</span>}
          {r && isHabit && <small>Not counted</small>}
        </div>
      </div>

      {judging && (
        <div style={{ marginTop: 14 }}>
          <Skel w="90%" h={14} style={{ display: "block" }} />
          <Skel w="100%" h={84} r={16} style={{ display: "block", marginTop: 14 }} />
          <p className="cb-waiting">{critic.waiting}</p>
        </div>
      )}

      {!judging && !r && (
        <p className="cb-waiting">
          {status === "ready" ? "Ready when you are." : status === "error" ? "No response." : "Waiting for a photo."}
        </p>
      )}

      {r && (
        <>
          {r.roast && <p className="cb-roast">{r.roast}</p>}
          {r.fundamental && <FixCard fix={r} isHabit={isHabit} />}
        </>
      )}
    </article>
  );
}
