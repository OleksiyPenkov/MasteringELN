/** Minimal inline Markdown for figure captions and table cells: **strong**,
 * *emphasis*, and `v_p` / `10^3` script notation.
 *
 * Figure.astro used to emit the caption prop as plain text, so an author writing
 * *and* got literal asterisks on the printed page. The same was true of the
 * script notation, one layer up: Figure 2.2's caption printed "the most-probable
 * speed v_p" with the underscore showing, and so did five other captions and
 * three table cells. A full Markdown dependency is not warranted for three
 * constructs. Everything else is escaped. */
import { splitScripts } from './script-notation';

const ESCAPES: Record<string, string> = {
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
};

const TAG: Record<string, string> = { sub: 'sub', sup: 'sup' };

export function renderInline(text: string): string {
  const safe = text.replace(/[&<>"']/g, (c) => ESCAPES[c]);
  // Split out `code` spans first so neither emphasis nor script notation alters
  // identifiers like `upload_file` or `check_value_drift` inside table cells.
  return safe
    .split(/(`[^`]+`)/g)
    .map((chunk) => {
      if (chunk.startsWith('`') && chunk.endsWith('`') && chunk.length >= 2) {
        return `<code>${chunk.slice(1, -1)}</code>`;
      }
      const emphasised = chunk
        .replace(/\*\*([^*]+)\*\*/gu, '<strong>$1</strong>')
        .replace(/(?<![*\p{L}\p{N}_])\*([^*\s][^*]*?)\*(?![\p{L}\p{N}_])/gu, '<em>$1</em>');
      return splitScripts(emphasised)
        .map(({ text: t, script }) =>
          script === 'base' ? t : `<${TAG[script]}>${t}</${TAG[script]}>`)
        .join('');
    })
    .join('');
}
