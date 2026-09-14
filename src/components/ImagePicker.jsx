import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { ImagePlus, Camera } from "lucide-react";

function trophyTier(grade) {
  if (!grade) return "";
  const g = grade[0];
  if (g === "A") return " trophy-gold";
  if (g === "B") return " trophy-silver";
  if (g === "C") return " trophy-bronze";
  return " trophy-basic";
}

const TROPHY_COLORS = {
  gold:   { main: "#E8C84A", light: "#F5E078", dark: "#B8960F", darker: "#8A6E08", glow: "rgba(232,200,74,.3)" },
  silver: { main: "#C0C0C0", light: "#E0E0E0", dark: "#8E8E8E", darker: "#686868", glow: "rgba(192,192,192,.25)" },
  bronze: { main: "#B87333", light: "#D4935A", dark: "#8B5A2B", darker: "#6A3E15", glow: "rgba(184,115,51,.25)" },
  basic:  { main: "#4A4D54", light: "#6A6D74", dark: "#3A3D44", darker: "#2A2D33", glow: "rgba(74,77,84,.15)" },
};

function TrophyBase({ grade }) {
  if (!grade) return null;
  const g = grade[0];
  const tier = g === "A" ? "gold" : g === "B" ? "silver" : g === "C" ? "bronze" : "basic";
  const c = TROPHY_COLORS[tier];
  const label = tier === "basic" ? "" : tier.charAt(0).toUpperCase() + tier.slice(1);

  return (
    <svg className="cb-trophy-base" viewBox="0 0 200 58" aria-hidden="true">
      <defs>
        <linearGradient id={`tr-${tier}-body`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={c.dark} />
          <stop offset="35%" stopColor={c.light} />
          <stop offset="65%" stopColor={c.light} />
          <stop offset="100%" stopColor={c.dark} />
        </linearGradient>
        <linearGradient id={`tr-${tier}-stem`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={c.darker} />
          <stop offset="50%" stopColor={c.main} />
          <stop offset="100%" stopColor={c.darker} />
        </linearGradient>
        <linearGradient id={`tr-${tier}-base`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.light} />
          <stop offset="100%" stopColor={c.darker} />
        </linearGradient>
      </defs>

      {/* Handles - left */}
      <path
        d="M30 2 Q8 2 6 14 Q4 24 20 22"
        fill="none" stroke={`url(#tr-${tier}-body)`} strokeWidth="4" strokeLinecap="round"
      />
      {/* Handles - right */}
      <path
        d="M170 2 Q192 2 194 14 Q196 24 180 22"
        fill="none" stroke={`url(#tr-${tier}-body)`} strokeWidth="4" strokeLinecap="round"
      />

      {/* Cup bottom curve connecting to stem */}
      <path
        d={`M30 0 Q30 14 100 18 Q170 14 170 0`}
        fill={`url(#tr-${tier}-body)`}
      />

      {/* Stem */}
      <rect x="88" y="16" width="24" height="16" rx="2" fill={`url(#tr-${tier}-stem)`} />

      {/* Pedestal flare */}
      <path
        d="M80 32 L120 32 L128 38 L72 38 Z"
        fill={`url(#tr-${tier}-stem)`}
      />

      {/* Base */}
      <rect x="62" y="38" width="76" height="12" rx="3" fill={`url(#tr-${tier}-base)`} />

      {/* Base highlight */}
      <rect x="72" y="39" width="56" height="3" rx="1.5" fill={c.light} opacity="0.3" />

      {/* Tier label on base */}
      {label && (
        <text x="100" y="49" textAnchor="middle" fill={c.darker} fontSize="7" fontWeight="700" fontFamily="inherit" opacity="0.7">
          {label.toUpperCase()}
        </text>
      )}

      {/* Subtle glow under trophy */}
      <ellipse cx="100" cy="54" rx="50" ry="4" fill={c.glow} />
    </svg>
  );
}

const ImagePicker = forwardRef(function ImagePicker({ photo, previous, onFile, grade, status }, ref) {
  const [dragging, setDragging] = useState(false);
  const cameraRef = useRef(null);
  const galleryRef = useRef(null);
  const pickModeRef = useRef("new");

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

  function handleChange(e) {
    const file = e.target.files?.[0];
    if (file) onFile(file, pickModeRef.current);
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
            onFile(e.dataTransfer.files?.[0], "new");
          }}
        >
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
              </div>
            </div>
          ) : (
            <div className={`cb-drop${dragging ? " is-over" : ""}`}>
              <div className="cb-drop-btns">
                <button
                  type="button"
                  className="cb-drop-camera"
                  onClick={() => cameraRef.current?.click()}
                  aria-label="Take a photo"
                >
                  <Camera size={28} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="cb-drop-camera"
                  onClick={() => galleryRef.current?.click()}
                  aria-label="Upload a photo"
                >
                  <ImagePlus size={28} aria-hidden="true" />
                </button>
              </div>
              <strong>Take or upload a photo</strong>
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
        onChange={handleChange}
      />
      <input
        ref={galleryRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleChange}
      />
    </>
  );
});

export default ImagePicker;
