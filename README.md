# Deep Learning Engineering Notes

A premium, dashboard-style GitHub Pages site for Deep Learning course coding notes — covering NLP, Speech Technology, and Computer Vision across 14 weeks.

## 🚀 Live Site

[View on GitHub Pages](https://your-username.github.io/your-repo-name)

---

## 📁 Repository Structure

```
/
├── index.html          ← Landing page (main dashboard)
├── styles.css          ← Complete design system
├── script.js           ← Interactions & animations
├── assets/
│   ├── images/         ← Add images here
│   └── icons/          ← Add icons here
├── nlp/
│   ├── week1.html      ← NLP: Foundations & Text Processing
│   ├── week2.html      ← NLP: Embeddings & Word Vectors
│   ├── week3.html      ← NLP: Sequence Models & RNNs
│   └── week4.html      ← NLP: Transformers & Attention
├── speech/
│   ├── week5.html      ← Speech: Audio Signals & Features
│   ├── week6.html      ← Speech: ASR & Acoustic Models
│   ├── week7.html      ← Speech: CTC Loss & Seq2Seq
│   └── week8.html      ← Speech: Neural TTS & Vocoders
├── vision/
│   ├── week9.html      ← Vision: ConvNets & Feature Maps
│   ├── week10.html     ← Vision: ResNets & Skip Connections
│   ├── week11.html     ← Vision: Object Detection
│   ├── week12.html     ← Vision: Segmentation & Keypoints
│   ├── week13.html     ← Vision: Vision Transformers (ViT)
│   └── week14.html     ← Vision: Generative Vision Models
└── README.md
```

---

## 🛠️ GitHub Pages Deployment

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: DL Notes site"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2 — Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. In the left sidebar, click **Pages**
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch and **/ (root)** folder
6. Click **Save**

### Step 3 — Access Your Site

After 1–2 minutes, your site will be live at:

```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

---

## ✏️ Adding Your Notes

Each week page (`nlp/week1.html`, etc.) contains a **"Coding Notes"** section marked with a placeholder. To add content:

1. Open the week HTML file
2. Find the `notes-empty-state` div
3. Replace it with your notes content

You can use any HTML — code blocks, images, tables, etc.

### Example: Adding a code snippet

```html
<pre style="
  background: var(--bg-void);
  border: 1px solid var(--border-subtle);
  border-radius: var(--r-md);
  padding: 20px;
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--nlp-accent);
  line-height: 1.6;
"><code>import torch
import torch.nn as nn

class SelfAttention(nn.Module):
    def __init__(self, embed_dim, num_heads):
        super().__init__()
        self.attn = nn.MultiheadAttention(embed_dim, num_heads)

    def forward(self, x):
        return self.attn(x, x, x)[0]
</code></pre>
```

---

## 🎨 Design System

The site uses a cohesive CSS variable system. Key variables:

| Variable | Usage |
|---|---|
| `--nlp-primary` / `--nlp-accent` | Purple NLP colors |
| `--speech-primary` / `--speech-accent` | Cyan speech colors |
| `--vision-primary` / `--vision-accent` | Orange vision colors |
| `--font-display` | Syne — headings |
| `--font-body` | Instrument Sans — body |
| `--font-mono` | DM Mono — code, labels |

---

## 📦 Technology Stack

- **Pure HTML5** — semantic, accessible markup
- **Modern CSS** — custom properties, grid, flexbox, animations
- **Vanilla JavaScript** — zero dependencies
- **Google Fonts** — Syne, Instrument Sans, DM Mono
- **GitHub Pages** — free static hosting

---

## 📄 License

MIT — free to use, modify, and deploy.
