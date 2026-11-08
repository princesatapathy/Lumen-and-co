import { bookIntroCallLabel, brandName, navLinks, openMenuLabel } from '../content/brand';
import { button } from '../components/button';

// data-menu-open on <header> drives the mobile menu and the burger/close icon (see behavior/menu.ts).
export const header = `<header data-site-header data-menu-open="false" class="group sticky top-0 z-50 bg-paper/90 backdrop-blur-md">
  <div class="flex h-[65px] items-center justify-between border-b border-line px-(--g) md:h-[73px]">
    <a href="#top" class="font-display text-lg leading-7 font-extrabold tracking-[-0.03em] focus-visible:outline-primary">${brandName}</a>
    <nav aria-label="Primary" class="hidden gap-10 lg:flex">
      ${navLinks.map(({ label, href }) => `<a href="${href}" class="text-[15px] leading-6 font-medium transition-colors duration-150 hover:text-primary motion-reduce:transition-none">${label}</a>`).join('')}
    </nav>
    <div class="flex items-center gap-4">
      ${button(bookIntroCallLabel, 'primary', { size: 'small' })}
      <button type="button" data-menu-toggle aria-expanded="false" aria-controls="mobile-menu" aria-label="${openMenuLabel}" class="-mr-2 flex size-11 cursor-pointer items-center justify-center lg:hidden">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="group-data-[menu-open=true]:hidden" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="hidden group-data-[menu-open=true]:block" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      </button>
    </div>
  </div>
  <div id="mobile-menu" class="hidden flex-col border-b border-line bg-paper px-(--g) pt-2 pb-7 group-data-[menu-open=true]:flex lg:hidden!">
    ${navLinks.map(({ label, href }) => `<a href="${href}" class="text-[19px] leading-[52px] font-semibold">${label}</a>`).join('')}
    ${button(bookIntroCallLabel, 'primary', { extraClass: 'mt-3.5 w-full' })}
  </div>
</header>`;
