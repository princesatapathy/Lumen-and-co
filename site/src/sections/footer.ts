import { brandName, copyrightLine, footerColumns, footerTagline } from '../content/brand';
import { labelText } from '../components/typography';

const column = ({ heading, links }: (typeof footerColumns)[number]) => `<div class="flex flex-col gap-[13.2px]">
  <div class="mb-[7px] ${labelText} text-white/60">${heading}</div>
  ${links.map(([label, href]) => `<a href="${href}" class="text-[15px] leading-6 text-white/85 hover:text-white">${label}</a>`).join('')}
</div>`;

export const footer = `<footer class="on-dark flex flex-col gap-14 bg-ink px-(--g) py-16">
  <div class="grid grid-cols-1 gap-12 md:grid-cols-[1.6fr_1fr_1.2fr]">
    <div class="flex flex-col gap-3">
      <div class="font-display text-lg leading-7 font-extrabold tracking-[-0.03em] text-white">${brandName}</div>
      <p class="max-w-80 text-[15px] leading-[24.375px] text-white/70">${footerTagline}</p>
    </div>
    ${footerColumns.map(column).join('')}
  </div>
  <div class="border-t border-white/20 pt-6 text-sm leading-5 text-white/60">${copyrightLine}</div>
</footer>`;
