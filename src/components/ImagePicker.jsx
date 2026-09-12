import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { ImagePlus, Camera } from "lucide-react";
import Dolly from "./Dolly";

const ImagePicker = forwardRef(function ImagePicker({ photo, previous, onFile }, ref) {
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

  return (
    <>
      <div className="cb-photo-wrap">
        <Dolly className="cb-peek" />
        <div
          className="cb-photo"
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
                onClick={() => cameraRef.current?.click()}
                aria-label="Take a photo"
              >
                <Camera size={28} aria-hidden="true" />
              </button>
              <strong>Take a photo</strong>
              <button
                type="button"
                className="cb-drop-link"
                onClick={() => galleryRef.current?.click()}
              >
                or choose from library
              </button>
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
