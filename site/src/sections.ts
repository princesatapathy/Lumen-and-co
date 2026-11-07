import { clips, deliverablesLeft, deliverablesRight, plans, steps } from './content';
import { acc, button, eyebrow, h2, h3, head, person, sectionShell, star } from './ui';

// data-reveal: behavior.ts fades each direct child in as it scrolls into view.

export const statement = `<section data-reveal class="${sectionShell} gap-8 bg-white lg:flex-row lg:items-start lg:justify-between">
  <div class="flex flex-col gap-6 lg:w-[560px]">${eyebrow('OUR TAKE')}${h2(`Reach doesn’t open doors. ${acc('Recall')} does.`)}</div>
  <div class="flex flex-col gap-6 lg:w-[474px] lg:pt-11">
    <p class="text-lg leading-[29.25px]">Most content chases impressions. We build yours around one idea: that a stranger should be able to describe you after a single scroll. Your voice, your point of view, the one thing you stand for.</p>
    <p class="text-lg leading-[29.25px]">Numbers follow once people remember you. What we care about is what comes next: real conversations, new clients, and the kind of work you actually want to be doing.</p>
  </div>
</section>`;

const clip = ({ label, background }: (typeof clips)[number]) => `<div class="flex w-[291px] shrink-0 flex-col gap-3.5 lg:w-auto lg:flex-1">
  <div class="flex flex-col gap-2.5 rounded-[20px] border border-line bg-white p-3">
    <div class="flex items-center gap-2.5">
      <i class="size-8 shrink-0 rounded-full bg-[#C9CFE8]"></i>
      <div class="flex flex-1 flex-col gap-[5px]"><b class="block h-2 w-[90px] rounded-sm bg-line"></b><b class="block h-1.5 w-14 rounded-sm bg-sand"></b></div>
      <span class="rounded-md bg-[#4C5FE0] px-3 py-[5px] text-xs leading-[normal] font-semibold text-white">View profile</span>
    </div>
    <div class="flex h-[430px] w-full items-center justify-center rounded-xl lg:h-[520px]" style="background:${background}">
      <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="32" fill="rgba(255,255,255,0.85)"/><path d="M26 20l20 12-20 12z" fill="#111"/></svg>
    </div>
    <div class="flex gap-2.5 pt-0.5 pb-1"><span class="size-[18px] rounded-full border-2 border-[#C9C4B6]"></span><span class="size-[18px] rounded-full border-2 border-[#C9C4B6]"></span><span class="size-[18px] rounded-full border-2 border-[#C9C4B6]"></span></div>
  </div>
  <a href="#book" class="text-[15px] font-semibold text-primary hover:underline">${label}</a>
</div>`;
export const work = `<section id="work" data-reveal class="${sectionShell} gap-12 overflow-hidden bg-paper">
  ${head('01 — WORK', `Recent ${acc('work.')}`, 'A few pieces from clients across coaching, health and tech. Placeholder clips for now; real ones land here later.')}
  <div class="mr-[calc(var(--g)*-1)] flex gap-4 lg:mr-0 lg:gap-6">${clips.map(clip).join('')}</div>
</section>`;

const deliverable = ({ lead, rest }: { lead: string; rest: string }) =>
  `<div class="flex items-start gap-3.5 border-t border-line py-5">${star('mt-1.5 shrink-0 text-primary')}<p class="text-[17px] leading-[23.4px]"><b class="font-semibold text-ink">${lead}</b> ${rest}</p></div>`;
export const deliverables = `<section data-reveal class="${sectionShell} gap-12 bg-white">
  ${head('02 — WHAT YOU GET', `Everything your brand ${acc('needs.')}`)}
  <div class="flex flex-col md:flex-row md:gap-12">
    <div class="flex flex-1 flex-col">${deliverablesLeft.map(deliverable).join('')}</div>
    <div class="flex flex-1 flex-col">${deliverablesRight.map(deliverable).join('')}</div>
  </div>
</section>`;

// Desktop grid is 6 columns: first three cards span 2, last two span 3. Tablet: 2 columns, last card full width.
const step = ({ title, body }: (typeof steps)[number], index: number) => {
  const layout = index >= 3 ? 'lg:col-span-3 lg:min-h-[228px]' : 'lg:col-span-2 lg:min-h-[283px]';
  const lastOnTablet = index === steps.length - 1 ? 'md:col-span-2' : '';
  return `<div class="flex min-h-[250px] flex-col gap-3.5 rounded-[20px] border border-line bg-white px-6 py-8 md:min-h-[236px] md:p-8 ${layout} ${lastOnTablet}">
    <div class="text-xs leading-[normal] font-semibold tracking-[.14em] text-primary">STEP ${String(index + 1).padStart(2, '0')}</div>
    ${h3(title)}
    <p class="leading-[27.6px]">${body}</p>
  </div>`;
};
export const process = `<section id="process" data-reveal class="${sectionShell} gap-12 bg-paper">
  ${head('03 — HOW IT WORKS', `From first call to a brand people ${acc('recall.')}`, 'A clear system, step by step. No guesswork.')}
  <div class="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-6">${steps.map(step).join('')}</div>
</section>`;

const check = (text: string, featured: boolean) => `<div class="flex items-start gap-3">
  <svg width="22" height="22" viewBox="0 0 22 22" class="shrink-0" aria-hidden="true"><circle cx="11" cy="11" r="11" class="${featured ? 'fill-white' : 'fill-primary'}"/><path d="M6 11.5l3.2 3.2L16 8" stroke-width="2" fill="none" class="${featured ? 'stroke-primary' : 'stroke-white'}"/></svg>
  <p class="text-base leading-[23.4px] ${featured ? 'text-white/90' : ''}">${text}</p>
</div>`;
const plan = ({ name, tagline, featured, items }: (typeof plans)[number]) => `<div class="relative flex min-h-[503px] flex-1 flex-col gap-5 rounded-[20px] border px-6 py-8 md:px-7 md:py-10 lg:p-10 ${featured ? 'on-dark border-primary bg-primary text-white' : 'border-line bg-card'}">
  ${featured ? '<div class="absolute -top-3 right-6 rounded-full border border-primary bg-white px-3.5 py-[5px] text-xs leading-[normal] font-semibold tracking-[.1em] text-primary">MOST PICKED</div>' : ''}
  ${h3(name, `text-[30px] leading-9 ${featured ? 'text-white' : ''}`)}
  <p class="leading-[27.6px] ${featured ? 'text-white/90' : ''}">${tagline}</p>
  <div class="flex flex-1 flex-col gap-3.5 pt-1.5 pb-2.5">${items.map((t) => check(t, featured)).join('')}</div>
  ${button('Book intro call →', featured ? 'white' : 'secondary', { extraClass: 'mt-auto' })}
</div>`;
export const plansSection = `<section id="plans" data-reveal class="${sectionShell} gap-12 bg-white">
  ${head('04 — PLANS', `Guidance, or ${acc('done for you.')}`, 'Two ways to work together. We will work out which one fits you best on a call, with no pressure at all.')}
  <div class="flex flex-col gap-7 md:flex-row md:gap-5 lg:gap-7">${plans.map(plan).join('')}</div>
</section>`;

export const band = `<section data-reveal class="on-dark flex flex-col gap-7 bg-primary px-(--g) py-20 md:py-28 lg:flex-row lg:items-center lg:justify-between lg:py-24">
  <div class="flex flex-col gap-[22px] lg:w-[420px]">
    <div class="self-start rounded-full border border-white/60 px-4 py-[7px] text-[13px] leading-[17px] font-semibold text-white">a fair warning →</div>
    ${h2(`Give it ${acc('a season.', 'white')}`, 'text-white')}
  </div>
  <p class="text-lg leading-[30px] text-white/90 lg:w-[490px] lg:text-xl lg:leading-[32.5px]">A personal brand does not form in a fortnight. People need time to notice you, recall you and begin to trust you. That is why we ask for three months. By then there is enough work and enough data to see what is landing, and to do more of it.</p>
</section>`;

export const about = `<section id="about" data-reveal class="${sectionShell} gap-10 bg-paper md:flex-row md:items-start md:justify-between">
  <div class="about-copy flex flex-col items-start gap-6 md:flex-1 lg:w-[560px] lg:flex-none">
    ${eyebrow('05 — WHO RUNS THIS')}
    <blockquote class="font-accent text-[34px] leading-[38px] tracking-[-0.01em] italic md:text-[38px] md:leading-[42px] lg:text-[52px] lg:leading-[57.2px]">“I began by sharing everything I knew, and slowly learned that people don’t follow content. They ${acc('remember people.', 'quote')}”</blockquote>
    <p class="leading-[27.6px]">I started out explaining ideas in plain pictures, a few minutes at a time. Years on, people still bring up one clip they saw and remember. That is when I understood what a personal brand really is.</p>
    <p class="leading-[27.6px]">Later I changed direction and started again from zero. It taught me how a brand is built: a real story, a clear message and a simple system.</p>
    <p class="leading-[27.6px]">Now the studio does the same for others.</p>
    <div class="flex flex-wrap gap-3">${button('Book intro call →', 'primary')}${button('Say hello on LinkedIn', 'secondary', { href: '#' })}</div>
  </div>
  <div class="about-photo flex flex-col gap-3 md:w-[260px] md:shrink-0 lg:w-[437px]">
    <div class="flex aspect-[437/546] items-end overflow-hidden rounded-[20px] bg-[#C9CFE8]">${person}</div>
    <p class="text-sm leading-5">Founder, Lumen &amp; Co.</p>
  </div>
</section>`;

export const cta = `<section id="book" data-reveal class="${sectionShell} gap-12 bg-paper">
  <div class="on-dark flex min-h-[520px] flex-col items-center justify-center gap-6 rounded-[28px] bg-primary px-6 py-16 text-center md:px-12 md:py-24 lg:min-h-[535px]">
    ${eyebrow('07 — BOOK A CALL', true)}
    ${h2(`20 minutes. No pitch.<br />${acc('Just clarity.', 'white')}`, 'text-white')}
    <p class="max-w-[520px] text-lg leading-[29.25px] text-white/90">A relaxed conversation about how we could build your personal brand together.</p>
    ${button('Book a free call →', 'white')}
  </div>
</section>`;
