import { getTurnstileToken } from "./turnstile";

const API_URL = "https://crit-api.dbales1210.workers.dev/grade";

function getDeviceId() {
  const key = "picademy-device-id";
  let id = localStorage.getItem(key);
  if (!id || !/^[A-Za-z0-9-]{16,64}$/.test(id)) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

function detectPlatform() {
  const ua = navigator.userAgent || "";
  if (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "desktop";
}

export async function grade(photo, temper, previous, guestId, covered) {
  const body = {
    photo: { mediaType: photo.mediaType, base64: photo.base64 },
    temper,
    guestId,
    covered,
    platform: detectPlatform(),
  };
  if (previous) {
    body.previous = {
      photo: { mediaType: previous.photo.mediaType, base64: previous.photo.base64 },
      result: previous.result,
    };
  }

  const headers = {
    "Content-Type": "application/json",
    "x-device-id": getDeviceId(),
  };

  // Prefer Turnstile token when available, fall back to static app token
  const tsToken = await getTurnstileToken();
  if (tsToken) {
    headers["x-turnstile-token"] = tsToken;
  } else {
    headers["x-app-token"] = import.meta.env.VITE_APP_TOKEN;
  }

  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (res.status === 429) {
    const err = new Error("rate-limit");
    err.isRateLimit = true;
    throw err;
  }
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }
  return res.json();
}
