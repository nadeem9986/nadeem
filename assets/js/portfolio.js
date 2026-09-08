"use strict";

const header = document.querySelector(".site-header");
const nav = document.querySelector(".site-nav");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const sections = document.querySelectorAll("main section[id]");
const canvas = document.getElementById("precisionCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;

function syncHeader() {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 20);
}

function syncActiveNav() {
  let activeId = "home";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 160) {
      activeId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
  });
}

function closeMenu() {
  if (!nav || !menuToggle) return;
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

window.addEventListener("scroll", () => {
  syncHeader();
  syncActiveNav();
}, { passive: true });

syncHeader();
syncActiveNav();

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter || "all";
    document.querySelectorAll(".filter").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    document.querySelectorAll(".project-card").forEach((card) => {
      const categories = (card.dataset.category || "").split(" ");
      card.classList.toggle("is-hidden", filter !== "all" && !categories.includes(filter));
    });
  });
});

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("cf-name").value.trim();
    const email = document.getElementById("cf-email").value.trim();
    const message = document.getElementById("cf-message").value.trim();
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\nReply to: ${email}`);
    window.location.href = `mailto:nadeemise2025@gmail.com?subject=${subject}&body=${body}`;

    const note = document.getElementById("formNote");
    if (note) note.textContent = "Email draft opened.";
  });
}

if (ctx && canvas) {
  const points = [];

  function resizeCanvas() {
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.floor(window.innerWidth * ratio);
    canvas.height = Math.floor(window.innerHeight * ratio);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function seedPoints() {
    points.length = 0;
    const count = Math.min(72, Math.max(36, Math.floor(window.innerWidth / 24)));
    for (let i = 0; i < count; i += 1) {
      points.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1;

    points.forEach((point, index) => {
      point.x += point.vx;
      point.y += point.vy;

      if (point.x < 0 || point.x > window.innerWidth) point.vx *= -1;
      if (point.y < 0 || point.y > window.innerHeight) point.vy *= -1;

      ctx.beginPath();
      ctx.arc(point.x, point.y, 1.15, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(245,245,245,0.42)";
      ctx.fill();

      for (let j = index + 1; j < points.length; j += 1) {
        const next = points[j];
        const distance = Math.hypot(point.x - next.x, point.y - next.y);
        if (distance < 125) {
          ctx.globalAlpha = 1 - distance / 125;
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(next.x, next.y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", () => {
    resizeCanvas();
    seedPoints();
  });

  resizeCanvas();
  seedPoints();
  draw();
}
