// Copy for every section below the hero, in page order. Headings are lead + accent + tail (see types.ts).
// Placeholder copy written for this project. Never reuse the reference's wording; reference-analysis/scripts/copy-overlap.mjs checks this.
import type { AccentedHeading } from './types';

export const statementContent = {
  eyebrow: 'WHY WE EXIST',
  heading: { lead: 'Attention fades. A clear ', accent: 'name', tail: ' lasts.' } satisfies AccentedHeading,
  paragraphs: [
    'A feed full of posts can still leave people unsure what you do. We start with one sentence a stranger could repeat about you, then shape every video, caption and profile detail around that sentence.',
    'Growth charts are a side effect. The goal sits further down the line: a warm inbox, clients who arrive already convinced, and projects you are glad to say yes to.',
  ],
};

export const workContent = {
  eyebrow: '01 — SELECTED CLIPS',
  heading: { lead: 'Recent ', accent: 'work.' } satisfies AccentedHeading,
  lead: 'A few pieces from clients across coaching, health and tech. Placeholder clips for now; real ones land here later.',
  profileButtonLabel: 'View profile',
};

export const deliverablesContent = {
  eyebrow: '02 — INCLUDED',
  heading: { lead: 'All of it, in one ', accent: 'place.' } satisfies AccentedHeading,
};

export const processContent = {
  eyebrow: '03 — THE PROCESS',
  heading: { lead: 'Five steps from hello to ', accent: 'published.' } satisfies AccentedHeading,
  lead: 'Every stage has an owner and a date, so nothing drifts.',
  stepLabel: 'STAGE',
};

export const plansContent = {
  eyebrow: '04 — PLANS',
  heading: { lead: 'Pick your ', accent: 'level of help.' } satisfies AccentedHeading,
  lead: 'Some clients want a coach, others want the whole thing handled. We will help you choose on our first chat.',
  featuredBadge: 'MOST POPULAR',
};

export const bandContent = {
  badge: 'before you sign →',
  heading: { lead: 'Think in ', accent: 'seasons.' } satisfies AccentedHeading,
  lead: 'Algorithms take a while to learn who you are for, and audiences take longer to care. We commit to an opening stretch of three months because that is how long honest patterns need to show up. After that, decisions come from evidence rather than hunches.',
};

export const aboutContent = {
  eyebrow: '05 — BEHIND THE STUDIO',
  quote: { lead: '“My first hundred videos taught me one thing: nobody shares a résumé. They share ', accent: 'a person.', tail: '”' } satisfies AccentedHeading,
  paragraphs: [
    'I spent years behind the scenes at agencies, watching skilled people stay invisible while louder ones got the calls. Lumen began as a side project to fix that for a single friend, and the results surprised us both.',
    'Since then I have rebuilt the method more than once. What survived is short: find the true thing, say it plainly, and keep saying it.',
    'That method now runs the whole studio.',
  ],
  secondaryCallToAction: 'Say hello on LinkedIn',
  photoCaption: 'Founder, Lumen &amp; Co.',
};

export const faqContent = {
  eyebrow: '06 — COMMON QUESTIONS',
  heading: { lead: 'Before you ', accent: 'ask.' } satisfies AccentedHeading,
};

export const bookingContent = {
  eyebrow: '07 — GET IN TOUCH',
  heading: { lead: 'One short chat.<br />', accent: 'Then you decide.' } satisfies AccentedHeading,
  lead: 'Tell us where you are stuck and we will tell you, plainly, whether we are the right fit.',
  callToAction: 'Arrange a chat →',
};

export const clips = [
  { label: 'Watch clip 01 →', background: '#C9CFE8' },
  { label: 'Watch clip 02 →', background: '#D8CDBD' },
  { label: 'Watch clip 03 →', background: '#BFD3C8' },
];

type Deliverable = { lead: string; rest: string };
export const deliverablesLeft: Deliverable[] = [
  { lead: 'A sharp positioning line:', rest: 'one sentence that says who you help and how' },
  { lead: 'Competitor scan:', rest: 'which voices fill your niche and where the gap sits' },
  { lead: 'Draft scripts:', rest: 'an opening line, one idea, a natural close' },
  { lead: 'Filming days in Lisbon', rest: '' },
  { lead: 'A standing session', rest: 'every week to look back and look ahead' },
];
export const deliverablesRight: Deliverable[] = [
  { lead: 'Profile makeover:', rest: 'name, photo, pinned posts and link page, tidied up so newcomers stay' },
  { lead: 'Topic map:', rest: 'themes for each month, tied to what you sell' },
  { lead: 'Presence coaching:', rest: 'voice, pace and where to put your hands' },
  { lead: 'Finishing:', rest: 'cuts, audio cleanup, titles and thumbnails' },
  { lead: 'End-of-month report', rest: 'covering wins, misses and the next experiment' },
];

export const steps = [
  { title: 'First chat', body: 'A relaxed half hour on who you serve and where you feel stuck. You leave with an honest read of your profile.' },
  { title: 'Finding your angle', body: 'We dig through your experience for the point of view nobody else holds, then rewrite your bio and pinned posts to match it.' },
  { title: 'Mapping the month', body: 'Themes, formats and dates land in one shared calendar, so a quiet week never leaves you wondering what to publish.' },
  { title: 'Writing and filming', body: 'Drafts arrive a few days ahead. On the day we shoot in Lisbon, and we stay beside you until the delivery feels easy.' },
  { title: 'Polish and publish', body: 'Clips get cut, captioned and scheduled for you. Each Friday we read the numbers, drop what flopped and line up more of what landed.' },
];

export const plans = [
  {
    name: 'Guided',
    tagline: 'You film, we coach.',
    featured: false,
    items: ['Positioning workshop', 'Monthly topic map', 'Feedback on every draft script', 'Presence coaching sessions', 'A standing weekly session', 'Best if you already film and edit in-house'],
  },
  {
    name: 'Done for you',
    tagline: 'Hand it over and get on with your week.',
    featured: true,
    items: ['All of the Guided plan', 'Scripts drafted on your behalf', 'Filming days in Lisbon', 'Full edit of each video', 'Scheduling and community replies', 'End-of-month results report'],
  },
];

export const faqs = [
  { question: 'Is a small following a problem?', answer: 'Not at all. Some of our best work started from an account with forty followers, because a clear message matters more than a head start.' },
  { question: 'When does this start paying off?', answer: 'Expect a sharper profile in week two, steadier reach after a month, and enquiries that make sense by month three.' },
  { question: 'What if I freeze in front of a lens?', answer: 'Plenty of clients do at first. We rehearse together, keep takes short and cut around the nerves.' },
  { question: 'Could I buy only the planning part?', answer: 'Yes. The Guided plan covers positioning and the calendar, and you keep full control of production.' },
  { question: 'Is this only for Instagram?', answer: 'We start where short video travels best, then reshape the same ideas for LinkedIn, YouTube or a newsletter.' },
  { question: 'Can we work together from abroad?', answer: 'Filming days happen in Lisbon, and strategy sessions run online wherever you live.' },
  { question: 'My profession has strict advertising rules. Is that a blocker?', answer: 'No. We check claims and wording with you first, so medical, legal and financial clients stay compliant.' },
];
