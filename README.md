# DLP Course Notes

A modern, single-page portal for accessing weekly Deep Learning course notes via Google Drive — covering **Natural Language Processing**, **Speech Technology**, and **Computer Vision**.

Warm, light, futuristic design (Apple / Linear / Notion / Stripe inspired). Pure HTML, CSS, and vanilla JS — zero build step.

---

## Files

```
/
├── index.html   ← markup, hero, nav, footer
├── styles.css   ← warm-light design system
├── script.js    ← notes data + card rendering + interactions
└── README.md
```

---

## Adding / editing Drive links

All content is driven by the `notes` object at the top of `script.js`. The cards render automatically — just paste your URLs:

```javascript
const notes = {
  nlp: [
    { week: 1, link: "https://drive.google.com/…" },
    { week: 2, link: "" },
    { week: 3, link: "" },
    { week: 4, link: "" }
  ],
  speech: [
    { week: 5, link: "" },
    { week: 6, link: "" },
    { week: 7, link: "" },
    { week: 8, link: "" }
  ],
  cv: [
    { week: 9,  links: ["", ""] },   // Part A = Lecture, Part B = Practical
    { week: 10, links: ["", ""] },   // two resources
    { week: 11, link: "" },
    { week: 12, link: "" }
  ]
};
```

- A week with a single `link` renders one **Open Notes** button.
- A week with a `links` array (CV weeks 9 & 10) renders two buttons labelled **Lecture Notes** / **Practical Notes**.
- An empty string renders a disabled “Link coming soon” button.

Week titles and module text live in the `MODULES` array just below `notes`.

---

## Deploying to GitHub Pages

```bash
git add .
git commit -m "DLP Course Notes portal"
git push origin main
```

Then: **Settings → Pages → Source → Deploy from a branch → `main` / root**. Live at `https://YOUR_USERNAME.github.io/YOUR_REPO/` within a minute or two.

---

## Stack

- Semantic HTML5
- Modern CSS (custom properties, grid, glassmorphism, scroll-reveal)
- Vanilla JS (IntersectionObserver, no dependencies)
- Plus Jakarta Sans + Inter (Google Fonts), Font Awesome 6 icons
- MIT — free to use, modify, and deploy.
