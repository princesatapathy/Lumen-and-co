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
