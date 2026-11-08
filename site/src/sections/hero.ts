import { bookIntroCallLabel } from '../content/brand';
import { heroContent } from '../content/hero';
import { button } from '../components/button';
import { reducedMotionOff, rise } from '../components/motion';
import { reel } from '../components/reel';

export const hero = `<section id="top" class="relative overflow-hidden bg-paper lg:min-h-[calc(100svh-72px)]">
  <div class="flex flex-col items-start gap-9 px-(--g) pt-14 pb-14 lg:min-h-[inherit] lg:justify-center lg:py-24">
    <div class="flex w-full flex-col items-start gap-9 lg:w-[min(629px,calc(58vw-var(--g)-8px))]">
      <div class="${rise} flex items-center gap-2.5 rounded-full border border-[#DDD5C0] bg-sand px-[18px] py-[9px] text-[11px] leading-[normal] font-semibold tracking-[.08em] shadow-[0_0_28px_rgba(47,180,90,.16)] md:text-xs">
        <i class="size-[9px] shrink-0 rounded-full bg-[#2FB45A] animate-glow ${reducedMotionOff}"></i><span>${heroContent.badge}</span>
      </div>
      <h1 style="animation-delay:.09s" class="${rise} -mt-2 font-display text-[min(19vw,104px)] leading-[.9] font-extrabold tracking-[-0.075em] md:text-[12.5vw] lg:text-[min(9.6vw,144px)]">
        ${heroContent.headlineLines.join('<br />')}<br />
        <span class="relative inline-block leading-none font-accent font-extrabold text-primary italic tracking-[-0.02em]">${heroContent.headlineAccent}<svg viewBox="0 0 300 14" fill="none" class="absolute top-[.96em] left-0 h-[.12em] w-[2.44em]" aria-hidden="true"><path pathLength="1" d="M3 9C65 3 165 12 297 5" stroke-width="4" stroke-linecap="round" style="stroke-dasharray:1;animation-delay:.75s" class="stroke-primary animate-scribble ${reducedMotionOff}"/></svg></span>
      </h1>
      <p style="animation-delay:.18s" class="${rise} text-lg leading-[27.9px] md:max-w-[672px] md:text-xl md:leading-[31px]">${heroContent.lead}</p>
      <div style="animation-delay:.27s" class="${rise} flex flex-wrap gap-3">${button(bookIntroCallLabel, 'primary')}${button(heroContent.secondaryCallToAction, 'secondary', { href: '#work' })}</div>
    </div>
  </div>
  ${reel}
</section>`;
