import { brandName, copyrightLine, footerColumns, footerTagline } from '../content/brand';
import { labelText } from '../components/typography';

const column = ({ heading, links }: (typeof footerColumns)[number]) => `<div class="flex flex-col gap-1 lg:gap-[13px]">
  <div class="mb-2 ${labelText} text-white/60">${heading}</div>
  ${links.map(([label, href]) => `<a href="${href}" class="text-[15px] leading-6 text-white/90 hover:text-white">${label}</a>`).join('')}
</div>`;

export const footer = `<footer class="on-dark flex flex-col gap-12 bg-ink px-(--g) pt-[72px] pb-14 md:min-h-[437px] md:justify-between lg:pt-16 lg:pb-10">
  <div class="grid grid-cols-1 gap-8 md:grid-cols-[1.4fr_1fr_1fr] lg:grid-cols-[464px_308px_308px] lg:gap-0">
    <div class="flex flex-col gap-3.5">
      <div class="font-display text-lg leading-7 font-extrabold tracking-[-0.03em] text-white">${brandName}</div>
      <p class="max-w-[260px] text-[15px] leading-[22px] text-white/70">${footerTagline}</p>
    </div>
    ${footerColumns.map(column).join('')}
  </div>
  <div class="border-t border-white/20 pt-6 text-sm leading-[normal] text-white/60">${copyrightLine}</div>
</footer>`;
