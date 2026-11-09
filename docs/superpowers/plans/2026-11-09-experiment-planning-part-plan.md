# Part 3: Experiment Planning with ELN (Chapters 10–12) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add **Part 3: Experiment Planning with ELN** (`Chapters 10–12`: Principles of Experiment Planning and the Taguchi Method, The Hypothesis Tree and Evidence, and Experiment Series and Taguchi Arrays in ELN), shift the remaining Parts and Chapters to `Parts 4–6` and `Chapters 13–24`, update all GUI/MCP chapters and figures for the standalone Hypotheses/Series windows and Taguchi orthogonal arrays, and verify the web and PDF editions.

**Architecture:** `src/lib/parts.ts` defines the book's Parts (`PART_KEYS` and `PARTS`), and `src/content/chapters/*.mdx` entries are ordered by `order` and numbered by `number`. Expanding `PART_KEYS` to `['front', '1', '2', '3', '4', '5', '6', 'back']`, shifting existing `ch10`–`ch22` to `ch11` and `ch13`–`ch24`, and adding `ch10-principles-of-experiment-planning.mdx` and `ch12-experiment-series-and-taguchi-arrays.mdx` updates the Astro collection, sidebar navigation, and PDF Table of Contents automatically. Canonical files (`OUTLINE.md`, `NOTATION.md`, `STATUS.md`), internal links, and standalone PDFs (`ELN-Cheat-Sheet.pdf`, `ELN-Mandatory-Assignment.pdf`) are updated in lockstep.

**Tech Stack:** Astro 7 MDX, SVG figures, Vitest, pytest, Playwright + PyMuPDF PDF pipeline.

**Spec:** `docs/superpowers/specs/2026-11-09-experiment-planning-part-design.md`

## Global Constraints

- Follow `STYLE.md §4` strictly: second-person conversational register in chapters, reference register in appendices, $\le 30$-word sentences, one main clause per sentence, zero em-dashes (`—`), zero antithesis (`X, not Y`), zero stock evaluation words, and zero raw computer e-notation (`3.58e-7`) in prose or `DataTable.astro` cells.
- `DataTable.astro` does not render LaTeX `$...$` inside cells; use HTML `<sub>`/`<sup>` and Unicode (`°`, `×`, `±`, `μm`, `Å`, `Δ`) in `DataTable` rows.
- Every new SVG figure in `public/figures/` must fit cleanly within the A5 print box without text clipping or overlap.
- All verification gates (`npm test`, `npm run test:py`, `npm run build`, `npm run check:links`, `npm run check:markers`, `pdf:render`, `pdf:assemble`, `pdf:verify`) must pass with 0 failures and 0 skips.

## Review Focus

1. **Part key enum validation (`src/content.config.ts` & `src/lib/parts.test.ts`):** Adding `'6'` to `PART_KEYS` and changing Part 3/4/5 titles must pass `src/lib/parts.test.ts` and `e2e/smoke.spec.ts`.
2. **Broken internal links or `#fragment` anchors after shifting `ch10`–`ch22` $\rightarrow$ `ch11`, `ch13`–`ch24`:** Every `/MasteringELN/ch...#...` link across all 30 MDX pages must resolve in `npm run check:links` and `pdf-build/verify_pdf.py`.
3. **Community vs. Commercial hypothesis label accuracy:** Community uses `Draft` $\rightarrow$ `Start` / `Discard` $\rightarrow$ `Open` $\rightarrow$ `Close with conclusion` (`Close` after MCP `submit_conclusion` sets `Open · conclusion ready`) $\rightarrow$ `Closed · Supported / Refuted / Inconclusive`; Commercial uses `Proposed` $\rightarrow$ `Approve` / `Reject` $\rightarrow$ `Approved` $\rightarrow$ `Submit conclusion` $\rightarrow$ `In review` $\rightarrow$ `Accept` / `Return for more work` $\rightarrow$ `Accepted`.
4. **Taguchi array limits and formulas (`unit_SeriesTaguchi.pas` & `Series.html`):** Full grid is 1–3 factors and $\le 27$ points; Taguchi supports 2–7 factors (`L4`, `L8`, `L9`, `L16`, `L18`, `L27`); level means use sample SD for $n \ge 2$ and single-value tolerance for $n = 1$, compute $\Delta = \max - \min$ level mean and `rank r of k`, exclude deviated runs and unconfirmed `planned` values, and do not compute S/N ratios or ANOVA.
5. **No LaTeX `$...$` or raw e-notation in `DataTable` rows:** Checked by `npm run check:links` and visual/PDF table inspection.

---

### Task 1: Update `src/lib/parts.ts`, Unit Tests, E2E Smoke Test, and Canonical Files (`NOTATION.md`, `OUTLINE.md`)

**Files:**
- Modify: `src/lib/parts.ts`
- Modify: `src/lib/parts.test.ts`
- Modify: `e2e/smoke.spec.ts`
- Modify: `NOTATION.md`
- Modify: `OUTLINE.md`

**Interfaces:**
- Produces: `PART_KEYS = ['front', '1', '2', '3', '4', '5', '6', 'back'] as const` in `src/lib/parts.ts`:
  - `'1'`: `'Getting Started'`
  - `'2'`: `'Recording Daily Lab Work'`
  - `'3'`: `'Experiment Planning with ELN'`
  - `'4'`: `'Organizing, Searching, and Reviewing'`
  - `'5'`: `'Working with an AI Agent (MCP)'`
  - `'6'`: `'The Part of Tens'`

- [ ] **Step 1: Update `src/lib/parts.test.ts` and `e2e/smoke.spec.ts` to expect the 6 numbered Parts**

```ts
expect(partHeading('1')).toBe('Part 1: Getting Started');
expect(partHeading('2')).toBe('Part 2: Recording Daily Lab Work');
expect(partHeading('3')).toBe('Part 3: Experiment Planning with ELN');
expect(partHeading('4')).toBe('Part 4: Organizing, Searching, and Reviewing');
expect(partHeading('5')).toBe('Part 5: Working with an AI Agent (MCP)');
expect(partHeading('6')).toBe('Part 6: The Part of Tens');
expect(partHeading('back')).toBe('Appendices');
```

- [ ] **Step 2: Run `npm test` to verify `src/lib/parts.test.ts` fails before updating `src/lib/parts.ts`**

Run: `npx vitest run src/lib/parts.test.ts`
Expected: FAIL on `partHeading('3')`.

- [ ] **Step 3: Update `src/lib/parts.ts` with the 6 numbered Parts**

Update `PART_KEYS` and `PARTS` in `src/lib/parts.ts` to match the 6-Part table above.

- [ ] **Step 4: Run `npx vitest run src/lib/parts.test.ts` to verify it passes**

Run: `npx vitest run src/lib/parts.test.ts`
Expected: PASS.

- [ ] **Step 5: Update `NOTATION.md` and `OUTLINE.md` for Part 3 (`Chapters 10–12`) and shifted `Chapters 13–24`**

- In `NOTATION.md §2`: update the **Series** entry to reflect 1 to 7 **Factors** with optional **Labels** and **Levels**, **Full grid** ($\le 3$ factors, $\le 27$ points) and **Taguchi orthogonal array** (`L4`, `L8`, `L9`, `L16`, `L18`, `L27`) point generation, **Level means (Taguchi)** with $\Delta$ and factor rank, and standalone **Hypotheses** / **Series** windows; add **Hypothesis** (`THypothesis`) with both Community (`Draft`, `Open`, `Closed`) and Commercial (`Proposed`, `Approved`, `In review`, `Accepted`) status labels.
- In `OUTLINE.md`: update Front Matter reading routes, add **Part 3: Experiment Planning with ELN** (`Chapters 10–12`), rename **Part 4: Organizing, Searching, and Reviewing** (`Chapters 13–16`, with Chapter 15 retitled `Cross-Project Charts, PDF Reports, and Packages`), **Part 5: Working with an AI Agent (MCP)** (`Chapters 17–21`), and **Part 6: The Part of Tens** (`Chapters 22–24`).

---

### Task 2: Rename Existing Chapters (`ch10`–`ch22` $\rightarrow$ `ch11`, `ch13`–`ch24`) and Figures (`fig-10`–`fig-19` $\rightarrow$ `fig-11`, `fig-13`–`fig-21`)

**Files:**
- Move & Modify:
  - `src/content/chapters/ch22-ten-things-an-agent-can-and-cannot-do.mdx` $\rightarrow$ `ch24-ten-things-an-agent-can-and-cannot-do.mdx` (`part: '6'`, `number: '24'`, `order: 240`)
  - `src/content/chapters/ch21-ten-checks-before-you-sign-or-submit.mdx` $\rightarrow$ `ch23-ten-checks-before-you-sign-or-submit.mdx` (`part: '6'`, `number: '23'`, `order: 230`)
  - `src/content/chapters/ch20-ten-mistakes-that-break-your-data-trail.mdx` $\rightarrow$ `ch22-ten-mistakes-that-break-your-data-trail.mdx` (`part: '6'`, `number: '22'`, `order: 220`)
  - `src/content/chapters/ch19-importing-legacy-folders-with-an-ai-agent.mdx` $\rightarrow$ `ch21-importing-legacy-folders-with-an-ai-agent.mdx` (`part: '5'`, `number: '21'`, `order: 210`)
  - `src/content/chapters/ch18-drafting-trees-hypotheses-and-wikis.mdx` $\rightarrow$ `ch20-drafting-trees-hypotheses-and-wikis.mdx` (`part: '5'`, `number: '20'`, `order: 200`)
  - `src/content/chapters/ch17-study-b-xrr-fitting-with-provenance.mdx` $\rightarrow$ `ch19-study-b-xrr-fitting-with-provenance.mdx` (`part: '5'`, `number: '19'`, `order: 190`)
  - `src/content/chapters/ch16-reading-data-and-auditing-drift-via-mcp.mdx` $\rightarrow$ `ch18-reading-data-and-auditing-drift-via-mcp.mdx` (`part: '5'`, `number: '18'`, `order: 180`)
  - `src/content/chapters/ch15-connecting-an-ai-agent-to-your-notebook.mdx` $\rightarrow$ `ch17-connecting-an-ai-agent-to-your-notebook.mdx` (`part: '5'`, `number: '17'`, `order: 170`)
  - `src/content/chapters/ch14-completeness-audit-and-signatures.mdx` $\rightarrow$ `ch16-completeness-audit-and-signatures.mdx` (`part: '4'`, `number: '16'`, `order: 160`)
  - `src/content/chapters/ch13-charts-correlations-and-pdf-reports.mdx` $\rightarrow$ `ch15-charts-correlations-and-pdf-reports.mdx` (`part: '4'`, `number: '15'`, `order: 150`)
  - `src/content/chapters/ch12-full-text-panel-and-semantic-search.mdx` $\rightarrow$ `ch14-full-text-panel-and-semantic-search.mdx` (`part: '4'`, `number: '14'`, `order: 140`)
  - `src/content/chapters/ch11-project-wiki-notes-tags-and-links.mdx` $\rightarrow$ `ch13-project-wiki-notes-tags-and-links.mdx` (`part: '4'`, `number: '13'`, `order: 130`)
  - `src/content/chapters/ch10-the-hypothesis-tree-and-evidence.mdx` $\rightarrow$ `ch11-the-hypothesis-tree-and-evidence.mdx` (`part: '3'`, `number: '11'`, `order: 110`)
- Move figures in `public/figures/`:
  - `fig-19-1-legacy-import-workflow.svg` $\rightarrow$ `fig-21-1-legacy-import-workflow.svg`
  - `fig-18-1-human-agent-division.svg` $\rightarrow$ `fig-20-1-human-agent-division.svg`
  - `fig-17-1-study-b-agent-workflow.svg` $\rightarrow$ `fig-19-1-study-b-agent-workflow.svg`
  - `fig-17-2-study-b-xrcx-window.png` $\rightarrow$ `fig-19-2-study-b-xrcx-window.png`
  - `fig-16-1-mcp-audit-pipeline.svg` $\rightarrow$ `fig-18-1-mcp-audit-pipeline.svg`
  - `fig-15-1-mcp-architecture.svg` $\rightarrow$ `fig-17-1-mcp-architecture.svg`
  - `fig-14-1-integrity-layers.svg` $\rightarrow$ `fig-16-1-integrity-layers.svg`
  - `fig-13-1-analysis-and-reports.svg` $\rightarrow$ `fig-15-1-analysis-and-reports.svg`
  - `fig-12-1-search-architecture.svg` $\rightarrow$ `fig-14-1-search-architecture.svg`
  - `fig-12-2-search-dialog.png` $\rightarrow$ `fig-14-2-search-dialog.png`
  - `fig-11-1-wiki-five-sections.svg` $\rightarrow$ `fig-13-1-wiki-five-sections.svg`
  - `fig-10-1-hypothesis-lifecycle.svg` $\rightarrow$ `fig-11-1-hypothesis-lifecycle.svg`
  - `fig-10-2-hypotheses-view.png` $\rightarrow$ `fig-11-2-hypotheses-view.png`

- [ ] **Step 1: Move the chapter MDX files and figure files in descending order using `git mv`**

Run sequential `git mv` from `ch22` down to `ch10` and `fig-19-1` down to `fig-10-1`.

- [ ] **Step 2: Update frontmatter (`part`, `number`, `order`), figure IDs/numbers (`fig-13-1`..`fig-21-1`), and table IDs/captions (`Table 13-1`..`Table 21-2`) in the moved chapters**

Also trim Section 1 (`## Planning and running an Experiment Series`) out of `ch15-charts-correlations-and-pdf-reports.mdx`, retitle it `Cross-Project Charts, PDF Reports, and Packages`, and point readers to `ch12-experiment-series-and-taguchi-arrays` for **Project > Series...**.

---

### Task 3: Draft Part 3 Chapters (`ch10`, `ch11`, `ch12`) and Create/Update Figures (`fig-10-1`, `fig-11-1`, `fig-12-1`)

**Files:**
- Create: `public/figures/fig-10-1-planning-designs.svg`
- Modify: `public/figures/fig-11-1-hypothesis-lifecycle.svg`
- Create: `public/figures/fig-12-1-series-taguchi-workflow.svg`
- Create: `src/content/chapters/ch10-principles-of-experiment-planning.mdx`
- Modify: `src/content/chapters/ch11-the-hypothesis-tree-and-evidence.mdx`
- Create: `src/content/chapters/ch12-experiment-series-and-taguchi-arrays.mdx`

- [ ] **Step 1: Create `public/figures/fig-10-1-planning-designs.svg`**

Draw a 3-panel vector diagram (`viewBox="0 0 680 250"`) comparing:
1. **1-Factor Sweep** (3 points along 1 axis: Power $100, 200, 300\,\text{W}$)
2. **Full Grid** ($3 \times 3 = 9$ points across 2 factors, up to 3 factors / 27 points)
3. **Taguchi Orthogonal Array (`L9`)** (4 factors at 3 levels tested in 9 balanced runs instead of $3^4 = 81$, feeding **Level means (Taguchi)** $\Delta$ and `rank 1 of 4`).

- [ ] **Step 2: Write `src/content/chapters/ch10-principles-of-experiment-planning.mdx`**

Implement all four sections (`Why unplanned experiments fail in the laboratory`, `Factors, levels, fixed conditions, and responses`, `Sweeps, full grids, and Taguchi orthogonal arrays`, `Reading main effects: level means, Delta, and factor rank`), `Figure 10-1`, `Table 10-1` (all six Taguchi arrays `L4`, `L8`, `L9`, `L16`, `L18`, `L27`), `Table 10-2` (worked 4-factor, 3-level `L9` sputtering plan), display equations for $\bar{Y}_{X=L}$, $s_L$, and $\Delta_X$, callouts, and `## Sources`.

- [ ] **Step 3: Update `public/figures/fig-11-1-hypothesis-lifecycle.svg` and `src/content/chapters/ch11-the-hypothesis-tree-and-evidence.mdx`**

- Update `fig-11-1-hypothesis-lifecycle.svg` to show both the **Community** (`Draft` $\rightarrow$ `Start` $\rightarrow$ `Open` $\rightarrow$ `Close with conclusion` $\rightarrow$ `Closed`) and **Commercial** (`Proposed` $\rightarrow$ `Approve` $\rightarrow$ `Approved` $\rightarrow$ `Submit conclusion` $\rightarrow$ `In review` $\rightarrow$ `Accept` $\rightarrow$ `Accepted`) labels.
- Update `ch11-the-hypothesis-tree-and-evidence.mdx` for the standalone **Hypotheses** window, status-tinted read-only text, Community self-review vs. Commercial two-gate review (`Table 11-1`), **Make run** on the **Runs** tab, and why `Planned` series values are excluded from the headline summary and refused as cited evidence until confirmed.

- [ ] **Step 4: Create `public/figures/fig-12-1-series-taguchi-workflow.svg` and write `src/content/chapters/ch12-experiment-series-and-taguchi-arrays.mdx`**

- Draw `fig-12-1-series-taguchi-workflow.svg` showing the four stages of **Project > Series...** in its standalone window: **1. Series Plan** (1–7 Factors, Levels, Full Grid or Taguchi `L4`–`L27`, Fixed, Responses) $\rightarrow$ **2. Make or Link Depositions** (`planned` $\rightarrow$ **Confirm planned values**) $\rightarrow$ **3. Table & Level Means (Taguchi)** ($\Delta$, `rank 1 of k`) $\rightarrow$ **4. Export to OriginLab** (`Copy table` / `Save CSV...` with `±` tolerance columns).
- Write `ch12-experiment-series-and-taguchi-arrays.mdx` covering all four sections, `Figure 12-1`, `Table 12-1`, callouts (`<InELN>`, `<Tip>`, `<Remember>`, `<Warning>`, `<GoingDeeper>`), and `## Sources`.

---

### Task 4: Sync All Cross-References, GUI/MCP Chapters (`ch3`, `ch18`, `ch20`, Appendices), and Standalone PDFs

**Files:**
- Modify: `src/content/chapters/introduction.mdx`
- Modify: `src/content/chapters/ch1-what-an-eln-is-and-why-links-matter.mdx`
- Modify: `src/content/chapters/ch2-opening-a-notebook.mdx`
- Modify: `src/content/chapters/ch3-a-tour-of-the-main-window.mdx`
- Modify: `src/content/chapters/ch5-projects-groups-and-folders.mdx`
- Modify: `src/content/chapters/ch6-the-item-tree-and-experiment-templates.mdx`
- Modify: `src/content/chapters/ch8-filling-out-protocols-and-checklists.mdx`
- Modify: `src/content/chapters/ch9-values-units-formulas-and-provenance.mdx`
- Modify: `src/content/chapters/ch13-project-wiki-notes-tags-and-links.mdx`..`ch24-ten-things-an-agent-can-and-cannot-do.mdx`
- Modify: `src/content/chapters/appendix-a-icons-reference.mdx`..`appendix-e-glossary.mdx`
- Modify: `src/pages/assignment.mdx`
- Modify: `public/ELN-Cheat-Sheet.pdf`
- Modify: `public/ELN-Mandatory-Assignment.pdf`

- [ ] **Step 1: Update GUI & MCP details in `ch3`, `ch18`, `ch20`, `ch24`, and Appendices (`A`, `C`, `E`)**

- `ch3-a-tour-of-the-main-window.mdx`: note that **Project > Hypotheses** and **Project > Series...** open in their own top-level windows with taskbar buttons rather than inside the right-hand Content Viewer.
- `ch18-reading-data-and-auditing-drift-via-mcp.mdx` & `ch20-drafting-trees-hypotheses-and-wikis.mdx`: document factor `levels`, `design: "grid" | "taguchi" | "manual"`, `point_count`, `taguchi_array` in `create_series` and `update_series_plan`, the new hypothesis refusal codes (`planned_value`, `not_citable`, `run_other_project`), and Community (`Open · conclusion ready` $\rightarrow$ click **Close**) vs. Commercial (`In review` $\rightarrow$ click **Accept**) MCP hypothesis states.
- `appendix-c-value-sources-units-and-formulas.mdx` & `appendix-e-glossary.mdx`: add Taguchi orthogonal arrays (`L4`–`L27`), Level means ($\Delta$ and factor rank), and updated chapter links.

- [ ] **Step 2: Update all internal `/MasteringELN/ch...` links across `src/content/chapters/*.mdx` and `src/pages/assignment.mdx`**

Update every link pointing to old `ch10`–`ch22` and `#table-13-1`..`#fig-19-1` to their new chapter routes and anchors.

- [ ] **Step 3: Update `public/ELN-Cheat-Sheet.pdf` and `public/ELN-Mandatory-Assignment.pdf`**

Update the chapter numbers and clickable URL links in `public/ELN-Cheat-Sheet.pdf` and `public/ELN-Mandatory-Assignment.pdf` (`ch15` $\rightarrow$ `ch17`, `ch17` $\rightarrow$ `ch19`, `ch20`/`ch21` $\rightarrow$ `ch23`, and Part 3 Experiment Planning `Ch 10–12`).

---

### Task 5: Run All Web, Test, and PDF Verification Gates and Update `STATUS.md`

**Files:**
- Modify: `STATUS.md`

- [ ] **Step 1: Run unit tests, pytest, build, link checker, and marker checker**

Run: `npm test && npm run test:py && npm run build && npm run check:links && npm run check:markers`
Expected: All Vitest and pytest suites pass; `check:links` reports 33 pages, 0 broken internal links, 0 literal `$$`, 0 e-notation; `check:markers` reports 0 markers.

- [ ] **Step 2: Render, assemble, and verify the print PDF (`Mastering-ELN.pdf`)**

With preview server running on port 4341, run:
`npm run pdf:render && PYTHONIOENCODING=utf-8 npm run pdf:assemble && PYTHONIOENCODING=utf-8 npm run pdf:verify`
Copy `pdf-build/Mastering-ELN.pdf` to `public/Mastering-ELN.pdf`.
Expected: All 23 checks in `pdf-build/verify_pdf.py` PASS with 0 skips and 0 failures.

- [ ] **Step 3: Update `STATUS.md` and deploy to `Z:\MasteringELN\`**
