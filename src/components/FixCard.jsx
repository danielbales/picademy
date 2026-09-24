import { useState } from "react";
import { FUND_BY_ID } from "../data";
import { canAutoEdit, getEditLabel, applyEdit } from "../edits";

export default function FixCard({ fix, isHabit, photoUrl, crop }) {
  const f = FUND_BY_ID[fix.fundamental];
  const [editState, setEditState] = useState("idle"); // idle | working | done
  const [editedUrl, setEditedUrl] = useState(null);
  const showAutoEdit = !isHabit && photoUrl && canAutoEdit(fix.fundamental);

  async function handleAutoEdit() {
    if (editState !== "idle") return;
    setEditState("working");
    try {
      const url = await applyEdit(photoUrl, fix.fundamental, crop);
      if (url) {
        setEditedUrl(url);
        setEditState("done");
      } else {
        setEditState("idle");
      }
    } catch {
      setEditState("idle");
    }
  }

  function handleSave() {
    if (!editedUrl) return;
    const a = document.createElement("a");
    a.href = editedUrl;
    a.download = "aperture-edited.jpg";
    a.click();
  }

  return (
    <div className="cb-fix">
      {showAutoEdit && fix.postTip && (
        <div className="cb-post-tip">
          <p className="cb-fix-kicker">Fix this photo</p>
          <p className="cb-post-tip-body">{fix.postTip}</p>
          {editState === "idle" && (
            <button type="button" className="cb-auto-edit" onClick={handleAutoEdit}>
              {getEditLabel(fix.fundamental)}
            </button>
          )}
          {editState === "working" && <p className="cb-auto-edit-status">Applying edit...</p>}
          {editState === "done" && editedUrl && (
            <div className="cb-auto-edit-result">
              <img className="cb-auto-edit-preview" src={editedUrl} alt="Edited photo" />
              <button type="button" className="cb-auto-edit-save" onClick={handleSave}>
                Save edited photo
              </button>
            </div>
          )}
        </div>
      )}
      <div className="cb-fix-head">
        <div>
          <p className="cb-fix-kicker">{isHabit ? "Try this habit" : "Next time"}</p>
          <p className="cb-fix-name">{f ? f.name : "Next step"}</p>
        </div>
      </div>
      {fix.steps.length > 0 && (
        <ol className="cb-steps">
          <li>
            <span className="cb-step-num" aria-hidden="true">1</span>
            <span>{fix.steps[0]}</span>
          </li>
        </ol>
      )}
    </div>
  );
}
