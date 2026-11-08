// The only runtime JS: mobile menu, single-open FAQ, scroll reveal.
import { initFaq } from './accordion';
import { initMenu } from './menu';
import { initReveal } from './reveal';

export function initBehavior() {
  initMenu();
  initFaq();
  initReveal();
}
