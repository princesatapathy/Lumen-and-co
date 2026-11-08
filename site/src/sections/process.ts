import { processContent, steps } from '../content/sections';
import { h3, head, labelText } from '../components/typography';
import { sectionShell } from '../components/layout';

// Desktop grid is 6 columns: first three cards span 2, last two span 3. Tablet: 2 columns, last card full width.
const step = ({ title, body }: (typeof steps)[number], index: number) => {
  const desktopLayout = index >= 3 ? 'lg:col-span-3 lg:min-h-[228px]' : 'lg:col-span-2 lg:min-h-[283px]';
  const tabletLayout = index === steps.length - 1 ? 'md:col-span-2 md:min-h-[200px]' : 'md:min-h-[283px]';
  return `<div class="flex flex-col rounded-[20px] border border-line bg-white p-7 md:p-8 ${tabletLayout} ${desktopLayout}">
    <div class="mb-4 ${labelText} text-primary">${processContent.stepLabel} ${String(index + 1).padStart(2, '0')}</div>
    ${h3(title)}
    <p class="mt-3 leading-[27.625px]">${body}</p>
  </div>`;
};
export const process = `<section id="process" data-reveal class="${sectionShell} gap-12 bg-paper">
  ${head(processContent.eyebrow, processContent.heading, processContent.lead)}
  <div class="flex flex-col gap-5 md:grid md:grid-cols-2 lg:grid-cols-6">${steps.map(step).join('')}</div>
</section>`;
