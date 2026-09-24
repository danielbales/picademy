import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { useCountUp, fmt, toGrade } from "../helpers";

function TrophyIcon({ size = 28, tier = "gold" }) {
  const colors = {
    gold:   { cup: "#E8C84A", shine: "#FFF5C8", rim: "#B8960F", stem: "#D4B430", base: "#8A6E08" },
    silver: { cup: "#C0C0C0", shine: "#F0F0F0", rim: "#8E8E8E", stem: "#A8A8A8", base: "#686868" },
    bronze: { cup: "#B87333", shine: "#F0D0A8", rim: "#6A3E15", stem: "#C4834A", base: "#4A2A0A" },
    basic:  { cup: "#6B7280", shine: "#A0A8B4", rim: "#3A3D44", stem: "#5A5D64", base: "#2A2D33" },
  };
  const c = colors[tier] || colors.basic;
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`ti-cup-${tier}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={c.rim} />
          <stop offset="35%" stopColor={c.cup} />
          <stop offset="50%" stopColor={c.shine} stopOpacity="0.9" />
          <stop offset="65%" stopColor={c.cup} />
          <stop offset="100%" stopColor={c.rim} />
        </linearGradient>
        <linearGradient id={`ti-stem-${tier}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={c.rim} />
          <stop offset="50%" stopColor={c.stem} />
          <stop offset="100%" stopColor={c.rim} />
        </linearGradient>
      </defs>
      {/* Cup body */}
      <path d="M8 5 Q8 16 11.5 19 Q14 21 16 21 Q18 21 20.5 19 Q24 16 24 5 Z" fill={`url(#ti-cup-${tier})`} />
      {/* Cup rim */}
      <path d="M7 5 L25 5" stroke={c.shine} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      {/* Left handle */}
      <path d="M8 7 Q4 7 4 11 Q4 15 8 15" fill="none" stroke={c.cup} strokeWidth="1.8" strokeLinecap="round" />
      {/* Right handle */}
      <path d="M24 7 Q28 7 28 11 Q28 15 24 15" fill="none" stroke={c.cup} strokeWidth="1.8" strokeLinecap="round" />
      {/* Shine streak on cup */}
      <path d="M12 7 Q11.5 12 13 17" fill="none" stroke={c.shine} strokeWidth="0.8" opacity="0.5" strokeLinecap="round" />
      {/* Stem */}
      <rect x="14" y="21" width="4" height="4" rx="0.5" fill={`url(#ti-stem-${tier})`} />
      {/* Base */}
      <path d="M11 25 Q11 27 12 27 L20 27 Q21 27 21 25 Z" fill={`url(#ti-stem-${tier})`} />
      <path d="M11.5 25.5 L20.5 25.5" stroke={c.shine} strokeWidth="0.5" opacity="0.4" />
      {/* Star on cup */}
      <path d="M16 9 L16.8 11.2 L19 11.2 L17.2 12.6 L17.8 14.8 L16 13.4 L14.2 14.8 L14.8 12.6 L13 11.2 L15.2 11.2 Z" fill={c.shine} opacity="0.4" />
    </svg>
  );
}

function Skel({ w, h = 14, r = 8, style }) {
  return <span className="cb-skel" style={{ width: w, height: h, borderRadius: r, ...style }} aria-hidden="true" />;
}

function Change({ value }) {
  const v = Math.round(value * 10) / 10;
  if (v === 0) {
    return (
      <span className="cb-change is-flat">
        <Minus size={14} aria-hidden="true" />
        0.0
      </span>
    );
  }
  const up = v > 0;
  return (
    <span className={`cb-change ${up ? "is-up" : "is-down"}`} aria-label={`${up ? "Up" : "Down"} ${Math.abs(v).toFixed(1)}`}>
      {up ? <ArrowUpRight size={16} aria-hidden="true" /> : <ArrowDownRight size={16} aria-hidden="true" />}
      {Math.abs(v).toFixed(1)}
    </span>
  );
}

function ScoreChart({ points }) {
  const W = 520;
  const H = 130;
  const pad = 12;
  const vals = points.map((p) => p.avg);
  const lo = Math.max(0, Math.min(...vals) - 1);
  const hi = Math.min(10, Math.max(...vals) + 1);
  const span = hi - lo || 1;
  const xy = vals.map((v, i) => [
    pad + (i * (W - pad * 2)) / (vals.length - 1),
    pad + (1 - (v - lo) / span) * (H - pad * 2),
  ]);
  const d = xy.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const [lx, ly] = xy[xy.length - 1];
  const up = vals[vals.length - 1] >= vals[0];
  return (
    <div className="cb-chart">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Score across ${vals.length} attempts at this scene, ${up ? "trending up" : "trending down"}`}>
        <line x1={pad} x2={W - pad} y1={H - pad} y2={H - pad} stroke="#2A2D33" strokeDasharray="2 6" />
        <path d={d} fill="none" stroke="#D4A843" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={lx} cy={ly} r="11" fill="#D4A843" opacity="0.22" />
        <circle cx={lx} cy={ly} r="5" fill="#D4A843" stroke="#0A0B0D" strokeWidth="2" />
      </svg>
      <div className="cb-chart-labels">
        <span>Attempt 1</span>
        <span>Attempt {vals.length}</span>
      </div>
    </div>
  );
}

export { Change };

export default function ScoreHero({ status, avg, grade, previous, prevAvg, chain, revealKey, bestScore, recent }) {
  const judging = status === "judging";
  const done = status === "done";
  const shown = useCountUp(avg, revealKey);
  const firstLoad = status === "idle" || status === "ready";

  if (firstLoad && !previous) return chain.length > 1 ? <ScoreChart points={chain} /> : null;

  let heroSub;
  if (judging) heroSub = <span>The Judges are deliberating</span>;
  else if (done && previous)
    heroSub = (
      <>
        <Change value={avg - prevAvg} />
        <span>since your last attempt</span>
      </>
    );
  else if (done) heroSub = <span>Try another shot like this to track your progress.</span>;
  else if (previous) heroSub = <span>Your last attempt. Submit the new one to compare.</span>;
  else heroSub = null;

  return (
    <>
      <section className="cb-hero" aria-live="polite">
        <p className="cb-label">Photo score</p>
        <div className="cb-big-row">
          {judging ? (
            <Skel w={140} h={52} r={12} style={{ margin: "6px 0" }} />
          ) : done ? (
            <>
              <span className="cb-big cb-display cb-num">{shown.toFixed(1)}</span>
              <span className="cb-big-of">/ 10</span>
              <span className={`cb-grade cb-num grade-${grade.toLowerCase()}`} aria-label={`${grade} tier`}>
                <span className="cb-grade-row">
                  <TrophyIcon size={18} tier={grade.toLowerCase()} />
                  {grade}
                </span>
              </span>
            </>
          ) : previous ? (
            <>
              <span className="cb-big cb-display cb-num is-empty">{prevAvg.toFixed(1)}</span>
              <span className="cb-big-of">/ 10</span>
            </>
          ) : null}
        </div>
        {heroSub && <p className="cb-sub">{heroSub}</p>}
        {recent && recent.length > 0 && (
          <div className="cb-recent">
            <div className="cb-recent-thumbs">
              {recent.map((r, i) => (
                r.thumb && (
                  <div key={i} className="cb-recent-item">
                    <img className="cb-recent-thumb" src={r.thumb} alt={`Score ${fmt(r.score)}`} />
                    <span className="cb-recent-score cb-num">{fmt(r.score)}</span>
                  </div>
                )
              ))}
            </div>
            {bestScore != null && (
              <p className="cb-best">
                <TrophyIcon size={16} tier={toGrade(bestScore.score).toLowerCase()} />
                {`Best: ${fmt(bestScore.score)} (${toGrade(bestScore.score)})`}
              </p>
            )}
          </div>
        )}
        {!recent?.length && bestScore != null && (
          <p className="cb-best">
            <TrophyIcon size={16} tier={toGrade(bestScore.score).toLowerCase()} />
            {`Best: ${fmt(bestScore.score)} (${toGrade(bestScore.score)})`}
          </p>
        )}
      </section>

      {chain.length > 1 && <ScoreChart points={chain} />}
    </>
  );
}
