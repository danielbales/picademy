import { useState } from "react";
import { fmt, average } from "../helpers";
import { FUND_BY_ID } from "../data";
import FixCard from "./FixCard";
import FACES from "./faces";

function scoreMood(score) {
  if (score == null) return "neutral";
  if (score >= 7.5) return "happy";
  if (score >= 5) return "neutral";
  return "grumpy";
}

function FollowUpInput({ criticName, onSubmit, disabled }) {
  const [value, setValue] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    const q = value.trim();
    if (!q || disabled) return;
    onSubmit(q);
    setValue("");
  }
  return (
    <form className="cb-followup-form" onSubmit={handleSubmit}>
      <input
        className="cb-followup-input"
        type="text"
        placeholder={`Ask ${criticName} a question...`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={200}
        disabled={disabled}
      />
      <button type="submit" className="cb-followup-send" disabled={disabled || !value.trim()}>Ask</button>
    </form>
  );
}

export default function CriticCard({ critic, result, status, roastRevealed, fixRevealed, temper, followUps = [], onFollowUp, photoUrl, crop, collapsed = false }) {
  const [expanded, setExpanded] = useState(false);
  const judging = status === "judging";
  const isGuest = !!critic.isGuest;
  const r = result ? result[isGuest ? "guest" : critic.id] : null;
  const score = r
    ? isGuest
      ? Math.round(average(result.skills) * 10) / 10
      : critic.skills.length === 1
        ? result.skills[critic.skills[0]]
        : Math.round((critic.skills.reduce((sum, s) => sum + result.skills[s], 0) / critic.skills.length) * 10) / 10
    : null;
  const Face = FACES[critic.id];
  const mood = roastRevealed ? scoreMood(score) : "neutral";
  const fundName = r && r.fundamental ? FUND_BY_ID[r.fundamental]?.name : null;

  // Collapsed mode: one-line summary, tap to expand
  const isCollapsed = collapsed && !expanded && roastRevealed && r;
  if (isCollapsed) {
    return (
      <article className="cb-critic cb-critic-collapsed cb-fade-in" onClick={() => setExpanded(true)}>
        <span className="cb-avatar cb-avatar-face cb-avatar-sm" style={{ background: critic.tint }} aria-hidden="true">
          {Face ? <Face mood={mood} temper={temper} /> : critic.initials}
        </span>
        <div className="cb-collapsed-main">
          <span className="cb-collapsed-name">{critic.name}:</span>
          <span className="cb-collapsed-tip">{fundName || r.roast}</span>
        </div>
        <span className="cb-collapsed-score cb-num">{fmt(score)}</span>
      </article>
    );
  }

  return (
    <article className="cb-critic">
      <div className="cb-critic-head">
        <span className="cb-avatar cb-avatar-face" style={{ background: critic.tint, boxShadow: roastRevealed ? `0 0 12px 2px ${critic.tint}` : undefined }} aria-hidden="true">
          {Face ? <Face mood={mood} temper={temper} /> : critic.initials}
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
            {Face ? <Face mood="neutral" temper={temper} /> : critic.initials}
          </span>
          <p className="cb-waiting">{critic.waiting}</p>
        </div>
      )}

      {r && roastRevealed && (
        <>
          {r.roast && <p className="cb-roast cb-fade-in">{r.roast}</p>}
          {r.fundamental && fixRevealed && <div className="cb-fade-in"><FixCard fix={r} isHabit={isGuest} photoUrl={photoUrl} crop={crop} /></div>}
          {fixRevealed && followUps.map((fu, i) => (
            <div key={i} className="cb-followup cb-fade-in">
              <p className="cb-followup-q">{fu.q}</p>
              {fu.status === "loading" && <p className="cb-followup-loading">Thinking...</p>}
              {fu.status === "done" && <p className="cb-followup-a">{fu.a}</p>}
              {fu.status === "error" && <p className="cb-followup-error">Couldn't get a response.</p>}
            </div>
          ))}
          {fixRevealed && followUps.length < 3 && onFollowUp && (
            <FollowUpInput
              criticName={critic.name}
              onSubmit={onFollowUp}
              disabled={followUps.some(f => f.status === "loading")}
            />
          )}
        </>
      )}
    </article>
  );
}
