import { bandContent } from '../content/sections';
import { accented, h2 } from '../components/typography';

export const band = `<section data-reveal class="on-dark flex flex-col gap-7 bg-primary px-(--g) py-20 md:py-28 lg:flex-row lg:items-center lg:justify-between lg:py-24">
  <div class="flex flex-col gap-[22px] lg:w-[420px]">
    <div class="self-start rounded-full border border-white/60 px-4 py-[7px] text-[13px] leading-[17px] font-semibold text-white">${bandContent.badge}</div>
    ${h2(accented(bandContent.heading, 'white'), 'text-white')}
  </div>
  <p class="text-lg leading-[30px] text-white/90 lg:w-[490px] lg:text-xl lg:leading-[32.5px]">${bandContent.lead}</p>
</section>`;
