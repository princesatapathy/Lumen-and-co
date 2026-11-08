// Brand, navigation and footer copy. Placeholder copy for the fictional studio "Lumen & Co.".
// Strings are raw HTML (so `&amp;`, `<br />` and typographic quotes are written as they should render).

export const brandName = 'Lumen &amp; Co.';
export const bookIntroCallLabel = 'Book intro call →';

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Plans', href: '#plans' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
] as const;

export const footerColumns = [
  { heading: 'STUDIO', links: [['Work', '#work'], ['Process', '#process'], ['Plans', '#plans'], ['About', '#about'], ['FAQ', '#faq']] },
  { heading: 'CONNECT', links: [['hello@example.com', 'mailto:hello@example.com'], ['Book a call', '#book'], ['Instagram', '#'], ['YouTube', '#'], ['LinkedIn', '#']] },
] as const;

export const footerTagline = 'A personal branding studio helping people get remembered.';
export const copyrightLine = `© 2026 ${brandName} All rights reserved.`;
export const openMenuLabel = 'Open menu';
export const closeMenuLabel = 'Close menu';
