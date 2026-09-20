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
  if (!result) return { roast: "", criticName: "", focus: "" };

  const CRITIC_FOCUS = { curren: "Light", harper: "Composition", kai: "Focus & color" };
  const candidates = [];

  // Guest judges (highest priority when they are the savage ones)
  if (result.guest?.roast && guest) {
    const id = guest.id;
    if (id === "reef") candidates.push({ roast: result.guest.roast, criticName: guest.name, focus: guest.focus, priority: 1 });
    else if (id === "blitz") candidates.push({ roast: result.guest.roast, criticName: guest.name, focus: guest.focus, priority: 2 });
    else if (id === "gramps") candidates.push({ roast: result.guest.roast, criticName: guest.name, focus: guest.focus, priority: 3 });
    else if (id !== "mom" && id !== "professor") {
      candidates.push({ roast: result.guest.roast, criticName: guest.name, focus: guest.focus, priority: 5 });
    }
  }

  // Host one-liner (often punchy)
  if (result.host && typeof result.host === "string" && result.host.length > 12) {
    candidates.push({ roast: result.host, criticName: "Lida", focus: "Host", priority: 4 });
  }

  // Fallback to core judges if needed (prefer the ones with actual roasts)
  for (const id of ["kai", "harper", "curren"]) {
    const r = result[id];
    if (r?.roast) {
      const name = id === "kai" ? "Kai" : id === "harper" ? "Harper" : "Curren";
      candidates.push({ roast: r.roast, criticName: name, focus: CRITIC_FOCUS[id], priority: 6 });
    }
  }

  if (!candidates.length) {
    return { roast: "The judges have spoken.", criticName: "Aperture", focus: "" };
  }

  candidates.sort((a, b) => a.priority - b.priority);
  const best = candidates[0];

  // Soft length cap for shareability (~110 chars)
  let roast = best.roast.trim();
  if (roast.length > 110) {
    roast = roast.slice(0, 107).replace(/\s+\S*$/, "") + "…";
  }

  return { roast, criticName: best.criticName, focus: best.focus || "" };
}

function hexA(hex, a) {
  return `rgba(${parseInt(hex.slice(1, 3), 16)},${parseInt(hex.slice(3, 5), 16)},${parseInt(hex.slice(5, 7), 16)},${a})`;
}

export async function generateShareCard({ photoUrl, score, grade, roast, criticName, focus, skills }) {
  const W = 1080;
  const H = 1350;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d");
  const pad = 48;

  const accent =
    grade === "Gold" ? "#E8C84A" : grade === "Silver" ? "#C0C0C0" : grade === "Bronze" ? "#B87333" : "#6B7280";

  // Background with soft radial glow
  ctx.fillStyle = "#0A0B0D";
  ctx.fillRect(0, 0, W, H);
  const glow = ctx.createRadialGradient(W / 2, 740, 60, W / 2, 740, 480);
  glow.addColorStop(0, hexA(accent, 0.1));
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 300, W, 900);

  // Photo with drop shadow
  const img = await loadImage(photoUrl);
  const photoW = W - pad * 2;
  const photoH = 620;
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.5)";
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 8;
  roundRect(ctx, pad, pad, photoW, photoH, 24);
  ctx.fillStyle = "#000";
  ctx.fill();
  ctx.restore();

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

  // Gradient accent line under photo
  const lineGrad = ctx.createLinearGradient(pad + 60, 0, W - pad - 60, 0);
  lineGrad.addColorStop(0, "transparent");
  lineGrad.addColorStop(0.3, accent);
  lineGrad.addColorStop(0.7, accent);
  lineGrad.addColorStop(1, "transparent");
  ctx.fillStyle = lineGrad;
  ctx.fillRect(pad, pad + photoH + 16, photoW, 3);

  // Score (left) + Grade pill (right)
  const scoreY = pad + photoH + 100;
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";

  // Context label so viewers understand the card
  ctx.font = "600 20px Inter, system-ui, sans-serif";
  ctx.fillStyle = "#6B7280";
  ctx.fillText("JUDGES' REVIEW", pad + 12, scoreY - 32);

  ctx.font = "600 88px Inter, system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "#F5F5F7";
  const scoreStr = score.toFixed(1);
  const sm = ctx.measureText(scoreStr);
  ctx.fillText(scoreStr, pad + 12, scoreY);

  ctx.font = "400 34px Inter, system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "#6B7280";
  ctx.fillText("/ 10", pad + 12 + sm.width + 10, scoreY);

  // Grade pill with glow
  ctx.font = "700 36px Inter, system-ui, -apple-system, sans-serif";
  const gm = ctx.measureText(grade);
  const pillPad = 20;
  const pillW = gm.width + pillPad * 2;
  const pillH = 52;
  const pillX = W - pad - 12 - pillW;
  const pillY = scoreY - 42;

  ctx.save();
  ctx.shadowColor = hexA(accent, 0.2);
  ctx.shadowBlur = 24;
  roundRect(ctx, pillX, pillY, pillW, pillH, 14);
  ctx.fillStyle = hexA(accent, 0.12);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = hexA(accent, 0.3);
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();

  ctx.textAlign = "left";
  ctx.font = "700 36px Inter, system-ui, -apple-system, sans-serif";
  ctx.fillStyle = accent;
  ctx.fillText(grade, pillX + pillPad, scoreY - 6);

  // Skill bars (2x2 grid)
  if (skills) {
    const barTop = scoreY + 48;
    const skillInfo = [
      { key: "composition", label: "Composition", color: "#578BFA" },
      { key: "light", label: "Light", color: "#F4B740" },
      { key: "technical", label: "Focus", color: "#3CC8C8" },
      { key: "editing", label: "Editing", color: "#A78BFA" },
    ];
    const colW = (W - pad * 2 - 48) / 2;
    const rowGap = 48;

    for (let i = 0; i < 4; i++) {
      const { key, label, color } = skillInfo[i];
      const col = i % 2;
      const row = Math.floor(i / 2);
      const bx = pad + 12 + col * (colW + 48);
      const by = barTop + row * rowGap;

      ctx.textAlign = "left";
      ctx.font = "500 18px Inter, system-ui, sans-serif";
      ctx.fillStyle = "#8A919E";
      ctx.fillText(label, bx, by);

      ctx.textAlign = "right";
      ctx.font = "600 18px Inter, system-ui, sans-serif";
      ctx.fillStyle = "#D4D8DE";
      ctx.fillText(skills[key].toFixed(1), bx + colW, by);

      const barY = by + 10;
      const barH = 8;
      roundRect(ctx, bx, barY, colW, barH, 4);
      ctx.fillStyle = "#1E2025";
      ctx.fill();

      const fillW = Math.max(6, (skills[key] / 10) * colW);
      ctx.save();
      ctx.shadowColor = hexA(color, 0.3);
      ctx.shadowBlur = 8;
      roundRect(ctx, bx, barY, fillW, barH, 4);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    }
  }

  // Faded divider
  const divY = scoreY + 168;
  const divGrad = ctx.createLinearGradient(pad, 0, W - pad, 0);
  divGrad.addColorStop(0, "transparent");
  divGrad.addColorStop(0.15, "#2A2D33");
  divGrad.addColorStop(0.85, "#2A2D33");
  divGrad.addColorStop(1, "transparent");
  ctx.fillStyle = divGrad;
  ctx.fillRect(pad, divY, W - pad * 2, 1);

  // Roast with decorative quote mark
  const roastY = divY + 48;
  ctx.textAlign = "left";
  ctx.font = "700 72px Georgia, 'Times New Roman', serif";
  ctx.fillStyle = hexA(accent, 0.2);
  ctx.fillText("\u201C", pad - 4, roastY + 10);

  ctx.font = "italic 32px Inter, system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "#D4D8DE";
  const lines = wrapText(ctx, roast, pad + 12, roastY, W - pad * 2 - 24, 48);

  // Attribution with focus
  const attrY = roastY + lines * 48 + 24;
  ctx.font = "600 26px Inter, system-ui, -apple-system, sans-serif";
  ctx.fillStyle = accent;
  const nameStr = `\u2014 ${criticName}`;
  ctx.fillText(nameStr, pad + 12, attrY);
  if (focus) {
    const nameW = ctx.measureText(nameStr).width;
    ctx.font = "500 22px Inter, system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "#6B7280";
    ctx.fillText(`\u00B7  ${focus}`, pad + 12 + nameW + 14, attrY);
  }

  // Footer
  ctx.textAlign = "center";
  ctx.fillStyle = hexA(accent, 0.3);
  ctx.fillRect(W / 2 - 50, H - pad - 72, 100, 2);

  ctx.font = "700 40px 'Inter Tight', Inter, system-ui, -apple-system, sans-serif";
  ctx.fillStyle = hexA(accent, 0.9);
  ctx.fillText("APERTURE", W / 2, H - pad - 24);

  ctx.font = "400 20px Inter, system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "#6B7280";
  ctx.fillText("aperture.app", W / 2, H - pad + 8);

  return new Promise((resolve) => c.toBlob(resolve, "image/jpeg", 0.92));
}

export async function shareResult(opts) {
  const blob = await generateShareCard(opts);
  const file = new File([blob], "aperture-score.jpg", { type: "image/jpeg" });

  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        text: `My photo scored ${opts.score.toFixed(1)}/10 on Aperture`,
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
  a.download = "aperture-score.jpg";
  a.click();
  URL.revokeObjectURL(url);
  return "downloaded";
}
