import { faqs } from './content';
import { acc, eyebrow, h2, sectionShell } from './ui';

// One item open at a time; data-open on .faq is the single source of state (toggled in behavior.ts).
const item = ({ question, answer }: (typeof faqs)[number], index: number) => `<div class="faq group flex flex-col border-t border-line py-[25px]" data-open="${index === 0}">
  <button type="button" class="faq-q flex w-full cursor-pointer items-center justify-between gap-4 text-left transition-colors duration-150 hover:text-primary motion-reduce:transition-none" aria-expanded="${index === 0}" aria-controls="faq-answer-${index}">
    <span class="font-display text-[19px] leading-[25px] font-bold tracking-[-0.02em] md:text-[22px] md:leading-7">${question}</span>
    <i class="text-[26px] leading-[26px] text-primary not-italic transition-transform duration-300 group-data-[open=true]:rotate-45 motion-reduce:transition-none" aria-hidden="true">+</i>
  </button>
  <div id="faq-answer-${index}" role="region" class="faq-a grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out group-data-[open=true]:grid-rows-[1fr] motion-reduce:transition-none">
    <div class="overflow-hidden"><p class="pt-3 leading-[27.6px]">${answer}</p></div>
  </div>
</div>`;

export const faq = `<section id="faq" data-reveal class="${sectionShell} gap-12 bg-white">
  <div class="flex flex-col gap-6">${eyebrow('06 — FAQ')}${h2(`Questions you might ${acc('have.')}`)}</div>
  <div class="flex flex-col border-b border-line">${faqs.map(item).join('')}</div>
</section>`;
