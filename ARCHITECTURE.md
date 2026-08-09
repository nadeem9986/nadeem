# Portfolio System Architecture & Technical Specifications

This document outlines the architectural patterns, design tokens, and engineering specs powering Nadeem's personal portfolio ecosystem.

---

## 🎨 1. Cyber-Glass Design System & Tokens

The application follows an **Apple & Cyber-Glass hybrid design system**, prioritizing dark mode canvas aesthetics, glowing accents, and smooth backdrop blurs.

### **CSS Custom Variables**
- `--bg`: `#05070B` (Obsidian Space Canvas)
- `--bg-card`: `rgba(18, 26, 44, 0.55)` (Glassmorphism Translucent Surface)
- `--cyan`: `#00F2FE` (Primary Cyber Cyan Accent)
- `--indigo`: `#6366F1` (Secondary Electric Indigo Accent)
- `--emerald`: `#10B981` (Live Status Indicator)
- `--pink`: `#EC4899` (Secondary Glow Accent)

---

## ⚡ 2. HTML5 Interactive Canvas Math

The particle constellation background (`#bgCanvas`) runs an un-blocked 60FPS animation loop:

$$\text{Distance}(p_1, p_2) = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$

When $\text{Distance} < 120\text{px}$, a dynamic vector line is rendered between particles with an opacity scaled by:

$$\alpha = 0.15 \times \left(1 - \frac{\text{Distance}}{120}\right)$$

---

## 🤖 3. ESP32 RoboEyes & RAG AI Simulation Engine

1. **ESP32 RoboEyes Widget**:
   - Cursor tracking via `mousemove` event bounding rect offsets.
   - Dynamic mood state transformations (`happy`, `focus`, `blink`, `reset`).
2. **RAG Vector Search Console**:
   - Simulates vector similarity query parsing and returns extraction status metrics (Pinecone similarity score: ~0.98, search latency: ~30-50ms).

---

## 🌐 4. Component Directory Breakdown

- `index.html`: Main self-contained single-page web application.
- `assets/css/portfolio.css`: Cyber-glass styling system & responsive design rules.
- `assets/js/portfolio.js`: Interactive canvas, particle math, scroll observer, and widget triggers.
- `resume/Nadeem_resume.pdf`: Downloadable PDF resume.
