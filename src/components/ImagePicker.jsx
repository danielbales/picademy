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
          <svg className="cb-wire" viewBox="0 0 40 20" fill="none" aria-hidden="true">
            <path d="M20 0 L20 4" stroke="#8A919E" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 20 L20 6 L32 20" stroke="#8A919E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
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
              <button
                type="button"
                className="cb-drop-camera"
                onClick={() => galleryRef.current?.click()}
                aria-label="Upload a photo"
              >
                <ImagePlus size={28} aria-hidden="true" />
              </button>
              <strong>Upload a photo</strong>
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
