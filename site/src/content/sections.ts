// Copy for every section below the hero, in page order. Headings are lead + accent + tail (see types.ts).
import type { AccentedHeading } from './types';

export const statementContent = {
  eyebrow: 'OUR VIEW',
  heading: { lead: 'Reach doesn’t open doors. ', accent: 'Recall', tail: ' does.' } satisfies AccentedHeading,
  paragraphs: [
    'Most content chases impressions. We build yours around one idea: that a stranger should be able to describe you after a single scroll. Your voice, your point of view, the one thing you stand for.',
    'Numbers follow once people remember you. What we care about is what comes next: real conversations, new clients, and the kind of work you actually want to be doing.',
  ],
};

export const workContent = {
  eyebrow: '01 — WORK',
  heading: { lead: 'Recent ', accent: 'work.' } satisfies AccentedHeading,
  lead: 'A few pieces from clients across coaching, health and tech. Placeholder clips for now; real ones land here later.',
  profileButtonLabel: 'View profile',
};

export const deliverablesContent = {
  eyebrow: '02 — WHAT YOU GET',
  heading: { lead: 'Everything your brand ', accent: 'needs.' } satisfies AccentedHeading,
};

export const processContent = {
  eyebrow: '03 — THE PROCESS',
  heading: { lead: 'From first call to a brand people ', accent: 'recall.' } satisfies AccentedHeading,
  lead: 'A clear system, step by step. No guesswork.',
  stepLabel: 'STEP',
};

export const plansContent = {
  eyebrow: '04 — PLANS',
  heading: { lead: 'Guidance, or ', accent: 'done for you.' } satisfies AccentedHeading,
  lead: 'Two ways to work together. We will work out which one fits you best on a call, with no pressure at all.',
  featuredBadge: 'MOST POPULAR',
};

export const bandContent = {
  badge: 'a fair warning →',
  heading: { lead: 'Give it ', accent: 'a season.' } satisfies AccentedHeading,
  lead: 'A personal brand does not form in a fortnight. People need time to notice you, recall you and begin to trust you. That is why we ask for three months. By then there is enough work and enough data to see what is landing, and to do more of it.',
};

export const aboutContent = {
  eyebrow: '05 — WHO RUNS THIS',
  quote: { lead: '“I began by sharing everything I knew, and slowly learned that people don’t follow content. They ', accent: 'remember people.', tail: '”' } satisfies AccentedHeading,
  paragraphs: [
    'I started out explaining ideas in plain pictures, a few minutes at a time. Years on, people still bring up one clip they saw and remember. That is when I understood what a personal brand really is.',
    'Later I changed direction and started again from zero. It taught me how a brand is built: a real story, a clear message and a simple system.',
    'Now the studio does the same for others.',
  ],
  secondaryCallToAction: 'Say hello on LinkedIn',
  photoCaption: 'Founder, Lumen &amp; Co.',
};

export const faqContent = {
  eyebrow: '06 — FAQ',
  heading: { lead: 'Questions you might ', accent: 'have.' } satisfies AccentedHeading,
};

export const bookingContent = {
  eyebrow: '07 — BOOK A CALL',
  heading: { lead: '20 minutes. No pitch.<br />', accent: 'Just clarity.' } satisfies AccentedHeading,
  lead: 'A relaxed conversation about how we could build your personal brand together.',
  callToAction: 'Book a free call →',
};

export const clips = [
  { label: 'Watch clip 01 →', background: '#C9CFE8' },
  { label: 'Watch clip 02 →', background: '#D8CDBD' },
  { label: 'Watch clip 03 →', background: '#BFD3C8' },
];

type Deliverable = { lead: string; rest: string };
export const deliverablesLeft: Deliverable[] = [
  { lead: 'Brand story and positioning:', rest: 'what makes you different, in your own words' },
  { lead: 'A look at your space:', rest: 'who else is talking, and how you stand apart' },
  { lead: 'Scripts for every clip:', rest: 'hook, story and one clear message' },
  { lead: 'Shoots in Lisbon', rest: '' },
  { lead: 'A weekly call', rest: 'to review, plan and improve' },
];
export const deliverablesRight: Deliverable[] = [
  { lead: 'Profile setup:', rest: 'bio, grid, highlights, pinned posts and the full page, ready to welcome visitors' },
  { lead: 'A clear content plan:', rest: 'what to post, when, and why' },
  { lead: 'Help on camera:', rest: 'how to speak, pause and feel natural' },
  { lead: 'Professional editing:', rest: 'pacing, sound, colour and captions' },
  { lead: 'Monthly check-ins', rest: 'on what is working, what is not, and what to change next' },
];

export const steps = [
  { title: 'Intro call', body: 'We learn about you, your work and your goals, review your current profile and tell you honestly what we see.' },
  { title: 'Story and positioning', body: 'We find the story only you can tell, decide how you want to be remembered, then set up your profile around it.' },
  { title: 'Plan and system', body: 'We build your content pillars and a monthly calendar, so every post has a reason to exist.' },
  { title: 'Scripts and shoot', body: 'We write and refine scripts each week, then shoot together in Lisbon and help you feel at ease on camera.' },
  { title: 'Edit, post and review', body: 'We edit, schedule and look at how each piece did. Every week we keep what works and plan the next batch.' },
];

export const plans = [
  {
    name: 'Guided',
    tagline: 'We steer. You create.',
    featured: false,
    items: ['Brand story and positioning', 'Content plan and pillars', 'Weekly hook and script review', 'On-camera coaching', 'Weekly strategy call', 'For people who already have a camera and an editor'],
  },
  {
    name: 'Done for you',
    tagline: 'We handle it, start to finish.',
    featured: true,
    items: ['Everything in Guided', 'Scripts written and refined for you', 'Shoots in Lisbon', 'Professional editing for every clip', 'Posting support and weekly review', 'Monthly progress check-ins'],
  },
];

export const faqs = [
  { question: 'Do I need a big audience to start?', answer: 'No. You can begin with no followers at all. Once your brand identity is settled, we help you set the account up properly.' },
  { question: 'How soon will I see results?', answer: 'Most clients see steady movement within the first month and a clear pattern by the end of the third.' },
  { question: 'I am not comfortable on camera. Is that okay?', answer: 'That is common. We coach you on camera and write scripts that sound like you.' },
  { question: 'Can I take just the strategy?', answer: 'Yes. Strategy-only work is part of the Guided plan.' },
  { question: 'Which platform do you work on?', answer: 'We work mostly with Instagram and short video, then adapt the system to wherever your audience is.' },
  { question: 'Where are you based?', answer: 'We are based in Lisbon and work with clients remotely or on location.' },
  { question: 'I am a doctor, lawyer or therapist. Does this fit me?', answer: 'Yes. We take extra care with positioning and wording for regulated professions.' },
];
