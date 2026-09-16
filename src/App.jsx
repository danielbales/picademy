import { useState, useRef, useEffect } from "react";
import { Target, Flame, Share2 } from "lucide-react";
import { SKILLS, CRITICS, GUESTS, TEMPERS, HOST } from "./data";
import { grade } from "./api";
import { prepareImage } from "./image";
import { toGrade, average, fmt } from "./helpers";
import { fireConfetti } from "./confetti";
import { renderTurnstile } from "./turnstile";
import { shareResult } from "./share";
import { saveScore, getBest, saveCovered, getCovered, getStreak, bumpStreak } from "./scores";
import Host from "./components/Host";
import ScoreHero, { Change } from "./components/ScoreHero";
import CriticCard from "./components/CriticCard";
import ImagePicker from "./components/ImagePicker";
import "./App.css";

const MYSTERY_GUEST = {
  id: "mystery",
  name: "Random",
  initials: "?",
  color: "#6B7280",
  tint: "rgba(107,114,128,.16)",
  isGuest: true,
  focus: "Surprise",
  waiting: "A mystery judge is stepping out of the shadows...",
};

function Skel({ w, h = 14, r = 8, style }) {
  return <span className="cb-skel" style={{ width: w, height: h, borderRadius: r, ...style }} aria-hidden="true" />;
}


export default function App() {
  const [photo, setPhoto] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [result, setResult] = useState(null);
  const [chain, setChain] = useState([]);
  const [covered, setCovered] = useState(() => getCovered());
  const [status, setStatus] = useState("idle");
  const [temper, setTemper] = useState("honest");
  const [hostNote, setHostNote] = useState(null);
  const [bestScore, setBestScore] = useState(() => getBest());
  const [fileError, setFileError] = useState("");
  const [streak, setStreak] = useState(() => getStreak());
  const [guest, setGuest] = useState(() => GUESTS[Math.floor(Math.random() * GUESTS.length)]);
  const [loadingIdx, setLoadingIdx] = useState(0);
  const [revealKey, setRevealKey] = useState(0);
  const [revealStep, setRevealStep] = useState(0);
  const pickerRef = useRef(null);
  const runId = useRef(0);

  useEffect(() => { renderTurnstile("#turnstile"); }, []);

  useEffect(() => {
    if (status !== "judging") return undefined;
    setLoadingIdx(0);
    const t = setInterval(() => setLoadingIdx((i) => (i + 1) % HOST.loading.length), 2400);
    return () => clearInterval(t);
  }, [status]);

  useEffect(() => {
    if (status !== "done" || !result) { setRevealStep(0); return; }
    setRevealStep(1);
    const steps = [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500];
    const timers = steps.map((ms, i) => setTimeout(() => setRevealStep(i + 2), ms));
    if (toGrade(average(result.skills))[0] === "A") {
      timers.push(setTimeout(fireConfetti, 800));
    }
    return () => timers.forEach(clearTimeout);
  }, [status, result]);

  async function handleFile(file, mode = "new") {
    if (!file) return;
    setFileError("");
    let prepared;
    try {
      prepared = await prepareImage(file);
    } catch (e) {
      setFileError(e.message);
      return;
    }
    runId.current++;
    if (mode === "reshoot" && photo && result) {
      setPrevious({ photo, result });
    } else {
      setPrevious(null);
      setChain([]);
    }
    setPhoto(prepared);
    setResult(null);
    setHostNote(null);
    setStatus("ready");
  }

  async function judge() {
    if (!photo || status === "judging") return;
    const id = ++runId.current;
    const pickedGuest = GUESTS[Math.floor(Math.random() * GUESTS.length)];
    setGuest(pickedGuest);
    setHostNote(null);
    setStatus("judging");
    try {
      const data = await grade(photo, temper, previous, pickedGuest.id);
      if (runId.current !== id) return;
      const entry = { photoId: photo.id, avg: average(data.skills) };
      const isReshoot = !!previous;
      setChain((c) => {
        if (c.length && c[c.length - 1].photoId === photo.id) return [...c.slice(0, -1), entry];
        return isReshoot ? [...c, entry] : [entry];
      });
      setCovered((c) => {
        const next = new Set(c);
        [data.curren, data.harper, data.kai, data.guest].forEach((fix) => {
          if (fix && fix.fundamental) next.add(fix.fundamental);
        });
        const arr = Array.from(next);
        saveCovered(arr);
        return arr;
      });
      const best = await saveScore(entry.avg, photo.url);
      setBestScore(best);
      const streakResult = bumpStreak();
      setStreak(streakResult.count);
      if (streakResult.isNewBest) {
        setHostNote(`${streakResult.count} days! Curren is impressed.`);
      }
      setResult(data);
      setRevealKey((k) => k + 1);
      setStatus("done");
    } catch (e) {
      console.error(e);
      if (runId.current !== id) return;
      setHostNote(e.isRateLimit ? HOST.rateLimit : null);
      setStatus("error");
    }
  }

  const done = status === "done" && result;
  const judging = status === "judging";
  const avg = done ? average(result.skills) : null;
  const gradeStr = done ? toGrade(avg) : null;
  const prevAvg = previous ? average(previous.result.skills) : null;
  const weakest = done
    ? SKILLS.reduce((low, s) => (result.skills[s.id] < result.skills[low.id] ? s : low), SKILLS[0]).id
    : null;

  const criticReveal = (criticIdx) => ({
    roastRevealed: revealStep >= criticIdx * 2 + 2,
    fixRevealed: revealStep >= criticIdx * 2 + 3,
  });

  async function handleShare() {
    if (!result || !photo) return;
    const guestRoast = result.guest;
    await shareResult({
      photoUrl: photo.url,
      score: avg,
      grade: gradeStr,
      roast: guestRoast.roast,
      criticName: guest.name,
    });
  }

  let hostLine = HOST.idle;
  if (hostNote) hostLine = hostNote;
  else if (judging) hostLine = HOST.loading[loadingIdx];
  else if (status === "error") hostLine = HOST.error;
  else if (done) hostLine = result.host || HOST.byGrade[gradeStr[0]];
  else if (status === "ready") hostLine = previous ? HOST.reshootReady : HOST.ready;

  return (
    <div className="cb">
      <div className={`cb-wrap${done ? " cb-has-sticky" : ""}`}>
        <header className="cb-bar">
          <h1 className="cb-brand cb-display" onClick={() => {
            setPhoto(null);
            setPrevious(null);
            setResult(null);
            setChain([]);
            setStatus("idle");
            setHostNote(null);
            setFileError("");
            window.scrollTo(0, 0);
          }} style={{ cursor: "pointer" }}>
            <span className="cb-brand-mark" aria-hidden="true">
              <Host />
            </span>
            Picademy
          </h1>
          {streak > 0 && (
            <span className="cb-streak is-active" aria-label={`${streak} day streak`}>
              <Flame size={18} aria-hidden="true" />
              <span className="cb-num">{streak}</span>
            </span>
          )}
        </header>

        <ScoreHero
          status={status}
          avg={avg}
          grade={gradeStr}
          previous={previous}
          prevAvg={prevAvg}
          chain={chain}
          revealKey={revealKey}
          bestScore={bestScore}
        />

        {/* Host */}
        <div className="cb-host" aria-live="polite">
          <span className="cb-avatar cb-avatar-host" aria-hidden="true">
            <Host />
          </span>
          <div>
            <p className="cb-host-name">
              Lida<span>Host</span>
            </p>
            <p className="cb-host-line">{hostLine}</p>
          </div>
        </div>

        <ImagePicker
          ref={pickerRef}
          photo={photo}
          previous={previous}
          onFile={handleFile}
          grade={gradeStr}
          status={status}
        />

        {/* Temper - hidden after grading */}
        {!done && (
          <>
            <p className="cb-control-label" id="cb-temper">How harsh should the Judges be?</p>
            <div className="cb-seg" role="group" aria-labelledby="cb-temper">
              {TEMPERS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={temper === t.id}
                  disabled={judging}
                  onClick={() => {
                    setTemper(t.id);
                    setHostNote(t.host);
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Inline actions (pre-results) */}
        <div className="cb-actions">
          {status === "ready" && (
            <>
              <button type="button" className="cb-btn" onClick={judge}>
                Submit to the Judges
              </button>
              <button type="button" className="cb-btn is-secondary" onClick={() => pickerRef.current?.openGallery("new")}>
                Choose a different photo
              </button>
            </>
          )}
          {judging && (
            <button type="button" className="cb-btn" disabled>
              The Judges are deliberating&hellip;
            </button>
          )}
          {status === "error" && (
            <>
              <button type="button" className="cb-btn" onClick={judge}>
                Try again
              </button>
              <button type="button" className="cb-btn is-secondary" onClick={() => pickerRef.current?.openGallery("new")}>
                Choose a different photo
              </button>
            </>
          )}
        </div>
        {fileError && <p className="cb-error" role="alert">{fileError}</p>}

        {done && previous && result.progress && (
          <div className="cb-note">
            <p className="cb-note-title">What changed</p>
            <p className="cb-note-body">{result.progress}</p>
          </div>
        )}

        {/* Panel */}
        <section className="cb-section" aria-live="polite">
          <h2 className="cb-h2 cb-display">Judges</h2>
          <div className={`cb-panel-grid${revealStep >= 2 ? " is-list" : ""}`}>
            {[...CRITICS, judging || done ? guest : MYSTERY_GUEST].map((c, i) => (
              <CriticCard key={c.id} critic={c} result={done ? result : null} status={status} {...criticReveal(i)} />
            ))}
          </div>
        </section>

        {done && result.frameTip && revealStep >= 10 && (
          <section className="cb-section cb-fade-in">
            <div className="cb-frame-tip">
              <span className="cb-avatar cb-avatar-host" aria-hidden="true">
                <Host />
              </span>
              <div>
                <p className="cb-frame-tip-label">
                  Lida&rsquo;s tip
                  {result.photoType && result.photoType !== "other" && (
                    <span className="cb-photo-type">{result.photoType.replace("_", " ")}</span>
                  )}
                </p>
                <p className="cb-frame-tip-body">{result.frameTip}</p>
              </div>
            </div>
          </section>
        )}

        {done && result.assignment && revealStep >= 10 && (
          <section className="cb-section cb-fade-in">
            <div className="cb-promo">
              <span className="cb-icon">
                <Target size={20} aria-hidden="true" />
              </span>
              <div>
                <p className="cb-promo-title">This week&rsquo;s assignment</p>
                <p className="cb-promo-body">{result.assignment}</p>
              </div>
            </div>
          </section>
        )}

        {/* Skills */}
        {((done && revealStep >= 10) || judging) && (
        <section className="cb-section" aria-live="polite">
          <h2 className="cb-h2 cb-display">Skill breakdown</h2>
          <div className="cb-skills-grid">
            {SKILLS.map((s) => {
              const score = done ? result.skills[s.id] : null;
              const isWeak = s.id === weakest;
              return (
                <div key={s.id} className={`cb-skill-cell${isWeak ? " is-weak" : ""}`}>
                  <p className="cb-skill-label">{s.label}</p>
                  {judging ? (
                    <Skel w={36} h={20} r={6} />
                  ) : (
                    <p className="cb-skill-score cb-num">{score !== null ? fmt(score) : "\u2013"}</p>
                  )}
                  {done && previous && <Change value={score - previous.result.skills[s.id]} />}
                </div>
              );
            })}
          </div>
        </section>
        )}

      </div>

      {/* Sticky bottom bar for results */}
      <div id="turnstile" style={{ position: "fixed", bottom: 0, left: 0, zIndex: -1 }} />

      {done && (
        <div className="cb-sticky-bar">
          <div className="cb-sticky-inner">
            <button type="button" className="cb-btn" onClick={() => pickerRef.current?.openCamera("reshoot")}>
              Reshoot and compare
            </button>
            <button type="button" className="cb-btn is-share" onClick={handleShare} aria-label="Share result">
              <Share2 size={20} aria-hidden="true" />
            </button>
            <button type="button" className="cb-btn is-secondary" onClick={() => pickerRef.current?.openGallery("new")}>
              New photo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
