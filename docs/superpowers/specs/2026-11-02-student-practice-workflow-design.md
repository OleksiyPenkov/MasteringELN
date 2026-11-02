# Student Practice Workflow — Design Specification

- **Date:** 2026-11-02
- **Target repository:** `D:\Publications\Books\Mastering ELN\` and deployment target `Z:\MasteringELN\`
- **Size:** A small change (short written design)

---

## 1. Intent and Why

Laboratory students learning APS ELN follow a three-step onboarding workflow:
1. Download the raw instrument data packages from the laboratory server (`Z:\MasteringELN\data\`).
2. Read the book and complete both running exercises inside their own account on the laboratory ELN server: creating a personal `Practice` group (`Project > New Group`) and building **Study A (`261015A`)** in `Study A Practice` (via the Desktop GUI, Chapter 4) and **Study B (`261014B`)** in `Study B Practice` (via their AI agent with `ELNMCPServer.exe` and `XRC_MCP.exe`, Chapter 17).
3. Have their finished practice projects checked via the `eln` MCP server against the ground-truth item trees, file checksums, and provenance-backed values to generate a verification report.

## 2. Goals, Non-Goals, and Anti-Goals

- **Goals:**
  - Package and publish `Study-A-261015A-raw.zip` (11 raw files + `checksums.md5`) and `Study-B-261014B-raw.zip` (7 raw files + `checksums.md5`, excluding `XRR-fit_Co-C(261014B).xrcx` so students must run the `XRC_MCP` fit themselves) under `public/data/` and `Z:\MasteringELN\data\`.
  - Create a 1-page **Mandatory Assignment** (`src/pages/assignment.mdx` at `/MasteringELN/assignment/` plus a standalone 1-page printable `public/ELN-Mandatory-Assignment.pdf` to send directly to students) with **Deadline: November 16, 2026** and step-by-step starting instructions.
  - Update `src/pages/index.astro`, `introduction.mdx`, `ch4-your-first-complete-sample-record.mdx`, and `ch17-study-b-xrr-fitting-with-provenance.mdx` so students have clear links and instructions for downloading the `.zip` packages, creating their `Practice` group, and completing `Study A Practice` and `Study B Practice`.
  - Add `STUDENT-GRADING.md` in the repository root specifying the deterministic MCP verification procedure and ground-truth rubric (`list_projects`, `list_items`, `list_files`, `get_values`, `check_storage`, `check_value_drift`, `report_value_issues`) and the per-student report template.
- **Non-Goals:**
  - Adding a new chapter or appendix to the book (`27` sections remain unchanged).
  - Modifying the Delphi source code of APS ELN or `X-Ray Calc 3`.
- **Anti-Goals:**
  - Including the pre-fitted `XRR-fit_Co-C(261014B).xrcx` inside `Study-B-261014B-raw.zip` (which would let a student skip the XRC MCP fitting step).
  - Violating any `STYLE.md` or `NOTATION.md` rule or breaking `check:links`, `check:markers`, or `verify_pdf.py`.

## 3. Constraints

- In APS ELN Commercial ("For Teams"), `ProjectGroups` are personal to a project's owner and are managed in the Desktop GUI (`Administration.html#supertree`, `2026-09-01-project-groups-design.md`). Therefore, for Study B, the student creates `Study B Practice` inside their `Practice` group in the Desktop GUI (or drags the agent-created project into `Practice`) and instructs the MCP agent to work inside `Study B Practice`.
- All prose changes must pass `npm test`, `npm run test:py`, `npm run build`, `npm run check:links`, `npm run check:markers`, and `pdf-build/verify_pdf.py`, and be deployed to `Z:\MasteringELN\`.

## 4. Approaches Considered

1. **Approach 1 (Selected): Update `Introduction`, `Chapter 4`, and `Chapter 17` in place + add `STUDENT-GRADING.md` and `.zip` packages.**
   - *Tradeoff:* Keeps the 21-chapter, 5-appendix structure intact and puts the instructions right where students perform Study A and Study B.
2. **Approach 2: Add a new `Appendix F: Student Practice Assignment` + `STUDENT-GRADING.md`.**
   - *Tradeoff:* Creates a separate handout page, but duplicates material from `Chapter 4`, `Chapter 17`, and `Chapter 20` and adds an extra section to the book.

## 5. How It Works

1. **Downloadable `.zip` bundles (`public/data/`):**
   - `public/data/Study-A-261015A-raw.zip`: contains the 11 raw files of `public/data/study-a/` plus `checksums.md5`.
   - `public/data/Study-B-261014B-raw.zip`: contains the 7 raw files of `public/data/study-b/` (`Deposition_*.depo.json`, `*.tsv`, `*.run.json`, `Cleaning_*.depo.json`, `Cleaning.tsv`, `Cleaning.run.json`, and `XRR-1_Co-C(261014B).xrdml`) plus a 7-file `checksums.md5`. The finished `XRR-fit_Co-C(261014B).xrcx` stays in `public/data/study-b/` for reference only and is excluded from `Study-B-261014B-raw.zip`.
2. **Book updates (`src/content/chapters/`):**
   - `introduction.mdx` (`Beyond the Book` and `Where to Go from Here`): link directly to `Study-A-261015A-raw.zip` and `Study-B-261014B-raw.zip` and summarize the 3-step student practice workflow (`Download -> Practice group -> Supervisor MCP check`).
   - `ch4-your-first-complete-sample-record.mdx` (`Step 1`): instruct the student to download and unzip `Study-A-261015A-raw.zip`, create their `Practice` group (**Project > New Group**), and create the `Study A Practice` project inside it.
   - `ch17-study-b-xrr-fitting-with-provenance.mdx` (`Part 1`): add an `<InTeamLab>` callout instructing the student to create `Study B Practice` inside their `Practice` group in the Desktop GUI, unzip `Study-B-261014B-raw.zip` into their `--upload-root`, and have their agent build the `261014B` tree inside `Study B Practice`, fit `XRR-1_Co-C(261014B).xrdml` via `XRC_MCP`, upload the resulting `.xrcx`, and store all 22 `Reader` values.
3. **MCP Grading Specification (`STUDENT-GRADING.md`):**
   - Defines the exact MCP audit steps and pass/fail criteria for checking any student's `Study A Practice` (6 items, 11 files, 23 `Reader` + 1 `Derived` values, 0 drift, 0 storage/range issues) and `Study B Practice` (5 items, 8 files including `.xrcx` with `[FITRESULT]`, 22 `Reader` values with $\chi^2 \approx 0.943$, 0 drift, 0 storage/range issues), and provides the Markdown report format.
4. **1-Page Mandatory Assignment (`/MasteringELN/assignment/` and `ELN-Mandatory-Assignment.pdf`):**
   - **Header:** *CSMIC Laboratory — Mandatory APS ELN Practice Assignment* · **Deadline: November 16, 2026**.
   - **Starting instructions:**
     1. Open `/MasteringELN/` on the laboratory server (or download `Mastering-ELN.pdf`) and download the two raw data packages: `Study-A-261015A-raw.zip` and `Study-B-261014B-raw.zip`.
     2. Log into **APS ELN** with your own laboratory account. In the **Projects** panel, choose **Project > New Group**, name the group `Practice`, and create two projects inside it: `Study A Practice` and `Study B Practice`.
     3. **Task 1 (`Study A Practice`, Desktop GUI):** Follow **Chapter 4** (`Your First Sample Record in Twenty Minutes`) to build the 6-item tree for sample `261015A`, attach the 11 raw files from `Study-A-261015A-raw.zip`, extract all 23 `Reader` values, compute the 1 `Derived` reciprocating wear rate, and verify zero drift with **Check Value Sources...**.
     4. **Task 2 (`Study B Practice`, AI Agent + `XRC_MCP`):** Follow **Chapter 17** (`Study B: XRR Fitting with Provenance`) to unpack `Study-B-261014B-raw.zip` into your `--upload-root`, have your agent build the `261014B` tree inside `Study B Practice` and extract the 18 deposition/cleaning `Reader` values, fit `XRR-1_Co-C(261014B).xrdml` via `XRC_MCP` (`X-Ray Calc 3` MCP), upload the accepted `.xrcx` fit file (`[FITRESULT]`), and extract the 4 fit `Reader` values (`Period`, `Co Thickness`, `C Thickness`, `Chi2`).
     5. **Submission & Verification (by November 16, 2026):** Run **Data Quality Check...** and **Check Value Sources...** (Chapter 20) on both projects. After November 16, both projects in your `Practice` group will be audited automatically on the server.
