// One FAQ item open at a time; data-open on .faq is the single source of state (see sections/faq.ts).
export function initFaq() {
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
