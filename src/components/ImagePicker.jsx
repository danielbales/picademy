import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { ImagePlus, Camera } from "lucide-react";

function frameTier(grade) {
  if (!grade) return "";
  const g = grade[0];
  if (g === "A") return " frame-gold";
  if (g === "B") return " frame-silver";
  if (g === "C") return " frame-bronze";
  return " frame-basic";
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

  const isHung = status === "judging" || status === "done";

  return (
    <>
      <div className="cb-photo-wrap">
        {isHung && photo && (
          <svg className="cb-wire" viewBox="0 0 80 44" fill="none" aria-hidden="true">
            {/* nail */}
            <circle cx="40" cy="6" r="4" fill="#6B7280" />
            <circle cx="40" cy="6" r="2.2" fill="#9CA3AF" />
            <rect x="39" y="8" width="2" height="6" rx="1" fill="#6B7280" />
            {/* strings */}
            <line x1="40" y1="14" x2="12" y2="44" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="40" y1="14" x2="68" y2="44" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
        <div
          className={`cb-photo${frameTier(grade)}${isHung ? " is-hung" : ""}`}
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
