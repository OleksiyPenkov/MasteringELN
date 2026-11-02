import { describe, expect, it } from 'vitest';
import { PART_KEYS, PARTS, pageEyebrow, pageLabel, partHeading, partNavLabel } from './parts';
import { BASE, BOOK_TITLE, PORT } from './site.mjs';

describe('site constants', () => {
  it('sets the Mastering ELN base path, port 4341, and title', () => {
    expect(BASE).toBe('/MasteringELN');
    expect(PORT).toBe(4341);
    expect(BOOK_TITLE).toBe('Mastering ELN');
  });
});

describe('parts', () => {
  it('names every key exactly once, in reading order', () => {
    expect(PARTS.map((p) => p.key)).toEqual([...PART_KEYS]);
  });

  it('uses the Mastering ELN part names', () => {
    expect(partHeading('1')).toBe('Part 1: Getting Started');
    expect(partHeading('2')).toBe('Part 2: Recording Daily Lab Work');
    expect(partHeading('3')).toBe('Part 3: Thinking, Searching, and Reviewing');
    expect(partHeading('4')).toBe('Part 4: Working with an AI Agent (MCP)');
    expect(partHeading('5')).toBe('Part 5: The Part of Tens');
    expect(partHeading('back')).toBe('Appendices');
    expect(partNavLabel('front')).toBe('Front Matter');
  });

  it('labels chapters by number and appendices by letter', () => {
    expect(pageLabel('')).toBe('');
    expect(pageLabel('14')).toBe('Chapter 14');
    expect(pageLabel('C')).toBe('Appendix C');
  });

  it('builds the eyebrow from both', () => {
    expect(pageEyebrow('2', '7')).toBe('Part 2 · Chapter 7');
    expect(pageEyebrow('back', 'B')).toBe('Appendices · Appendix B');
    expect(pageEyebrow('front', '')).toBe('Front Matter');
  });

  it('uses no em-dash, which the house style bans (STYLE.md §4.2)', () => {
    for (const p of PARTS) expect(partHeading(p.key)).not.toContain('—');
  });
});
