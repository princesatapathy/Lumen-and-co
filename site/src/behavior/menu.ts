import { closeMenuLabel, openMenuLabel } from '../content/brand';
import { requireElement } from './require-element';

// data-menu-open on <header> drives the mobile menu and the burger/close icon (see sections/header.ts).
export function initMenu() {
  const header = requireElement<HTMLElement>('[data-site-header]');
  const toggle = requireElement<HTMLButtonElement>('[data-menu-toggle]');
  const setOpen = (open: boolean) => {
    header.dataset.menuOpen = String(open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? closeMenuLabel : openMenuLabel);
  };
  toggle.addEventListener('click', () => setOpen(header.dataset.menuOpen !== 'true'));
  requireElement('#mobile-menu').addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) setOpen(false);
  });
}
