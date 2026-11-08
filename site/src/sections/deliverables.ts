import { deliverablesContent, deliverablesLeft, deliverablesRight } from '../content/sections';
import { star } from '../components/icons';
import { head } from '../components/typography';
import { sectionShell } from '../components/layout';

const deliverable = ({ lead, rest }: { lead: string; rest: string }) =>
  `<div class="flex items-start gap-3.5 border-t border-line py-5">${star('mt-1.5 shrink-0 text-primary')}<p class="text-[17px] leading-[23.4px]"><b class="font-semibold text-ink">${lead}</b> ${rest}</p></div>`;
export const deliverables = `<section data-reveal class="${sectionShell} gap-12 bg-white">
  ${head(deliverablesContent.eyebrow, deliverablesContent.heading)}
  <div class="flex flex-col md:flex-row md:gap-12">
    <div class="flex flex-1 flex-col">${deliverablesLeft.map(deliverable).join('')}</div>
    <div class="flex flex-1 flex-col">${deliverablesRight.map(deliverable).join('')}</div>
  </div>
</section>`;
