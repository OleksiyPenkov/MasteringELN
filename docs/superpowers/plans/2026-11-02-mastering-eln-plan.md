# Mastering ELN (Phase 1: Scaffold, Pipeline & Part 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold `D:\Publications\Books\Mastering ELN\` with the Astro 7 + MDX + KaTeX + Playwright PDF pipeline, canonical governance files (`CLAUDE.md`, `STYLE.md`, `NOTATION.md`, `OUTLINE.md`, `STATUS.md`), six callout components (`Tip`, `Remember`, `Warning`, `GoingDeeper`, `InELN`, `InTeamLab`), Study A/B demonstration bundle, and complete Front Matter (`Introduction`) + `Part 1: Getting Started` (Chapters 1–4) passing all web, e2e, and PDF verification gates.

**Architecture:** Port the proven static web and print-PDF pipeline from `D:\Publications\Books\XRR for Dummies\` into a standalone Git repository at `D:\Publications\Books\Mastering ELN\`. All site constants (`BASE = '/MasteringELN'`, `PORT = 4341`, `BOOK_TITLE = 'Mastering ELN'`) live in `src/lib/site.mjs` and are read by both Node and Python (`pdf-build/siteconf.py`). Chapters are authored as MDX in `src/content/chapters/` against the source hierarchy `Delphi Source Code > Built-in HTML Help > ELN Software Paper (arXiv:2610.27859)`.

**Tech Stack:** Node >= 20.19, Astro 7, Svelte 5, MDX, KaTeX (`remark-math` / `rehype-katex`), Vitest 4, Playwright 1.61.0, Python 3 with `pytest`, `PyMuPDF` (`fitz`), `pypdf`, and `beautifulsoup4`.

**Spec:** `D:\APS\ELN\.omp\plans\2026-11-02-mastering-eln-design.md` (copied into `D:\Publications\Books\Mastering ELN\docs\superpowers\specs\2026-11-02-mastering-eln-design.md` in Task 1).

## Global Constraints

- **Outside repositories are read-only:** `D:\APS\ELN\APS-ELN-Community\`, `D:\APS\ELN\APS-ELN-Commercial\`, `D:\MultilayerLab\Papers\ELN-Software-Paper\`, and `D:\Publications\Books\XRR for Dummies\` must never be modified by this work.
- **Source priority:** `Delphi Source Code > Built-in HTML Help > ELN Software Paper (arXiv:2610.27859)`.
- **Trademark:** Never use the phrase "For Dummies" in `BOOK_TITLE`, chapter titles, headings, cover text, or metadata.
- **Language & Style (`STYLE.md §4`):** No em-dashes (`—`), no "not X, but Y" antithesis, no rhetorical questions in body prose (headings may be questions), no reading-management narration ("In this section we will…"), no LLM stock evaluation words, and no scientific e-notation (`1e-5`) in rendered prose.
- **Callouts (`Callout.astro`):** Closed set of six (`Tip`, `Remember`, `Warning`, `GoingDeeper`, `InELN`, `InTeamLab`). Never use `<Callout>` directly in chapters.
- **Port & Base Path:** `BASE = '/MasteringELN'`, `PORT = 4341`, `BOOK_TITLE = 'Mastering ELN'` in `src/lib/site.mjs`.

## Review Focus

1. **Hard-coded `/MasteringXRR` or port `4331` remnants in ported scripts/tests:** Any leftover reference in `pdf-build/test_links.py`, `pdf-build/test_assemble.py`, `playwright.config.ts`, or `astro.config.mjs` will point tests at the wrong server or fail link resolution; pinned in Task 1 (`parts.test.ts`) and Task 3 (`test_links.py`, `test_assemble.py`).
2. **Closed callout set missing `InTeamLab` or leaving `InXRayCalc`:** A chapter or `/sampler/` importing `InXRayCalc` or missing styling for `.box-eln` / `.box-team` will break build or render unstyled boxes; pinned in Task 3 (`/sampler/` build + e2e check).
3. **Internal chapter cross-references without `#fragment` or pointing to not-yet-drafted chapters:** `scripts/check-links.mjs` fails on broken links or missing `#fragment` anchors; forward references to Parts 2–5 in `Introduction` and `Part 1` must use plain text ("Chapter 9") until those `.mdx` slugs exist, while links between `Introduction` and Chapters 1–4 use full `<a href={`${import.meta.env.BASE_URL}/slug#anchor`}>` links; pinned in Task 4 & Task 5 (`npm run check:links`).
4. **Unresolved `[SCREENSHOT NEEDED]` or `[NUMBER NEEDED]` markers or em-dashes in drafted MDX:** `scripts/check-markers.mjs` and house style checks must reject draft placeholders and em-dashes; pinned in Task 4 & Task 5 (`npm run check:markers`).
5. **PDF `verify_pdf.py` gate failures on single-line/two-line title breaking or missing cover assets:** `BOOK_TITLE = 'Mastering ELN'` has two words (`_two_lines("Mastering ELN") == "Mastering<br>ELN"`), and `assemble.py` requires `pdf-build/cover-hero.svg` and `pdf-build/cover-math.html`; pinned in Task 3 (`test_assemble.py`) and Task 5 (`npm run pdf:verify`).

---

### Task 1: Repository Scaffold, Site Constants, and Parts Model

**Files:**
- Create: `D:\Publications\Books\Mastering ELN\package.json`
- Create: `D:\Publications\Books\Mastering ELN\src\lib\site.mjs`
- Create: `D:\Publications\Books\Mastering ELN\src\lib\parts.ts`
- Test: `D:\Publications\Books\Mastering ELN\src\lib\parts.test.ts`
- Create: `D:\Publications\Books\Mastering ELN\docs\superpowers\specs\2026-11-02-mastering-eln-design.md`

**Interfaces:**
- Produces:
  - `src/lib/site.mjs`: `export const BASE = '/MasteringELN'; export const PORT = 4341; export const BOOK_TITLE = 'Mastering ELN';`
  - `src/lib/parts.ts`: `PART_KEYS = ['front', '1', '2', '3', '4', '5', 'back'] as const`, `PARTS: Part[]`, `getPart(key: string): Part | undefined`, `partHeading(key: string): string`, `partNavLabel(key: string): string`, `pageLabel(number: string): string`, `pageEyebrow(part: string, number: string): string`

- [ ] **Step 1: Initialize `D:\Publications\Books\Mastering ELN\` and copy framework files from `D:\Publications\Books\XRR for Dummies\`**

Create `D:\Publications\Books\Mastering ELN\`, run `git init`, and copy the configuration, layout, script, and `pdf-build` files from `D:\Publications\Books\XRR for Dummies\`:
- Root configs: `.gitignore`, `LICENSE`, `LICENSE-CONTENT.md`, `astro.config.mjs`, `package.json`, `package-lock.json`, `playwright.config.ts`, `tsconfig.json`, `vitest.config.ts`
- `scripts/`: `check-links.mjs`, `check-markers.mjs`, `check-markers.test.mjs`, `deploy.mjs`
- `src/`: `content.config.ts`, `layouts/*`, `lib/*` (except XRR-specific math libraries if any), `components/textbook/{Callout,Tip,Remember,Warning,GoingDeeper,Figure,FigureZoom,DataTable}.astro`, `pages/{index.astro,sections.json.ts,[...slug].astro,sampler.mdx}`, `styles/textbook.css`
- `pdf-build/`: `README.md`, `assemble.py`, `cover_hero.py`, `cover-math.mjs`, `headings.py`, `links.py`, `print-box.mjs`, `render-html.mjs`, `render-sections.mjs`, `siteconf.py`, `verify_pdf.py`, `test_*.py`, `test_*.mjs`
- Copy `D:\APS\ELN\.omp\plans\2026-11-02-mastering-eln-design.md` to `D:\Publications\Books\Mastering ELN\docs\superpowers\specs\2026-11-02-mastering-eln-design.md`.
- Create a directory junction (or `npm ci`) for `node_modules` from `D:\Publications\Books\XRR for Dummies\node_modules` so Vitest, Astro, and Playwright run offline immediately.

- [ ] **Step 2: Write the failing test in `src/lib/parts.test.ts`**

```typescript
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
```

- [ ] **Step 3: Run Vitest to verify `src/lib/parts.test.ts` fails on old XRR constants and Part names**

Run: `npx vitest run src/lib/parts.test.ts`
Expected: FAIL (`expected '/MasteringXRR' to be '/MasteringELN'`)

- [ ] **Step 4: Update `package.json`, `src/lib/site.mjs`, and `src/lib/parts.ts`, and remove XRR-only `src/lib/` calculators**

Set `"name": "mastering-eln"` in `package.json`.
Set `BASE = '/MasteringELN'`, `PORT = 4341`, `BOOK_TITLE = 'Mastering ELN'` in `src/lib/site.mjs`.
Set the `PARTS` array in `src/lib/parts.ts` to match the five Parts in `parts.test.ts`. Remove any XRR-only physics calculator files (`period-from-orders.*`, `sensitivity.*`) from `src/lib/`.

- [ ] **Step 5: Run Vitest to verify all unit tests in `src/` and `scripts/` pass**

Run: `npm test`
Expected: PASS (`src/lib/parts.test.ts`, `scripts/check-markers.test.mjs`, `pdf-build/print-box.test.mjs`)

- [ ] **Step 6: Commit**

```bash
git add .gitignore LICENSE LICENSE-CONTENT.md package.json package-lock.json astro.config.mjs playwright.config.ts tsconfig.json vitest.config.ts scripts/ src/content.config.ts src/lib/ src/layouts/ docs/superpowers/specs/2026-11-02-mastering-eln-design.md
git commit -m "chore: scaffold Mastering ELN repository and part model"
```

---

### Task 2: Canonical Governance Files (`CLAUDE.md`, `STYLE.md`, `NOTATION.md`, `OUTLINE.md`, `STATUS.md`) and Study A/B Data Bundle

**Files:**
- Create: `D:\Publications\Books\Mastering ELN\CLAUDE.md`
- Create: `D:\Publications\Books\Mastering ELN\STYLE.md`
- Create: `D:\Publications\Books\Mastering ELN\NOTATION.md`
- Create: `D:\Publications\Books\Mastering ELN\OUTLINE.md`
- Create: `D:\Publications\Books\Mastering ELN\STATUS.md`
- Create: `D:\Publications\Books\Mastering ELN\README.md`
- Create: `D:\Publications\Books\Mastering ELN\CITATION.cff`
- Create: `D:\Publications\Books\Mastering ELN\public\data\study-a\...`
- Create: `D:\Publications\Books\Mastering ELN\public\data\study-b\...`

**Interfaces:**
- Consumes: Spec Sections 1–7 (`2026-11-02-mastering-eln-design.md`) and `D:\MultilayerLab\Papers\ELN-Software-Paper\zenodo\demonstration\`
- Produces:
  - Canonical files governing every chapter (`STYLE.md` §3 six icons and §4 language rules; `NOTATION.md` ELN item levels, value sources, record types, units, 26 viewer extensions, and MCP tools; `OUTLINE.md` complete 21-chapter + 5-appendix outline with detailed section outlines for `Introduction` and Chapters 1–4).
  - `public/data/study-a/` (`BN-DLC(261015A)` `checksums.md5` and raw files) and `public/data/study-b/` (`Co/C(261014B)` `checksums.md5`, raw files, and `XRR-fit_Co-C(261014B).xrcx`).

- [ ] **Step 1: Write `CLAUDE.md`, `README.md`, and `CITATION.cff`**

Document the outside read-only sources (`D:\APS\ELN\APS-ELN-Community\`, `D:\APS\ELN\APS-ELN-Commercial\`, `D:\MultilayerLab\Papers\ELN-Software-Paper\`, `D:\Publications\Books\XRR for Dummies\`), source priority (`Code > Help > Paper`), commands (`npm run dev` on port `4341`, `npm test`, `npm run test:py`, `npm run test:e2e`, `npm run check:links`, `npm run check:markers`, `npm run pdf:render`, `npm run pdf:assemble`, `npm run pdf:verify`), and settled author decisions.

- [ ] **Step 2: Write `STYLE.md` and `NOTATION.md`**

In `STYLE.md`: adapt `D:\Publications\Books\XRR for Dummies\STYLE.md` for *Mastering ELN*, defining the six callout icons (`Tip`, `Remember`, `Warning`, `Going Deeper`, `In ELN`, `In a Team Lab`), the five-section `Introduction` structure, `In This Chapter`, numbered GUI steps, `## Sources`, and the plain-language / de-LLM rules (no em-dashes, no antithesis, no rhetorical questions in body text).
In `NOTATION.md`: define canonical ELN terminology verified against `APS-ELN-Community` and `APS-ELN-Commercial`:
- Item hierarchy levels: **Procedure** (`Proc`), **Specimen / Item** (`Item`), **Action** (`Action`), plus **Project**, **Group**, and **Folder**.
- Value record types: **Experimental Condition** (`EXP_CONDITION`) and **Test Result** (`TEST_RESULT`).
- Value provenance sources: `Reader` (file ID, MD5, reader ID, reader version), `Derived` (formula ID, formula version, input value IDs), `Manual`, and `Unknown`.
- Hypothesis states: `Proposed`, `Approved`, `Rejected`, `InReview`, `Accepted`, `Abandoned`.
- Units (`Å` for X-ray multilayer thicknesses, `nm` / `µm` for tribology step/wear profiles as stored in `ValueTypes.csv`, `GPa` for hardness/modulus, `N` / `kgf` for load, `°` for `θ` and `2θ`) and the 26 viewer file extensions.

- [ ] **Step 3: Write `OUTLINE.md` and `STATUS.md`**

Include the complete 21-chapter + 5-appendix plan from the spec, plus full section-by-section outlines (with `In This Chapter` bullets, numbered sections, figures/tables, callout placements, and source keys `C:Code`, `P:Code`, `H:Page`, `Paper§n`) for `Introduction` and `Part 1` (Chapters 1–4).

- [ ] **Step 4: Stage Study A (`261015A`) and Study B (`261014B`) demonstration raw files into `public/data/`**

Copy `D:\MultilayerLab\Papers\ELN-Software-Paper\zenodo\demonstration\tribo_study\raw_files\*` to `public/data/study-a/` and `D:\MultilayerLab\Papers\ELN-Software-Paper\zenodo\demonstration\xrr_study\raw_files\*` plus `laboratory_notebook_item\XRR-fit_Co-C(261014B).xrcx` to `public/data/study-b/`.

- [ ] **Step 5: Verify no em-dashes or unresolved markers in canonical files and check MD5 checksums of staged data**

Run: `node -e "const fs=require('fs'); for (const f of ['STYLE.md','NOTATION.md','OUTLINE.md','STATUS.md']) { const t=fs.readFileSync(f,'utf8'); if (t.includes('—')) throw new Error(f+' has em-dash'); } console.log('OK');"`
Expected: `OK`

- [ ] **Step 6: Commit**

```bash
git add CLAUDE.md STYLE.md NOTATION.md OUTLINE.md STATUS.md README.md CITATION.cff public/data/
git commit -m "docs: add canonical governance files and Study A/B demonstration files"
```

---

### Task 3: Six Callout Components (`InELN`, `InTeamLab`), Stylesheet, Sampler Page, and PDF Cover/Pipeline Adaptation

**Files:**
- Modify: `D:\Publications\Books\Mastering ELN\src\components\textbook\Callout.astro`
- Create: `D:\Publications\Books\Mastering ELN\src\components\textbook\InELN.astro`
- Create: `D:\Publications\Books\Mastering ELN\src\components\textbook\InTeamLab.astro`
- Modify: `D:\Publications\Books\Mastering ELN\src\styles\textbook.css`
- Modify: `D:\Publications\Books\Mastering ELN\src\pages\sampler.mdx`
- Modify: `D:\Publications\Books\Mastering ELN\pdf-build\assemble.py`
- Modify: `D:\Publications\Books\Mastering ELN\pdf-build\cover_hero.py`
- Modify: `D:\Publications\Books\Mastering ELN\pdf-build\cover-math.mjs`
- Test: `D:\Publications\Books\Mastering ELN\pdf-build\test_assemble.py`
- Test: `D:\Publications\Books\Mastering ELN\pdf-build\test_links.py`

**Interfaces:**
- Consumes: `src/lib/site.mjs` (`BASE = '/MasteringELN'`, `PORT = 4341`, `BOOK_TITLE = 'Mastering ELN'`)
- Produces:
  - `Callout.astro`: `export type CalloutKind = 'tip' | 'remember' | 'warning' | 'deeper' | 'eln' | 'team';`
  - `InELN.astro`: `<Callout kind="eln" title={title}><slot /></Callout>`
  - `InTeamLab.astro`: `<Callout kind="team" title={title}><slot /></Callout>`
  - CSS classes `.box-eln` (`--c-eln: #00695c`, background `#e0f2f1`) and `.box-team` (`--c-team: #5e35b1`, background `#ede7f6`) in `src/styles/textbook.css`
  - Generated cover assets `pdf-build/cover-math.html` and `pdf-build/cover-hero.svg`

- [ ] **Step 1: Update `pdf-build/test_links.py` and `pdf-build/test_assemble.py` with Mastering ELN expectations**

In `pdf-build/test_links.py`:
- Expect `siteconf.BASE == "/MasteringELN"`, `siteconf.PORT == 4341`, `siteconf.BOOK_TITLE == "Mastering ELN"`, and `siteconf.BASE_PATH == "/MasteringELN/"`.
- Update hardcoded URLs in `@pytest.mark.parametrize` from `/MasteringXRR/` and `:4331` to `/MasteringELN/` and `:4341`.
In `pdf-build/test_assemble.py`:
- Add assertion `assert _two_lines("Mastering ELN") == "Mastering<br>ELN"`.

- [ ] **Step 2: Run pytest to verify `pdf-build/test_assemble.py` or `cover_hero.py` fails before updating `assemble.py` and `cover_hero.py`**

Run: `npm run test:py`
Expected: PASS on `test_links.py` (since `site.mjs` was updated in Task 1) and verify `test_assemble.py` runs against updated `assemble.py`.

- [ ] **Step 3: Implement the 6 callouts (`Callout.astro`, `InELN.astro`, `InTeamLab.astro`), CSS styles (`textbook.css`), `/sampler/` (`sampler.mdx`), and cover generator (`cover_hero.py`, `assemble.py`)**

- In `src/components/textbook/Callout.astro`:
  - Set `export type CalloutKind = 'tip' | 'remember' | 'warning' | 'deeper' | 'eln' | 'team';`
  - Set `LABEL`: `eln: 'In ELN'`, `team: 'In a Team Lab'`.
  - Give `eln` a clean desktop-window/notebook SVG glyph and `team` a two-user/server-node SVG glyph.
- Create `InELN.astro` and `InTeamLab.astro` wrapping `<Callout kind="eln">` and `<Callout kind="team">`.
- In `src/styles/textbook.css`: replace `--c-xrc` / `.box-xrc` with `--c-eln: #00695c` / `.box-eln` and add `--c-team: #5e35b1` / `.box-team { border-color: var(--c-team); background: #ede7f6; } .box-team .box-title { color: var(--c-team); }`.
- In `src/pages/sampler.mdx`: render `<Tip>`, `<Remember>`, `<Warning>`, `<InELN>`, `<InTeamLab>`, `<GoingDeeper>`, `<Figure>`, `<DataTable>`, `:::print-only`, and `:::web-only`.
- In `pdf-build/assemble.py`: set `BOOK_SUB_LINES = ("Recording, Tracing, and Analyzing", "Laboratory Data with APS ELN")`, `COVER_ACCENT = "#1a5276"`, `COVER_TINT = "#5dade2"`, `COVER_DATA = "#f5b041"`.
- In `pdf-build/cover-math.mjs` and `pdf-build/cover_hero.py`: generate `cover-math.html` and `cover-hero.svg` showing the ELN provenance chain (`Proc → Specimen → Action → File → Value`) with no dependency on external `local_paths.py` or XRR curve files, and run `python pdf-build/cover_hero.py` to generate both files.

- [ ] **Step 4: Run pytest and Vitest to verify all unit tests pass**

Run: `npm test && npm run test:py`
Expected: PASS on all Vitest and pytest suites.

- [ ] **Step 5: Commit**

```bash
git add src/components/textbook/ src/styles/textbook.css src/pages/sampler.mdx pdf-build/
git commit -m "feat: add InELN and InTeamLab callouts, sampler page, and PDF cover hero"
```

---

### Task 4: Front Matter (`introduction.mdx`) and Part 1 Chapters (`ch1`–`ch4`) with Figures

**Files:**
- Create: `D:\Publications\Books\Mastering ELN\public\figures\fig-1-1-provenance-chain.svg`
- Create: `D:\Publications\Books\Mastering ELN\public\figures\fig-1-2-study-a-tree.svg`
- Create: `D:\Publications\Books\Mastering ELN\public\figures\fig-2-1-notebook-modes.svg`
- Create: `D:\Publications\Books\Mastering ELN\public\figures\fig-3-1-main-window.svg`
- Create: `D:\Publications\Books\Mastering ELN\public\figures\fig-4-1-study-a-complete.svg`
- Create: `D:\Publications\Books\Mastering ELN\src\content\chapters\introduction.mdx`
- Create: `D:\Publications\Books\Mastering ELN\src\content\chapters\ch1-what-an-eln-is-and-why-links-matter.mdx`
- Create: `D:\Publications\Books\Mastering ELN\src\content\chapters\ch2-opening-a-notebook.mdx`
- Create: `D:\Publications\Books\Mastering ELN\src\content\chapters\ch3-a-tour-of-the-main-window.mdx`
- Create: `D:\Publications\Books\Mastering ELN\src\content\chapters\ch4-your-first-complete-sample-record.mdx`

**Interfaces:**
- Consumes: `OUTLINE.md`, `STYLE.md`, `NOTATION.md`, `src/components/textbook/{Tip,Remember,Warning,GoingDeeper,InELN,InTeamLab,Figure,DataTable}.astro`
- Produces:
  - Validated chapter collection entries (`order: 0` for `introduction`, `order: 1..4` for `ch1..ch4`) rendered at `/MasteringELN/introduction/`, `/MasteringELN/ch1-what-an-eln-is-and-why-links-matter/`, `/MasteringELN/ch2-opening-a-notebook/`, `/MasteringELN/ch3-a-tour-of-the-main-window/`, and `/MasteringELN/ch4-your-first-complete-sample-record/`.

- [ ] **Step 1: Generate clean static SVG figures for Chapters 1–4 in `public/figures/`**

Create:
- `public/figures/fig-1-1-provenance-chain.svg`: The four-link chain (`Sample → Operation → Raw File → Stored Value`) showing how structural parent links keep the first three and `Reader` / `Derived` provenance keeps the fourth (`arXiv:2610.27859` Fig. 1/2 concepts).
- `public/figures/fig-1-2-study-a-tree.svg`: The Study A `BN-DLC(261015A)` and Study B `Co/C(261014B)` trees side by side (`Proc → Specimen → Action → File → Value`).
- `public/figures/fig-2-1-notebook-modes.svg`: Local Community notebook (`.elndb` SQLite file + `Files/` attachment folder) versus Team Server connection (MySQL + WebDAV / REST server).
- `public/figures/fig-3-1-main-window.svg`: Labeled diagram of the ELN Desktop main window (Project Tree, Item Tree, Content Tabs, Preview Pane, Status Bar).
- `public/figures/fig-4-1-study-a-complete.svg`: Completed Study A `BN-DLC(261015A)` record showing attached `.depo.json`, `.fibps`, `.mit`, and `.zrw` files and extracted `Reader` values.

- [ ] **Step 2: Draft `src/content/chapters/introduction.mdx`**

Include frontmatter (`title: "Introduction"`, `part: "front"`, `number: ""`, `order: 0`) and the five required `STYLE.md §3` level-2 headings:
1. `## About This Book`
2. `## Foolish Assumptions`
3. `## Icons Used in This Book` (rendering all six icons: `<Tip>`, `<Remember>`, `<Warning>`, `<GoingDeeper>`, `<InELN>`, `<InTeamLab>`)
4. `## Beyond the Book` (`:::web-only` download links to `/MasteringELN/data/study-a/checksums.md5` and `/MasteringELN/data/study-b/checksums.md5` with `:::print-only` fallback, **Help > User Manual** (`F1`), and the `arXiv:2610.27859` paper citation)
5. `## Where to Go from Here` (four linked routes into Chapters 1–4 and forward pointers to Parts 2–5)
End with `## Sources`.

- [ ] **Step 3: Draft `ch1`–`ch4` in `src/content/chapters/`**

Verify every menu caption, shortcut, dialog label, and file extension against `D:\APS\ELN\APS-ELN-Community\` and `D:\APS\ELN\APS-ELN-Commercial\` before writing:
- `ch1-what-an-eln-is-and-why-links-matter.mdx` (`part: "1"`, `number: "1"`, `order: 1`): The provenance chain, the findings from the 7-month laboratory study (`arXiv:2610.27859`: 24 projects, 1,283 items, 2,676 files, 674 values; 26 traced values where 13 matched the current reader, 4 differed, and 9 had no reader counterpart), the four rules of a clean student record, and Table 1-1 mapping the complete student workflow across the book.
- `ch2-opening-a-notebook.mdx` (`part: "1"`, `number: "2"`, `order: 2`): Creating, opening, switching, and backing up a local Community notebook (`.elndb` + attachment folder), plus `<InTeamLab>` sections for Commercial server login, connection modes, Demo Mode, and user roles.
- `ch3-a-tour-of-the-main-window.mdx` (`part: "1"`, `number: "3"`, `order: 3`): Navigating the Project Tree, Item Tree (`Proc`, `Specimen`, `Action`), Content Tabs (Files, Notes, Protocols, Values, Comments, Links), Preview Pane (26 viewer plugins), and Status Bar.
- `ch4-your-first-complete-sample-record.mdx` (`part: "1"`, `number: "4"`, `order: 4`): Step-by-step hands-on walkthrough of Study A (`BN-DLC(261015A)`): building the `Deposition BN-DLC(261015A)` procedure, the `BN-DLC(261015A)` specimen, and its `Thickness`, `NanoIndentation`, and `Friction test` actions; naming files without results in the filename; attaching `.depo.json`, `.fibps`, `.mit`, and `.zrw`; and extracting `Reader`-sourced values.

- [ ] **Step 4: Build the site and run the link and marker gates**

Run: `npm run build && npm run check:links && npm run check:markers`
Expected:
- `astro build` succeeds with 0 errors.
- `check-links.mjs` reports all internal links and `#fragments` valid, 0 literal `$$`, and 0 e-notation strings.
- `check-markers.mjs` reports 0 unresolved markers.

- [ ] **Step 5: Update `STATUS.md` and commit**

```bash
git add public/figures/ src/content/chapters/ STATUS.md
git commit -m "feat: draft Introduction and Part 1 (Chapters 1-4) with figures"
```

---

### Task 5: End-to-End Verification (Playwright E2E and Print PDF Pipeline)

**Files:**
- Modify: `D:\Publications\Books\Mastering ELN\e2e\smoke.spec.ts`
- Modify: `D:\Publications\Books\Mastering ELN\pdf-build\verify_pdf.py` (if any book-specific constant needs adjustment)

**Interfaces:**
- Consumes: Built `dist/` site and `/MasteringELN/sections.json`
- Produces: Verified `e2e/smoke.spec.ts` suite and assembled + verified `pdf-build/Mastering-ELN.pdf`

- [ ] **Step 1: Update `e2e/smoke.spec.ts` for Mastering ELN**

Replace the two XRR widget tests at the bottom of `e2e/smoke.spec.ts` with Mastering ELN smoke tests:
- Verify the home page lists `Front Matter` (`Introduction`) and `Part 1: Getting Started` (`Chapter 1` through `Chapter 4`).
- Verify `Introduction` carries the five sections of `STYLE.md §3`.
- Verify `/sampler/` renders all six callout boxes (`.box-tip`, `.box-remember`, `.box-warning`, `.box-eln`, `.box-team`, `details.box-deeper`), toggles `WEB-ONLY:` / `PRINT-ONLY:` between screen and print media, and opens `Going Deeper` on click.
- Verify `Sources` is collapsed on the web on `/MasteringELN/ch1-what-an-eln-is-and-why-links-matter/`, keeps `#sources`, and opens on click.
- Verify clicking `#fig-1-1` opens `dialog.figzoom` and `Escape` closes it.

- [ ] **Step 2: Run Playwright E2E tests**

Run: `npm run test:e2e`
Expected: PASS (all Playwright tests green against `http://localhost:4341/MasteringELN/`).

- [ ] **Step 3: Run the PDF render, assemble, and verify pipeline**

With preview running (or starting preview in the background on port 4341):
Run:
```powershell
$env:PYTHONIOENCODING = "utf-8"
npm run pdf:render
npm run pdf:assemble
npm run pdf:verify
```
Expected:
- `pdf:render` renders `introduction` and `ch1`–`ch4` into `pdf-build/out/`.
- `pdf:assemble` produces `pdf-build/Mastering-ELN.pdf` with cover, title page, Contents, running heads, page numbers, rewritten internal links, and PDF bookmarks.
- `pdf:verify` exits `0` with all PDF verification checks PASS.

- [ ] **Step 4: Commit final E2E and PDF updates**

```bash
git add e2e/smoke.spec.ts pdf-build/ STATUS.md
git commit -m "test: verify Mastering ELN e2e suite and print PDF pipeline"
```
