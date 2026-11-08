import { reelColumns, reelContent } from '../content/hero';
import { person } from './icons';
import { reducedMotionOff } from './motion';

// Reel tiles keep a 9:14 aspect ratio at every width (shrink-0 stops the flex column squashing them).
// Each column holds its tiles twice; translating -50% loops seamlessly. The copy is hidden under reduced motion.
const playIcon = `<svg width="16" height="16" viewBox="0 0 24 24" class="text-ink/35" aria-hidden="true"><path d="M6 4l14 8-14 8z" fill="currentColor"/></svg>`;
const tile = (title: string, isDuplicate: boolean) =>
  `<div ${isDuplicate ? 'aria-hidden="true"' : ''} class="${isDuplicate ? 'rdup motion-reduce:hidden ' : ''}flex aspect-[9/14] shrink-0 flex-col justify-between rounded-2xl bg-tile p-2.5 md:p-3.5">
    ${playIcon}
    <p class="font-display text-[15px] leading-[1.1] font-bold tracking-[-0.02em] text-ink/70 md:text-xl">${title}</p>
    <p class="w-fit rounded-full bg-ink/10 px-2 py-0.5 text-[10px] leading-4 font-semibold text-ink/65 md:text-xs">${reelContent.tileTag}</p>
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
export const reel = `<div class="relative h-[400px] sm:h-[460px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[42%]" aria-hidden="true">
  <div class="flex h-full gap-3 overflow-hidden px-3 ${reelMask}">${reelColumns.map(reelColumn).join('')}</div>
  <div class="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-ink px-4 py-2.5 text-[13px] leading-[17px] font-semibold whitespace-nowrap text-white lg:top-8 lg:text-sm">${reelContent.tip}</div>
  <figure class="absolute top-1/2 left-1/2 w-[min(46%,210px)] -translate-x-1/2 -translate-y-1/2 [transform:rotate(-3deg)] animate-float ${reducedMotionOff} lg:w-[min(50%,270px)]">
    <div class="aspect-[4/5] overflow-hidden rounded-[22px] border-[5px] border-white bg-[#C9CFE8] shadow-[0_30px_70px_-18px_rgba(33,63,137,.65)]">${person}</div>
    <figcaption class="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-5 py-1.5 font-accent text-xl whitespace-nowrap text-white italic shadow-lg lg:text-2xl">${reelContent.caption}</figcaption>
  </figure>
</div>`;
