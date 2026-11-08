import { processContent, steps } from '../content/sections';
import { h3, head, labelText } from '../components/typography';
import { sectionShell } from '../components/layout';

// Desktop grid is 6 columns: first three cards span 2, last two span 3. Tablet: 2 columns, last card full width.
const step = ({ title, body }: (typeof steps)[number], index: number) => {
  const layout = index >= 3 ? 'lg:col-span-3 lg:min-h-[228px]' : 'lg:col-span-2 lg:min-h-[283px]';
  const lastOnTablet = index === steps.length - 1 ? 'md:col-span-2' : '';
  return `<div class="flex min-h-[250px] flex-col gap-3.5 rounded-[20px] border border-line bg-white px-6 py-8 md:min-h-[236px] md:p-8 ${layout} ${lastOnTablet}">
    <div class="${labelText} text-primary">${processContent.stepLabel} ${String(index + 1).padStart(2, '0')}</div>
    ${h3(title)}
    <p class="leading-[27.6px]">${body}</p>
  </div>`;
};
export const process = `<section id="process" data-reveal class="${sectionShell} gap-12 bg-paper">
  ${head(processContent.eyebrow, processContent.heading, processContent.lead)}
  <div class="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-6">${steps.map(step).join('')}</div>
</section>`;
