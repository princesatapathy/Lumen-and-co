import { bookingContent } from '../content/sections';
import { button } from '../components/button';
import { accented, eyebrow, h2 } from '../components/typography';
import { sectionShell } from '../components/layout';

export const cta = `<section id="book" data-reveal class="${sectionShell} gap-12 bg-paper">
  <div class="on-dark flex min-h-[520px] flex-col items-center justify-center gap-6 rounded-[28px] bg-primary px-6 py-16 text-center md:px-12 md:py-24 lg:min-h-[535px]">
    ${eyebrow(bookingContent.eyebrow, true)}
    ${h2(accented(bookingContent.heading, 'white'), 'text-white')}
    <p class="max-w-[520px] text-lg leading-[29.25px] text-white/90">${bookingContent.lead}</p>
    ${button(bookingContent.callToAction, 'white')}
  </div>
</section>`;
