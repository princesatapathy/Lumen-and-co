// All page copy lives here. Placeholder copy for the fictional studio "Lumen & Co.".

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Plans', href: '#plans' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
] as const;

export const reelColumns = [
  ['3 tools I swear by', 'Day 12 of filming', 'Wait for the end…', 'Plain advice, once'],
  ['POV: you are the expert', 'Quick tip for you', 'Same hook, new day', 'What I would redo'],
  ['5 habits that stuck', 'Mistakes worth making', 'Behind the scenes', 'One honest take'],
  ['Hook in three seconds', 'Stories beat stats', 'Film it once', 'Say it simply'],
] as const;

export const marqueeBold = ['edits', 'Based in Lisbon', 'personal branding', 'strategy', 'scripts', 'shoots'];
export const marqueeItalic = ['built for the long run', 'people, not just clicks', 'known, not just seen', 'real stories'];

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

export const footerColumns = [
  { heading: 'STUDIO', links: [['Work', '#work'], ['Process', '#process'], ['Plans', '#plans'], ['About', '#about'], ['FAQ', '#faq']] },
  { heading: 'CONNECT', links: [['hello@example.com', 'mailto:hello@example.com'], ['Book a call', '#book'], ['Instagram', '#'], ['YouTube', '#'], ['LinkedIn', '#']] },
] as const;
