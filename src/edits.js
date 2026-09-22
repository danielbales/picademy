// Client-side photo editing via Canvas API. Zero server cost.

const EDIT_MAP = {
  crop_it:              { op: "crop" },
  recover_highlights:   { op: "levels", highlights: -60 },
  lift_shadows:         { op: "levels", shadows: 55 },
  natural_color:        { op: "temperature", shift: -10 },
  light_touch_edits:    { op: "levels", brightness: 12, contrast: 12 },
  try_bw:               { op: "bw" },
  fix_perspective:      null,
  warmth_adjust:        { op: "temperature", shift: 18 },
  selective_edit:       null,
  dehaze:               { op: "levels", contrast: 30, shadows: 25 },
  saturation_restraint: { op: "saturation", amount: -30 },
};

// Every fundamental gets an auto-edit. Specific ones use their tailored op,
// everything else gets a gentle enhance (shadow lift + contrast + slight warmth).
const FALLBACK_EDIT = { op: "enhance" };

export function canAutoEdit() {
  return true;
}

export function getEditLabel(fundamentalId) {
  const e = EDIT_MAP[fundamentalId];
  if (!e) return "Auto-enhance";
  const labels = {
    crop: "Auto-crop",
    levels: "Auto-adjust",
    bw: "Convert to B&W",
    temperature: "Fix warmth",
    saturation: "Fix saturation",
    enhance: "Auto-enhance",
  };
  return labels[e.op] || "Auto-enhance";
}

export async function applyEdit(photoUrl, fundamentalId, crop) {
  const edit = EDIT_MAP[fundamentalId] || FALLBACK_EDIT;

  const img = await loadImg(photoUrl);
  const c = document.createElement("canvas");
  const ctx = c.getContext("2d");

  if (edit.op === "crop" && crop) {
    const sx = Math.round(img.width * (crop.left || 0));
    const sy = Math.round(img.height * (crop.top || 0));
    const sw = Math.round(img.width * (1 - (crop.left || 0) - (crop.right || 0)));
    const sh = Math.round(img.height * (1 - (crop.top || 0) - (crop.bottom || 0)));
    c.width = sw;
    c.height = sh;
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
    return c.toDataURL("image/jpeg", 0.92);
  }

  c.width = img.width;
  c.height = img.height;
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, c.width, c.height);
  const d = imageData.data;

  if (edit.op === "bw") {
    for (let i = 0; i < d.length; i += 4) {
      const gray = d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114;
      d[i] = d[i + 1] = d[i + 2] = gray;
    }
  } else if (edit.op === "temperature") {
    const s = edit.shift || 0;
    for (let i = 0; i < d.length; i += 4) {
      d[i] = clamp(d[i] + s);         // R
      d[i + 2] = clamp(d[i + 2] - s); // B
    }
  } else if (edit.op === "saturation") {
    const amt = (edit.amount || 0) / 100;
    for (let i = 0; i < d.length; i += 4) {
      const gray = d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114;
      d[i] = clamp(gray + (d[i] - gray) * (1 + amt));
      d[i + 1] = clamp(gray + (d[i + 1] - gray) * (1 + amt));
      d[i + 2] = clamp(gray + (d[i + 2] - gray) * (1 + amt));
    }
  } else if (edit.op === "levels") {
    const br = (edit.brightness || 0) * 2.55;
    const con = (edit.contrast || 0) / 100;
    const shd = (edit.shadows || 0) / 100;
    const hil = (edit.highlights || 0) / 100;
    const factor = (1 + con);
    for (let i = 0; i < d.length; i += 4) {
      for (let ch = 0; ch < 3; ch++) {
        let v = d[i + ch];
        v += br;
        if (con) v = ((v / 255 - 0.5) * factor + 0.5) * 255;
        if (shd && v < 128) v += (128 - v) * shd;
        if (hil && v > 128) v += (128 - v) * (-hil);
        d[i + ch] = clamp(v);
      }
    }
  } else if (edit.op === "enhance") {
    // Gentle all-around enhancement: lift shadows, bump contrast, slight warmth
    for (let i = 0; i < d.length; i += 4) {
      for (let ch = 0; ch < 3; ch++) {
        let v = d[i + ch];
        // Lift shadows
        if (v < 128) v += (128 - v) * 0.2;
        // Gentle contrast
        v = ((v / 255 - 0.5) * 1.1 + 0.5) * 255;
        d[i + ch] = clamp(v);
      }
      // Slight warmth: nudge red up, blue down
      d[i] = clamp(d[i] + 5);
      d[i + 2] = clamp(d[i + 2] - 5);
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return c.toDataURL("image/jpeg", 0.92);
}

function clamp(v) {
  return v < 0 ? 0 : v > 255 ? 255 : Math.round(v);
}

function loadImg(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
