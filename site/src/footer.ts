import { footerColumns } from './content';

const column = ({ heading, links }: (typeof footerColumns)[number]) => `<div class="flex flex-col gap-1 lg:gap-[13px]">
  <div class="mb-2 text-xs leading-[normal] font-semibold tracking-[.14em] text-white/60">${heading}</div>
  ${links.map(([label, href]) => `<a href="${href}" class="text-[15px] leading-6 text-white/90 hover:text-white">${label}</a>`).join('')}
</div>`;

export const footer = `<footer class="on-dark flex flex-col gap-12 bg-ink px-(--g) pt-[72px] pb-14 md:min-h-[437px] md:justify-between lg:pt-16 lg:pb-10">
  <div class="grid grid-cols-1 gap-8 md:grid-cols-[1.4fr_1fr_1fr] lg:grid-cols-[464px_308px_308px] lg:gap-0">
    <div class="flex flex-col gap-3.5">
      <div class="font-display text-lg leading-7 font-extrabold tracking-[-0.03em] text-white">Lumen &amp; Co.</div>
      <p class="max-w-[260px] text-[15px] leading-[22px] text-white/70">A personal branding studio helping people get remembered.</p>
    </div>
    ${footerColumns.map(column).join('')}
  </div>
  <div class="border-t border-white/20 pt-6 text-sm leading-[normal] text-white/60">© 2026 Lumen &amp; Co. All rights reserved.</div>
</footer>`;
