# STATUS

_Updated after every work session: what changed, what is unresolved, and what the author must decide next._

## 2026-11-02 (Student Practice Workflow & Mandatory Assignment): Raw `.zip` packages, 1-page Mandatory Assignment (due Nov 16), and MCP grading rubric deployed

**Done**
- Packaged `public/data/Study-A-261015A-raw.zip` (11 raw files + `checksums.md5`) and `public/data/Study-B-261014B-raw.zip` (7 raw files + `checksums.md5`, excluding `XRR-fit_Co-C(261014B).xrcx` so students fit the `.xrdml` scan via `XRC_MCP`).
- Created 2-page **Mandatory ELN Practice Assignment** (`src/pages/assignment.mdx` at `http://10.109.92.41/MasteringELN/assignment/` and standalone 2-page printable `public/ELN-Mandatory-Assignment.pdf` with clickable `http://10.109.92.41/MasteringELN/...` links and zero `Z:` references) with **Deadline: November 16, 2026** and starting instructions.
- Updated `src/pages/index.astro`, `introduction.mdx`, `ch4-your-first-complete-sample-record.mdx`, `ch17-study-b-xrr-fitting-with-provenance.mdx`, and `OUTLINE.md` with the `Practice` group (`Study A Practice` + `Study B Practice`) student workflow.
- Added `STUDENT-GRADING.md` specifying the MCP verification sequence and per-student report template.
- Verified across all gates:
  - Vitest: 8 test files, 73 tests passed;
  - pytest: 43 tests passed;
  - `check:links`: 30 pages, 1,257 internal links, 0 literal `$$`, 0 e-notation;
  - `check:markers`: 0 markers left;
  - Print PDF (`pdf-build/Mastering-ELN.pdf`, 207 pages, 27 sections, 30 figures [19 SVG + 11 GUI screenshots], 166 Contents links, 704 internal PDF links): all 23 `verify_pdf.py` checks passed with 0 skips and 0 failures.
  - Deployed updated site, `.zip` bundles, `Mastering-ELN.pdf`, and `ELN-Mandatory-Assignment.pdf` to `Z:\MasteringELN\`.
**Chapter status**

| Part | Chapters | Status |
|---|---|---|
| Front Matter | Introduction | drafted and verified 2026-11-02 |
| 1 Getting Started | 1–4 | drafted and verified 2026-11-02 |
| 2 Recording Daily Lab Work | 5–9 | drafted and verified 2026-11-02 |
| 3 Thinking, Searching, and Reviewing | 10–14 | drafted and verified 2026-11-02 |
| 4 Working with an AI Agent (MCP) | 15–18 | drafted and verified 2026-11-02 |
| 5 The Part of Tens | 19–21 | drafted and verified 2026-11-02 |
| Appendices | A–E | drafted and verified 2026-11-02 |

## Earlier milestones on 2026-11-02

- **Part 4 (`540b994`):** Chapters 15–18 and `fig-15-1` through `fig-18-1` drafted, verified, and committed.
- **Part 3 (`cf59fe4`):** Chapters 10–14 and `fig-10-1` through `fig-14-1` drafted, verified, and committed.
- **Part 2 (`ff1859e`):** Chapters 5–9 and `fig-5-1` through `fig-9-1` drafted, verified, and committed.
- **Phase 1 (`c51433b`):** Repository scaffold, Astro 7 + PDF pipeline, 6 callout icons, Study A/B demonstration files, and Front Matter (`Introduction`) + `Part 1` (`Chapters 1–4`) drafted, verified, and committed.
