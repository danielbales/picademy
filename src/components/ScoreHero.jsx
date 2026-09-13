import { ArrowUpRight, ArrowDownRight, Minus, Trophy } from "lucide-react";
import { useCountUp, fmt, toGrade } from "../helpers";

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

export default function ScoreHero({ status, avg, grade, previous, prevAvg, chain, revealKey, bestScore }) {
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
  else if (done) heroSub = <span>First attempt at this scene. Reshoot it to track your progress.</span>;
  else if (previous) heroSub = <span>Your last attempt. Submit the reshoot to compare.</span>;
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
              <span className={`cb-grade cb-num grade-${grade[0].toLowerCase()}`} aria-label={`Grade ${grade}`}>
                <Trophy size={28} aria-hidden="true" />
                {grade.replace("-", "\u2212")}
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
        {bestScore != null && (
          <p className="cb-best">
            <Trophy size={18} aria-hidden="true" />
            {`Best: ${fmt(bestScore)} (${toGrade(bestScore)}) \u2014 beat it`}
          </p>
        )}
      </section>

      {chain.length > 1 && <ScoreChart points={chain} />}
    </>
  );
}
