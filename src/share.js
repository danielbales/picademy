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
  const shown = lines.slice(0, 3);
  if (lines.length > 3) {
    shown[2] = shown[2].replace(/\s+\S*$/, "") + "\u2026";
  }
  let curY = y;
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

  if (result.guest?.roast && guest) {
    const id = guest.id;
    if (id === "reef") candidates.push({ roast: result.guest.roast, criticName: guest.name, focus: guest.focus, priority: 1 });
    else if (id === "blitz") candidates.push({ roast: result.guest.roast, criticName: guest.name, focus: guest.focus, priority: 2 });
    else if (id === "gramps") candidates.push({ roast: result.guest.roast, criticName: guest.name, focus: guest.focus, priority: 3 });
    else if (id !== "mom" && id !== "professor") {
      candidates.push({ roast: result.guest.roast, criticName: guest.name, focus: guest.focus, priority: 5 });
    }
  }

  if (result.host && typeof result.host === "string" && result.host.length > 12) {
    candidates.push({ roast: result.host, criticName: "Lida", focus: "Host", priority: 4 });
  }

  for (const id of ["kai", "harper", "curren"]) {
    const r = result[id];
    if (r?.roast) {
      const name = id === "kai" ? "Greyson" : id === "harper" ? "Harper" : "Curren";
      candidates.push({ roast: r.roast, criticName: name, focus: CRITIC_FOCUS[id], priority: 6 });
    }
  }

  if (!candidates.length) {
    return { roast: "The judges have spoken.", criticName: "Aperture", focus: "" };
  }

  candidates.sort((a, b) => a.priority - b.priority);
  const best = candidates[0];

  let roast = best.roast.trim();
  if (roast.length > 110) {
    roast = roast.slice(0, 107).replace(/\s+\S*$/, "") + "\u2026";
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
  const pad = 40;

  const accent =
    grade === "Gold" ? "#E8C84A" : grade === "Silver" ? "#C0C0C0" : grade === "Bronze" ? "#B87333" : "#6B7280";

  // --- Background ---
  ctx.fillStyle = "#0A0B0D";
  ctx.fillRect(0, 0, W, H);

  // Subtle radial glow behind the score area
  const glow = ctx.createRadialGradient(W / 2, 700, 40, W / 2, 700, 500);
  glow.addColorStop(0, hexA(accent, 0.08));
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 200, W, 800);

  // --- Photo (large, with rounded corners and shadow) ---
  const img = await loadImage(photoUrl);
  const photoX = pad;
  const photoY = pad;
  const photoW = W - pad * 2;
  const photoH = 680;

  // Shadow
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.6)";
  ctx.shadowBlur = 48;
  ctx.shadowOffsetY = 12;
  roundRect(ctx, photoX, photoY, photoW, photoH, 28);
  ctx.fillStyle = "#000";
  ctx.fill();
  ctx.restore();

  // Photo fill
  ctx.save();
  roundRect(ctx, photoX, photoY, photoW, photoH, 28);
  ctx.clip();
  const scale = Math.max(photoW / img.width, photoH / img.height);
  const sw = photoW / scale;
  const sh = photoH / scale;
  const sx = (img.width - sw) / 2;
  const sy = (img.height - sh) / 2;
  ctx.drawImage(img, sx, sy, sw, sh, photoX, photoY, photoW, photoH);

  // Gradient overlay at bottom of photo for score readability
  const photoGrad = ctx.createLinearGradient(0, photoY + photoH - 200, 0, photoY + photoH);
  photoGrad.addColorStop(0, "rgba(10,11,13,0)");
  photoGrad.addColorStop(1, "rgba(10,11,13,0.85)");
  ctx.fillStyle = photoGrad;
  ctx.fillRect(photoX, photoY + photoH - 200, photoW, 200);
  ctx.restore();

  // Thin accent border on photo
  ctx.save();
  roundRect(ctx, photoX, photoY, photoW, photoH, 28);
  ctx.strokeStyle = hexA(accent, 0.25);
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();

  // --- Score overlaid at bottom of photo ---
  const scoreBaseY = photoY + photoH - 28;
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";

  // Big score
  ctx.font = "700 96px Inter, system-ui, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  const scoreStr = score.toFixed(1);
  const sm = ctx.measureText(scoreStr);
  ctx.fillText(scoreStr, photoX + 28, scoreBaseY);

  // /10
  ctx.font = "400 36px Inter, system-ui, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.fillText("/ 10", photoX + 28 + sm.width + 8, scoreBaseY);

  // Grade pill (right side, overlaid on photo)
  ctx.font = "700 32px Inter, system-ui, sans-serif";
  const gm = ctx.measureText(grade);
  const pillPad = 18;
  const pillW = gm.width + pillPad * 2;
  const pillH = 48;
  const pillX = photoX + photoW - 28 - pillW;
  const pillY = scoreBaseY - 38;

  ctx.save();
  roundRect(ctx, pillX, pillY, pillW, pillH, 12);
  ctx.fillStyle = hexA(accent, 0.18);
  ctx.fill();
  ctx.strokeStyle = hexA(accent, 0.4);
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();

  ctx.font = "700 32px Inter, system-ui, sans-serif";
  ctx.fillStyle = accent;
  ctx.textAlign = "left";
  ctx.fillText(grade, pillX + pillPad, scoreBaseY - 6);

  // --- Skill bars (horizontal row under photo) ---
  if (skills) {
    const barTop = photoY + photoH + 36;
    const skillInfo = [
      { key: "light", label: "Light", color: "#F4B740" },
      { key: "composition", label: "Comp", color: "#578BFA" },
      { key: "technical", label: "Focus", color: "#3CC8C8" },
      { key: "editing", label: "Edit", color: "#A78BFA" },
    ];
    const gap = 16;
    const barW = (W - pad * 2 - gap * 3) / 4;

    for (let i = 0; i < 4; i++) {
      const { key, label, color } = skillInfo[i];
      const bx = pad + i * (barW + gap);

      // Score number
      ctx.textAlign = "center";
      ctx.font = "700 28px Inter, system-ui, sans-serif";
      ctx.fillStyle = color;
      ctx.fillText(skills[key].toFixed(1), bx + barW / 2, barTop);

      // Label
      ctx.font = "500 16px Inter, system-ui, sans-serif";
      ctx.fillStyle = "#6B7280";
      ctx.fillText(label, bx + barW / 2, barTop + 22);

      // Bar track
      const trackY = barTop + 32;
      const trackH = 6;
      roundRect(ctx, bx, trackY, barW, trackH, 3);
      ctx.fillStyle = "#1E2025";
      ctx.fill();

      // Bar fill
      const fillW = Math.max(4, (skills[key] / 10) * barW);
      ctx.save();
      ctx.shadowColor = hexA(color, 0.4);
      ctx.shadowBlur = 10;
      roundRect(ctx, bx, trackY, fillW, trackH, 3);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    }
  }

  // --- Roast section ---
  const roastTop = photoY + photoH + 120;

  // Decorative accent line
  const lineGrad = ctx.createLinearGradient(pad, 0, W - pad, 0);
  lineGrad.addColorStop(0, "transparent");
  lineGrad.addColorStop(0.15, hexA(accent, 0.3));
  lineGrad.addColorStop(0.85, hexA(accent, 0.3));
  lineGrad.addColorStop(1, "transparent");
  ctx.fillStyle = lineGrad;
  ctx.fillRect(pad, roastTop - 16, W - pad * 2, 1.5);

  // Big decorative quote mark
  ctx.textAlign = "left";
  ctx.font = "700 80px Georgia, 'Times New Roman', serif";
  ctx.fillStyle = hexA(accent, 0.15);
  ctx.fillText("\u201C", pad - 6, roastTop + 40);

  // Roast text
  ctx.font = "italic 30px Inter, system-ui, sans-serif";
  ctx.fillStyle = "#D4D8DE";
  const lines = wrapText(ctx, roast, pad + 16, roastTop + 32, W - pad * 2 - 32, 44);

  // Attribution
  const attrY = roastTop + 32 + lines * 44 + 20;
  ctx.font = "600 24px Inter, system-ui, sans-serif";
  ctx.fillStyle = accent;
  const nameStr = `\u2014 ${criticName}`;
  ctx.fillText(nameStr, pad + 16, attrY);
  if (focus) {
    const nameW = ctx.measureText(nameStr).width;
    ctx.font = "500 20px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#6B7280";
    ctx.fillText(`\u00B7  ${focus}`, pad + 16 + nameW + 12, attrY);
  }

  // --- Footer ---
  const footerY = H - pad - 16;

  // Accent line
  const footLine = ctx.createLinearGradient(W / 2 - 60, 0, W / 2 + 60, 0);
  footLine.addColorStop(0, "transparent");
  footLine.addColorStop(0.3, hexA(accent, 0.4));
  footLine.addColorStop(0.7, hexA(accent, 0.4));
  footLine.addColorStop(1, "transparent");
  ctx.fillStyle = footLine;
  ctx.fillRect(W / 2 - 60, footerY - 48, 120, 1.5);

  ctx.textAlign = "center";
  ctx.font = "700 36px 'Inter Tight', Inter, system-ui, sans-serif";
  ctx.fillStyle = hexA(accent, 0.85);
  ctx.fillText("APERTURE", W / 2, footerY - 12);

  ctx.font = "400 18px Inter, system-ui, sans-serif";
  ctx.fillStyle = "#4A4D54";
  ctx.fillText("How good are your photos?", W / 2, footerY + 14);

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

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "aperture-score.jpg";
  a.click();
  URL.revokeObjectURL(url);
  return "downloaded";
}
