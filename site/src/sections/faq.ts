import { faqContent, faqs } from '../content/sections';
import { head } from '../components/typography';
import { sectionShell } from '../components/layout';

// One item open at a time; data-open on .faq is the single source of state (toggled in behavior/accordion.ts).
const item = ({ question, answer }: (typeof faqs)[number], index: number) => `<div class="faq group flex flex-col border-b border-line" data-open="${index === 0}">
  <button type="button" id="faq-question-${index}" class="faq-q flex w-full cursor-pointer items-center justify-between gap-5 py-5 text-left transition-colors duration-150 hover:text-primary motion-reduce:transition-none" aria-expanded="${index === 0}" aria-controls="faq-answer-${index}">
    <span class="font-display text-xl leading-[27.5px] font-bold tracking-[-0.02em] md:text-[22px] md:leading-[30.25px]">${question}</span>
    <i class="text-[26px] leading-[26px] text-primary not-italic transition-transform duration-300 group-data-[open=true]:rotate-45 motion-reduce:transition-none" aria-hidden="true">+</i>
  </button>
  <div id="faq-answer-${index}" role="region" aria-labelledby="faq-question-${index}" class="faq-a grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out group-data-[open=true]:grid-rows-[1fr] motion-reduce:transition-none">
    <div class="overflow-hidden"><p class="max-w-[768px] pb-6 leading-[27.625px]">${answer}</p></div>
  </div>
</div>`;

export const faq = `<section id="faq" data-reveal class="${sectionShell} gap-10 bg-white">
  ${head(faqContent.eyebrow, faqContent.heading)}
  <div class="flex flex-col border-t border-line">${faqs.map(item).join('')}</div>
</section>`;
