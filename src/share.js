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
  for (const word of words) {
    const test = line + (line ? " " : "") + word;
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line, x, curY);
      line = word;
      curY += lineH;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, curY);
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
  const photoH = 700;
  ctx.save();
  roundRect(ctx, pad, pad, photoW, photoH, 20);
  ctx.clip();
  const scale = Math.max(photoW / img.width, photoH / img.height);
  const sw = photoW / scale;
  const sh = photoH / scale;
  const sx = (img.width - sw) / 2;
  const sy = (img.height - sh) / 2;
  ctx.drawImage(img, sx, sy, sw, sh, pad, pad, photoW, photoH);
  ctx.restore();

  // Grade accent
  const g = grade[0];
  const accent =
    g === "A" ? "#E8C84A" : g === "B" ? "#C0C0C0" : g === "C" ? "#B87333" : "#6B7280";
  const tierLabel =
    g === "A" ? "GOLD" : g === "B" ? "SILVER" : g === "C" ? "BRONZE" : "";

  // Accent bar
  ctx.fillStyle = accent;
  ctx.fillRect(pad, photoH + pad + 16, photoW, 3);

  // Score
  const scoreY = photoH + pad + 110;
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";
  ctx.font = "bold 96px system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "#F5F5F7";
  const scoreStr = score.toFixed(1);
  const sm = ctx.measureText(scoreStr);
  const scoreX = W / 2 - (sm.width + 90) / 2;
  ctx.fillText(scoreStr, scoreX, scoreY);

  ctx.font = "400 40px system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "#6B7280";
  ctx.fillText("/ 10", scoreX + sm.width + 14, scoreY);

  // Grade badge
  ctx.textAlign = "center";
  ctx.fillStyle = accent;
  ctx.font = "bold 52px system-ui, -apple-system, sans-serif";
  ctx.fillText(grade.replace("-", "\u2212"), W / 2, scoreY + 76);

  if (tierLabel) {
    ctx.font = "600 22px system-ui, -apple-system, sans-serif";
    ctx.fillText(tierLabel, W / 2, scoreY + 108);
  }

  // Roast
  ctx.textAlign = "left";
  ctx.font = "italic 30px system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "#A1A1AA";
  wrapText(
    ctx,
    `"${roast}" - ${criticName}`,
    pad + 20,
    scoreY + 180,
    W - pad * 2 - 40,
    44
  );

  // Branding
  ctx.textAlign = "center";
  ctx.font = "700 34px system-ui, -apple-system, sans-serif";
  ctx.fillStyle = accent;
  ctx.fillText("PICADEMY", W / 2, H - pad - 12);

  return new Promise((resolve) => c.toBlob(resolve, "image/jpeg", 0.92));
}

export async function shareResult(opts) {
  const blob = await generateShareCard(opts);
  const file = new File([blob], "picademy-score.jpg", { type: "image/jpeg" });

  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        text: `My photo scored ${opts.score.toFixed(1)}/10 on Picademy!`,
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
