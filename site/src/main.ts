import './styles/index.css';
import { initBehavior } from './behavior';
import { about } from './sections/about';
import { band } from './sections/band';
import { cta } from './sections/cta';
import { deliverables } from './sections/deliverables';
import { faq } from './sections/faq';
import { footer } from './sections/footer';
import { header } from './sections/header';
import { hero } from './sections/hero';
import { marquee } from './sections/marquee';
import { plansSection } from './sections/plans';
import { process } from './sections/process';
import { statement } from './sections/statement';
import { work } from './sections/work';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('Missing #app mount point');

app.innerHTML = `${header}<main>${hero}${marquee}${statement}${work}${deliverables}${process}${plansSection}${band}${about}${faq}${cta}</main>${footer}`;
initBehavior();
