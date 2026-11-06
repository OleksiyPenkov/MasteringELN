# Design Spec: Chapter 19 — Migrating Legacy Research Folders with an AI Agent

_Date: 2026-11-06. Author: Oleksiy Penkov._

## 1. Intent and Why

Every established laboratory has years of pre-ELN data sitting on network shares or external drives (such as `D:\ResearchProjects\`). These legacy folders were organized before the laboratory adopted APS ELN:
- Files are grouped **by instrument** (`UNHT\`, `Wear\`, `COF\`, `LAXRD\`, `TEM\`) or **by measurement date** (`2016-07-18\`, `2025-09-01\`) rather than by a `Procedure -> Specimen -> Action` tree.
- Specimen synthesis and annealing conditions live inside free-form Word documents (`Specimens_List_2_(10-15).docx`, `specimens.docx`) or Excel spreadsheets (`Deposition log (Co-C) 2015-12-18.xlsx`), often written in Russian, Ukrainian, or mixed shorthand by collaborators.
- Native raw instrument files that APS ELN viewers and data file readers understand (`.mit`, `.vk4`, `.raw`, `.xrcx`) sit next to duplicate copies (`TiNiZr_9B#1.mit` and `TiNiZr_09B#1.mit`, or nested backup folders like `Set 1\UNHT\`), proprietary report exports (`.rpt`), and cross-sample compilation files (`ALL_COF.opj`, `H&WR_vs_Temp.opju`, `compilation.pptx`).

A student or researcher cannot simply drag `D:\ResearchProjects\` into APS ELN, and an AI agent must never blindly create items for every file on disk. However, an AI agent connected through MCP (`ELNCommunityMCP.exe` or `ELNMCPServer.exe`) is uniquely suited to **reconnoiter the folder, deduplicate files by MD5 hash, parse the Word/Excel specimen lists, propose a specimen-first Migration Plan table for human approval, and then build the verified ELN tree with strict separation between `Reader` and `Manual` provenance**.

Adding this chapter at the end of **Part 4: Working with an AI Agent (MCP)** completes the book's coverage of real laboratory workflows: Chapters 15–18 cover recording *new* experiments with an agent, and Chapter 19 covers rescuing *legacy* folders without polluting the notebook or faking provenance.

## 2. Goals, Non-Goals, and Anti-Goals

### Goals
1. Add **Chapter 19: Importing Legacy Folders with an AI Agent** (`src/content/chapters/ch19-importing-legacy-folders-with-an-ai-agent.mdx`, `part: '4'`, `number: '19'`, `order: 185` or re-spaced `190` with Part 5 at `200`, `210`, `220`).
2. Renumber **Part 5: The Part of Tens** cleanly from Chapters 19–21 to **Chapters 20–22** (`ch20-ten-mistakes-that-break-your-data-trail.mdx`, `ch21-ten-checks-before-you-sign-or-submit.mdx`, `ch22-ten-things-an-agent-can-and-cannot-do.mdx`) and update every cross-reference across the book, `OUTLINE.md`, `STATUS.md`, and `src/pages/assignment.mdx`.
3. Teach the **four-phase legacy migration workflow** grounded in real folders from `D:\ResearchProjects\`:
   - **Phase 1: Read-only reconnaissance and MD5 deduplication** (scanning instrument-first and date-first folders, computing MD5 hashes to collapse byte-identical copies like `TiNiZr_9B#1.mit` / `TiNiZr_09B#1.mit` and `Set 1\` mirrors, and reading `.docx`/`.xlsx` specimen logs).
   - **Phase 2: The human-approved Migration Plan table** (matching specimen codes across `.docx` tables and raw filenames, flagging ambiguous filenames like `Ball-12-5N-5k.vk4` vs. `12-5N-5k.vk4` or `13-SS ball-3k-1N.vk4`, and separating cross-sample `.opj`/`.opju`/`.pptx` compilations before any MCP write call runs).
   - **Phase 3: Staging into `--upload-root`, building the tree, and keeping `Reader` vs. `Manual` provenance honest** (walking through `D:\ResearchProjects\TiNiZr\` samples `#10`–`#15` from `Specimens_List_2_(10-15).docx`: staging the deduplicated `.docx`, `.mit`, `.vk4`, and `.raw` files into `--upload-root` without modifying `D:\ResearchProjects\`; attaching `Specimens_List_2_(10-15).docx` to the parent procedure; recording historical annealing temperatures $200\text{–}750\,^\circ\text{C}$ as `Manual` conditions whose description cites `Specimens_List_2_(10-15).docx`; and extracting `Hardness` and `Modulus` from `TiNiZr_10#1.mit`–`TiNiZr_15#1.mit` via `extract_file_key_values` + `add_values` with `Reader` provenance).
   - **Phase 4: Filing cross-sample compilations and auditing the imported project** (placing `H&WR_vs_Temp.opju` and `compilation.pptx` on a Project Wiki `Analysis` page with `[[specimen:CODE]]` links rather than under a single specimen, and verifying the imported project with `check_storage`, `check_value_drift`, and `report_value_issues`).
4. Include one architectural SVG diagram (`public/figures/fig-19-1-legacy-import-workflow.svg`) and two reference/walkthrough tables (`Table 19-1: Common legacy folder patterns in D:\ResearchProjects\ and how to map them to APS ELN` and `Table 19-2: Agent migration plan for TiNiZr batch 2 (samples #10–#15)`).

### Non-Goals
- Do not modify or move any files inside `D:\ResearchProjects\`. The archive on `D:\ResearchProjects\` is read-only source material.
- Do not invent new MCP tools that do not exist in `ELNCommunityMCP.exe` or `ELNMCPServer.exe`. Use the existing shipped MCP tools (`create_project`, `create_folder`, `create_item`, `upload_file`, `extract_file_key_values`, `add_values`, `add_value`, `wiki_create_page`, `check_storage`, `check_value_drift`, `report_value_issues`).

### Anti-Goals
- Never teach an agent to fabricate `Reader` provenance for numbers read out of a `.docx` or `.xlsx` prose table. Numbers parsed from legacy Word/Excel notes must be stored with `source_kind: "Manual"` and a clear description naming the attached `.docx`/`.xlsx` source file.
- Never teach an agent to run MCP write calls on a legacy archive before the human researcher approves the Migration Plan table.
- Never violate `STYLE.md §4` (no sentences over ~30 words, one main clause per sentence, zero em-dashes, zero stock evaluation words, no raw computer e-notation in prose or tables).

## 3. Constraints

- **Canonical files:** `OUTLINE.md`, `NOTATION.md`, `STYLE.md`, and `STATUS.md` must be updated in lockstep. Any new terms or file extensions mentioned (such as `.rpt` Keyence report exports or `.opj` legacy Origin 7–9 projects) must be noted accurately (`NOTATION.md` already lists `.vk4` -> `aps.vk4`, `.raw` -> `aps.tribo`, `.mit` -> `aps.mit`, `.opju` -> `OPJU`, `.docx`/`.xlsx`/`.pptx` -> `OLE`).
- **Renumbering impact:**
  - `src/content/chapters/ch19-ten-mistakes-that-break-your-data-trail.mdx` -> rename to `ch20-ten-mistakes-that-break-your-data-trail.mdx` (`number: '20'`, `order: 200`).
  - `src/content/chapters/ch20-ten-checks-before-you-sign-or-submit.mdx` -> rename to `ch21-ten-checks-before-you-sign-or-submit.mdx` (`number: '21'`, `order: 210`).
  - `src/content/chapters/ch21-ten-things-an-agent-can-and-cannot-do.mdx` -> rename to `ch22-ten-things-an-agent-can-and-cannot-do.mdx` (`number: '22'`, `order: 220`).
  - Update links in `ch1-what-an-eln-is-and-why-links-matter.mdx` (`Table 1-1`), `introduction.mdx`, `src/pages/assignment.mdx`, `OUTLINE.md`, and any other chapter that links to the Part of Tens.
- **Verification gates:** `npm test`, `npm run test:py`, `npm run build`, `npm run check:links`, `npm run check:markers`, and the full PDF build (`pdf:render`, `pdf:assemble`, `pdf:verify`) must pass with 0 failures and 0 skips.

## 4. Approaches Considered

1. **Approach A (Chosen): Four-phase general migration method + concrete walkthrough on `D:\ResearchProjects\TiNiZr\` (`Chapter 19` in Part 4).**
   - *Pros:* Teaches the reusable mental model first (instrument-first vs. specimen-first trees, MD5 deduplication, human approval of the Migration Plan table, and `Reader` vs. `Manual` provenance) and then demonstrates it on a real multi-instrument folder (`TiNiZr` with `.docx` collaborator notes, `UNHT\*.mit`, `Wear\*.vk4`, `COF\*.raw`, and `.opju`/`.pptx` summaries).
   - *Tradeoffs:* Requires renumbering the three Part of Tens chapters from `19–21` to `20–22` and updating their incoming links.
2. **Approach B: Import everything automatically first, clean up inside ELN later.**
   - *Pros:* Fewer upfront steps before calling MCP tools.
   - *Tradeoffs:* Rejected. Blindly importing duplicate files (`TiNiZr_9B#1.mit` and `TiNiZr_09B#1.mit`) and ambiguous filenames pollutes the database and audit log.

## 5. Detailed Chapter Design (`ch19-importing-legacy-folders-with-an-ai-agent.mdx`)

### Frontmatter
- `title`: `Importing Legacy Folders with an AI Agent`
- `part`: `'4'`
- `number`: `'19'`
- `order`: `190`
- `inThisChapter`:
  - `Turning an instrument-first or date-first folder archive into a specimen tree`
  - `Having an agent scan folders, deduplicate files by MD5, and draft a migration plan`
  - `Separating Reader values extracted from raw files and Manual conditions from Word or Excel logs`
  - `Walking through a real migration from D:\ResearchProjects\TiNiZr\ into APS ELN`

### Section 1: `## Why legacy folders break direct import`
- Contrast how APS ELN organizes work (`Procedure -> Specimen -> Action -> File -> Value`) with how legacy folders on a shared drive like `D:\ResearchProjects\` grew over ten years:
  1. **Instrument-first folders:** `D:\ResearchProjects\TiNiZr\` splits measurements of the same sample across `UNHT\`, `Wear\`, `COF\`, `SEM\`, and `TEM #1\`–`TEM#3\`. Similarly, `D:\ResearchProjects\_Experiments\` groups a decade of work under `UNHT\`, `LAXRD\`, `3DProfiler\`, `Sputtering\`, and `Tribotest\`.
  2. **Date-first folders:** Inside `_Experiments\UNHT\2016-07-18\` or `TriboTester Development\2026-04-30\`, folders are named after the calendar date of the instrument session rather than the specimen code.
  3. **Conditions trapped in collaborator notes and spreadsheets:** Sample descriptions sit in Word documents (`Specimens_List_2_(10-15).docx`, `C60+Nitrogen\specimens.docx`) or Excel workbooks (`Deposition log (Co-C) 2015-12-18.xlsx`), often written in another language (Russian or Ukrainian) with prose notes about annealing temperatures, substrates, and phase states.
  4. **Duplicate copies, report exports, and cross-sample plots:** Byte-identical copies sit under slightly different names (`TiNiZr_9B#1.mit` and `TiNiZr_09B#1.mit`, both $11.3\,\text{MB}$, plus a full mirror inside `Set 1\UNHT\`). Keyence `.vk4` height maps (`12-5N-5k.vk4`) sit next to exported `.rpt` print reports (`12-5N-5k.rpt`) and counterbody ball scans (`Ball-12-5N-5k.vk4`). Summary Origin projects (`ALL_COF.opj`, `H&WR_vs_Temp.opju`) and slide decks (`compilation.pptx`) aggregate 20 samples in one file.
- Include **Table 19-1:** *Common legacy folder artifacts in `D:\ResearchProjects\` and how an agent maps them to APS ELN.*
- Include **Figure 19-1 (`fig-19-1-legacy-import-workflow.svg`):** *The four-phase workflow for migrating an instrument-first legacy folder (`D:\ResearchProjects\TiNiZr\`) into a specimen-first APS ELN project, highlighting the mandatory human review gate on the Migration Plan.*

### Section 2: `## Phases 1 and 2: Reconnaissance and the migration plan`
- Explain the first two phases, which are **100% read-only** (zero MCP write calls, zero edits to `D:\ResearchProjects\`):
  - **Phase 1: Read-only inventory and MD5 deduplication.** You point your agent (DSH or OMP) at the legacy folder on disk (`D:\ResearchProjects\TiNiZr\`). The agent lists every subfolder, computes MD5 checksums to collapse byte-identical duplicates (`TiNiZr_9B#1.mit` vs. `TiNiZr_09B#1.mit` and the duplicate `Set 1\` tree), and reads the `.docx` or `.xlsx` specimen lists.
  - **Phase 2: The human-approved Migration Plan.** Before touching ELN, the agent writes a structured **Migration Plan table** (`local://tinizr-migration-plan.md` or in chat) that groups everything by specimen code and lists:
    1. Target **Procedure** and **Specimen** names, substrate, and conditions read from the `.docx`/`.xlsx` log;
    2. Matched raw files per **Action** (`Indentation`, `Tribotest`, `3D Profiling`) and which data file reader (`aps.mit`, `aps.vk4`, `aps.tribo`) applies;
    3. Exact duplicates to skip (with matching MD5 hashes) and redundant exports (such as `.rpt` files when the native `.vk4` file is present);
    4. **Questions for you:** ambiguous filenames (for example, whether `12-3N-5k.vk4` and `12-5N-5k.vk4` belong to two separate `Tribotest` actions at $3\,\text{N}$ and $5\,\text{N}$, and whether `Ball-12-5N-5k.vk4` should sit on the same wear action as the track scan).
- `<Warning title="Never let an agent write to ELN before you approve the migration plan">` Calling `create_item` and `upload_file` on a messy folder before reviewing the mapping creates orphan specimens, duplicate `Reader` values, and misfiled scans that must be cleaned up one by one. Always require a dry-run Migration Plan table first.

### Section 3: `## Phase 3: Staging files and separating Reader from Manual provenance`
- Walk through executing the approved plan on **Batch 2 of `D:\ResearchProjects\TiNiZr\`** (samples `#10`–`#15` described in `Specimens_List_2_(10-15).docx`):
  - **What `Specimens_List_2_(10-15).docx` says:** Single-layer $\text{TiNiZr}$ magnetron-sputtered coatings ($2.5\,\mu\text{m}$ thick, deposited under identical conditions). Samples `#13` (as-deposited) and `#14` (annealed at $600\,^\circ\text{C}$) are on $\text{Al}_2\text{O}_3$ substrates ($15\,\text{mm}$ diameter, $1\,\text{mm}$ thick). Samples `#10` ($500\,^\circ\text{C}$), `#11` ($550\,^\circ\text{C}$), `#12` ($750\,^\circ\text{C}$, over-annealed Laves phase + $\text{Zr}$ solid solution), and `#15` ($200\,^\circ\text{C}$, amorphous) are on $\text{Cr18Ni10Ti}$ (`Х18Н10Т`) stainless-steel substrates ($2.25\,\text{mm}$ thick).
  - **Table 19-2:** *Approved migration plan for `TiNiZr` Batch 2 (samples `#10`–`#15`).*
  - **Step 1: Stage clean copies into `--upload-root`.** Instead of modifying `D:\ResearchProjects\TiNiZr\` or pointing `--upload-root` at the whole `D:\` drive, the agent copies only the approved, deduplicated files into a clean staging folder inside `--upload-root` (for example `C:\ELN-Upload\TiNiZr-Batch2\`).
  - **Step 2: Create the tree and attach the collaborator `.docx` log.** The agent creates project `TiNiZr`, folder `Batch 2 (Samples 10-15)`, and procedure `Deposition TiNiZr Batch 2`. It attaches `Specimens_List_2_(10-15).docx` directly to `Deposition TiNiZr Batch 2` so the original Russian collaborator note is preserved in notebook storage with its MD5 checksum. For each sample that was annealed (`#10`, `#11`, `#12`, `#14`, `#15`), it creates an `Annealing <CODE>` action (`Action`, `Treatment`) under the specimen.
  - **Step 3: Record `.docx` conditions as `Manual` and raw measurements as `Reader`.**
    - Because no automated data file reader parses free-text prose in a Word document, the agent stores the coating thickness ($2.5\,\mu\text{m}$ on the procedure) and each sample's annealing temperature ($500\,^\circ\text{C}$, $550\,^\circ\text{C}$, $750\,^\circ\text{C}$, $600\,^\circ\text{C}$, $200\,^\circ\text{C}$ on its `Annealing` action) via `add_value` with `source_kind: "Manual"` and a description citing the attached file: `"From attached Specimens_List_2_(10-15).docx (file_id = 1)"`.
    - For the nanoindentation files (`TiNiZr_10#1.mit`, `TiNiZr_11#1.mit`, `TiNiZr_12#1.mit`, `TiNiZr_15#1.mit`), the agent attaches each `.mit` file to `Indentation <CODE>`, runs `extract_file_key_values` (`aps.mit`), and stores `Hardness` and `Modulus` via `add_values` with full `Reader` provenance.
    - For the Keyence laser confocal wear scans (`12-3N-5k.vk4`, `12-5N-5k.vk4`, `15-2.vk4`, `13-SS ball-3k-1N.vk4`, `14-SS ball-3k-1N.vk4`, `14-SiN ball-3k-1N.vk4`), the agent attaches each `.vk4` file to its matching wear action so it opens in the **VK4** viewer (`aps.vk4`).
- `<Remember>` Never let an agent disguise a number read from a `.docx`, `.xlsx`, or `.pdf` table as a `Reader` value. `Reader` provenance is reserved for values returned by `extract_file_key_values` from a registered viewer plugin; historical conditions from documents belong in `Manual` values whose **Description** cites the attached document.

### Section 4: `## Phase 4: Filing cross-sample compilations and auditing the import`
- Explain what to do with project-wide summary files at the root of `D:\ResearchProjects\TiNiZr\` (`H&WR_vs_Temp.opju`, `WR.opju`, `Nanoindentation.opj`, `ALL_COF.opj`, `compilation.pptx`, `Thermal_Conductivity_#2.pdf`):
  - Do not attach a 20-sample `.opju` or `.pptx` file to one arbitrary specimen (`#10`).
  - Instead, ask the agent to create a **Project Wiki** page under `Analysis` (`wiki_create_page`, `section: "Analysis"`, `title: "Legacy TiNiZr Summary Plots and Compilations"`) that summarizes the batch history, links to every imported specimen using `[[specimen:TiNiZr-10]]`–`[[specimen:TiNiZr-15]]` (`Chapter 11`), and attaches the `.opju`, `.pptx`, and `.pdf` summary files to that Wiki item.
  - Because **Search by meaning** (`Chapter 12`) indexes `.docx`, `.pptx`, `.xlsx`, and `.pdf` attachments (including Cyrillic text in `Specimens_List_2_(10-15).docx` with the multilingual ONNX model), the legacy notes become searchable across the notebook.
- Finish with the three mandatory post-import MCP audit calls (`Chapter 16`):
  1. `check_storage` on the `TiNiZr` project to confirm every staged `.docx`, `.mit`, and `.vk4` file sits in ELN storage with a matching MD5 hash;
  2. `check_value_drift` to confirm all extracted `Reader` values re-run cleanly with `0` drift;
  3. `report_value_issues` to catch any unit mismatch (for example, $2.5\,\mu\text{m}$ vs. $\text{m}$) or out-of-range annealing temperature.

## 6. What Is Left to the Builder

- Drafting `src/content/chapters/ch19-importing-legacy-folders-with-an-ai-agent.mdx` (~150–170 lines) following `STYLE.md` (conversational second-person register, ≤30-word sentences, one main clause per sentence, zero em-dashes, zero stock evaluation words, no raw e-notation).
- Creating `public/figures/fig-19-1-legacy-import-workflow.svg` matching the visual style and palette of `fig-15-1` through `fig-18-1`.
- Renaming the three Part 5 files (`ch19` -> `ch20`, `ch20` -> `ch21`, `ch21` -> `ch22`) and updating all cross-references, `OUTLINE.md`, `NOTATION.md`, `STATUS.md`, and `src/pages/assignment.mdx`.
- Running all test, link, marker, and PDF verification gates.
