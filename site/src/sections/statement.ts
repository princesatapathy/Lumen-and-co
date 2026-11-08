import { statementContent } from '../content/sections';
import { accented, eyebrow, h2, leadText } from '../components/typography';
import { sectionShell } from '../components/layout';

// data-reveal: behavior/reveal.ts fades each direct child in as it scrolls into view.
export const statement = `<section data-reveal class="${sectionShell} gap-8 bg-white lg:flex-row lg:items-start lg:justify-between">
  <div class="flex flex-col gap-6 lg:w-[560px]">${eyebrow(statementContent.eyebrow)}${h2(accented(statementContent.heading))}</div>
  <div class="flex flex-col gap-6 lg:w-[474px] lg:pt-11">
    ${statementContent.paragraphs.map((text) => `<p class="${leadText}">${text}</p>`).join('\n    ')}
  </div>
</section>`;
