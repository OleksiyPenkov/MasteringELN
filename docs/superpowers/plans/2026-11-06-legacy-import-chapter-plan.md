# Legacy Folder Import Chapter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add **Chapter 19: Importing Legacy Folders with an AI Agent** to Part 4 (`Working with an AI Agent (MCP)`), shift the three Part of Tens chapters to **Chapters 20–22**, and rebuild and verify the web and PDF editions.

**Architecture:** `src/content/chapters/*.mdx` files are ordered by `order` and numbered by `number`. Inserting `ch19-importing-legacy-folders-with-an-ai-agent.mdx` (`part: '4'`, `number: '19'`, `order: 190`) and renaming `ch19`/`ch20`/`ch21` in Part 5 to `ch20`/`ch21`/`ch22` (`order: 200, 210, 220`) updates the Astro collection and PDF TOC automatically. Canonical files (`OUTLINE.md`, `NOTATION.md`, `STATUS.md`) and incoming links (`ch1`, `introduction`, `assignment`) are updated in lockstep.

**Tech Stack:** Astro 7 MDX, SVG figures, Vitest, pytest, Playwright + PyMuPDF PDF pipeline.

**Spec:** `docs/superpowers/specs/2026-11-06-legacy-import-chapter-design.md`

## Global Constraints

- Follow `STYLE.md §4` strictly: second-person conversational register, ≤30-word sentences, one main clause per sentence, zero em-dashes, zero stock evaluation words, and zero raw computer e-notation (`3.58e-7`) in prose or `DataTable.astro` cells.
- `DataTable.astro` does not render LaTeX `$...$` inside cells; use HTML `<sub>`/`<sup>` and Unicode (`°`, `×`, `±`, `μm`, `Å`) in `DataTable` rows.
- Do not modify any files inside `D:\ResearchProjects\`.
- All verification gates (`npm test`, `npm run test:py`, `npm run build`, `npm run check:links`, `npm run check:markers`, `pdf:render`, `pdf:assemble`, `pdf:verify`) must pass with 0 failures and 0 skips.

## Review Focus

- Broken internal links or `#fragment` anchors after renaming `ch19` -> `ch20`, `ch20` -> `ch21`, `ch21` -> `ch22` (caught by `npm run check:links` and `pdf-build/verify_pdf.py`).
- Raw e-notation or literal `$...$` inside `DataTable` cells in `ch19-importing-legacy-folders-with-an-ai-agent.mdx`.
- Overlong sentences (>30 words) or em-dashes in the new chapter text.
- Clipping or overflow of `fig-19-1-legacy-import-workflow.svg` or `Table 19-1` / `Table 19-2` on A5 PDF pages (`verify_pdf.py` print-box checks).

---

### Task 1: Update Canonical Files (`OUTLINE.md` and `NOTATION.md`)

**Files:**
- Modify: `OUTLINE.md`
- Modify: `NOTATION.md`

- [ ] **Step 1: Update `OUTLINE.md` with Chapter 19 in Part 4 and renumbered Chapters 20–22 in Part 5**
  Update the Front Matter route list (`15–19`, `21`), add `### Chapter 19: Importing Legacy Folders with an AI Agent (ch19-importing-legacy-folders-with-an-ai-agent.mdx)` under Part 4 with its 4 learning objectives and 4 sections (`Fig 19-1`, `Table 19-1`, `Table 19-2`), and renumber Part 5 chapters to `Chapter 20`, `Chapter 21`, and `Chapter 22`.

- [ ] **Step 2: Update `NOTATION.md` with legacy archive extensions encountered during migration**
  Note legacy `.opj` (Origin 7–9 project) and `.rpt` (Keyence exported print report) in Section 5 under the general/characterization viewer notes so every extension mentioned in Chapter 19 is documented in `NOTATION.md`.

---

### Task 2: Rename Part 5 Chapters (`ch20`–`ch22`) and Update Cross-References

**Files:**
- Move & Modify: `src/content/chapters/ch19-ten-mistakes-that-break-your-data-trail.mdx` -> `src/content/chapters/ch20-ten-mistakes-that-break-your-data-trail.mdx`
- Move & Modify: `src/content/chapters/ch20-ten-checks-before-you-sign-or-submit.mdx` -> `src/content/chapters/ch21-ten-checks-before-you-sign-or-submit.mdx`
- Move & Modify: `src/content/chapters/ch21-ten-things-an-agent-can-and-cannot-do.mdx` -> `src/content/chapters/ch22-ten-things-an-agent-can-and-cannot-do.mdx`
- Modify: `src/content/chapters/ch1-what-an-eln-is-and-why-links-matter.mdx`
- Modify: `src/content/chapters/introduction.mdx`
- Modify: `src/pages/assignment.mdx`

- [ ] **Step 1: Rename the three Part 5 MDX files and update their frontmatter (`number` and `order`)**
  - `ch20-ten-mistakes-that-break-your-data-trail.mdx`: `number: '20'`, `order: 200`
  - `ch21-ten-checks-before-you-sign-or-submit.mdx`: `number: '21'`, `order: 210`
  - `ch22-ten-things-an-agent-can-and-cannot-do.mdx`: `number: '22'`, `order: 220` (and add cross-reference to Chapter 19 in item 1).

- [ ] **Step 2: Update references in `ch1`, `introduction`, and `assignment.mdx`**
  - `ch1-what-an-eln-is-and-why-links-matter.mdx`: Table 1-1 row 9 -> `14, 21`; row 10 -> `15–19, 22`.
  - `introduction.mdx`: Part 4 description mentions migrating legacy research folders.
  - `src/pages/assignment.mdx`: update `/MasteringELN/ch20-ten-checks-before-you-sign-or-submit` to `/MasteringELN/ch21-ten-checks-before-you-sign-or-submit` (`Chapter 21: Ten Checks Before You Sign or Submit`).

---

### Task 3: Create `fig-19-1-legacy-import-workflow.svg` and `ch19-importing-legacy-folders-with-an-ai-agent.mdx`

**Files:**
- Create: `public/figures/fig-19-1-legacy-import-workflow.svg`
- Create: `src/content/chapters/ch19-importing-legacy-folders-with-an-ai-agent.mdx`

- [ ] **Step 1: Create `public/figures/fig-19-1-legacy-import-workflow.svg`**
  Draw a clean 600px-wide workflow diagram showing:
  1. Legacy Archive (`D:\ResearchProjects\TiNiZr\`: `Specimens_List_*.docx`, `UNHT\*.mit`, `Wear\*.vk4`, `COF\*.raw`, `*.opju`)
  2. Phase 1 & 2: Read-Only Recon, MD5 Deduplication & Migration Plan Table -> **Human Review Gate** (Approve mapping & resolve ambiguous filenames)
  3. Phase 3: Stage into `--upload-root`, build `Proc -> Specimen -> Action` tree, store `.docx` conditions as `Manual` (citing `file_id`) and `.mit`/`.vk4`/`.raw` measurements as `Reader`
  4. Phase 4: File cross-sample `.opju`/`.pptx` on Project Wiki `Analysis` page + run `check_storage`, `check_value_drift`, `report_value_issues`.

- [ ] **Step 2: Write `src/content/chapters/ch19-importing-legacy-folders-with-an-ai-agent.mdx`**
  Implement all four sections, `Figure 19-1`, `Table 19-1`, `Table 19-2`, callouts (`<Warning>`, `<Remember>`, `<Tip>`, `<GoingDeeper>`), and `## Sources` per `docs/superpowers/specs/2026-11-06-legacy-import-chapter-design.md`.

---

### Task 4: Run Web, Test, and PDF Verification Gates and Deploy

**Files:**
- Modify: `STATUS.md`

- [ ] **Step 1: Run unit tests, build, link checker, and marker checker**
  Run: `npm test && npm run test:py && npm run build && npm run check:links && npm run check:markers`
  Expected: 0 failures, 0 broken links, 0 markers, 0 leaked e-notation.

- [ ] **Step 2: Render, assemble, and verify the print PDF**
  Run `npm run preview` with `npm run pdf:render`, `PYTHONIOENCODING=utf-8 npm run pdf:assemble`, and `PYTHONIOENCODING=utf-8 npm run pdf:verify`, then copy `pdf-build/Mastering-ELN.pdf` to `public/Mastering-ELN.pdf`.
  Expected: All 23 checks in `verify_pdf.py` PASS with 0 skips and 0 failures.

- [ ] **Step 3: Update `STATUS.md`, deploy to `Z:\MasteringELN\`, and commit**
