(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------
     Sparkles
  --------------------------------------------- */
  function buildSparkles(){
    const host = document.querySelector('.sparkles');
    if (!host) return;
    const frag = document.createDocumentFragment();
    const count = prefersReducedMotion ? 14 : 28;
    for (let i = 0; i < count; i++){
      const dot = document.createElement('span');
      dot.style.top = Math.random() * 100 + '%';
      dot.style.left = Math.random() * 100 + '%';
      dot.style.animationDuration = (3 + Math.random() * 4).toFixed(2) + 's';
      dot.style.animationDelay = (Math.random() * 5).toFixed(2) + 's';
      frag.appendChild(dot);
    }
    host.appendChild(frag);
  }

  function buildStarSparkles(){
    const host = document.querySelector('.sparkles');
    if (!host || prefersReducedMotion) return;
    const tints = ['', 'sparkle-star--blue', 'sparkle-star--pink'];
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 18; i++){
      const star = document.createElement('span');
      const tint = tints[i % tints.length];
      star.className = tint ? `sparkle-star ${tint}` : 'sparkle-star';
      star.style.top = Math.random() * 100 + '%';
      star.style.left = Math.random() * 100 + '%';
      star.style.animationDuration = (2.8 + Math.random() * 2.4).toFixed(2) + 's';
      star.style.animationDelay = (Math.random() * 4).toFixed(2) + 's';
      frag.appendChild(star);
    }
    host.appendChild(frag);
  }

  function buildDust(){
    const host = document.querySelector('.dust');
    if (!host || prefersReducedMotion) return;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 22; i++){
      const speck = document.createElement('span');
      speck.className = i % 2 === 0 ? 'dust--blue' : 'dust--pink';
      const size = 18 + Math.random() * 34;
      speck.style.width = speck.style.height = size + 'px';
      speck.style.top = Math.random() * 100 + '%';
      speck.style.left = Math.random() * 100 + '%';
      speck.style.setProperty('--dust-dx', (10 + Math.random() * 22) + 'px');
      speck.style.setProperty('--dust-dy', (10 + Math.random() * 22) + 'px');
      speck.style.animationDuration = (8 + Math.random() * 10).toFixed(2) + 's';
      speck.style.animationDelay = (Math.random() * 6).toFixed(2) + 's';
      frag.appendChild(speck);
    }
    host.appendChild(frag);
  }

  /* ---------------------------------------------
     Flapping butterflies (frame-sequence player)
  --------------------------------------------- */
  function initButterflies(){
    if (!window.ButterflyFlap) return;
    document.querySelectorAll('.flap-butterfly').forEach((el) => {
      const phase = parseInt(el.dataset.phase, 10) || 0;
      window.ButterflyFlap.mount(el, { phase });
    });
    const companion = document.getElementById('companionButterfly');
    if (companion){
      window.ButterflyFlap.mount(companion, { phase: 3 });
    }
  }

  /* ---------------------------------------------
     Sparkle dust trailing the companion butterfly
  --------------------------------------------- */
  function initSparkleTrail(){
    if (prefersReducedMotion) return;
    const companion = document.getElementById('companionButterfly');
    const trail = document.getElementById('sparkleTrail');
    if (!companion || !trail) return;

    const MAX_PARTICLES = 6;
    let alive = 0;

    setInterval(() => {
      if (alive >= MAX_PARTICLES) return;
      const rect = companion.getBoundingClientRect();
      if (rect.width === 0) return;

      const particle = document.createElement('span');
      particle.className = 'sparkle-particle';
      const jitterX = (Math.random() - 0.5) * rect.width * 0.8;
      const jitterY = (Math.random() - 0.5) * rect.height * 0.8;
      particle.style.left = (rect.left + rect.width / 2 + jitterX) + 'px';
      particle.style.top = (rect.top + rect.height / 2 + jitterY) + 'px';
      particle.style.width = particle.style.height = (5 + Math.random() * 5) + 'px';

      alive++;
      particle.addEventListener('animationend', () => {
        particle.remove();
        alive--;
      });
      trail.appendChild(particle);
    }, 500);
  }

  /* ---------------------------------------------
     Countdown to 26 Sep 2026, 20:00 (America/Sao_Paulo, UTC-3)
  --------------------------------------------- */
  function startCountdown(){
    const target = new Date('2026-09-26T20:00:00-03:00').getTime();
    const els = {
      days: document.getElementById('cd-days'),
      hours: document.getElementById('cd-hours'),
      minutes: document.getElementById('cd-minutes'),
      seconds: document.getElementById('cd-seconds')
    };
    const wrap = document.getElementById('countdown');
    const done = document.getElementById('countdownDone');
    if (!els.days || !wrap) return;

    const pad = (n) => String(n).padStart(2, '0');

    function tick(){
      const diff = target - Date.now();
      if (diff <= 0){
        wrap.hidden = true;
        if (done) done.hidden = false;
        clearInterval(timer);
        return;
      }
      const s = Math.floor(diff / 1000);
      els.days.textContent = pad(Math.floor(s / 86400));
      els.hours.textContent = pad(Math.floor((s % 86400) / 3600));
      els.minutes.textContent = pad(Math.floor((s % 3600) / 60));
      els.seconds.textContent = pad(s % 60);
    }

    tick();
    const timer = setInterval(tick, 1000);
  }

  /* ---------------------------------------------
     Scroll reveal
  --------------------------------------------- */
  function initReveal(){
    const targets = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || prefersReducedMotion){
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });

    targets.forEach((el) => io.observe(el));
  }

  /* ---------------------------------------------
     Scroll cue
  --------------------------------------------- */
  function initScrollCue(){
    const cue = document.getElementById('scrollCue');
    const target = document.getElementById('countdown-section');
    if (!cue || !target) return;
    cue.addEventListener('click', () => {
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    buildSparkles();
    buildStarSparkles();
    buildDust();
    initButterflies();
    initSparkleTrail();
    startCountdown();
    initReveal();
    initScrollCue();
  });
})();
