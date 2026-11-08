import { clips, workContent } from '../content/sections';
import { head } from '../components/typography';
import { sectionShell } from '../components/layout';

const clip = ({ label, background }: (typeof clips)[number]) => `<div class="flex w-[291px] shrink-0 flex-col gap-3.5 lg:w-auto lg:flex-1">
  <div class="flex flex-col gap-2.5 rounded-[20px] border border-line bg-white p-3">
    <div class="flex items-center gap-2.5">
      <i class="size-8 shrink-0 rounded-full bg-[#C9CFE8]"></i>
      <div class="flex flex-1 flex-col gap-[5px]"><b class="block h-2 w-[90px] rounded-sm bg-line"></b><b class="block h-1.5 w-14 rounded-sm bg-sand"></b></div>
      <span class="rounded-md bg-[#4C5FE0] px-3 py-[5px] text-xs leading-[normal] font-semibold text-white">${workContent.profileButtonLabel}</span>
    </div>
    <div class="flex h-[430px] w-full items-center justify-center rounded-xl lg:h-[520px]" style="background:${background}">
      <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="32" fill="rgba(255,255,255,0.85)"/><path d="M26 20l20 12-20 12z" fill="#111"/></svg>
    </div>
    <div class="flex gap-2.5 pt-0.5 pb-1"><span class="size-[18px] rounded-full border-2 border-[#C9C4B6]"></span><span class="size-[18px] rounded-full border-2 border-[#C9C4B6]"></span><span class="size-[18px] rounded-full border-2 border-[#C9C4B6]"></span></div>
  </div>
  <a href="#book" class="text-[15px] font-semibold text-primary hover:underline">${label}</a>
</div>`;
export const work = `<section id="work" data-reveal class="${sectionShell} gap-12 overflow-hidden bg-paper">
  ${head(workContent.eyebrow, workContent.heading, workContent.lead)}
  <div class="mr-[calc(var(--g)*-1)] flex gap-4 lg:mr-0 lg:gap-6">${clips.map(clip).join('')}</div>
</section>`;
