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
  // Use the View Transitions API for a smooth crossfade where supported;
  // fall back to the plain class toggle otherwise or when motion is reduced.
  const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const withVT = (fn) => {
    if (document.startViewTransition && !reducedMotion()) document.startViewTransition(fn);
    else fn();
  };
  const openLightbox = (src, alt) => {
    lastFocused = document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    withVT(() => {
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
    });
    requestAnimationFrame(() => lightboxClose.focus());
  };
  const closeLightbox = () => {
    withVT(() => {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
    });
    lightboxImg.src = lightboxPlaceholder;
    if (lastFocused) lastFocused.focus();
  };
  document.querySelectorAll('.shot-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const img = link.querySelector('img');
      openLightbox(link.getAttribute('href'), img ? img.alt : '');
    });
  });
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
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
const navMap = {};
document.querySelectorAll('.nav-links a[href^="#"]').forEach(a => {
  navMap[a.getAttribute('href').slice(1)] = a;
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
