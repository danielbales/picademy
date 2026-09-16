const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

let _token = null;
let _waiting = null;
let _widgetId = null;

function onToken(token) {
  _token = token;
  if (_waiting) {
    _waiting(token);
    _waiting = null;
  }
}

export function renderTurnstile(containerId) {
  if (!window.turnstile || !SITE_KEY) return;
  _widgetId = window.turnstile.render(containerId, {
    sitekey: SITE_KEY,
    appearance: "interaction-only",
    callback: onToken,
    "expired-callback": () => { _token = null; },
    "error-callback": () => { _token = null; },
  });
}

export function getTurnstileToken() {
  if (!SITE_KEY) return Promise.resolve(null);
  if (_token) {
    const t = _token;
    _token = null;
    if (_widgetId != null && window.turnstile) window.turnstile.reset(_widgetId);
    return Promise.resolve(t);
  }
  return new Promise((resolve) => {
    _waiting = resolve;
    if (_widgetId != null && window.turnstile) window.turnstile.reset(_widgetId);
  });
}
