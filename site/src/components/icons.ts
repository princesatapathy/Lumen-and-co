// Inline SVG icons. Tailwind picks up the class names straight from these strings.

export const star = (colorClass = 'text-primary', size = 12) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" class="${colorClass}" aria-hidden="true"><path d="M12 0l2.6 7.4L22 4.6l-2.8 7.4L22 19.4l-7.4-2.8L12 24l-2.6-7.4L2 19.4 4.8 12 2 4.6l7.4 2.8z" fill="currentColor"/></svg>`;

export const person = `<svg viewBox="0 0 220 290" fill="none" preserveAspectRatio="xMidYMax slice" class="size-full" aria-hidden="true"><circle cx="110" cy="108" r="44" fill="#8E98CF"/><path d="M20 290C20 215 62 172 110 172C158 172 200 215 200 290Z" fill="#8E98CF"/></svg>`;
