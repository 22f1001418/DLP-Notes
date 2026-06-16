/* ============================================================
   DLP COURSE NOTES
   Data · rendering · immersive canvas environments · interactions
   ============================================================ */

/* ── Data ───────────────────────────────────────────────────────
   Paste your Google Drive URLs below. Weeks 9 & 10 take two links
   (Lecture Notes = index 0, Supplementary Notes = index 1).
   ─────────────────────────────────────────────────────────────── */
const notes = {
  nlp: [
    { week: 1, link: "https://drive.google.com/file/d/1kP0obSWCotlOU_KolLykJAL6PldOD-dY/view?usp=sharing" },
    { week: 2, link: "https://drive.google.com/file/d/1snd_vy7Fm6Jenwcey8TT08eC3VuyADwc/view?usp=sharing" },
    { week: 3, link: "https://drive.google.com/file/d/1k53E8dIdQg-Y3rdNNlyfm2ykcNlCb4j-/view?usp=drive_link" },
    { week: 4, link: "https://drive.google.com/file/d/1bH2duLhyCfwzvQOTx8v2c7dYB1JuZsgI/view?usp=drive_link" }
  ],
  speech: [
    { week: 5, link: "https://drive.google.com/file/d/1nO7qa9Sr4gc17eS3oYEUbKgSFljgH0_z/view?usp=drive_link" },
    { week: 6, link: "https://drive.google.com/file/d/17vhVgvYXWsu2O0Vuq-3ESNoVkEpZxUSl/view?usp=drive_link" },
    { week: 7, link: "https://drive.google.com/file/d/146g9GvXiucHrA__We6I9AqgL8FGmTPOs/view?usp=drive_link" },
    { week: 8, link: "https://drive.google.com/file/d/1BR2l37StIVmhwmrXMk8yg2pK4wlArt7d/view?usp=drive_link" }
  ],
  cv: [
    { week: 9,  links: ["https://drive.google.com/file/d/1hxwmaGPzu-UliTLu62e3_4mUwdGo8irO/view?usp=drive_link", "https://drive.google.com/file/d/1zMaQv0mVI1cdlt0aRXzO17eD_p8pB5oZ/view?usp=drive_link"] },
    { week: 10, links: ["https://drive.google.com/file/d/1-cjaVRVZyNV_wEvTZGIqN5TP3w3GqE5a/view?usp=drive_link", "https://drive.google.com/file/d/1ZXa3rFJlUkj14oN9-RTFeOLuPa3zojAw/view?usp=drive_link"] },
    { week: 11, link: "https://drive.google.com/file/d/146g9GvXiucHrA__We6I9AqgL8FGmTPOs/view?usp=drive_link" },
    { week: 12, link: "https://drive.google.com/file/d/1BR2l37StIVmhwmrXMk8yg2pK4wlArt7d/view?usp=drive_link" }
  ]
};

/* ── Module metadata ────────────────────────────────────────── */
const MODULES = [
  {
    id: "nlp", icon: "fa-brain", eyebrow: "Weeks 1 – 4",
    title: "Natural Language Processing", label: "NLP",
    desc: "Step inside the mind of a language model — tokens, embeddings, attention, and the flow of meaning through a network.",
    tags: ["Embeddings", "Attention", "Transformers", "Semantics"],
    weekTitles: { 1: "All about HF datasets", 2: "Everything about Tokenizers", 3: "Pre-training of GPT model", 4: "The universe of Fine-tuning" },
    blurb: "Weekly notes, derivations, and code references."
  },
  {
    id: "speech", icon: "fa-wave-square", eyebrow: "Weeks 5 – 8",
    title: "Speech Technology", label: "Speech",
    desc: "Where sound becomes information — waveforms, spectrograms, acoustic models, and neural voices brought to life.",
    tags: ["Waveforms", "Spectrograms", "ASR", "Neural TTS"],
    weekTitles: { 5: "Language identification using Wav2Vec2", 6: "Speaker Diarization", 7: "Speech-to-Text: Fine-tuning Wav2Vec2", 8: "Text-to-Speech: Fine-tuning Speech-T5" },
    blurb: "Weekly notes, derivations, and code references."
  },
  {
    id: "cv", icon: "fa-camera", eyebrow: "Weeks 9 – 12",
    title: "Computer Vision", label: "Vision",
    desc: "The machine learns to see — convolutions, detection, segmentation, and the geometry of visual perception.",
    tags: ["ConvNets", "Detection", "Segmentation", "ViT"],
    weekTitles: { 9: "Image Classification", 10: "Object Detection", 11: "Depth Estimation", 12: "Denoising, Super-Resolution and Deblurring" },
    blurb: "Weekly notes — some weeks include both lecture and supplementary sets."
  }
];

const PART_LABELS = ["Lecture Notes", "Supplementary Notes"];

/* themed in-card hover decoration */
const CARD_FX = {
  nlp:    `<span class="fx fx-nlp"><span class="node"></span><span class="node"></span><span class="node"></span><span class="node"></span><span class="thread"></span></span>`,
  speech: `<span class="fx fx-speech">${Array.from({ length: 7 }, () => '<span class="bar"></span>').join("")}</span>`,
  cv:     `<span class="fx fx-cv"><span class="bracket tl"></span><span class="bracket tr"></span><span class="bracket bl"></span><span class="bracket br"></span><span class="scan"></span></span>`
};

/* ── Rendering ──────────────────────────────────────────────── */
function linkButton({ href, label, part }) {
  const empty = !href;
  const tag = empty ? "span" : "a";
  const attrs = empty
    ? `class="link-btn is-empty" aria-disabled="true"`
    : `class="link-btn" href="${href}" target="_blank" rel="noopener" data-magnetic`;
  const partHtml = part ? `<span class="link-part">${part}</span>` : "";
  const labelText = empty ? "Link coming soon" : label;
  return `
    <${tag} ${attrs}>
      <i class="fa-solid fa-folder-open link-icon" aria-hidden="true"></i>
      <span class="link-body">${partHtml}<span class="link-label">${labelText}</span></span>
      ${empty ? "" : '<i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>'}
    </${tag}>`;
}

function cardMarkup(mod, item, index) {
  const title = mod.weekTitles[item.week] || `Week ${item.week}`;
  let links;
  if (Array.isArray(item.links)) {
    links = item.links
      .map((href, i) => linkButton({ href, label: "Open Notes", part: PART_LABELS[i] || `Part ${i + 1}` }))
      .join("");
  } else {
    links = linkButton({ href: item.link, label: "Open Notes" });
  }
  const delay = `style="transition-delay:${(index % 4) * 80}ms"`;
  return `
    <article class="card reveal" ${delay}>
      ${CARD_FX[mod.id]}
      <div class="card-top">
        <span class="card-week">Week ${item.week}</span>
        <span class="card-num">${String(item.week).padStart(2, "0")}</span>
      </div>
      <div class="card-module">${mod.label}</div>
      <h3 class="card-title">${title}</h3>
      <p class="card-desc">${mod.blurb}</p>
      <div class="card-links">${links}</div>
    </article>`;
}

function moduleMarkup(mod) {
  const cards = notes[mod.id].map((item, i) => cardMarkup(mod, item, i)).join("");
  const tags = mod.tags.map((t) => `<span class="module-tag">${t}</span>`).join("");
  return `
    <section class="module ${mod.id}" id="${mod.id}">
      <div class="module-head reveal">
        <div class="module-icon"><i class="fa-solid ${mod.icon}"></i></div>
        <div>
          <div class="module-eyebrow">${mod.eyebrow}</div>
          <h2 class="module-title">${mod.title}</h2>
        </div>
      </div>
      <p class="module-desc reveal">${mod.desc}</p>
      <div class="module-tags reveal">${tags}</div>
      <div class="cards">${cards}</div>
    </section>`;
}

function render() {
  const root = document.getElementById("notes-root");
  if (!root) return;
  root.innerHTML = MODULES
    .map((m, i) => moduleMarkup(m) + (i < MODULES.length - 1 ? '<div class="module-divider"></div>' : ""))
    .join("");
}

/* ── Scroll reveal ──────────────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("in")); return; }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  els.forEach((el) => io.observe(el));
}

/* ── Environment blending (scroll-driven) ───────────────────── */
const PALETTES = {
  nlp:    { primary: [139, 92, 246], accent: [167, 139, 250] },
  speech: { primary: [245, 158, 11], accent: [251, 113, 77] },
  cv:     { primary: [59, 130, 246], accent: [34, 211, 248] }
};
const ORDER = ["nlp", "speech", "cv"];

const envState = { weights: { nlp: 1, speech: 0, cv: 0 }, active: "nlp" };

function computeWeights() {
  const vh = window.innerHeight;
  const mid = window.scrollY + vh / 2;
  const raw = {};
  let sum = 0;
  ORDER.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) { raw[id] = 0; return; }
    const rect = el.getBoundingClientRect();
    const center = window.scrollY + rect.top + rect.height / 2;
    const dist = Math.abs(center - mid);
    const span = vh * 0.95;
    const w = Math.max(0, 1 - dist / span);
    raw[id] = w * w;          // sharpen falloff
    sum += raw[id];
  });
  if (sum < 0.0001) { raw.nlp = 1; sum = 1; }   // top of page → NLP ambience
  let best = "nlp", bestW = -1;
  ORDER.forEach((id) => {
    envState.weights[id] = raw[id] / sum;
    if (envState.weights[id] > bestW) { bestW = envState.weights[id]; best = id; }
  });
  envState.active = best;
}

function applyEnvironment() {
  // background layers
  ORDER.forEach((id) => {
    const layer = document.querySelector(".env-" + id);
    if (layer) layer.style.opacity = Math.min(1, envState.weights[id] * 1.15).toFixed(3);
  });
  // active accent + nav
  const body = document.body;
  if (body.dataset.active !== envState.active) {
    body.dataset.active = envState.active;
    updateNavActive(envState.active);
  }
}

/* ── Nav: active link + sliding indicator + mobile + scrolled ── */
function updateNavActive(activeId) {
  const links = document.querySelectorAll(".nav-link");
  const indicator = document.getElementById("navIndicator");
  let activeEl = null;
  links.forEach((a) => {
    const on = a.getAttribute("href") === "#" + activeId;
    a.classList.toggle("active", on);
    if (on) activeEl = a;
  });
  if (indicator && activeEl && window.innerWidth > 860) {
    indicator.style.left = activeEl.offsetLeft + "px";
    indicator.style.width = activeEl.offsetWidth + "px";
  }
}

function initNav() {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  if (nav) {
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });
    links.querySelectorAll(".nav-link").forEach((a) =>
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      })
    );
  }
  window.addEventListener("resize", () => updateNavActive(envState.active));
  updateNavActive(envState.active);
}

/* ── Canvas environments ────────────────────────────────────── */
function initCanvas() {
  const canvas = document.getElementById("fx");
  if (!canvas) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return; // backgrounds + CSS still convey identity

  const ctx = canvas.getContext("2d");
  let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    w = window.innerWidth; h = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + "px"; canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    nlpScene.init(); speechScene.init(); cvScene.init();
  }

  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  const rand = (a, b) => a + Math.random() * (b - a);

  /* NLP — drifting nodes, neural connections, floating tokens */
  const nlpScene = {
    nodes: [], tokens: [],
    init() {
      const count = Math.round(Math.min(30, (w * h) / 46000));
      this.nodes = Array.from({ length: count }, () => ({
        x: rand(0, w), y: rand(0, h), vx: rand(-0.12, 0.12), vy: rand(-0.12, 0.12),
        r: rand(1.4, 2.8), ph: rand(0, Math.PI * 2)
      }));
      const words = ["the", "model", "token", "vector", "attention", "context", "language", "embed", "weights", "logits"];
      this.tokens = Array.from({ length: 7 }, (_, i) => ({
        x: rand(0, w), y: rand(0, h), vx: rand(-0.08, 0.08), vy: rand(-0.05, 0.05),
        word: words[i % words.length], ph: rand(0, Math.PI * 2)
      }));
    },
    draw(t, alpha) {
      const p = PALETTES.nlp;
      this.nodes.forEach((n) => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0) n.x += w; if (n.x > w) n.x -= w;
        if (n.y < 0) n.y += h; if (n.y > h) n.y -= h;
      });
      // connections
      for (let i = 0; i < this.nodes.length; i++) {
        for (let j = i + 1; j < this.nodes.length; j++) {
          const a = this.nodes[i], b = this.nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < 168) {
            const o = (1 - d / 168) * 0.5 * alpha;
            ctx.strokeStyle = rgba(p.primary, o);
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      // nodes
      this.nodes.forEach((n) => {
        const pulse = 0.6 + 0.4 * Math.sin(t * 0.0015 + n.ph);
        ctx.fillStyle = rgba(p.accent, 0.85 * alpha * pulse);
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
      });
      // floating tokens
      ctx.font = "500 13px 'Plus Jakarta Sans', sans-serif";
      this.tokens.forEach((tk) => {
        tk.x += tk.vx; tk.y += tk.vy;
        if (tk.x < -40) tk.x = w + 40; if (tk.x > w + 40) tk.x = -40;
        if (tk.y < -20) tk.y = h + 20; if (tk.y > h + 20) tk.y = -20;
        const o = (0.5 + 0.5 * Math.sin(t * 0.0012 + tk.ph)) * 0.5 * alpha;
        const tw = ctx.measureText(tk.word).width + 20;
        ctx.fillStyle = rgba(p.primary, 0.06 * alpha);
        roundRect(ctx, tk.x - 10, tk.y - 13, tw, 24, 12); ctx.fill();
        ctx.fillStyle = rgba(p.primary, o);
        ctx.fillText(tk.word, tk.x, tk.y + 4);
      });
    }
  };

  /* Speech — scrolling waveforms, equalizer bars, ripples */
  const speechScene = {
    waves: [], bars: [], ripples: [], lastRipple: 0,
    init() {
      this.waves = [
        { amp: 26, freq: 0.012, speed: 0.0016, yOff: 0.34, lw: 2 },
        { amp: 18, freq: 0.018, speed: 0.0022, yOff: 0.5, lw: 1.5 },
        { amp: 12, freq: 0.026, speed: 0.0028, yOff: 0.64, lw: 1 }
      ];
      const n = Math.round(Math.min(60, w / 22));
      this.bars = Array.from({ length: n }, (_, i) => ({ ph: i * 0.5, sp: rand(0.003, 0.007) }));
      this.ripples = [];
    },
    draw(t, alpha) {
      const p = PALETTES.speech;
      // waveforms
      this.waves.forEach((wv, k) => {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 6) {
          const y = h * wv.yOff
            + Math.sin(x * wv.freq + t * wv.speed) * wv.amp
            + Math.sin(x * wv.freq * 0.5 - t * wv.speed * 0.7) * wv.amp * 0.5;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        const col = k === 0 ? p.accent : p.primary;
        ctx.strokeStyle = rgba(col, (0.5 - k * 0.12) * alpha);
        ctx.lineWidth = wv.lw; ctx.stroke();
      });
      // equalizer bars along the base
      const bw = w / this.bars.length;
      this.bars.forEach((b, i) => {
        const hgt = (0.5 + 0.5 * Math.sin(t * b.sp + b.ph)) * h * 0.16 + 6;
        const grad = ctx.createLinearGradient(0, h - hgt, 0, h);
        grad.addColorStop(0, rgba(p.accent, 0.32 * alpha));
        grad.addColorStop(1, rgba(p.primary, 0.05 * alpha));
        ctx.fillStyle = grad;
        roundRect(ctx, i * bw + bw * 0.2, h - hgt, bw * 0.6, hgt, 3); ctx.fill();
      });
      // expanding ripples
      if (t - this.lastRipple > 1400) {
        this.lastRipple = t;
        this.ripples.push({ x: rand(w * 0.2, w * 0.8), y: rand(h * 0.25, h * 0.6), r: 0 });
        if (this.ripples.length > 5) this.ripples.shift();
      }
      this.ripples.forEach((rp) => {
        rp.r += 0.9;
        const o = Math.max(0, 1 - rp.r / 320) * 0.4 * alpha;
        ctx.strokeStyle = rgba(p.accent, o); ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2); ctx.stroke();
      });
    }
  };

  /* Vision — perspective grid, scanning boxes, feature points, pixels */
  const cvScene = {
    boxes: [], points: [], pixels: [],
    init() {
      this.boxes = Array.from({ length: 3 }, () => ({
        x: rand(0.08, 0.6) * w, y: rand(0.15, 0.6) * h,
        s: rand(70, 150), vx: rand(-0.25, 0.25), vy: rand(-0.18, 0.18), ph: rand(0, 6)
      }));
      this.points = Array.from({ length: 28 }, () => ({ x: rand(0, w), y: rand(0, h), ph: rand(0, 6) }));
      this.pixels = Array.from({ length: 26 }, () => ({
        x: rand(0, w), y: rand(0, h), vx: rand(-0.2, 0.2), vy: rand(-0.2, 0.2), s: rand(2, 4)
      }));
    },
    draw(t, alpha) {
      const p = PALETTES.cv;
      // perspective grid (lower band)
      const vpx = w / 2, horizon = h * 0.62, shift = Math.sin(t * 0.0004) * 40;
      ctx.strokeStyle = rgba(p.primary, 0.12 * alpha); ctx.lineWidth = 1;
      for (let i = -8; i <= 8; i++) {
        ctx.beginPath(); ctx.moveTo(vpx + i * 18, horizon);
        ctx.lineTo(vpx + i * 150 + shift, h); ctx.stroke();
      }
      for (let r = 1; r <= 6; r++) {
        const y = horizon + Math.pow(r / 6, 2) * (h - horizon);
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }
      // feature points
      this.points.forEach((pt) => {
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.002 + pt.ph);
        ctx.fillStyle = rgba(p.accent, 0.5 * alpha * pulse);
        ctx.beginPath(); ctx.arc(pt.x, pt.y, 1.8 + pulse * 1.4, 0, Math.PI * 2); ctx.fill();
      });
      // pixel particles
      this.pixels.forEach((px) => {
        px.x += px.vx; px.y += px.vy;
        if (px.x < 0) px.x += w; if (px.x > w) px.x -= w;
        if (px.y < 0) px.y += h; if (px.y > h) px.y -= h;
        ctx.fillStyle = rgba(p.primary, 0.3 * alpha);
        ctx.fillRect(px.x, px.y, px.s, px.s);
      });
      // scanning bounding boxes with corner brackets
      this.boxes.forEach((b) => {
        b.x += b.vx; b.y += b.vy;
        if (b.x < 0 || b.x + b.s > w) b.vx *= -1;
        if (b.y < 0 || b.y + b.s > h) b.vy *= -1;
        const o = (0.55 + 0.45 * Math.sin(t * 0.0016 + b.ph)) * alpha;
        ctx.strokeStyle = rgba(p.accent, o);
        ctx.lineWidth = 1.5;
        ctx.strokeRect(b.x, b.y, b.s, b.s);
        drawBrackets(ctx, b.x, b.y, b.s, rgba(p.primary, o), 14);
      });
    }
  };

  function draw(time) {
    ctx.clearRect(0, 0, w, h);
    const wt = envState.weights;
    if (wt.nlp > 0.02) nlpScene.draw(time, wt.nlp);
    if (wt.speech > 0.02) speechScene.draw(time, wt.speech);
    if (wt.cv > 0.02) cvScene.draw(time, wt.cv);
    rafId = requestAnimationFrame(draw);
  }

  let rafId = null;
  function start() { if (!rafId) rafId = requestAnimationFrame(draw); }
  function stop() { if (rafId) { cancelAnimationFrame(rafId); rafId = null; } }

  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
  window.addEventListener("resize", resize, { passive: true });
  resize();
  start();
}

/* canvas helpers */
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function drawBrackets(ctx, x, y, s, color, len) {
  ctx.strokeStyle = color; ctx.lineWidth = 2.5;
  const c = [[x, y, 1, 1], [x + s, y, -1, 1], [x, y + s, 1, -1], [x + s, y + s, -1, -1]];
  c.forEach(([cx, cy, dx, dy]) => {
    ctx.beginPath();
    ctx.moveTo(cx, cy + dy * len); ctx.lineTo(cx, cy); ctx.lineTo(cx + dx * len, cy);
    ctx.stroke();
  });
}

/* ── Cursor glow ────────────────────────────────────────────── */
function initCursorGlow() {
  const glow = document.getElementById("cursorGlow");
  if (!glow || !window.matchMedia("(pointer: fine)").matches) return;
  let tx = window.innerWidth / 2, ty = window.innerHeight / 2, cx = tx, cy = ty;
  document.body.classList.add("has-cursor");
  window.addEventListener("pointermove", (e) => { tx = e.clientX; ty = e.clientY; }, { passive: true });
  (function follow() {
    cx += (tx - cx) * 0.12; cy += (ty - cy) * 0.12;
    glow.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(follow);
  })();
}

/* ── Magnetic buttons + card tilt ───────────────────────────── */
function initMicro() {
  if (!window.matchMedia("(pointer: fine)").matches) return;

  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    const strength = 0.28;
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const mx = e.clientX - r.left - r.width / 2;
      const my = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${mx * strength}px, ${my * strength}px)`;
    });
    el.addEventListener("pointerleave", () => { el.style.transform = ""; });
  });

  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 5).toFixed(2)}deg) translateY(-4px)`;
    });
    card.addEventListener("pointerleave", () => { card.style.transform = ""; });
  });
}

/* ── Loop driver for env weights ────────────────────────────── */
function initEnvironment() {
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { computeWeights(); applyEnvironment(); ticking = false; });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => { computeWeights(); applyEnvironment(); }, { passive: true });
  computeWeights(); applyEnvironment();
}

/* ── Init ───────────────────────────────────────────────────── */
function init() {
  render();
  initReveal();
  initNav();
  initEnvironment();
  initCanvas();
  initCursorGlow();
  initMicro();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
