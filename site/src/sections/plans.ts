import { bookIntroCallLabel } from '../content/brand';
import { plans, plansContent } from '../content/sections';
import { button } from '../components/button';
import { h3, head } from '../components/typography';
import { sectionShell } from '../components/layout';

const check = (text: string, featured: boolean) => `<div class="flex items-start gap-3">
  <svg width="22" height="22" viewBox="0 0 22 22" class="shrink-0" aria-hidden="true"><circle cx="11" cy="11" r="11" class="${featured ? 'fill-white' : 'fill-primary'}"/><path d="M6 11.5l3.2 3.2L16 8" stroke-width="2" fill="none" class="${featured ? 'stroke-primary' : 'stroke-white'}"/></svg>
  <p class="text-base leading-[23.4px] ${featured ? 'text-white/90' : ''}">${text}</p>
</div>`;
const plan = ({ name, tagline, featured, items }: (typeof plans)[number]) => `<div class="relative flex min-h-[503px] flex-1 flex-col gap-5 rounded-[20px] border px-6 py-8 md:px-7 md:py-10 lg:p-10 ${featured ? 'on-dark border-primary bg-primary text-white' : 'border-line bg-card'}">
  ${featured ? `<div class="absolute -top-3 right-6 rounded-full border border-primary bg-white px-3.5 py-[5px] text-xs leading-[normal] font-semibold tracking-[.1em] text-primary">${plansContent.featuredBadge}</div>` : ''}
  ${h3(name, `text-[30px] leading-9 ${featured ? 'text-white' : ''}`)}
  <p class="leading-[27.6px] ${featured ? 'text-white/90' : ''}">${tagline}</p>
  <div class="flex flex-1 flex-col gap-3.5 pt-1.5 pb-2.5">${items.map((t) => check(t, featured)).join('')}</div>
  ${button(bookIntroCallLabel, featured ? 'white' : 'secondary', { extraClass: 'mt-auto' })}
</div>`;
export const plansSection = `<section id="plans" data-reveal class="${sectionShell} gap-12 bg-white">
  ${head(plansContent.eyebrow, plansContent.heading, plansContent.lead)}
  <div class="flex flex-col gap-7 md:flex-row md:gap-5 lg:gap-7">${plans.map(plan).join('')}</div>
</section>`;
