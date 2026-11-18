// Content strings are raw HTML (`&amp;`, `<br />`). Crawler files and JSON-LD need plain text.
const namedEntities: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

export function htmlToPlainText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]*>/g, '')
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (entity, name: string) => {
      const decoded = name[0] === '#' ? String.fromCodePoint(name[1].toLowerCase() === 'x' ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10)) : namedEntities[name.toLowerCase()];
      if (decoded === undefined) throw new Error(`htmlToPlainText: unknown entity ${entity}`);
      return decoded;
    })
    .replace(/\s+/g, ' ')
    .trim();
}

export function escapeHtmlText(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Self-check at build start: a wrong decoder would silently put "&amp;" into search results.
if (htmlToPlainText('Lumen &amp; Co.<br />“x” &#8212; &#x2014; <b>y</b>') !== 'Lumen & Co. “x” — — y') {
  throw new Error('htmlToPlainText self-check failed');
}
if (htmlToPlainText('&amp;lt;') !== '&lt;') throw new Error('htmlToPlainText must decode only once');
