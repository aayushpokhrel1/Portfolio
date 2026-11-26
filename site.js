const fadeEls = document.querySelectorAll('.fade-in');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  // threshold must stay 0: a ratio like 0.1 can NEVER be reached by a container
  // taller than 10x the viewport (the Projects list), so that section stayed
  // at opacity 0 forever. rootMargin does the "a bit past the edge" job instead.
  }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
  fadeEls.forEach(el => observer.observe(el));

  // Safety net, because the cost of this observer failing is not a missing
  // animation, it is a whole section of the site rendering blank (which is
  // exactly what shipped). Anything scrolled into view is revealed on scroll
  // whether or not the observer ever said so, and this stops once everything
  // is visible. Do NOT remove: the CSS hides content, so JS is the only thing
  // that can ever show it.
  const net = () => {
    let left = 0;
    fadeEls.forEach(el => {
      if (el.classList.contains('visible')) return;
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) el.classList.add('visible');
      else left++;
    });
    if (!left) window.removeEventListener('scroll', net);
  };
  window.addEventListener('scroll', net, { passive: true });
  window.addEventListener('load', net);

  // Nav goes transparent while the dark hero is in view, solid paper after.
  const nav = document.querySelector('nav');
  const hero = document.getElementById('hero');
  if (nav && hero) {
    const navObserver = new IntersectionObserver(([entry]) => {
      nav.classList.toggle('nav--hero', entry.isIntersecting);
    }, { rootMargin: '-52px 0px 0px 0px', threshold: 0 });
    navObserver.observe(hero);
  }
} else {
  // Older engines: reveal everything so nothing stays hidden.
  fadeEls.forEach(el => el.classList.add('visible'));
}

// Mobile menu drawer toggle.
const navEl = document.querySelector('nav');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');
if (navEl && navToggle && navMenu) {
  const setMenu = (open) => {
    navEl.classList.toggle('menu-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.textContent = open ? 'Close' : 'Menu';
  };
  navToggle.addEventListener('click', () => setMenu(!navEl.classList.contains('menu-open')));
  navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navEl.classList.contains('menu-open')) setMenu(false);
  });
  document.addEventListener('click', (e) => {
    if (navEl.classList.contains('menu-open') && !navEl.contains(e.target)) setMenu(false);
  });
}

// Click-to-enlarge lightbox. Without JS the links open the full image directly.
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const lightboxImg = lightbox.querySelector('img');
  const lightboxClose = lightbox.querySelector('.lightbox-close');
  const lightboxPlaceholder = lightboxImg.src;
  let lastFocused = null;
  let thumb = null; // the clicked thumbnail <img>, which the lightbox image morphs from and back to
  // View Transitions where supported and motion is allowed: the thumbnail morphs into the
  // lightbox image (one shared view-transition-name, handed from one to the other inside the
  // transition). Otherwise a plain class toggle, and CSS fades the image in.
  const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const useVT = () => !!document.startViewTransition && !reducedMotion();
  const NAME = 'lightbox-shot';
  const show = (open) => {
    lightbox.classList.toggle('open', open);
    lightbox.setAttribute('aria-hidden', String(!open));
  };
  const openLightbox = async (src, alt, fromImg) => {
    lastFocused = document.activeElement;
    thumb = fromImg;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    if (useVT() && thumb) {
      lightbox.classList.add('vt');
      try { await lightboxImg.decode(); } catch (_) {}
      thumb.style.viewTransitionName = NAME;
      document.startViewTransition(() => {
        thumb.style.viewTransitionName = '';
        lightboxImg.style.viewTransitionName = NAME;
        show(true);
      });
    } else {
      lightbox.classList.remove('vt');
      show(true);
    }
    requestAnimationFrame(() => lightboxClose.focus());
  };
  const resetDrag = () => {
    lightbox.classList.remove('dragging');
    lightboxImg.style.transform = '';
    lightbox.style.backgroundColor = '';
  };
  const closeLightbox = () => {
    // The src is cleared only after the exit has finished: clearing it first (as this
    // used to) blanked the image in the outgoing snapshot, so it vanished before fading.
    const done = () => { lightboxImg.src = lightboxPlaceholder; };
    if (useVT() && thumb && lightbox.classList.contains('vt')) {
      const vt = document.startViewTransition(() => {
        lightboxImg.style.viewTransitionName = '';
        thumb.style.viewTransitionName = NAME;
        resetDrag();
        show(false);
      });
      vt.finished.finally(() => { if (thumb) thumb.style.viewTransitionName = ''; done(); });
    } else {
      resetDrag();
      show(false);
      done();
    }
    if (lastFocused) lastFocused.focus();
  };
  document.querySelectorAll('.shot-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const img = link.querySelector('img');
      openLightbox(link.getAttribute('href'), img ? img.alt : '', img);
    });
  });
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

  // Swipe down to close on touch. The image tracks the finger 1:1 and the backdrop thins
  // with it (one value drives both). Dismiss on distance OR a fast flick, since a
  // distance-only threshold ignores flicks; otherwise snap back quickly.
  let drag = null;
  lightboxImg.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'touch' || !lightbox.classList.contains('open')) return;
    try { lightboxImg.setPointerCapture(e.pointerId); } catch (_) {} // capture is a nicety, not a precondition
    drag = { y0: e.clientY, t0: e.timeStamp, y: 0, last: [{ y: 0, t: e.timeStamp }] };
    lightbox.classList.add('dragging');
  });
  lightboxImg.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const raw = e.clientY - drag.y0;
    drag.y = raw > 0 ? raw : raw * 0.2; // upward has nowhere to go: rubber-band it
    drag.last.push({ y: drag.y, t: e.timeStamp });
    if (drag.last.length > 5) drag.last.shift();
    lightboxImg.style.transform = 'translateY(' + drag.y + 'px)';
    const fade = Math.max(0, 1 - Math.max(0, drag.y) / (innerHeight * 0.6));
    lightbox.style.backgroundColor = 'rgba(20,18,15,' + (0.92 * fade) + ')';
  });
  const endDrag = () => {
    if (!drag) return;
    const a = drag.last[0], b = drag.last[drag.last.length - 1];
    const velocity = (b.y - a.y) / Math.max(1, b.t - a.t); // px per ms, recent samples only
    const dismiss = drag.y > innerHeight * 0.18 || (drag.y > 20 && velocity > 0.11);
    drag = null;
    if (dismiss) { closeLightbox(); return; }
    lightbox.classList.remove('dragging');
    lightboxImg.style.transition = 'transform 0.24s var(--ease-out)';
    lightboxImg.style.transform = '';
    lightbox.style.backgroundColor = '';
    setTimeout(() => { lightboxImg.style.transition = ''; }, 260);
  };
  lightboxImg.addEventListener('pointerup', endDrag);
  lightboxImg.addEventListener('pointercancel', endDrag);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });
}

// Reading progress: fill the top forest thread as the page scrolls.
const progress = document.getElementById('scrollProgress');
if (progress) {
  let ticking = false;
  const updateProgress = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    progress.style.transform = 'scaleX(' + (max > 0 ? h.scrollTop / max : 0) + ')';
    ticking = false;
  };
  updateProgress();
  addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(updateProgress); ticking = true; }
  }, { passive: true });
  addEventListener('resize', updateProgress, { passive: true });
}

// Active-section nav: mark the link for whichever section holds the middle band.
// Nav links are page links since the three-page split, so a bare href^="#" selector
// matched nothing. A link maps to a section here when it is "this page#id", or when it
// is a page whose name is a section id on this page (work.html -> the index's #work).
const pagePath = (p) => p.replace(/index\.html$/, '');
const navMap = {};
document.querySelectorAll('.nav-links a').forEach(a => {
  const url = new URL(a.href);
  if (url.hash && pagePath(url.pathname) === pagePath(location.pathname)) navMap[url.hash.slice(1)] = a;
  else if (!url.hash) {
    const file = url.pathname.split('/').pop();
    const id = file.endsWith('.html') && file.slice(0, -5);
    if (id && pagePath(url.pathname) !== pagePath(location.pathname)) navMap[id] = a;
  }
});
const spySections = document.querySelectorAll('section[id]');
if ('IntersectionObserver' in window && spySections.length) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const link = navMap[e.target.id];
      if (!link || !e.isIntersecting) return;
      Object.values(navMap).forEach(l => { l.classList.remove('active'); l.removeAttribute('aria-current'); });
      link.classList.add('active');
      link.setAttribute('aria-current', 'true');
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  spySections.forEach(s => spy.observe(s));
}

// Copy email to the clipboard with a quiet, self-reverting confirmation.
document.querySelectorAll('.contact-copy').forEach(btn => {
  btn.addEventListener('click', async () => {
    const email = btn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
    } catch (_) {
      const ta = document.createElement('textarea');
      ta.value = email;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
    }
    btn.classList.add('copied');
    btn.textContent = 'Copied';
    clearTimeout(btn._revert);
    btn._revert = setTimeout(() => {
      btn.classList.remove('copied');
      btn.textContent = btn.dataset.label;
    }, 1600);
  });
});
