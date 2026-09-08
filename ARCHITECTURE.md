# AI Engineer Portfolio Architecture & Revamp Notes

This repository powers Nadeem's personal portfolio at `n4deem.site`. The current revamp is a static, dependency-light hiring portfolio focused on **AI Engineer**, **GenAI Engineer**, and **RAG Engineer** roles.

The visual language still uses dark metallic engineering marks, but the content hierarchy now prioritizes job signal: AI positioning, proof-of-work, selected AI projects, system boundaries, and direct repository links.

## 1. Application Shape

- `index.html` contains semantic page structure and portfolio content.
- `assets/css/portfolio.css` contains the full visual system and responsive layout.
- `assets/js/portfolio.js` contains canvas motion, navigation state, project filtering, and the contact form mailto flow.
- `resume/Nadeem_resume.pdf` is the downloadable resume.
- `CNAME` points GitHub Pages to `n4deem.site`.

The site intentionally avoids a build step so it can run directly on GitHub Pages.

## 2. Hiring Strategy

The page is organized around what AI hiring reviewers scan for:

- A clear role target in the first viewport.
- A concise AI systems value proposition.
- Strongest AI projects first, not every repository.
- Proof panels for RAG, document intelligence, and AI product delivery.
- Direct GitHub links for inspection.
- Secondary robotics/embedded projects shown as systems breadth, not the main identity.

## 3. Visual System

The theme follows a monochrome industrial direction:

- Black graphite background with subtle grain and scanline overlays.
- Metallic silver typography and panel surfaces.
- Thin calibration lines, circular engineering rings, and node markers.
- A CSS-built geometric `N` monogram in the hero.
- Dense project cards designed like technical plates.

The design language is meant to feel closer to a machine blueprint, robotics lab, and premium identity system than a generic portfolio template.

## 4. Content Model

The portfolio now prioritizes high-signal projects from the local docs and public GitHub work:

- Credit Card AI Analyzer
- Legal AI RAG Assistant
- InsightFlow CSV Analyzer
- ESP32 4-DOF Robot Arm
- Udaan Aviation
- RoboEyes ESP32 Dashboard
- ESP Drone
- Rescue Call Emergency System
- Subscription Dashboard

Projects are grouped by category using `data-category` attributes. The filter buttons in the project section use those attributes without relying on inline `onclick` handlers.

## 5. JavaScript Responsibilities

`portfolio.js` handles:

- Sticky header state on scroll.
- Active navigation section highlighting.
- Mobile navigation open/close behavior.
- Project filtering.
- Contact form mailto generation, including the sender email in the body.
- Canvas-based precision particle lines in the background.

## 6. Deployment

No package install or build command is required.

Preview locally by opening `index.html`, or serve the folder:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```
