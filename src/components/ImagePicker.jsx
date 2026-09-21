import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { ImagePlus, Camera } from "lucide-react";

function ShutterAnim() {
  return (
    <div className="cb-shutter" aria-hidden="true">
      <div className="cb-shutter-breathe" />
    </div>
  );
}

function trophyTier(grade) {
  if (!grade) return "";
  return ` trophy-${grade.toLowerCase()}`;
}

const TROPHY_COLORS = {
  gold:   { main: "#E8C84A", light: "#F5E078", mid: "#D4B430", dark: "#B8960F", darker: "#8A6E08", deepest: "#6A5206", glow: "rgba(232,200,74,.35)", shine: "rgba(255,245,200,.6)" },
  silver: { main: "#C0C0C0", light: "#E8E8E8", mid: "#A8A8A8", dark: "#8E8E8E", darker: "#686868", deepest: "#505050", glow: "rgba(192,192,192,.3)", shine: "rgba(255,255,255,.5)" },
  bronze: { main: "#B87333", light: "#D4935A", mid: "#C4834A", dark: "#8B5A2B", darker: "#6A3E15", deepest: "#4A2A0A", glow: "rgba(184,115,51,.3)", shine: "rgba(255,220,180,.5)" },
  basic:  { main: "#4A4D54", light: "#6A6D74", mid: "#5A5D64", dark: "#3A3D44", darker: "#2A2D33", deepest: "#1A1D23", glow: "rgba(74,77,84,.2)", shine: "rgba(255,255,255,.15)" },
};

function TrophyBase({ grade }) {
  if (!grade) return null;
  const tier = grade.toLowerCase();
  const c = TROPHY_COLORS[tier];
  const label = tier === "basic" ? "" : grade;
  const p = `tr-${tier}`;

  return (
    <svg className="cb-trophy-base" viewBox="0 0 240 100" aria-hidden="true">
      <defs>
        {/* Cup body - rich horizontal metallic sheen */}
        <linearGradient id={`${p}-cup`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={c.darker} />
          <stop offset="20%" stopColor={c.main} />
          <stop offset="40%" stopColor={c.light} />
          <stop offset="50%" stopColor={c.shine} stopOpacity="0.9" />
          <stop offset="60%" stopColor={c.light} />
          <stop offset="80%" stopColor={c.main} />
          <stop offset="100%" stopColor={c.darker} />
        </linearGradient>
        {/* Handle gradient */}
        <linearGradient id={`${p}-handle`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.light} />
          <stop offset="50%" stopColor={c.dark} />
          <stop offset="100%" stopColor={c.main} />
        </linearGradient>
        {/* Stem vertical gradient */}
        <linearGradient id={`${p}-stem`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={c.darker} />
          <stop offset="30%" stopColor={c.main} />
          <stop offset="50%" stopColor={c.light} />
          <stop offset="70%" stopColor={c.main} />
          <stop offset="100%" stopColor={c.darker} />
        </linearGradient>
        {/* Knob / decorative node */}
        <radialGradient id={`${p}-knob`} cx="50%" cy="35%" r="55%">
          <stop offset="0%" stopColor={c.light} />
          <stop offset="100%" stopColor={c.dark} />
        </radialGradient>
        {/* Base top-down shading */}
        <linearGradient id={`${p}-base`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.light} />
          <stop offset="40%" stopColor={c.main} />
          <stop offset="100%" stopColor={c.deepest} />
        </linearGradient>
        {/* Plaque for label */}
        <linearGradient id={`${p}-plaque`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.deepest} />
          <stop offset="50%" stopColor={c.darker} />
          <stop offset="100%" stopColor={c.deepest} />
        </linearGradient>
        {/* Sheen sweep overlay */}
        <linearGradient id={`${p}-sheen`} x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#FFF" stopOpacity="0" />
          <stop offset="45%" stopColor="#FFF" stopOpacity="0.12" />
          <stop offset="55%" stopColor="#FFF" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#FFF" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ---- HANDLES ---- */}
      {/* Left handle - ornate scroll shape */}
      <path
        d="M38 3 Q22 0 14 8 Q6 16 8 26 Q10 34 18 34 Q24 34 26 28 Q28 22 22 20"
        fill="none" stroke={`url(#${p}-handle)`} strokeWidth="5" strokeLinecap="round"
      />
      {/* Left handle inner scroll curl */}
      <path
        d="M22 20 Q18 18 16 22 Q14 26 18 28"
        fill="none" stroke={c.main} strokeWidth="2.5" strokeLinecap="round" opacity="0.6"
      />
      {/* Right handle - mirror */}
      <path
        d="M202 3 Q218 0 226 8 Q234 16 232 26 Q230 34 222 34 Q216 34 214 28 Q212 22 218 20"
        fill="none" stroke={`url(#${p}-handle)`} strokeWidth="5" strokeLinecap="round"
      />
      {/* Right handle inner scroll curl */}
      <path
        d="M218 20 Q222 18 224 22 Q226 26 222 28"
        fill="none" stroke={c.main} strokeWidth="2.5" strokeLinecap="round" opacity="0.6"
      />

      {/* ---- CUP BOWL (bottom of the cup, connecting photo to stem) ---- */}
      <path
        d="M32 0 Q32 6 50 12 Q80 20 120 22 Q160 20 190 12 Q208 6 208 0 L208 0 Q208 10 190 18 Q160 28 120 30 Q80 28 50 18 Q32 10 32 0 Z"
        fill={`url(#${p}-cup)`}
      />
      {/* Cup bowl rim highlight */}
      <path
        d="M40 2 Q80 12 120 14 Q160 12 200 2"
        fill="none" stroke={c.shine} strokeWidth="1" opacity="0.5"
      />
      {/* Cup decorative band */}
      <path
        d="M50 10 Q80 18 120 20 Q160 18 190 10"
        fill="none" stroke={c.dark} strokeWidth="0.8" opacity="0.5"
      />
      <path
        d="M52 12 Q82 20 120 22 Q158 20 188 12"
        fill="none" stroke={c.dark} strokeWidth="0.8" opacity="0.4"
      />

      {/* ---- STEM ---- */}
      {/* Main column */}
      <path
        d="M106 28 L106 52 Q106 54 108 54 L132 54 Q134 54 134 52 L134 28"
        fill={`url(#${p}-stem)`}
      />
      {/* Stem taper at top */}
      <path
        d="M100 28 Q100 32 106 32 L134 32 Q140 32 140 28"
        fill={`url(#${p}-cup)`}
      />
      {/* Decorative knob mid-stem */}
      <ellipse cx="120" cy="42" rx="8" ry="4" fill={`url(#${p}-knob)`} />
      {/* Knob highlight */}
      <ellipse cx="118" cy="41" rx="3" ry="1.5" fill={c.shine} opacity="0.3" />
      {/* Stem ring details */}
      <line x1="108" y1="36" x2="132" y2="36" stroke={c.dark} strokeWidth="0.8" opacity="0.5" />
      <line x1="108" y1="48" x2="132" y2="48" stroke={c.dark} strokeWidth="0.8" opacity="0.5" />

      {/* ---- PEDESTAL (tiered) ---- */}
      {/* Upper flare */}
      <path
        d="M98 54 L142 54 L150 60 L90 60 Z"
        fill={`url(#${p}-stem)`}
      />
      {/* Upper flare edge highlights */}
      <line x1="92" y1="60" x2="148" y2="60" stroke={c.light} strokeWidth="0.8" opacity="0.4" />

      {/* Middle tier */}
      <rect x="82" y="60" width="76" height="8" rx="2" fill={`url(#${p}-base)`} />
      {/* Middle tier bevel highlight */}
      <rect x="84" y="61" width="72" height="2" rx="1" fill={c.light} opacity="0.25" />

      {/* Lower flare */}
      <path
        d="M82 68 L158 68 L166 74 L74 74 Z"
        fill={`url(#${p}-stem)`}
      />

      {/* Bottom base */}
      <rect x="68" y="74" width="104" height="14" rx="3" fill={`url(#${p}-base)`} />
      {/* Base top bevel */}
      <rect x="70" y="75" width="100" height="3" rx="1.5" fill={c.light} opacity="0.3" />
      {/* Base bottom shadow edge */}
      <rect x="70" y="85" width="100" height="2" rx="1" fill={c.deepest} opacity="0.5" />

      {/* ---- PLAQUE ---- */}
      {label && (
        <>
          <rect x="90" y="77" width="60" height="10" rx="2" fill={`url(#${p}-plaque)`} />
          <rect x="91" y="78" width="58" height="1" rx="0.5" fill={c.main} opacity="0.3" />
          <text x="120" y="85" textAnchor="middle" fill={c.light} fontSize="7" fontWeight="700" fontFamily="inherit" letterSpacing="2" opacity="0.85">
            {label.toUpperCase()}
          </text>
        </>
      )}

      {/* ---- DECORATIVE SCROLLWORK on cup ---- */}
      {/* Left flourish */}
      <path
        d="M60 6 Q55 10 58 14 Q61 18 56 20"
        fill="none" stroke={c.main} strokeWidth="1.2" strokeLinecap="round" opacity="0.3"
      />
      {/* Right flourish */}
      <path
        d="M180 6 Q185 10 182 14 Q179 18 184 20"
        fill="none" stroke={c.main} strokeWidth="1.2" strokeLinecap="round" opacity="0.3"
      />

      {/* ---- OVERALL SHEEN OVERLAY ---- */}
      <rect x="32" y="0" width="176" height="88" fill={`url(#${p}-sheen)`} opacity="0.5" />

      {/* ---- GROUND SHADOW / GLOW ---- */}
      <ellipse cx="120" cy="92" rx="60" ry="5" fill={c.glow} />
    </svg>
  );
}

const ImagePicker = forwardRef(function ImagePicker({ photo, previous, onFile, grade, status, crop }, ref) {
  const [dragging, setDragging] = useState(false);
  const [showShutter, setShowShutter] = useState(false);
  const prevStatusRef = useRef(status);
  const cameraRef = useRef(null);
  const galleryRef = useRef(null);
  const pickModeRef = useRef("new");

  useEffect(() => {
    if (status === "judging" && prevStatusRef.current !== "judging") {
      setShowShutter(true);
      const t = setTimeout(() => setShowShutter(false), 2800);
      return () => clearTimeout(t);
    }
    prevStatusRef.current = status;
  }, [status]);

  useImperativeHandle(ref, () => ({
    openCamera(mode = "new") {
      pickModeRef.current = mode;
      cameraRef.current?.click();
    },
    openGallery(mode = "new") {
      pickModeRef.current = mode;
      galleryRef.current?.click();
    },
  }));

  function handleCamera(e) {
    const file = e.target.files?.[0];
    if (file) onFile(file, pickModeRef.current, "camera");
    e.target.value = "";
  }
  function handleGallery(e) {
    const file = e.target.files?.[0];
    if (file) onFile(file, pickModeRef.current, "gallery");
    e.target.value = "";
  }

  const isTrophy = status === "judging" || status === "done";

  return (
    <>
      <div className="cb-photo-wrap">
        <div
          className={`cb-photo${trophyTier(grade)}${isTrophy ? " is-trophy" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            onFile(e.dataTransfer.files?.[0], "new", "gallery");
          }}
        >
          {showShutter && <ShutterAnim />}
          {photo ? (
            <div className={`cb-photo-grid${previous ? " is-pair" : ""}`}>
              {previous && (
                <div className="cb-photo-cell">
                  <img src={previous.photo.url} alt="Your earlier photo" />
                  <span className="cb-tag">Before</span>
                </div>
              )}
              <div className="cb-photo-cell">
                <img src={photo.url} alt={previous ? "Your reshoot" : "The photo being judged"} />
                {previous && <span className="cb-tag">After</span>}
                {crop && (
                  <div className="cb-crop-overlay">
                    <div className="cb-crop-mask cb-crop-top" style={{ height: `${crop.top * 100}%` }} />
                    <div className="cb-crop-mask cb-crop-bottom" style={{ height: `${crop.bottom * 100}%` }} />
                    <div className="cb-crop-mask cb-crop-left" style={{ top: `${crop.top * 100}%`, bottom: `${crop.bottom * 100}%`, width: `${crop.left * 100}%` }} />
                    <div className="cb-crop-mask cb-crop-right" style={{ top: `${crop.top * 100}%`, bottom: `${crop.bottom * 100}%`, width: `${crop.right * 100}%` }} />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className={`cb-drop${dragging ? " is-over" : ""}`}>
              <div className="cb-drop-btns">
                <button
                  type="button"
                  className="cb-drop-camera"
                  onClick={() => cameraRef.current?.click()}
                >
                  <Camera size={28} aria-hidden="true" />
                  <span>Take photo</span>
                </button>
                <button
                  type="button"
                  className="cb-drop-camera"
                  onClick={() => galleryRef.current?.click()}
                >
                  <ImagePlus size={28} aria-hidden="true" />
                  <span>Choose photo</span>
                </button>
              </div>
            </div>
          )}
        </div>
        {isTrophy && photo && <TrophyBase grade={grade} />}
      </div>

      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: "none" }}
        onChange={handleCamera}
      />
      <input
        ref={galleryRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleGallery}
      />
    </>
  );
});

export default ImagePicker;
