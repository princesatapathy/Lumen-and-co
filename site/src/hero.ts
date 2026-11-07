import { marqueeBold, marqueeItalic, reelColumns } from './content';
import { button, person, star } from './ui';

const reducedMotionOff = 'motion-reduce:animate-none';
const rise = `animate-rise ${reducedMotionOff}`;

// Reel tiles keep a 9:14 aspect ratio at every width (shrink-0 stops the flex column squashing them).
// Each column holds its tiles twice; translating -50% loops seamlessly. The copy is hidden under reduced motion.
const playIcon = `<svg width="16" height="16" viewBox="0 0 24 24" class="text-ink/35" aria-hidden="true"><path d="M6 4l14 8-14 8z" fill="currentColor"/></svg>`;
const tile = (title: string, isDuplicate: boolean) =>
  `<div ${isDuplicate ? 'aria-hidden="true"' : ''} class="${isDuplicate ? 'rdup motion-reduce:hidden ' : ''}flex aspect-[9/14] shrink-0 flex-col justify-between rounded-2xl bg-tile p-2.5 md:p-3.5">
    ${playIcon}
    <p class="font-display text-[15px] leading-[1.1] font-bold tracking-[-0.02em] text-ink/70 md:text-xl">${title}</p>
    <p class="w-fit rounded-full bg-ink/10 px-2 py-0.5 text-[10px] leading-4 font-semibold text-ink/65 md:text-xs">Passed by</p>
  </div>`;

// Three columns on phones and desktop; a fourth fills the wider tablet reel (hidden below md and from lg up).
const columnStyles = [
  'flex animate-feed-a',
  'flex animate-feed-b',
  'flex animate-feed-c',
  'hidden animate-feed-d md:flex lg:hidden',
];
const reelColumn = (titles: readonly string[], index: number) =>
  `<div class="min-w-0 flex-1 flex-col gap-3 self-start pb-3 ${columnStyles[index]} ${reducedMotionOff}">${titles.map((t) => tile(t, false)).join('')}${titles.map((t) => tile(t, true)).join('')}</div>`;

// Reel: full-bleed band under the copy on phones/tablets, the right 42% of the hero on desktop.
// A vertical (and, on desktop, left-edge) mask fades the tiles instead of overlay gradients.
const reelMask = '[mask-image:linear-gradient(transparent,#000_14%,#000_86%,transparent)] lg:[mask-image:linear-gradient(transparent,#000_14%,#000_86%,transparent),linear-gradient(90deg,transparent,#000_12%)] lg:[mask-composite:intersect]';
const reel = `<div class="relative h-[400px] sm:h-[460px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[42%]" aria-hidden="true">
  <div class="flex h-full gap-3 overflow-hidden px-3 ${reelMask}">${reelColumns.map(reelColumn).join('')}</div>
  <div class="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-ink px-4 py-2.5 text-[13px] leading-[17px] font-semibold whitespace-nowrap text-white lg:top-8 lg:text-sm">Most clips get skipped.</div>
  <figure class="absolute top-1/2 left-1/2 w-[min(46%,210px)] -translate-x-1/2 -translate-y-1/2 [transform:rotate(-3deg)] animate-float ${reducedMotionOff} lg:w-[min(50%,270px)]">
    <div class="aspect-[4/5] overflow-hidden rounded-[22px] border-[5px] border-white bg-[#C9CFE8] shadow-[0_30px_70px_-18px_rgba(33,63,137,.65)]">${person}</div>
    <figcaption class="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-5 py-1.5 font-accent text-xl whitespace-nowrap text-white italic shadow-lg lg:text-2xl">known.</figcaption>
  </figure>
</div>`;

export const hero = `<section id="top" class="relative overflow-hidden bg-paper lg:min-h-[calc(100svh-72px)]">
  <div class="flex flex-col items-start gap-9 px-(--g) pt-14 pb-14 lg:min-h-[inherit] lg:justify-center lg:py-24">
    <div class="flex w-full flex-col items-start gap-9 lg:w-[min(629px,calc(58vw-var(--g)-8px))]">
      <div class="${rise} flex items-center gap-2.5 rounded-full border border-[#DDD5C0] bg-sand px-[18px] py-[9px] text-[11px] leading-[normal] font-semibold tracking-[.08em] shadow-[0_0_28px_rgba(47,180,90,.16)] md:text-xs">
        <i class="size-[9px] shrink-0 rounded-full bg-[#2FB45A] animate-glow ${reducedMotionOff}"></i><span>PERSONAL BRANDING STUDIO</span>
      </div>
      <h1 style="animation-delay:.09s" class="${rise} -mt-2 font-display text-[min(19vw,104px)] leading-[.9] font-extrabold tracking-[-0.075em] md:text-[12.5vw] lg:text-[min(9.6vw,144px)]">
        Stand out.<br />Stay<br />
        <span class="relative inline-block leading-none font-accent font-extrabold text-primary italic tracking-[-0.02em]">known.<svg viewBox="0 0 300 14" fill="none" class="absolute top-[.96em] left-0 h-[.12em] w-[2.44em]" aria-hidden="true"><path pathLength="1" d="M3 9C65 3 165 12 297 5" stroke-width="4" stroke-linecap="round" style="stroke-dasharray:1;animation-delay:.75s" class="stroke-primary animate-scribble ${reducedMotionOff}"/></svg></span>
      </h1>
      <p style="animation-delay:.18s" class="${rise} text-lg leading-[27.9px] md:max-w-[672px] md:text-xl md:leading-[31px]">We shape the story, script the content and film it alongside you, so the right people recognise your name before you ever say hello.</p>
      <div style="animation-delay:.27s" class="${rise} flex flex-wrap gap-3">${button('Book intro call →', 'primary')}${button('See the work', 'secondary', { href: '#work' })}</div>
    </div>
  </div>
  ${reel}
</section>`;

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
export const marquee = `<section aria-label="What we do" class="flex flex-col gap-2 overflow-hidden bg-[#111] py-6 text-2xl md:py-7 md:text-[32px]">
  ${marqueeRow(marqueeBold, 'font-display text-[1em] leading-[1.34] font-bold tracking-[-0.03em]', 'animate-marquee')}
  ${marqueeRow(marqueeItalic, 'font-accent text-[1em] leading-[1.34] italic tracking-[-0.02em]', 'animate-marquee-reverse')}
</section>`;
