import { statementContent } from '../content/sections';
import { accented, eyebrow, h2, leadText } from '../components/typography';
import { sectionShell } from '../components/layout';

// data-reveal: behavior/reveal.ts fades each direct child in as it scrolls into view.
export const statement = `<section data-reveal class="${sectionShell} bg-white">
  ${eyebrow(statementContent.eyebrow)}
  <div class="mt-6 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
    ${h2(accented(statementContent.heading))}
    <div class="flex flex-col gap-5">
      ${statementContent.paragraphs.map((text) => `<p class="${leadText}">${text}</p>`).join('\n      ')}
    </div>
  </div>
</section>`;
