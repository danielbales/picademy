function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapText(ctx, text, x, y, maxW, lineH) {
  const words = text.split(" ");
  let line = "";
  let curY = y;
  const lines = [];
  for (const word of words) {
    const test = line + (line ? " " : "") + word;
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  // Cap at 3 lines so the card never gets too tall with long roasts
  const shown = lines.slice(0, 3);
  if (lines.length > 3) {
    shown[2] = shown[2].replace(/\s+\S*$/, "…");
  }
  for (const l of shown) {
    ctx.fillText(l, x, curY);
    curY += lineH;
  }
  return shown.length;
}

/**
 * Pick the most shareable roast according to priority:
 * Reef > Blitz > Gramps > Host summary > any other guest > first available core judge
 * Never feature Mom or Professor as the main share line.
 */
export function pickFeaturedRoast(result, guest) {
  if (!result) return { roast: "", criticName: "" };

  const candidates = [];

  // Guest judges (highest priority when they are the savage ones)
  if (result.guest?.roast && guest) {
    const id = guest.id;
    if (id === "reef") candidates.push({ roast: result.guest.roast, criticName: guest.name, priority: 1 });
    else if (id === "blitz") candidates.push({ roast: result.guest.roast, criticName: guest.name, priority: 2 });
    else if (id === "gramps") candidates.push({ roast: result.guest.roast, criticName: guest.name, priority: 3 });
    else if (id !== "mom" && id !== "professor") {
      candidates.push({ roast: result.guest.roast, criticName: guest.name, priority: 5 });
    }
  }

  // Host one-liner (often punchy)
  if (result.host && typeof result.host === "string" && result.host.length > 12) {
    candidates.push({ roast: result.host, criticName: "Lida", priority: 4 });
  }

  // Fallback to core judges if needed (prefer the ones with actual roasts)
  for (const id of ["kai", "harper", "curren"]) {
    const r = result[id];
    if (r?.roast) {
      const name = id === "kai" ? "Kai" : id === "harper" ? "Harper" : "Curren";
      candidates.push({ roast: r.roast, criticName: name, priority: 6 });
    }
  }

  if (!candidates.length) {
    return { roast: "The judges have spoken.", criticName: "Picademy" };
  }

  candidates.sort((a, b) => a.priority - b.priority);
  const best = candidates[0];

  // Soft length cap for shareability (~110 chars)
  let roast = best.roast.trim();
  if (roast.length > 110) {
    roast = roast.slice(0, 107).replace(/\s+\S*$/, "") + "…";
  }

  return { roast, criticName: best.criticName };
}

export async function generateShareCard({ photoUrl, score, grade, roast, criticName }) {
  const W = 1080;
  const H = 1350;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d");
  const pad = 48;

  // Background
  ctx.fillStyle = "#0A0B0D";
  ctx.fillRect(0, 0, W, H);

  // Photo
  const img = await loadImage(photoUrl);
  const photoW = W - pad * 2;
  const photoH = 640;
  ctx.save();
  roundRect(ctx, pad, pad, photoW, photoH, 24);
  ctx.clip();
  const scale = Math.max(photoW / img.width, photoH / img.height);
  const sw = photoW / scale;
  const sh = photoH / scale;
  const sx = (img.width - sw) / 2;
  const sy = (img.height - sh) / 2;
  ctx.drawImage(img, sx, sy, sw, sh, pad, pad, photoW, photoH);
  ctx.restore();

  // Grade accent color
  const g = grade[0];
  const accent =
    g === "A" ? "#E8C84A" : g === "B" ? "#C0C0C0" : g === "C" ? "#B87333" : "#6B7280";
  const tierLabel =
    g === "A" ? "GOLD" : g === "B" ? "SILVER" : g === "C" ? "BRONZE" : "";

  // Thin accent bar under photo
  ctx.fillStyle = accent;
  ctx.fillRect(pad, photoH + pad + 20, photoW, 4);

  // Score block
  const scoreY = photoH + pad + 120;
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "center";

  // Big score
  ctx.font = "600 92px Inter, system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "#F5F5F7";
  const scoreStr = score.toFixed(1);
  ctx.fillText(scoreStr, W / 2 - 40, scoreY);

  // / 10
  ctx.font = "400 36px Inter, system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "#6B7280";
  ctx.fillText("/ 10", W / 2 + 70, scoreY);

  // Grade badge
  ctx.font = "700 48px Inter, system-ui, -apple-system, sans-serif";
  ctx.fillStyle = accent;
  ctx.fillText(grade.replace("-", "\u2212"), W / 2, scoreY + 70);

  if (tierLabel) {
    ctx.font = "600 20px Inter, system-ui, -apple-system, sans-serif";
    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.85;
    ctx.fillText(tierLabel, W / 2, scoreY + 100);
    ctx.globalAlpha = 1;
  }

  // Roast
  const roastStartY = scoreY + 160;
  ctx.textAlign = "left";
  ctx.font = "italic 32px Inter, system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "#D4D8DE";
  const lines = wrapText(ctx, `\u201C${roast}\u201D`, pad + 12, roastStartY, W - pad * 2 - 24, 46);

  // Attribution
  ctx.font = "500 26px Inter, system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "#8A919E";
  ctx.fillText(`— ${criticName}`, pad + 12, roastStartY + lines * 46 + 16);

  // Branding
  ctx.textAlign = "center";
  ctx.font = "700 28px Inter, system-ui, -apple-system, sans-serif";
  ctx.fillStyle = accent;
  ctx.fillText("PICADEMY", W / 2, H - pad - 8);

  ctx.font = "400 20px Inter, system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "#6B7280";
  ctx.fillText("picademy.app", W / 2, H - 20);

  return new Promise((resolve) => c.toBlob(resolve, "image/jpeg", 0.92));
}

export async function shareResult(opts) {
  const blob = await generateShareCard(opts);
  const file = new File([blob], "picademy-score.jpg", { type: "image/jpeg" });

  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        text: `My photo scored ${opts.score.toFixed(1)}/10 on Picademy`,
      });
      return "shared";
    } catch (e) {
      if (e.name === "AbortError") return "cancelled";
    }
  }

  // Fallback: download
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "picademy-score.jpg";
  a.click();
  URL.revokeObjectURL(url);
  return "downloaded";
}
