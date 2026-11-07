import './index.css';
import { initBehavior } from './behavior';
import { faq } from './faq';
import { footer } from './footer';
import { header } from './header';
import { hero, marquee } from './hero';
import { about, band, cta, deliverables, plansSection, process, statement, work } from './sections';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('Missing #app mount point');

app.innerHTML = `${header}<main>${hero}${marquee}${statement}${work}${deliverables}${process}${plansSection}${band}${about}${faq}${cta}</main>${footer}`;
initBehavior();
