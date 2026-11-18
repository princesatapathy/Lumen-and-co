import type { HtmlTagDescriptor, Plugin } from 'vite';
import { starPath } from '../src/components/icons';
import { brandName, navLinks } from '../src/content/brand';
import { pageDescription, pageTitle, siteUrl } from '../src/content/meta';
import { faqs, plans, steps } from '../src/content/sections';
import { escapeHtmlText, htmlToPlainText } from './text';

if (!/^https:\/\/[^/]+$/.test(siteUrl)) throw new Error(`siteUrl must be an https address with no trailing slash, got "${siteUrl}"`);

const brandPlainName = htmlToPlainText(brandName);
const pageUrl = `${siteUrl}/`;
// Same value as --color-primary in styles/theme.css.
const faviconColor = '#213F89';
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${starPath}" fill="${faviconColor}"/></svg>`;

// Only facts the page already states. No address, phone, social links or service area until the owner supplies real ones.
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: brandPlainName, url: pageUrl, description: pageDescription },
    { '@type': 'WebSite', '@id': `${siteUrl}/#website`, name: brandPlainName, url: pageUrl, publisher: { '@id': `${siteUrl}/#organization` } },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map(({ question, answer }) => ({
        '@type': 'Question',
        name: htmlToPlainText(question),
        acceptedAnswer: { '@type': 'Answer', text: htmlToPlainText(answer) },
      })),
    },
  ],
};

// Vite escapes attribute values itself; element text (title, script) is passed through as written.
const headTags: HtmlTagDescriptor[] = [
  { tag: 'title', children: escapeHtmlText(pageTitle) },
  { tag: 'meta', attrs: { name: 'description', content: pageDescription } },
  { tag: 'link', attrs: { rel: 'canonical', href: pageUrl } },
  { tag: 'link', attrs: { rel: 'icon', type: 'image/svg+xml', href: `data:image/svg+xml,${encodeURIComponent(faviconSvg)}` } },
  { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
  { tag: 'meta', attrs: { property: 'og:site_name', content: brandPlainName } },
  { tag: 'meta', attrs: { property: 'og:title', content: pageTitle } },
  { tag: 'meta', attrs: { property: 'og:description', content: pageDescription } },
  { tag: 'meta', attrs: { property: 'og:url', content: pageUrl } },
  { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary' } },
  // "<" is escaped so no FAQ text can ever close the script element.
  { tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify(structuredData).replace(/</g, '\\u003c') },
].map((tag) => ({ ...tag, injectTo: 'head' as const }));

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${pageUrl}</loc></url>
</urlset>
`;

// llms.txt: the page as plain Markdown, built from the same content the page renders.
const llmsTxt = `# ${brandPlainName}

> ${pageDescription}

## Page sections
${navLinks.map(({ label, href }) => `- [${label}](${siteUrl}/${href})`).join('\n')}

## Plans
${plans.map((plan) => `### ${htmlToPlainText(plan.name)}\n${htmlToPlainText(plan.tagline)}\n${plan.items.map((item) => `- ${htmlToPlainText(item)}`).join('\n')}`).join('\n\n')}

## Process
${steps.map((step, index) => `${index + 1}. ${htmlToPlainText(step.title)}: ${htmlToPlainText(step.body)}`).join('\n')}

## Frequently asked questions
${faqs.map(({ question, answer }) => `### ${htmlToPlainText(question)}\n${htmlToPlainText(answer)}`).join('\n\n')}
`;

export function seoPlugin(): Plugin {
  return {
    name: 'site-seo',
    // Head tags go in during dev and build, so the dev page matches production.
    transformIndexHtml: () => headTags,
    generateBundle() {
      for (const [fileName, source] of Object.entries({ 'robots.txt': robotsTxt, 'sitemap.xml': sitemapXml, 'llms.txt': llmsTxt })) {
        this.emitFile({ type: 'asset', fileName, source });
      }
    },
  };
}
