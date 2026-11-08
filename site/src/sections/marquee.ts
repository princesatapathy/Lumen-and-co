import { marqueeBold, marqueeItalic, marqueeLabel } from '../content/hero';
import { reducedMotionOff } from '../components/motion';
import { star } from '../components/icons';

// Two marquee rows, each with its item set 2 * SETS_PER_HALF times, translated -50% so it loops with no seam.
// One set is ~1000-1500 px, so half a row (3 sets) stays wider than any screen up to ~2900 px: the text never runs out.
// Item = text + a 2.6em star slot (star is 0.7em), so spacing scales with the font size.
const SETS_PER_HALF = 3;
const marqueeRow = (items: string[], spanClass: string, motionClass: string) => {
  const set = (hidden: boolean) =>
    items.map((t) => `<div ${hidden ? 'aria-hidden="true"' : ''} class="flex shrink-0 items-center text-white"><span class="${spanClass}">${t}</span><span class="flex w-[2.6em] justify-center">${star('size-[.7em] text-white', 16)}</span></div>`).join('');
  const sets = Array.from({ length: SETS_PER_HALF * 2 }, (_, i) => set(i > 0)).join('');
  // The wrapper is the hover target: hovering a row pauses that row only, like the reference.
  return `<div class="group shrink-0"><div class="flex w-max items-center ${motionClass} ${reducedMotionOff} group-hover:[animation-play-state:paused]">${sets}</div></div>`;
};
export const marquee = `<section aria-label="${marqueeLabel}" class="flex flex-col gap-2 overflow-hidden bg-[#111] py-6 text-2xl md:py-7 md:text-[32px]">
  ${marqueeRow(marqueeBold, 'font-display text-[1em] leading-[1.34] font-bold tracking-[-0.03em]', 'animate-marquee')}
  ${marqueeRow(marqueeItalic, 'font-accent text-[1em] leading-[1.34] italic tracking-[-0.02em]', 'animate-marquee-reverse')}
</section>`;
