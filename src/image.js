const SUPPORTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const EXT_TYPES = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif" };
const MAX_RAW_BYTES = 3.5 * 1024 * 1024;

function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error || new Error("FileReader failed"));
    reader.readAsDataURL(file);
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Image element failed to decode"));
    img.src = src;
  });
}

async function decodeImage(file, dataUrl) {
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(file);
    } catch (e) {
      console.warn("createImageBitmap failed, trying data URL", e);
    }
  }
  return loadImage(dataUrl);
}

function guessType(file) {
  if (SUPPORTED_TYPES.includes(file.type)) return file.type;
  const ext = (file.name || "").split(".").pop().toLowerCase();
  return EXT_TYPES[ext] || file.type || "";
}

export async function prepareImage(file) {
  let dataUrl;
  try {
    dataUrl = await readAsDataURL(file);
  } catch (e) {
    console.error(e);
    throw new Error("That file couldn\u2019t be read. Try choosing it again.");
  }
  const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  try {
    const source = await decodeImage(file, dataUrl);
    const maxDim = 1024;
    const scale = Math.min(1, maxDim / Math.max(source.width, source.height));
    const w = Math.max(1, Math.round(source.width * scale));
    const h = Math.max(1, Math.round(source.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(source, 0, 0, w, h);
    if (typeof source.close === "function") source.close();
    const out = canvas.toDataURL("image/jpeg", 0.7);
    if (!out.startsWith("data:image/jpeg")) throw new Error("Canvas export failed");
    return { id, url: out, base64: out.split(",")[1], mediaType: "image/jpeg" };
  } catch (e) {
    console.warn("Resize failed, falling back to the original file", e);
  }
  const mediaType = guessType(file);
  if (!SUPPORTED_TYPES.includes(mediaType)) {
    throw new Error(`This file type (${file.type || "unknown"}) isn\u2019t supported. Choose a JPG, PNG, WebP, or GIF.`);
  }
  if (file.size > MAX_RAW_BYTES) {
    throw new Error("This photo is too large to send as-is. Try a smaller version or a screenshot of it.");
  }
  const base64 = dataUrl.split(",")[1];
  return { id, url: `data:${mediaType};base64,${base64}`, base64, mediaType };
}
