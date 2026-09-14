import { fmt } from "../helpers";
import FixCard from "./FixCard";
import FACES from "./faces";

export default function CriticCard({ critic, result, status, roastRevealed, fixRevealed }) {
  const judging = status === "judging";
  const isGuest = !!critic.isGuest;
  const r = result ? result[isGuest ? "guest" : critic.id] : null;
  const score = r
    ? isGuest
      ? 10
      : critic.skills.length === 1
        ? result.skills[critic.skills[0]]
        : Math.round((critic.skills.reduce((sum, s) => sum + result.skills[s], 0) / critic.skills.length) * 10) / 10
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
          <p className="cb-critic-focus"><span className="cb-focus-label">Focused on:</span> {critic.focus}</p>
        </div>
        {r && roastRevealed && (
          <div className="cb-critic-score">
            {fmt(score)}
            {isGuest && <small>Guest judge</small>}
          </div>
        )}
      </div>

      {judging && (
        <div className={`cb-critic-wait is-${critic.id}`}>
          <span className="cb-avatar cb-avatar-face" style={{ background: critic.tint }} aria-hidden="true">
            {Face ? <Face /> : critic.initials}
          </span>
          <p className="cb-waiting">{critic.waiting}</p>
        </div>
      )}

      {r && roastRevealed && (
        <>
          {r.roast && <p className="cb-roast cb-fade-in">{r.roast}</p>}
          {r.fundamental && fixRevealed && <div className="cb-fade-in"><FixCard fix={r} isHabit={isGuest} /></div>}
        </>
      )}
    </article>
  );
}
