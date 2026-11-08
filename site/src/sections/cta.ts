import { bookingContent } from '../content/sections';
import { button } from '../components/button';
import { accented, eyebrow, h2 } from '../components/typography';
import { sectionShell } from '../components/layout';

export const cta = `<section id="book" data-reveal class="${sectionShell} gap-12 bg-paper">
  <div class="on-dark flex flex-col items-center gap-6 rounded-[28px] bg-primary px-6 py-16 text-center md:px-12 md:py-24">
    ${eyebrow(bookingContent.eyebrow, true)}
    ${h2(accented(bookingContent.heading, 'white'), 'text-white')}
    <p class="max-w-[576px] text-lg leading-[29.25px] text-white/90">${bookingContent.lead}</p>
    ${button(bookingContent.callToAction, 'white', { extraClass: 'mt-3' })}
  </div>
</section>`;
