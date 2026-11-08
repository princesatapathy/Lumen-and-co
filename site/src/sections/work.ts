import { clips, workContent } from '../content/sections';
import { head } from '../components/typography';
import { sectionShell } from '../components/layout';

// Cards are 9:16. Below lg they form a swipe row that bleeds to the screen edge.
const clip = ({ label, background }: (typeof clips)[number]) => `<div class="flex w-[min(78vw,320px)] shrink-0 snap-start flex-col lg:w-auto">
  <div class="flex aspect-[9/16] flex-col gap-2.5 rounded-[20px] border border-line bg-white p-3">
    <div class="flex items-center gap-2.5">
      <i class="size-8 shrink-0 rounded-full bg-[#C9CFE8]"></i>
      <div class="flex flex-1 flex-col gap-[5px]"><b class="block h-2 w-[90px] rounded-sm bg-line"></b><b class="block h-1.5 w-14 rounded-sm bg-sand"></b></div>
      <span class="rounded-md bg-[#4C5FE0] px-3 py-[5px] text-xs leading-[normal] font-semibold text-white">${workContent.profileButtonLabel}</span>
    </div>
    <div class="flex min-h-0 w-full flex-1 items-center justify-center rounded-xl" style="background:${background}">
      <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="32" fill="rgba(255,255,255,0.85)"/><path d="M26 20l20 12-20 12z" fill="#111"/></svg>
    </div>
    <div class="flex gap-2.5 pt-0.5 pb-1"><span class="size-[18px] rounded-full border-2 border-[#C9C4B6]"></span><span class="size-[18px] rounded-full border-2 border-[#C9C4B6]"></span><span class="size-[18px] rounded-full border-2 border-[#C9C4B6]"></span></div>
  </div>
  <a href="#book" class="mt-3 self-start text-[15px] leading-6 font-semibold text-primary hover:underline">${label}</a>
</div>`;
export const work = `<section id="work" data-reveal class="${sectionShell} gap-12 bg-paper">
  ${head(workContent.eyebrow, workContent.heading, workContent.lead)}
  <div class="mx-[calc(var(--g)*-1)] flex snap-x snap-mandatory scroll-px-(--g) gap-4 overflow-x-auto px-(--g) pb-2 lg:mx-0 lg:grid lg:snap-none lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">${clips.map(clip).join('')}</div>
</section>`;
