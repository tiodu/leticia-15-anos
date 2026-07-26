(() => {
  'use strict';

  const FRAME_COUNT = 32;
  const FPS = 14;
  const FRAME_MS = 1000 / FPS;

  const framePath = (i) => `assets/butterflies/flap/f${String(i).padStart(2, '0')}.webp`;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const instances = [];
  let rafId = null;
  let framesReady = false;

  function preloadFrames(onDone) {
    let loaded = 0;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === FRAME_COUNT) onDone();
      };
      img.src = framePath(i);
    }
  }

  function tick(now) {
    instances.forEach((inst) => {
      if (now - inst.last >= FRAME_MS) {
        inst.last = now;
        inst.frame = (inst.frame + 1) % FRAME_COUNT;
        inst.el.style.backgroundImage = `url(${framePath(inst.frame)})`;
      }
    });
    rafId = requestAnimationFrame(tick);
  }

  function startLoopIfNeeded() {
    if (rafId === null && instances.length) {
      rafId = requestAnimationFrame(tick);
    }
  }

  /**
   * Turns an element into a flapping-butterfly frame player.
   * `phase` (0..FRAME_COUNT-1) staggers instances so they don't flap in unison.
   */
  function mount(el, { phase = 0 } = {}) {
    el.style.backgroundRepeat = 'no-repeat';
    el.style.backgroundPosition = 'center';
    el.style.backgroundSize = 'contain';

    const startFrame = phase % FRAME_COUNT;
    el.style.backgroundImage = `url(${framePath(startFrame)})`;

    if (prefersReducedMotion) return;

    if (framesReady) {
      instances.push({ el, frame: startFrame, last: performance.now() });
      startLoopIfNeeded();
    } else {
      pending.push({ el, phase: startFrame });
    }
  }

  const pending = [];

  preloadFrames(() => {
    framesReady = true;
    pending.forEach(({ el, phase }) => {
      instances.push({ el, frame: phase, last: performance.now() });
    });
    pending.length = 0;
    startLoopIfNeeded();
  });

  window.ButterflyFlap = { mount, FRAME_COUNT };
})();
