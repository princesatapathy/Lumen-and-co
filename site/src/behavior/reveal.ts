// Scroll reveal: adds .reveal to a [data-reveal] section's children, then .in when they enter the viewport.
// Skipped entirely under reduced motion, so all content stays shown.
export function initReveal() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.12 },
  );
  document.querySelectorAll('[data-reveal] > *').forEach((el) => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}
