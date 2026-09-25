import { useState, useRef, useEffect } from "react";
import { Flame, Share2 } from "lucide-react";
import { CRITICS, GUESTS, TEMPERS, HOST, FUND_BY_ID } from "./data";
import { grade, askFollowUp, joinWaitlist } from "./api";
import { prepareImage } from "./image";
import { toGrade, average } from "./helpers";
import { fireConfetti } from "./confetti";
import { renderTurnstile } from "./turnstile";
import { shareResult, pickFeaturedRoast } from "./share";
import { saveScore, getBest, getRecent, saveCovered, getCovered, getStreak, bumpStreak, getRemaining, useGrade, addCredits, bumpLimitHit } from "./scores";
import Host from "./components/Host";
import ApertureMark from "./components/ApertureMark";
import ScoreHero, { Change } from "./components/ScoreHero";
import CriticCard from "./components/CriticCard";
import FACES from "./components/faces";
import ImagePicker from "./components/ImagePicker";
import Fundamentals from "./components/Fundamentals";
import "./App.css";


const MYSTERY_GUEST = {
  id: "mystery",
  name: "Surprise Judge",
  initials: "?",
  color: "#6B7280",
  tint: "rgba(107,114,128,.16)",
  isGuest: true,
  focus: "Surprise",
  waiting: "A mystery judge is stepping out of the shadows...",
};

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
  const [recent, setRecent] = useState(() => getRecent());
  const [fileError, setFileError] = useState("");
  const [streak, setStreak] = useState(() => getStreak());
  const [guest, setGuest] = useState(() => GUESTS[Math.floor(Math.random() * GUESTS.length)]);
  const [loadingIdx, setLoadingIdx] = useState(0);
  const [revealKey, setRevealKey] = useState(0);
  const [revealStep, setRevealStep] = useState(0);
  const [remaining, setRemaining] = useState(() => getRemaining());
  const [shareState, setShareState] = useState("idle"); // idle | sharing | shared | downloaded
  const [followUps, setFollowUps] = useState({});
  const [waitlist, setWaitlist] = useState("idle"); // idle | sending | done | error
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [guestRevealed, setGuestRevealed] = useState(false);
  const pickerRef = useRef(null);
  const runId = useRef(0);

  useEffect(() => { renderTurnstile("#turnstile"); }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const n = parseInt(params.get("redeem"), 10);
    if (n > 0 && n <= 200) {
      addCredits(n);
      setRemaining(getRemaining());
      window.history.replaceState({}, "", window.location.pathname);
      setHostNote(`${n} critiques added! The judges are ready.`);
    }
  }, []);

  useEffect(() => {
    if (status === "ready" && remaining.total === 0) bumpLimitHit();
  }, [status, remaining.total]);

  useEffect(() => {
    if (status !== "judging") return undefined;
    setLoadingIdx(0);
    const t = setInterval(() => setLoadingIdx((i) => (i + 1) % HOST.loading.length), 2400);
    return () => clearInterval(t);
  }, [status]);

  useEffect(() => {
    if (status !== "done" || !result) { setRevealStep(0); return; }
    setRevealStep(1);
    setShareState("idle");
    const steps = [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500];
    const timers = steps.map((ms, i) => setTimeout(() => setRevealStep(i + 2), ms));
    if (toGrade(average(result.skills)) === "Gold") {
      timers.push(setTimeout(fireConfetti, 800));
    }
    return () => timers.forEach(clearTimeout);
  }, [status, result]);

  async function handleFile(file, mode = "new", source = "gallery") {
    if (!file) return;
    setFileError("");
    let prepared;
    try {
      prepared = await prepareImage(file);
    } catch (e) {
      setFileError(e.message);
      return;
    }
    prepared.source = source;
    runId.current++;
    if (mode === "reshoot" && photo && result) {
      setPrevious({ photo, result });
    } else {
      setPrevious(null);
      setChain([]);
    }
    setPhoto(prepared);
    setResult(null);
    setFollowUps({});
    setHostNote(null);
    setShareState("idle");
    setStatus("ready");
  }

  async function judge() {
    if (!photo || status === "judging") return;
    const id = ++runId.current;
    const pickedGuest = GUESTS[Math.floor(Math.random() * GUESTS.length)];
    setGuest(pickedGuest);
    setGuestRevealed(true);
    setTimeout(() => setGuestRevealed(false), 2800);
    setHostNote(null);
    setStatus("judging");
    window.scrollTo({ top: 0, behavior: "smooth" });
    try {
      const data = await grade(photo, temper, previous, pickedGuest.id, covered);
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
      setRecent(getRecent());
      const streakResult = bumpStreak();
      setStreak(streakResult.count);
      if (streakResult.isNewBest) {
        setHostNote(`${streakResult.count} days! Curren is impressed.`);
      }
      useGrade();
      setRemaining(getRemaining());
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

  async function handleFollowUp(criticId, question) {
    const key = criticId;
    const existing = followUps[key] || [];
    if (existing.length >= 3) return;
    const critiqueData = result[key === "guest" ? "guest" : key];
    const idx = existing.length;
    setFollowUps(prev => ({ ...prev, [key]: [...(prev[key] || []), { q: question, a: null, status: "loading" }] }));
    try {
      const data = await askFollowUp(criticId, guest.id, question, critiqueData, photo);
      setFollowUps(prev => {
        const arr = [...(prev[key] || [])];
        arr[idx] = { q: question, a: data.answer, status: "done" };
        return { ...prev, [key]: arr };
      });
    } catch {
      setFollowUps(prev => {
        const arr = [...(prev[key] || [])];
        arr[idx] = { q: question, a: null, status: "error" };
        return { ...prev, [key]: arr };
      });
    }
  }

  const done = status === "done" && result;
  const judging = status === "judging";
  const avg = done ? average(result.skills) : null;
  const gradeStr = done ? toGrade(avg) : null;
  const prevAvg = previous ? average(previous.result.skills) : null;
  const criticReveal = (criticIdx) => ({
    roastRevealed: revealStep >= criticIdx * 2 + 2,
    fixRevealed: revealStep >= criticIdx * 2 + 3,
  });

  // Determine lead judge: the one teaching the weakest skill
  const leadCriticId = done ? (() => {
    const scores = result.skills;
    const skillToCritic = { light: "curren", composition: "harper", technical: "kai", editing: "kai" };
    let weakest = null;
    let weakScore = 11;
    for (const [skill, score] of Object.entries(scores)) {
      if (score < weakScore) { weakScore = score; weakest = skillToCritic[skill]; }
    }
    return weakest;
  })() : null;

  // Lead fundamental name for the sticky button
  const leadFundamental = done && leadCriticId ? (() => {
    const r = result[leadCriticId];
    if (!r || !r.fundamental) return null;
    return FUND_BY_ID[r.fundamental]?.name || null;
  })() : null;

  async function handleShare() {
    if (!result || !photo || shareState === "sharing") return;
    setShareState("sharing");
    try {
      const { roast, criticName, focus } = pickFeaturedRoast(result, guest);
      const outcome = await shareResult({
        photoUrl: photo.url,
        score: avg,
        grade: gradeStr,
        roast,
        criticName,
        focus,
        skills: result.skills,
      });
      setShareState(outcome === "shared" ? "shared" : outcome === "downloaded" ? "downloaded" : "idle");
      if (outcome === "shared" || outcome === "downloaded") {
        setTimeout(() => setShareState("idle"), 2500);
      }
    } catch {
      setShareState("idle");
    }
  }

  let hostLine = HOST.idle;
  if (hostNote) hostLine = hostNote;
  else if (judging) hostLine = HOST.loading[loadingIdx];
  else if (status === "error") hostLine = HOST.error;
  else if (done) hostLine = result.host || HOST.byGrade[gradeStr];
  else if (status === "ready") hostLine = previous ? HOST.reshootReady : HOST.ready;

  const shareLabel =
    shareState === "sharing" ? "Preparing card\u2026"
    : shareState === "shared" ? "Shared!"
    : shareState === "downloaded" ? "Saved!"
    : "Share this roast";

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
            setShareState("idle");
            window.scrollTo(0, 0);
          }} style={{ cursor: "pointer" }}>
            <span className="cb-brand-mark" aria-hidden="true">
              <ApertureMark />
            </span>
            Aperture
          </h1>
          <div className="cb-bar-right">
            {remaining.freeLeft < remaining.daily && (
              <span className="cb-remaining-pill" aria-label={`${remaining.total} critiques remaining`}>
                <span className="cb-num">{remaining.total}</span>/{remaining.daily}
              </span>
            )}
            {streak > 0 && (
              <span className="cb-streak is-active" aria-label={`${streak} day streak`}>
                <Flame size={18} aria-hidden="true" />
                <span className="cb-num">{streak}</span>
              </span>
            )}
          </div>
        </header>

        <p className="cb-tagline">
          {done
            ? "Upload another to keep improving"
            : judging
            ? "The judges are reviewing your photo"
            : status === "ready"
            ? "Ready when you are"
            : "How good are your photos?"}
        </p>


        {status === "idle" && (
          <section className="cb-onboard">
            <div className="cb-onboard-preview">
              <div className="cb-onboard-card">
                <div className="cb-onboard-card-head">
                  <span className="cb-avatar cb-avatar-face cb-avatar-sm" style={{ background: "rgba(245,166,35,.18)" }} aria-hidden="true">
                    {FACES.curren && <FACES.curren mood="grumpy" temper="brutal" />}
                  </span>
                  <div>
                    <p className="cb-onboard-card-name">Curren</p>
                    <p className="cb-onboard-card-focus">Light</p>
                  </div>
                  <span className="cb-onboard-card-score">4.2</span>
                </div>
                <p className="cb-onboard-card-roast">"The light is flatter than my mood. A flashlight taped to a roomba would create more dimension."</p>
                <div className="cb-onboard-card-fix">
                  <p className="cb-onboard-card-kicker">Next time</p>
                  <p className="cb-onboard-card-tip">Golden hour side lighting</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {!done && (
          <ScoreHero
            status={status}
            avg={avg}
            grade={gradeStr}
            previous={previous}
            prevAvg={prevAvg}
            chain={chain}
            revealKey={revealKey}
            bestScore={bestScore}
            recent={recent}
          />
        )}

        {status !== "idle" && (
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
        )}

        <ImagePicker
          ref={pickerRef}
          photo={photo}
          previous={previous}
          onFile={handleFile}
          grade={gradeStr}
          status={status}
          crop={done ? result.crop : null}
        />

        {/* Assignment as the headline, right after the photo */}
        {done && result.assignment && revealStep >= 2 && (
          <div className="cb-assignment cb-assignment-hero cb-fade-in">
            <p className="cb-assignment-kicker">Your next shot</p>
            <p className="cb-assignment-body">{result.assignment}</p>
          </div>
        )}

        {/* Progress note for reshoots */}
        {done && previous && result.progress && revealStep >= 2 && (
          <div className="cb-note cb-fade-in">
            <p className="cb-note-title">What changed</p>
            <p className="cb-note-body">{result.progress}</p>
          </div>
        )}

        {/* Temper - small control, hidden once grade is in */}
        {!done && (
          <div className="cb-temper-compact">
            <div className="cb-seg cb-seg-sm" role="group" aria-label="Judge harshness">
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
          </div>
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
        {status === "ready" && remaining.total > 0 && (
          <p className="cb-remaining">
            {remaining.freeLeft > 0
              ? `${remaining.freeLeft} of ${remaining.daily} free critiques left today`
              : `${remaining.credits} credit${remaining.credits !== 1 ? "s" : ""} remaining`}
          </p>
        )}
        {fileError && <p className="cb-error" role="alert">{fileError}</p>}

        {status !== "idle" && (
          <section className="cb-section" aria-live="polite">
            {judging && (
              <div className="cb-onboard-judges cb-fade-in">
                <p className="cb-onboard-label">Your judges</p>
                <div className="cb-onboard-faces">
                  {CRITICS.map((c) => {
                    const Face = FACES[c.id];
                    return (
                      <div key={c.id} className="cb-onboard-judge">
                        <span className="cb-avatar cb-avatar-face" style={{ background: c.tint }} aria-hidden="true">
                          {Face && <Face mood="neutral" temper={temper} />}
                        </span>
                        <span className="cb-onboard-name">{c.name}</span>
                        <span className="cb-onboard-focus">{c.focus}</span>
                      </div>
                    );
                  })}
                  <div className="cb-onboard-judge">
                    <span className="cb-avatar cb-onboard-mystery" aria-hidden="true">?</span>
                    <span className="cb-onboard-name">Surprise Judge</span>
                    <span className="cb-onboard-focus">A new guest each time</span>
                  </div>
                </div>
              </div>
            )}
            {judging && guestRevealed && (
              <p className="cb-guest-reveal cb-fade-in">Today's surprise judge is <strong>{guest.name}</strong></p>
            )}

            {/* Judging: show all cards in grid */}
            {judging && (
              <div className="cb-panel-grid">
                {[...CRITICS, guest].map((c) => (
                  <CriticCard key={c.id} critic={c} result={null} status={status} temper={temper} followUps={[]} photoUrl={photo?.url} crop={null} roastRevealed={false} fixRevealed={false} />
                ))}
              </div>
            )}

            {/* Done: lead judge open, others collapsed, guest last */}
            {done && (() => {
              const leadCritic = CRITICS.find(c => c.id === leadCriticId) || CRITICS[0];
              const otherCritics = CRITICS.filter(c => c.id !== leadCritic.id);
              const actualGuest = guest;
              return (
                <>
                  {/* Lead judge - full card */}
                  <CriticCard
                    key={leadCritic.id}
                    critic={leadCritic}
                    result={result}
                    status={status}
                    temper={temper}
                    followUps={followUps[leadCritic.id] || []}
                    onFollowUp={(q) => handleFollowUp(leadCritic.id, q)}
                    photoUrl={photo?.url}
                    crop={result.crop}
                    roastRevealed={revealStep >= 2}
                    fixRevealed={revealStep >= 3}
                  />

                  {/* Score as caption after lead judge */}
                  {revealStep >= 3 && (
                    <ScoreHero
                      status={status}
                      avg={avg}
                      grade={gradeStr}
                      previous={previous}
                      prevAvg={prevAvg}
                      chain={chain}
                      revealKey={revealKey}
                      bestScore={bestScore}
                      recent={recent}
                    />
                  )}

                  {/* Other teaching judges - collapsed */}
                  {otherCritics.map((c, i) => (
                    <CriticCard
                      key={c.id}
                      critic={c}
                      result={result}
                      status={status}
                      temper={temper}
                      followUps={followUps[c.id] || []}
                      onFollowUp={(q) => handleFollowUp(c.id, q)}
                      photoUrl={photo?.url}
                      crop={result.crop}
                      roastRevealed={revealStep >= 4 + i * 2}
                      fixRevealed={revealStep >= 5 + i * 2}
                      collapsed
                    />
                  ))}

                  {/* Guest judge - the fun closer */}
                  {revealStep >= 8 && (
                    <CriticCard
                      key={actualGuest.id}
                      critic={actualGuest}
                      result={result}
                      status={status}
                      temper={temper}
                      followUps={followUps.guest || []}
                      onFollowUp={(q) => handleFollowUp("guest", q)}
                      photoUrl={photo?.url}
                      crop={result.crop}
                      roastRevealed
                      fixRevealed={revealStep >= 9}
                    />
                  )}

                  {/* Lida's tip */}
                  {result.frameTip && revealStep >= 10 && (
                    <div className="cb-frame-tip cb-fade-in">
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
                  )}

                  {/* Waitlist capture when out of critiques */}
                  {revealStep >= 10 && remaining.total === 0 && (
                    <div className="cb-end-capture cb-fade-in">
                      {waitlist === "done" ? (
                        <p className="cb-paywall-thanks">You're on the list. We'll let you know when more critiques are available.</p>
                      ) : (
                        <>
                          <p className="cb-end-capture-title">Want more critiques?</p>
                          <p className="cb-end-capture-sub">Drop your email and we'll notify you when we open up.</p>
                          <form className="cb-waitlist-form" onSubmit={async (e) => {
                            e.preventDefault();
                            if (!waitlistEmail.trim() || waitlist === "sending") return;
                            setWaitlist("sending");
                            try {
                              await joinWaitlist(waitlistEmail.trim());
                              setWaitlist("done");
                            } catch {
                              setWaitlist("error");
                            }
                          }}>
                            <input
                              className="cb-waitlist-input"
                              type="email"
                              placeholder="you@email.com"
                              value={waitlistEmail}
                              onChange={(e) => setWaitlistEmail(e.target.value)}
                              required
                            />
                            <button type="submit" className="cb-btn" disabled={waitlist === "sending"} style={{ height: 44, fontSize: 14 }}>
                              {waitlist === "sending" ? "Joining..." : "Join"}
                            </button>
                          </form>
                          {waitlist === "error" && <p className="cb-paywall-error">Something went wrong. Try again.</p>}
                        </>
                      )}
                    </div>
                  )}
                </>
              );
            })()}
          </section>
        )}

      </div>

      {/* Sticky bottom bar for results */}
      <div id="turnstile" style={{ position: "fixed", bottom: 0, left: 0, zIndex: -1 }} />

      {done && (
        <div className="cb-sticky-bar">
          <div className="cb-sticky-inner">
            <button type="button" className="cb-btn" onClick={() => pickerRef.current?.openCamera("reshoot")}>
              {leadFundamental ? `Reshoot: ${leadFundamental.toLowerCase()}` : "Reshoot this"}
            </button>
            <div className="cb-sticky-secondary">
              <button type="button" className="cb-sticky-link" onClick={() => pickerRef.current?.openGallery("new")}>
                New photo
              </button>
              <button
                type="button"
                className={`cb-sticky-link${shareState !== "idle" ? " is-active" : ""}`}
                onClick={handleShare}
                disabled={shareState === "sharing"}
                aria-label={shareLabel}
                title={shareLabel}
              >
                <Share2 size={16} aria-hidden="true" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
