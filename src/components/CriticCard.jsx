import { Heart } from "lucide-react";
import { fmt } from "../helpers";
import { SKILL_BY_ID } from "../data";
import FixCard from "./FixCard";
import FACES from "./faces";

export default function CriticCard({ critic, result, status, roastRevealed, fixRevealed }) {
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
          {r && roastRevealed && (
            <div className="cb-critic-tags">
              {isHabit ? (
                <span className="cb-critic-tag" style={{ color: critic.color }}>
                  <Heart size={12} aria-hidden="true" /> Habits
                </span>
              ) : (
                critic.skills.map((sid) => {
                  const s = SKILL_BY_ID[sid];
                  return (
                    <span key={sid} className="cb-critic-tag" style={{ color: s.color }}>
                      <s.Icon size={12} aria-hidden="true" /> {s.label}
                    </span>
                  );
                })
              )}
            </div>
          )}
        </div>
        <div className="cb-critic-score">
          {judging ? <span style={{ color: "var(--text-2)" }}>&ndash;</span> : r && roastRevealed ? fmt(score) : <span style={{ color: "var(--text-2)" }}>&ndash;</span>}
          {r && roastRevealed && isHabit && <small>Not counted</small>}
        </div>
      </div>

      {judging && (
        <div className={`cb-critic-wait is-${critic.id}`}>
          <span className="cb-avatar cb-avatar-face" style={{ background: critic.tint }} aria-hidden="true">
            {Face ? <Face /> : critic.initials}
          </span>
          <p className="cb-waiting">{critic.waiting}</p>
        </div>
      )}

      {!judging && !r && (
        <p className="cb-waiting">
          {status === "ready" ? "Ready when you are." : status === "error" ? "No response." : "Waiting for a photo."}
        </p>
      )}

      {r && roastRevealed && (
        <>
          {r.roast && <p className="cb-roast cb-fade-in">{r.roast}</p>}
          {r.fundamental && fixRevealed && <div className="cb-fade-in"><FixCard fix={r} isHabit={isHabit} /></div>}
        </>
      )}
    </article>
  );
}
