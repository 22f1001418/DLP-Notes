/* ============================================================
   DEEP LEARNING NOTES — Interaction & Animation Layer
   ============================================================ */

/* ── Scroll Reveal ─────────────────────────────────────────── */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

/* ── Progress Bar Animation ────────────────────────────────── */
const progressObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.track-progress-fill');
        if (fill) {
          const target = fill.dataset.width || '100';
          setTimeout(() => { fill.style.width = target + '%'; }, 100);
        }
        progressObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);
document.querySelectorAll('.track-card').forEach((el) => progressObserver.observe(el));

/* ── Notes Accordion ───────────────────────────────────────── */
document.querySelectorAll('.notes-group-header').forEach((header) => {
  header.addEventListener('click', () => {
    const group = header.closest('.notes-group');
    const isOpen = group.classList.contains('open');
    // Close all
    document.querySelectorAll('.notes-group').forEach((g) => g.classList.remove('open'));
    // Toggle clicked
    if (!isOpen) group.classList.add('open');
  });
});

// Open first group on load
const firstGroup = document.querySelector('.notes-group');
if (firstGroup) firstGroup.classList.add('open');

/* ── openGroup — called by track card buttons ──────────────── */
function openGroup(id) {
  // Close all, open the target, scroll to it
  document.querySelectorAll('.notes-group').forEach((g) => g.classList.remove('open'));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('open');
    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }
}

/* ── Stat Counter Animation ─────────────────────────────────── */
function animateCounter(el, target, duration = 1200) {
  const start = performance.now();
  function update(time) {
    const progress = Math.min((time - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.count, 10);
        if (!isNaN(target)) animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll('[data-count]').forEach((el) => counterObserver.observe(el));

/* ── Nav scroll state ──────────────────────────────────────── */
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 20
      ? 'rgba(5,5,8,0.95)'
      : 'rgba(5,5,8,0.8)';
  }, { passive: true });
}

/* ── Set current year & last updated ──────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const lastUpdatedEl = document.getElementById('last-updated');
if (lastUpdatedEl) {
  lastUpdatedEl.textContent = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
}
