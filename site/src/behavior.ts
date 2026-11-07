// The only runtime JS: mobile menu, single-open FAQ, scroll reveal.

const must = <T extends Element>(selector: string): T => {
  const el = document.querySelector<T>(selector);
  if (!el) throw new Error(`Missing required element: ${selector}`);
  return el;
};

function initMenu() {
  const header = must<HTMLElement>('[data-site-header]');
  const toggle = must<HTMLButtonElement>('[data-menu-toggle]');
  const setOpen = (open: boolean) => {
    header.dataset.menuOpen = String(open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  toggle.addEventListener('click', () => setOpen(header.dataset.menuOpen !== 'true'));
  must('#mobile-menu').addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) setOpen(false);
  });
}

function initFaq() {
  const items = [...document.querySelectorAll<HTMLElement>('.faq')];
  const setOpen = (item: HTMLElement, open: boolean) => {
    item.dataset.open = String(open);
    item.querySelector('.faq-q')!.setAttribute('aria-expanded', String(open));
  };
  for (const item of items) {
    item.querySelector('.faq-q')!.addEventListener('click', () => {
      const willOpen = item.dataset.open !== 'true';
      items.forEach((other) => setOpen(other, false));
      setOpen(item, willOpen);
    });
  }
}

function initReveal() {
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

export function initBehavior() {
  initMenu();
  initFaq();
  initReveal();
}
