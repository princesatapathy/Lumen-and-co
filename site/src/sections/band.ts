import { bandContent } from '../content/sections';
import { accented, h2 } from '../components/typography';

export const band = `<section data-reveal class="on-dark grid gap-8 bg-primary px-(--g) py-20 md:py-24 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
  <div class="flex flex-col items-start gap-6">
    <div class="rounded-full border border-white/40 px-3.5 py-1.5 text-sm leading-5 font-medium text-white">${bandContent.badge}</div>
    ${h2(accented(bandContent.heading, 'white'), 'text-white')}
  </div>
  <p class="text-lg leading-[29.25px] text-white/90 md:text-xl md:leading-[32.5px]">${bandContent.lead}</p>
</section>`;
