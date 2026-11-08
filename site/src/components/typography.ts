import type { AccentedHeading } from '../content/types';
import { star } from './icons';

// Small all-caps label used by eyebrows, step numbers and footer column headings.
export const labelText = 'text-xs leading-[normal] font-semibold tracking-[.14em]';
// Paragraph that introduces a section or a statement.
export const leadText = 'text-lg leading-[29.25px]';

export const eyebrow = (text: string, onDark = false) =>
  `<div class="flex items-center gap-2.5 ${labelText} ${onDark ? 'text-white/85' : 'text-muted'}">${star(onDark ? 'text-white' : 'text-primary')}<span>${text}</span></div>`;

const accentTone = {
  primary: 'font-extrabold tracking-[-0.02em] text-primary',
  white: 'font-extrabold tracking-[-0.02em] text-white',
  quote: 'font-normal tracking-[-0.01em] text-primary',
} as const;
const acc = (text: string, tone: keyof typeof accentTone = 'primary') =>
  `<span class="font-accent italic ${accentTone[tone]}">${text}</span>`;

// lead + accent + tail, with the accent word(s) in the accent style.
export const accented = ({ lead, accent, tail = '' }: AccentedHeading, tone: keyof typeof accentTone = 'primary') => `${lead}${acc(accent, tone)}${tail}`;

export const h2 = (html: string, extraClass = '') =>
  `<h2 class="font-display text-[clamp(40px,6.5vw,64px)] leading-none font-extrabold tracking-[-0.045em] ${extraClass}">${html}</h2>`;

export const h3 = (html: string, sizeClass = 'text-2xl leading-[30px] md:text-[28px] md:leading-[35px]') =>
  `<h3 class="font-display font-bold tracking-[-0.03em] ${sizeClass}">${html}</h3>`;

// Eyebrow + h2 (+ optional lead paragraph) block that opens most sections.
export const head = (eyebrowText: string, heading: AccentedHeading, lead?: string) =>
  `<div class="flex flex-col gap-6">${eyebrow(eyebrowText)}${h2(accented(heading))}${lead ? `<p class="${leadText}">${lead}</p>` : ''}</div>`;
