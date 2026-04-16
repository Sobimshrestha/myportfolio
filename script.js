/* ─────────────────────────────────────────
   Sobim Shrestha — Portfolio Script
   - Particle background (geometric shapes)
   - Matrix rain (mathematical symbols)
   - Custom cursor with glow trail
   - Typewriter effect
   - Scroll reveal animations
   - Nav hide/show
   - Mobile hamburger
───────────────────────────────────────── */

(function () {
  'use strict';

  // ─── PARTICLE BACKGROUND ────────────────────
  const particleCanvas = document.getElementById('particle-canvas');
  const pCtx = particleCanvas.getContext('2d');
  let particles = [];
  const PARTICLE_COUNT = 60;

  function resizeParticleCanvas() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * particleCanvas.width;
      this.y = Math.random() * particleCanvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.3 + 0.05;
      this.shape = Math.floor(Math.random() * 4); // 0=circle, 1=triangle, 2=square, 3=diamond
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.02;
      this.color = this.getColor();
    }

    getColor() {
      const colors = [
        '79, 110, 247',   // accent blue
        '0, 212, 255',    // cyan
        '168, 85, 247',   // purple
        '100, 120, 180',  // muted blue
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.rotation += this.rotSpeed;

      if (this.x < -20) this.x = particleCanvas.width + 20;
      if (this.x > particleCanvas.width + 20) this.x = -20;
      if (this.y < -20) this.y = particleCanvas.height + 20;
      if (this.y > particleCanvas.height + 20) this.y = -20;
    }

    draw() {
      pCtx.save();
      pCtx.translate(this.x, this.y);
      pCtx.rotate(this.rotation);
      pCtx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      pCtx.strokeStyle = `rgba(${this.color}, ${this.opacity * 0.6})`;
      pCtx.lineWidth = 0.5;

      switch (this.shape) {
        case 0: // circle
          pCtx.beginPath();
          pCtx.arc(0, 0, this.size, 0, Math.PI * 2);
          pCtx.fill();
          break;
        case 1: // triangle
          pCtx.beginPath();
          pCtx.moveTo(0, -this.size * 1.5);
          pCtx.lineTo(-this.size * 1.3, this.size);
          pCtx.lineTo(this.size * 1.3, this.size);
          pCtx.closePath();
          pCtx.stroke();
          break;
        case 2: // square
          pCtx.strokeRect(-this.size, -this.size, this.size * 2, this.size * 2);
          break;
        case 3: // diamond
          pCtx.beginPath();
          pCtx.moveTo(0, -this.size * 1.5);
          pCtx.lineTo(this.size, 0);
          pCtx.lineTo(0, this.size * 1.5);
          pCtx.lineTo(-this.size, 0);
          pCtx.closePath();
          pCtx.stroke();
          break;
      }
      pCtx.restore();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const alpha = (1 - dist / 150) * 0.08;
          pCtx.strokeStyle = `rgba(79, 110, 247, ${alpha})`;
          pCtx.lineWidth = 0.5;
          pCtx.beginPath();
          pCtx.moveTo(particles[i].x, particles[i].y);
          pCtx.lineTo(particles[j].x, particles[j].y);
          pCtx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    particles.forEach(function (p) {
      p.update();
      p.draw();
    });
    drawConnections();
    requestAnimationFrame(animateParticles);
  }

  resizeParticleCanvas();
  initParticles();
  animateParticles();

  // ─── MATRIX RAIN ────────────────────────────
  const matrixCanvas = document.getElementById('matrix-canvas');
  const mCtx = matrixCanvas.getContext('2d');
  const mathSymbols = '∫∑∏∂∇θλμσΔΩπ√∞≈≠≤≥∈∉⊂⊃∪∩∀∃∧∨¬⊕⊗←→↑↓⟨⟩αβγδεζηικξρφψω∝∅'.split('');
  let matrixColumns = [];
  const FONT_SIZE = 14;

  function resizeMatrixCanvas() {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    const cols = Math.floor(matrixCanvas.width / FONT_SIZE);
    matrixColumns = [];
    for (let i = 0; i < cols; i++) {
      matrixColumns.push(Math.random() * matrixCanvas.height / FONT_SIZE);
    }
  }

  function drawMatrix() {
    mCtx.fillStyle = 'rgba(6, 11, 24, 0.06)';
    mCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

    mCtx.font = FONT_SIZE + 'px JetBrains Mono, monospace';

    for (let i = 0; i < matrixColumns.length; i++) {
      const symbol = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
      const x = i * FONT_SIZE;
      const y = matrixColumns[i] * FONT_SIZE;

      // Gradient effect — brighter at bottom
      const alpha = 0.15 + Math.random() * 0.15;
      mCtx.fillStyle = `rgba(79, 110, 247, ${alpha})`;
      mCtx.fillText(symbol, x, y);

      if (y > matrixCanvas.height && Math.random() > 0.975) {
        matrixColumns[i] = 0;
      }
      matrixColumns[i]++;
    }
  }

  resizeMatrixCanvas();
  setInterval(drawMatrix, 80);

  // ─── RESIZE HANDLER ─────────────────────────
  let resizeTimeout;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      resizeParticleCanvas();
      initParticles();
      resizeMatrixCanvas();
    }, 200);
  });

  // ─── CUSTOM CURSOR ──────────────────────────
  const cursor = document.getElementById('cursor');
  const cursorTrail = document.getElementById('cursor-trail');
  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;

  if (window.innerWidth > 768) {
    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    function animateCursorTrail() {
      trailX += (mouseX - trailX) * 0.12;
      trailY += (mouseY - trailY) * 0.12;
      cursorTrail.style.left = trailX + 'px';
      cursorTrail.style.top = trailY + 'px';
      requestAnimationFrame(animateCursorTrail);
    }
    animateCursorTrail();

    // Hover effect on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .btn, .project-card, .skill-card, .contact__link, .fyp__feature');
    hoverTargets.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cursor.classList.add('cursor--hover');
        cursorTrail.classList.add('cursor--hover');
      });
      el.addEventListener('mouseleave', function () {
        cursor.classList.remove('cursor--hover');
        cursorTrail.classList.remove('cursor--hover');
      });
    });
  }

  // ─── TYPEWRITER EFFECT ──────────────────────
  const typewriterEl = document.getElementById('typewriter');
  const roles = [
    'Python Developer',
    'Computer Vision Engineer',
    'Generative AI Learner',
    'Multimodal AI Engineer'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function typewrite() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 400; // Pause before next word
    }

    setTimeout(typewrite, typeSpeed);
  }

  setTimeout(typewrite, 1200);

  // ─── SMOOTH SCROLL ──────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeMobileDrawer();
    });
  });

  // ─── SCROLL-AWARE NAV ───────────────────────
  const nav = document.getElementById('nav');
  let lastScrollY = window.scrollY;
  let ticking = false;

  function handleNavScroll() {
    const currentScrollY = window.scrollY;
    if (currentScrollY <= 80) {
      nav.classList.remove('nav--hidden');
      nav.classList.remove('nav--scrolled');
    } else if (currentScrollY > lastScrollY + 5) {
      nav.classList.add('nav--hidden');
      nav.classList.add('nav--scrolled');
    } else if (currentScrollY < lastScrollY - 5) {
      nav.classList.remove('nav--hidden');
      nav.classList.add('nav--scrolled');
    }
    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(handleNavScroll);
      ticking = true;
    }
  }, { passive: true });

  // ─── SCROLL REVEAL ──────────────────────────
  const revealEls = document.querySelectorAll('.reveal, .fade-in');
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });

  // ─── STAGGER ANIMATIONS ─────────────────────
  const projectCards = document.querySelectorAll('.project-card.reveal');
  projectCards.forEach(function (card, i) {
    card.style.transitionDelay = (i * 100) + 'ms';
  });

  const skillCards = document.querySelectorAll('.skill-card.reveal');
  skillCards.forEach(function (card, i) {
    card.style.transitionDelay = (i * 80) + 'ms';
  });

  const timelineItems = document.querySelectorAll('.timeline__item.reveal');
  timelineItems.forEach(function (item, i) {
    item.style.transitionDelay = (i * 120) + 'ms';
  });

  // ─── MOBILE HAMBURGER ──────────────────────
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('nav-drawer');

  function openMobileDrawer() {
    drawer.classList.add('nav__drawer--open');
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
  }

  function closeMobileDrawer() {
    drawer.classList.remove('nav__drawer--open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
  }

  hamburger.addEventListener('click', function () {
    const isOpen = drawer.classList.contains('nav__drawer--open');
    isOpen ? closeMobileDrawer() : openMobileDrawer();
  });

  // Close drawer when clicking outside
  document.addEventListener('click', function (e) {
    if (
      drawer.classList.contains('nav__drawer--open') &&
      !drawer.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMobileDrawer();
    }
  });

  // ─── HERO INITIAL ANIMATIONS ────────────────
  window.addEventListener('load', function () {
    document.querySelectorAll('.hero .fade-in').forEach(function (el) {
      setTimeout(function () { el.classList.add('visible'); }, 100);
    });
  });

})();
