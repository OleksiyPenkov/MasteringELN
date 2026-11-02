export const PART_KEYS = ['front', '1', '2', '3', '4', '5', 'back'] as const;
export type PartKey = (typeof PART_KEYS)[number];

export interface Part {
  key: PartKey;
  name: string;
  numbered: boolean;
}

export const PARTS: Part[] = [
  { key: 'front', name: 'Front Matter', numbered: false },
  { key: '1', name: 'Getting Started', numbered: true },
  { key: '2', name: 'Recording Daily Lab Work', numbered: true },
  { key: '3', name: 'Thinking, Searching, and Reviewing', numbered: true },
  { key: '4', name: 'Working with an AI Agent (MCP)', numbered: true },
  { key: '5', name: 'The Part of Tens', numbered: true },
  { key: 'back', name: 'Appendices', numbered: false },
];

export function getPart(key: string): Part | undefined {
  return PARTS.find((p) => p.key === key);
}

export function partHeading(key: string): string {
  const p = getPart(key);
  if (!p) return key;
  return p.numbered ? `Part ${p.key}: ${p.name}` : p.name;
}

export function partNavLabel(key: string): string {
  const p = getPart(key);
  if (!p) return key;
  return p.numbered ? `Part ${p.key}` : p.name;
}

export function pageLabel(number: string): string {
  if (number === '') return '';
  return /^[A-Z]$/.test(number) ? `Appendix ${number}` : `Chapter ${number}`;
}

export function pageEyebrow(part: string, number: string): string {
  const label = pageLabel(number);
  return label ? `${partNavLabel(part)} · ${label}` : partNavLabel(part);
}
