import { bookIntroCallLabel } from '../content/brand';
import { aboutContent } from '../content/sections';
import { button } from '../components/button';
import { person } from '../components/icons';
import { accented, eyebrow } from '../components/typography';
import { sectionShell } from '../components/layout';

export const about = `<section id="about" data-reveal class="${sectionShell} gap-12 bg-paper md:grid md:grid-cols-[1.3fr_1fr] md:gap-10 lg:gap-20">
  <div class="about-copy flex flex-col items-start">
    ${eyebrow(aboutContent.eyebrow)}
    <blockquote class="mt-6 font-accent text-[clamp(33.6px,4.6vw,52px)] leading-[1.1] tracking-[-0.01em] italic">${accented(aboutContent.quote, 'quote')}</blockquote>
    <div class="mt-8 flex flex-col gap-4">
      ${aboutContent.paragraphs.map((text) => `<p class="leading-[27.625px]">${text}</p>`).join('\n      ')}
    </div>
    <div class="mt-8 flex flex-wrap gap-3">${button(bookIntroCallLabel, 'primary')}${button(aboutContent.secondaryCallToAction, 'secondary', { href: '#' })}</div>
  </div>
  <div class="about-photo flex flex-col gap-3">
    <div class="flex aspect-[4/5] items-end overflow-hidden rounded-[20px] border border-line bg-[#C9CFE8]">${person}</div>
    <p class="text-sm leading-5 font-medium">${aboutContent.photoCaption}</p>
  </div>
</section>`;
