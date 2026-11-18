// The whole page as one HTML string. No CSS import and no DOM access, so the build can render it without a browser.
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

export const pageHtml = `${header}<main>${hero}${marquee}${statement}${work}${deliverables}${process}${plansSection}${band}${about}${faq}${cta}</main>${footer}`;
