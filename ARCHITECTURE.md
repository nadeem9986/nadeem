# Portfolio Architecture & Revamp Notes

This repository powers Nadeem's personal portfolio at `n4deem.site`. The current revamp is a static, dependency-light website inspired by dark metallic engineering marks: precision rings, calibration lines, brushed silver typography, and a custom geometric `N` monogram.

## 1. Application Shape

- `index.html` contains semantic page structure and portfolio content.
- `assets/css/portfolio.css` contains the full visual system and responsive layout.
- `assets/js/portfolio.js` contains canvas motion, navigation state, project filtering, and the contact form mailto flow.
- `resume/Nadeem_resume.pdf` is the downloadable resume.
- `CNAME` points GitHub Pages to `n4deem.site`.

The site intentionally avoids a build step so it can run directly on GitHub Pages.

## 2. Visual System

The theme follows a monochrome industrial direction:

- Black graphite background with subtle grain and scanline overlays.
- Metallic silver typography and panel surfaces.
- Thin calibration lines, circular engineering rings, and node markers.
- A CSS-built geometric `N` monogram in the hero.
- Dense project cards designed like technical plates.

The design language is meant to feel closer to a machine blueprint, robotics lab, and premium identity system than a generic portfolio template.

## 3. Content Model

The portfolio now prioritizes high-signal projects from the local docs and public GitHub work:

- ESP32 4-DOF Robot Arm
- Udaan Aviation
- Credit Card AI Analyzer
- Legal AI RAG Assistant
- InsightFlow CSV Analyzer
- RoboEyes ESP32 Dashboard
- ESP Drone
- Rescue Call Emergency System
- Subscription Dashboard

Projects are grouped by category using `data-category` attributes. The filter buttons in the project section use those attributes without relying on inline `onclick` handlers.

## 4. JavaScript Responsibilities

`portfolio.js` handles:

- Sticky header state on scroll.
- Active navigation section highlighting.
- Mobile navigation open/close behavior.
- Project filtering.
- Contact form mailto generation, including the sender email in the body.
- Canvas-based precision particle lines in the background.

## 5. Deployment

No package install or build command is required.

Preview locally by opening `index.html`, or serve the folder:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```
