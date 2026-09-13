import { useState, useRef, useEffect } from "react";
import { Target } from "lucide-react";
import { SKILLS, CRITICS, TEMPERS, HOST } from "./data";
import { grade } from "./api";
import { prepareImage } from "./image";
import { toGrade, average, fmt } from "./helpers";
import { saveScore, getBest, saveCovered, getCovered } from "./scores";
import Frame from "./components/Frame";
import ScoreHero, { Change } from "./components/ScoreHero";
import CriticCard from "./components/CriticCard";
import Fundamentals from "./components/Fundamentals";
import ImagePicker from "./components/ImagePicker";
import Confetti from "./components/Confetti";
import "./App.css";

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
  const [loadingIdx, setLoadingIdx] = useState(0);
  const [revealKey, setRevealKey] = useState(0);
  const pickerRef = useRef(null);
  const runId = useRef(0);

  useEffect(() => {
    if (status !== "judging") return undefined;
    setLoadingIdx(0);
    const t = setInterval(() => setLoadingIdx((i) => (i + 1) % HOST.loading.length), 2400);
    return () => clearInterval(t);
  }, [status]);

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
    setHostNote(null);
    setStatus("judging");
    try {
      const data = await grade(photo, temper, previous);
      if (runId.current !== id) return;
      const entry = { photoId: photo.id, avg: average(data.skills) };
      const isReshoot = !!previous;
      setChain((c) => {
        if (c.length && c[c.length - 1].photoId === photo.id) return [...c.slice(0, -1), entry];
        return isReshoot ? [...c, entry] : [entry];
      });
      setCovered((c) => {
        const next = new Set(c);
        [data.sterling, data.margaux, data.mom].forEach((fix) => {
          if (fix && fix.fundamental) next.add(fix.fundamental);
        });
        const arr = Array.from(next);
        saveCovered(arr);
        return arr;
      });
      saveScore(entry.avg);
      setBestScore(getBest());
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

  const isNewBest = done && bestScore != null && avg >= bestScore;

  let hostLine = HOST.idle;
  if (hostNote) hostLine = hostNote;
  else if (judging) hostLine = HOST.loading[loadingIdx];
  else if (status === "error") hostLine = HOST.error;
  else if (done) hostLine = result.host || HOST.byGrade[gradeStr[0]];
  else if (status === "ready") hostLine = previous ? HOST.reshootReady : HOST.ready;

  return (
    <div className="cb">
      <Confetti fire={isNewBest ? revealKey : 0} />
      <div className="cb-wrap">
        <header className="cb-bar">
          <h1 className="cb-brand cb-display">
            <span className="cb-brand-mark" aria-hidden="true">
              <Frame />
            </span>
            Picademy
          </h1>
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
            <Frame />
          </span>
          <div>
            <p className="cb-host-name">
              The Frame<span>Host</span>
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
        />

        {/* Temper */}
        <p className="cb-control-label" id="cb-temper">How harsh should they be?</p>
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

        {/* Actions */}
        <div className="cb-actions">
          {status === "ready" && (
            <>
              <button type="button" className="cb-btn" onClick={judge}>
                Submit to the panel
              </button>
              <button type="button" className="cb-btn is-secondary" onClick={() => pickerRef.current?.openGallery("new")}>
                Choose a different photo
              </button>
            </>
          )}
          {judging && (
            <button type="button" className="cb-btn" disabled>
              The panel is deliberating&hellip;
            </button>
          )}
          {status === "done" && (
            <>
              <button type="button" className="cb-btn" onClick={() => pickerRef.current?.openCamera("reshoot")}>
                Reshoot and compare
              </button>
              <button type="button" className="cb-btn is-secondary" onClick={() => pickerRef.current?.openGallery("new")}>
                New photo
              </button>
            </>
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
          <h2 className="cb-h2 cb-display">The panel</h2>
          <div className={`cb-panel-grid${done ? " is-list" : ""}`}>
            {CRITICS.map((c) => (
              <CriticCard key={c.id} critic={c} result={done ? result : null} status={status} />
            ))}
          </div>
        </section>

        {done && result.assignment && (
          <section className="cb-section">
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
        {(done || judging) && (
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

        <Fundamentals covered={covered} />
      </div>
    </div>
  );
}
