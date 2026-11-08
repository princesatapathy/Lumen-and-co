import { bookIntroCallLabel } from '../content/brand';
import { plans, plansContent } from '../content/sections';
import { button } from '../components/button';
import { h3, head } from '../components/typography';
import { sectionShell } from '../components/layout';

const check = (text: string, featured: boolean) => `<li class="flex items-start gap-3">
  <svg width="20" height="20" viewBox="0 0 22 22" class="mt-0.5 shrink-0" aria-hidden="true"><circle cx="11" cy="11" r="11" class="${featured ? 'fill-white' : 'fill-primary'}"/><path d="M6 11.5l3.2 3.2L16 8" stroke-width="2" fill="none" class="${featured ? 'stroke-primary' : 'stroke-white'}"/></svg>
  <span class="text-[17px] leading-[23.375px] ${featured ? 'text-white' : 'text-ink'}">${text}</span>
</li>`;
const plan = ({ name, tagline, featured, items }: (typeof plans)[number]) => `<div class="relative flex flex-1 flex-col rounded-[20px] border p-8 md:p-10 lg:min-h-[503px] ${featured ? 'on-dark border-primary bg-primary text-white' : 'border-line bg-card'}">
  ${featured ? `<div class="absolute -top-3 right-6 rounded-full bg-white px-3.5 py-1 text-xs leading-4 font-semibold tracking-[.1em] text-primary">${plansContent.featuredBadge}</div>` : ''}
  ${h3(name, `text-[30px] leading-9 ${featured ? 'text-white' : ''}`)}
  <p class="mt-1.5 leading-[27.2px] ${featured ? 'text-white/85' : ''}">${tagline}</p>
  <ul class="mt-7 mb-9 flex flex-col gap-3.5">${items.map((text) => check(text, featured)).join('')}</ul>
  ${button(bookIntroCallLabel, featured ? 'white' : 'secondary', { extraClass: 'mt-auto' })}
</div>`;
export const plansSection = `<section id="plans" data-reveal class="${sectionShell} gap-12 bg-white">
  ${head(plansContent.eyebrow, plansContent.heading, plansContent.lead)}
  <div class="flex flex-col gap-7 md:flex-row">${plans.map(plan).join('')}</div>
</section>`;
