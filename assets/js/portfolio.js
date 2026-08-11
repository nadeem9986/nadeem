/* =====================================================
   portfolio.js — Cyber-Glass Interactive Logic
   Developer: Nadeem
   ===================================================== */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ── NAVBAR: Scroll state, active link & reading progress ──
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const progressBar = document.getElementById('scrollProgress');

  function onScroll() {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 30);

    // Reading progress calculation
    if (progressBar) {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    }

    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 140) {
        current = sec.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── KEYBOARD SHORTCUTS NAVIGATION ──────────────────────
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    if (e.key.toLowerCase() === 'h') {
      document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
    } else if (e.key.toLowerCase() === 'p') {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    } else if (e.key.toLowerCase() === 's') {
      document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
    } else if (e.key.toLowerCase() === 'c') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // ── HAMBURGER MENU (MOBILE) ────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('navLinks');

  if (hamburger && navLinksEl) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinksEl.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinksEl.classList.remove('open');
      });
    });
  }

  // ── INTERACTIVE SIMULATOR TABS & CONTROLS ──────────────
  const tabRobo = document.getElementById('tabRobo');
  const tabRag = document.getElementById('tabRag');
  const roboBox = document.getElementById('roboBox');
  const ragBox = document.getElementById('ragBox');

  if (tabRobo && tabRag) {
    tabRobo.addEventListener('click', () => {
      tabRobo.classList.add('active');
      tabRag.classList.remove('active');
      if (roboBox) roboBox.classList.remove('hidden');
      if (ragBox) ragBox.classList.remove('active');
    });

    tabRag.addEventListener('click', () => {
      tabRag.classList.add('active');
      tabRobo.classList.remove('active');
      if (roboBox) roboBox.classList.add('hidden');
      if (ragBox) ragBox.classList.add('active');
    });
  }

  // ── ROBOEYES CURSOR TRACKING ───────────────────────────
  const eyeLeft = document.getElementById('eyeLeft');
  const eyeRight = document.getElementById('eyeRight');
  const eyesScreen = document.getElementById('eyesScreen');

  if (eyesScreen && eyeLeft && eyeRight) {
    eyesScreen.addEventListener('mousemove', (e) => {
      const rect = eyesScreen.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 10;
      const y = (e.clientY - rect.top - rect.height / 2) / 10;
      eyeLeft.style.transform = `translate(${x}px, ${y}px)`;
      eyeRight.style.transform = `translate(${x}px, ${y}px)`;
    });

    eyesScreen.addEventListener('mouseleave', () => {
      eyeLeft.style.transform = 'translate(0px, 0px)';
      eyeRight.style.transform = 'translate(0px, 0px)';
    });
  }

  // ── SCROLL REVEAL OBSERVER ─────────────────────────────
  const fadeEls = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => observer.observe(el));

  // ── CONTACT FORM FALLBACK ──────────────────────────────
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cf-name').value;
      const email = document.getElementById('cf-email').value;
      const msg = document.getElementById('cf-message').value;
      window.location.href = `mailto:nadeemise2025@gmail.com?subject=Portfolio Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(msg)}`;
      
      const formNote = document.getElementById('formNote');
      if (formNote) formNote.textContent = 'Draft opened in email client ✓';
    });
  }

});

// Interactive Project Star/Like Counter with localStorage
function toggleProjectStar(btnEl, projectKey) {
  let count = parseInt(localStorage.getItem('star_' + projectKey) || '12', 10);
  const starred = localStorage.getItem('starred_' + projectKey) === 'true';
  
  if (starred) {
    count -= 1;
    localStorage.setItem('starred_' + projectKey, 'false');
    if (btnEl) btnEl.style.color = 'var(--text-sub)';
  } else {
    count += 1;
    localStorage.setItem('starred_' + projectKey, 'true');
    if (btnEl) btnEl.style.color = '#F59E0B';
  }

  localStorage.setItem('star_' + projectKey, count);
  if (btnEl) btnEl.innerText = `⭐ ${count}`;
}

// Animated Stat Counter Logic
function animateValueCounter(elementId, start, end, duration) {
  const obj = document.getElementById(elementId);
  if (!obj) return;
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Global Copy-To-Clipboard Helper
function copyTextToClipboard(text, btnElement) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      if (btnElement) {
        const origText = btnElement.innerText;
        btnElement.innerText = 'Copied! ✓';
        setTimeout(() => btnElement.innerText = origText, 2000);
      }
    });
  }
}

// Global Theme Accent Switcher
function setThemeAccent(colorTheme) {
  document.body.className = '';
  if (colorTheme) document.body.classList.add('theme-' + colorTheme);
}

// Live Interactive Skills Filter
function filterSkillsSearch(query) {
  const q = query.toLowerCase();
  document.querySelectorAll('.s-item').forEach(item => {
    const text = item.textContent.toLowerCase();
    if (text.includes(q)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

// Project Code Snippet & Architecture Inspector
function showProjectSpecSnippet(projectKey) {
  const snippets = {
    cardmgmt: `// OpenAI GPT-4o Vision Statement Parser\nresponse = client.chat.completions.create(\n  model="gpt-4o",\n  messages=[{"role": "user", "content": [{"type": "image_url", "image_url": url}]}]\n)`,
    roboeyes: `// ESP32 WebSockets OLED Eye Animation Loop\nvoid drawRoboEyes() {\n  display.clearDisplay();\n  roboEyes.drawEyes(x, y, eyeMood);\n  display.display();\n}`,
    legalrag: `// LangChain & Pinecone Vector Search Node\nvectorstore = Pinecone.from_documents(docs, embeddings, index_name="legal-ai")\nqa_chain = RetrievalQA.from_chain_type(llm=llm, retriever=vectorstore.as_retriever())`,
    insightflow: `// Pandas & Chart.js Conversational Analyst\ndf = pd.read_csv(uploaded_file)\nchart_data = generate_chart_config(df, user_prompt)`
  };

  alert(snippets[projectKey] || "Architecture snippet ready.");
}

// Global RAG Prompt Query Simulation
function runRagSimQuery(queryText) {
  const outputEl = document.getElementById('ragSimOutput');
  if (!outputEl) return;

  const ms = Math.floor(Math.random() * 25) + 30;
  const score = (0.95 + Math.random() * 0.04).toFixed(3);
  
  outputEl.innerHTML = `
    <div style="color: var(--cyan); margin-bottom: 4px;">⚡ Query: "${queryText || 'Analyze Statement Data'}"</div>
    <div>🔍 Vector Search Time: <strong>${ms}ms</strong> (Pinecone Similarity Index)</div>
    <div>📄 Matched Index Document: <code>knowledge_base_v2.pdf</code> (Score: ${score})</div>
    <div style="color: #10B981; margin-top: 4px;">💡 Extraction Status: 200 OK — Structured JSON Output Ready</div>
  `;
}

// Joystick Eye Direction Control
function moveEyeDirection(dir) {
  const eyeLeft = document.getElementById('eyeLeft');
  const eyeRight = document.getElementById('eyeRight');
  if (!eyeLeft || !eyeRight) return;

  let x = 0, y = 0;
  if (dir === 'left') x = -20;
  if (dir === 'right') x = 20;
  if (dir === 'up') y = -15;
  if (dir === 'down') y = 15;

  eyeLeft.style.transform = `translate(${x}px, ${y}px)`;
  eyeRight.style.transform = `translate(${x}px, ${y}px)`;
}

// Global mood switcher for RoboEyes
function setEyeMood(mood) {
  const eyeLeft = document.getElementById('eyeLeft');
  const eyeRight = document.getElementById('eyeRight');
  if (!eyeLeft || !eyeRight) return;

  if (mood === 'happy') {
    eyeLeft.style.height = '35px'; eyeRight.style.height = '35px';
    eyeLeft.style.borderRadius = '25px 25px 0 0'; eyeRight.style.borderRadius = '25px 25px 0 0';
  } else if (mood === 'focus') {
    eyeLeft.style.height = '20px'; eyeRight.style.height = '20px';
    eyeLeft.style.borderRadius = '8px'; eyeRight.style.borderRadius = '8px';
  } else if (mood === 'blink') {
    eyeLeft.style.height = '4px'; eyeRight.style.height = '4px';
    setTimeout(() => setEyeMood('reset'), 500);
  } else {
    eyeLeft.style.height = '75px'; eyeRight.style.height = '75px';
    eyeLeft.style.borderRadius = '25px'; eyeRight.style.borderRadius = '25px';
    moveEyeDirection('center');
  }
}
