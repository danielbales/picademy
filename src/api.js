const API_URL = "https://crit-api.danielbales.workers.dev/grade";

function getDeviceId() {
  const key = "the-crit-device-id";
  let id = localStorage.getItem(key);
  if (!id || !/^[A-Za-z0-9-]{16,64}$/.test(id)) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

export async function grade(photo, temper, previous) {
  const body = {
    photo: { mediaType: photo.mediaType, base64: photo.base64 },
    temper,
  };
  if (previous) {
    body.previous = {
      photo: { mediaType: previous.photo.mediaType, base64: previous.photo.base64 },
      result: previous.result,
    };
  }

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-app-token": import.meta.env.VITE_APP_TOKEN,
      "x-device-id": getDeviceId(),
    },
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
