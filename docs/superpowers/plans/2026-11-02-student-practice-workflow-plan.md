# Student Practice Workflow & Mandatory Assignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Package the raw Study A and Study B datasets as `.zip` archives (excluding the pre-fitted `.xrcx`), publish a 1-page Mandatory Assignment (web + standalone 1-page PDF) with a November 16, 2026 deadline, update the book chapters in place, and add `STUDENT-GRADING.md` for MCP verification.

**Architecture:** Build deterministic `.zip` archives in `public/data/`, add `src/pages/assignment.mdx` (using `Sampler.astro` layout so it stays outside the 27-chapter `sections.json` manifest) plus a 1-page printable `public/ELN-Mandatory-Assignment.pdf`, update `index.astro`, `introduction.mdx`, `ch4-your-first-complete-sample-record.mdx`, `ch17-study-b-xrr-fitting-with-provenance.mdx`, and `OUTLINE.md`, and verify all web and PDF gates before deploying to `Z:\MasteringELN\`.

**Tech Stack:** Astro 7, MDX, Python (`zipfile`, PyMuPDF `fitz`), Playwright, Vitest, pytest.

**Spec:** `docs/superpowers/specs/2026-11-02-student-practice-workflow-design.md`

## Global Constraints

- Follow `STYLE.md` and `NOTATION.md` strictly: no em-dashes, no e-notation in prose, exact bold UI paths (`Project > New Group`, `Item > New Procedure`).
- `Study-B-261014B-raw.zip` MUST NOT contain `XRR-fit_Co-C(261014B).xrcx` (only the 7 raw files + 7-entry `checksums.md5`).
- The book's 27 chapter/appendix sections in `src/content/chapters/` remain 27 sections (`sections.json` unchanged in count).
- All verification gates (`npm test`, `npm run test:py`, `npm run build`, `npm run check:links`, `npm run check:markers`, and `pdf-build/verify_pdf.py`) must pass with 0 failures and 0 skips.

## Review Focus

- `Study-B-261014B-raw.zip` accidentally including `XRR-fit_Co-C(261014B).xrcx`: tested by inspecting the zip member list.
- Internal links on `/MasteringELN/assignment/`, `/MasteringELN/`, and modified chapters: tested by `npm run check:links`.
- `ELN-Mandatory-Assignment.pdf` exceeding 1 page: tested by checking `doc.page_count == 1` with PyMuPDF.

---

### Task 1: Build `Study-A-261015A-raw.zip` and `Study-B-261014B-raw.zip`

**Files:**
- Create: `public/data/Study-A-261015A-raw.zip`
- Create: `public/data/Study-B-261014B-raw.zip`

- [ ] **Step 1: Package `Study-A-261015A-raw.zip` (11 raw files + `checksums.md5`) and `Study-B-261014B-raw.zip` (7 raw files + filtered 7-line `checksums.md5`, excluding `XRR-fit_Co-C(261014B).xrcx`)**
- [ ] **Step 2: Verify zip contents and checksum counts**

### Task 2: Create 1-Page Mandatory Assignment (`/MasteringELN/assignment/` and `public/ELN-Mandatory-Assignment.pdf`)

**Files:**
- Create: `src/pages/assignment.mdx`
- Create: `public/ELN-Mandatory-Assignment.pdf`

- [ ] **Step 1: Create `src/pages/assignment.mdx` with Deadline: November 16, 2026, download links, Practice group setup, Task 1 (Study A GUI), Task 2 (Study B Agent + `XRC_MCP`), and pre-submission checklist**
- [ ] **Step 2: Generate `public/ELN-Mandatory-Assignment.pdf` as a clean 1-page A4 handout and verify `page_count == 1`**

### Task 3: Update Home Page, Chapters (`Introduction`, `Ch 4`, `Ch 17`), `OUTLINE.md`, and `STUDENT-GRADING.md`

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/content/chapters/introduction.mdx`
- Modify: `src/content/chapters/ch4-your-first-complete-sample-record.mdx`
- Modify: `src/content/chapters/ch17-study-b-xrr-fitting-with-provenance.mdx`
- Modify: `OUTLINE.md`
- Create: `STUDENT-GRADING.md`

- [ ] **Step 1: Add Mandatory Assignment button to `src/pages/index.astro` and update `introduction.mdx`, `ch4`, `ch17`, and `OUTLINE.md`**
- [ ] **Step 2: Create `STUDENT-GRADING.md` with the deterministic MCP grading procedure and per-student report template**

### Task 4: Verify All Gates, Rebuild PDF, and Deploy to `Z:\MasteringELN\`

**Files:**
- Modify: `pdf-build/Mastering-ELN.pdf`
- Modify: `STATUS.md`

- [ ] **Step 1: Run `npm test`, `npm run test:py`, `npm run build`, `npm run check:links`, `npm run check:markers`**
- [ ] **Step 2: Render, assemble, and verify `pdf-build/Mastering-ELN.pdf` (`verify_pdf.py`)**
- [ ] **Step 3: Copy `dist/` and PDFs to `Z:\MasteringELN\` and commit**
