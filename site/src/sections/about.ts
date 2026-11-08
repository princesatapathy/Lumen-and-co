import { bookIntroCallLabel } from '../content/brand';
import { aboutContent } from '../content/sections';
import { button } from '../components/button';
import { person } from '../components/icons';
import { accented, eyebrow } from '../components/typography';
import { sectionShell } from '../components/layout';

export const about = `<section id="about" data-reveal class="${sectionShell} gap-10 bg-paper md:flex-row md:items-start md:justify-between">
  <div class="about-copy flex flex-col items-start gap-6 md:flex-1 lg:w-[560px] lg:flex-none">
    ${eyebrow(aboutContent.eyebrow)}
    <blockquote class="font-accent text-[34px] leading-[38px] tracking-[-0.01em] italic md:text-[38px] md:leading-[42px] lg:text-[52px] lg:leading-[57.2px]">${accented(aboutContent.quote, 'quote')}</blockquote>
    ${aboutContent.paragraphs.map((text) => `<p class="leading-[27.6px]">${text}</p>`).join('\n    ')}
    <div class="flex flex-wrap gap-3">${button(bookIntroCallLabel, 'primary')}${button(aboutContent.secondaryCallToAction, 'secondary', { href: '#' })}</div>
  </div>
  <div class="about-photo flex flex-col gap-3 md:w-[260px] md:shrink-0 lg:w-[437px]">
    <div class="flex aspect-[437/546] items-end overflow-hidden rounded-[20px] bg-[#C9CFE8]">${person}</div>
    <p class="text-sm leading-5">${aboutContent.photoCaption}</p>
  </div>
</section>`;
