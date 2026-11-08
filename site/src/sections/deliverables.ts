import { deliverablesContent, deliverableItems } from '../content/sections';
import { star } from '../components/icons';
import { head } from '../components/typography';
import { sectionShell } from '../components/layout';

const deliverable = ({ lead, rest }: (typeof deliverableItems)[number]) =>
  `<li class="flex items-start gap-3.5 border-b border-line py-5">${star('mt-1.5 shrink-0 text-primary')}<p class="text-[17px] leading-[23.375px]"><b class="font-semibold text-ink">${lead}</b> ${rest}</p></li>`;
export const deliverables = `<section data-reveal class="${sectionShell} gap-12 bg-white">
  ${head(deliverablesContent.eyebrow, deliverablesContent.heading)}
  <ul class="grid border-t border-line md:grid-cols-2 md:gap-x-14">${deliverableItems.map(deliverable).join('')}</ul>
</section>`;
