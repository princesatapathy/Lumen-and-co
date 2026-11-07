// Small HTML-string helpers. Tailwind picks up the class names straight from these strings.

export const star = (colorClass = 'text-primary', size = 12) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" class="${colorClass}" aria-hidden="true"><path d="M12 0l2.6 7.4L22 4.6l-2.8 7.4L22 19.4l-7.4-2.8L12 24l-2.6-7.4L2 19.4 4.8 12 2 4.6l7.4 2.8z" fill="currentColor"/></svg>`;

export const eyebrow = (text: string, onDark = false) =>
  `<div class="flex items-center gap-2.5 text-xs leading-[normal] font-semibold tracking-[.14em] ${onDark ? 'text-white/85' : 'text-muted'}">${star(onDark ? 'text-white' : 'text-primary')}<span>${text}</span></div>`;

const accentTone = {
  primary: 'font-extrabold tracking-[-0.02em] text-primary',
  white: 'font-extrabold tracking-[-0.02em] text-white',
  quote: 'font-normal tracking-[-0.01em] text-primary',
} as const;
export const acc = (text: string, tone: keyof typeof accentTone = 'primary') =>
  `<span class="font-accent italic ${accentTone[tone]}">${text}</span>`;

export const h2 = (html: string, extraClass = '') =>
  `<h2 class="font-display text-[clamp(40px,6.5vw,64px)] leading-none font-extrabold tracking-[-0.045em] ${extraClass}">${html}</h2>`;

export const h3 = (html: string, sizeClass = 'text-2xl leading-[30px] md:text-[28px] md:leading-[35px]') =>
  `<h3 class="font-display font-bold tracking-[-0.03em] ${sizeClass}">${html}</h3>`;

export const head = (eyebrowText: string, h2Html: string, lead?: string, extraClass = '') =>
  `<div class="flex flex-col gap-6 ${extraClass}">${eyebrow(eyebrowText)}${h2(h2Html)}${lead ? `<p class="text-lg leading-[29.25px]">${lead}</p>` : ''}</div>`;

const buttonVariants = {
  primary: 'btn-p bg-primary text-white hover:bg-primary-dim',
  white: 'btn-w bg-white text-primary hover:bg-paper',
  secondary: 'btn-s border border-ink text-ink hover:border-primary hover:text-primary',
} as const;
const buttonSizes = {
  normal: 'flex h-[54px] px-5 text-[15px] md:px-7 md:text-base',
  small: 'hidden h-[43px] px-5 text-[15px] sm:flex',
} as const;
export const button = (
  text: string,
  variant: keyof typeof buttonVariants,
  { size = 'normal', href = '#book', extraClass = '' }: { size?: keyof typeof buttonSizes; href?: string; extraClass?: string } = {},
) =>
  `<a href="${href}" class="${buttonSizes[size]} ${buttonVariants[variant]} cursor-pointer items-center justify-center rounded-full font-semibold whitespace-nowrap transition-[color,background-color,border-color,translate] duration-200 ease-[cubic-bezier(.4,0,.2,1)] hover:-translate-y-0.5 motion-reduce:transition-none ${extraClass}">${text}</a>`;

export const person = `<svg viewBox="0 0 220 290" fill="none" preserveAspectRatio="xMidYMax slice" class="size-full" aria-hidden="true"><circle cx="110" cy="108" r="44" fill="#8E98CF"/><path d="M20 290C20 215 62 172 110 172C158 172 200 215 200 290Z" fill="#8E98CF"/></svg>`;

// Shared section shell: horizontal gutter from --g, vertical padding from --secpad.
export const sectionShell = 'flex flex-col px-(--g) py-(--secpad)';
