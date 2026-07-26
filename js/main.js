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
    startCountdown();
    initReveal();
    initScrollCue();
  });
})();
