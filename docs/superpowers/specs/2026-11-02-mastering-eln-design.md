# Mastering ELN — Design Specification

- **Date:** 2026-11-02
- **Target repository:** `D:\Publications\Books\Mastering ELN\`
- **Reference template:** `D:\Publications\Books\XRR for Dummies\` (*Mastering XRR Fitting*)
- **Size:** A project (full written design)

---

## 1. Intent and Why

New graduate students and engineers joining the laboratory use **APS ELN** to record syntheses, depositions, specimens, measurements, analyses, protocols, hypotheses, and project knowledge. In practice, as documented in Penkov & Shen (2026, `arXiv:2610.27859`), users often keep the structural link from sample to raw file while losing the link from raw file to stored number — for example by leaving placeholder actions empty, attaching screenshots instead of raw instrument files, typing result numbers into filenames, or typing values by hand without recording the file and reader version that produced them.

*Mastering ELN* is a practical, hands-on textbook in the same "… for Dummies" internal format and web + PDF publishing stack as *Mastering XRR Fitting* (`D:\Publications\Books\XRR for Dummies\`). It teaches a student how to build and maintain an unbroken provenance chain in APS ELN:

$$\text{Hypothesis} \rightarrow \text{Procedure} \rightarrow \text{Specimen} \rightarrow \text{Action} \rightarrow \text{Raw File} \rightarrow \text{Extracted/Derived Value} \rightarrow \text{Conclusion \& Report}$$

first through the Desktop GUI and then in partnership with an LLM agent via the Model Context Protocol (MCP) server.

Because 90% of a student's daily workflow is identical in **APS ELN Commercial ("For Teams")** (used inside the laboratory) and **APS ELN Community** (the free, Apache-2.0 single-user SQLite edition), one unified book serves both audiences:
1. **Primary audience:** Students in the author's laboratory using the shared team server and submitting protocols and hypotheses to a supervisor.
2. **Secondary audience:** External students and researchers using standalone **APS ELN Community** with local `.elndb` notebooks.

---

## 2. Goals, Non-Goals, and Anti-Goals

### Goals
- Provide a self-contained textbook (web site + print-ready PDF) that onboards a new student from opening their first notebook to recording complete multi-instrument experimental trees, extracting values with provenance, testing hypotheses, searching records, signing items, and working safely with an AI agent via MCP.
- Use two complete, real laboratory studies from `D:\MultilayerLab\Papers\ELN-Software-Paper\zenodo\demonstration\` as running examples across the book:
  - **Study A (`tribo_study`, sample `261015A`, BN/DLC coating):** Sputter deposition (`.depo.json`, `.tsv`), Filmetrics 3D step-height profiling (`.fibps`), Anton Paar UNHT nanoindentation (`.mit`), DaVinci 1000 tribometer friction test (`.zrw`), wear-track profiling, and derived wear calculation.
  - **Study B (`xrr_study`, sample `261014B`, Co/C multilayer X-ray mirror):** Deposition recipe (`.rcpx`), deposition logs, Empyrean XRR scan (`.xrdml`), X-Ray Calc 3 fit (`.xrcx`), value extraction (`Reader`), and MCP agent workflow connecting ELN with `X-Ray Calc 3`.
- Keep all shared scientific instruction unified while marking Commercial team-server specifics (login, shared permissions, mobile QR protocols, supervisor review gates) with a dedicated **In a Team Lab** callout icon.
- Enforce the same build, link, marker, Vitest, pytest, Playwright, and PDF verification gates as *Mastering XRR Fitting*.

### Non-Goals
- **Server and IT administration:** Installing MySQL/MariaDB, configuring WebDAV or Synology DSM reverse proxies, deploying Linux `ELN.WebAPI` services, managing user accounts/roles as an administrator, or issuing licenses (`LicenseAdmin`). Those belong in admin runbooks, not a student textbook.
- **Software development internals:** Building ELN from Delphi source, writing new `.bpl` viewer plugins in Delphi, or ORM/database migration internals.
- **Teaching instrument physics from scratch:** Chapter 17 shows how an XRR fit `.xrcx` file connects to ELN and points readers to *Mastering XRR Fitting* for the physics and fitting procedure of XRR itself.

### Anti-Goals (What Would Make This Book Fail Even If It Builds)
- **Reading like a reference manual or dialog inventory:** Walking menu-by-menu through buttons without a real sample or scientific reason. Every chapter must teach *what the student is trying to accomplish and why*, backed by numbered GUI steps.
- **Copying outdated Help text where Help disagrees with code:** The Delphi source code in `D:\APS\ELN\APS-ELN-Community\` and `D:\APS\ELN\APS-ELN-Commercial\` is always the source of truth.
- **Machine-sounding prose (LLM cadence):** Violating the plain-language and de-LLM rules in `STYLE.md` (em-dashes, "not X, but Y" antithesis, rhetorical questions in body text, signposting adverbs, or reading-management narration).
- **Exposing private laboratory credentials, server hostnames, or non-public personal data:** Only pseudonymized or approved public demonstration records (such as Study A `261015A` and Study B `261014B` from the Zenodo deposit and synthetic demo notebooks) may appear in text, screenshots, or downloadable files.

---

## 3. Constraints and Source Hierarchy

All outside repositories are **read-only** from the book project. Never copy source code or Zotero PDFs into the book repository.

### Priority Order When Sources Disagree
$$\text{Delphi Source Code} > \text{Built-in HTML Help} > \text{ELN Software Paper (\texttt{arXiv:2610.27859})} > \text{Historical Notes}$$

1. **Delphi Source Code (`D:\APS\ELN\APS-ELN-Community\` and `D:\APS\ELN\APS-ELN-Commercial\`):**
   - Menu captions, dialog field names, keyboard shortcuts, item levels (`Proc`, `Item`/`Specimen`, `Action`), value sources (`Unknown`, `Manual`, `Reader`, `Derived`), completeness audit rules, hypothesis states (`Proposed`, `Approved`, `Rejected`, `InReview`, `Accepted`, `Abandoned`), and MCP tool schemas (`ELN.MCPServer\`).
   - Every menu path, dialog label, shortcut, and MCP tool parameter named in the book must be checked against the current source before a chapter is marked complete.
2. **Built-in HTML Help (`APS-ELN-Community\ELN.Desktop\Assets\Runtime\Help\` and `APS-ELN-Commercial\ELN.Desktop\Assets\Runtime\Help\`):**
   - 19 Community Help pages and 24 Commercial Help pages, plus SVG icons (`Help\icons\`) and diagrams (`Help\images\`).
   - Any contradiction between Help and Delphi source must be reported to the author so Help can be fixed; never reproduce a Help error in the book.
3. **ELN Experience Report & Zenodo Deposit (`D:\MultilayerLab\Papers\ELN-Software-Paper\`):**
   - Manuscript (`manuscript\ELN_SPE_manuscript.md`, `arXiv:2610.27859`), student checklists (`review\demo_A_student_checklist.md`, `demo\StudyA_BN-DLC_student_instructions.docx`, `demo\StudyB_CoC_student_instructions.docx`), and the complete Zenodo deposit (`zenodo\demonstration\tribo_study\`, `zenodo\demonstration\xrr_study\`, `zenodo\production\`).
   - All statistics cited from the paper (e.g., audit counts, value provenance categories, drift checks) must be copied verbatim from the verified deposit, never recomputed by hand.
4. **Template and Pipeline Reference (`D:\Publications\Books\XRR for Dummies\` and `D:\Publications\Books\Vacuum Engineering\`):**
   - Astro 7 + Svelte 5 + MDX + KaTeX web stack, `pdf-build/` print renderer and verifier, and authoring conventions (`STYLE.md`, `NOTATION.md`, `OUTLINE.md`, `STATUS.md`).

### Trademark and Licensing Constraint
- Never use "For Dummies" in the book title, cover, metadata, or headings (Wiley trademark). The working title is **Mastering ELN** with subtitle **Recording, Tracing, and Analyzing Laboratory Data with APS ELN** (builder default; author may revise).
- Callout icons use the book's own names and SVG art.
- Text, figures, and demonstration data are licensed under **CC BY 4.0** (`LICENSE-CONTENT.md`); site and build code under **MIT** (`LICENSE`).

---

## 4. Approaches Considered and Chosen

### Edition & Audience Arrangement (Chosen by Author: Option 1)
- **Option 1 — Unified book with "In a Team Lab" callouts (Chosen):** Teach the shared scientific workflow once; cover both team-server login and local Community `.elndb` notebooks in Chapter 2; mark Commercial team-only steps (supervisor review gates, shared project permissions, mobile QR protocols) with an **In a Team Lab** callout where they occur.
- **Option 2 — Lab-first Commercial edition (Rejected):** Assumed a team server throughout and relegated local Community notebooks to an appendix; harder to publish as the public *APS ELN Community* textbook.
- **Option 3 — Separate "Working in a Team Lab" Part (Rejected):** Split creating protocols and hypotheses from getting them approved by a supervisor.

### Build & Authoring Workflow (Chosen by Author: Approach A)
- **Approach A — Scaffold + Part-by-Part Drafting from Code, Help, and Study A/B (Chosen):**
  1. Create `D:\Publications\Books\Mastering ELN\` with the four canonical files (`STYLE.md`, `NOTATION.md`, `OUTLINE.md`, `STATUS.md`) plus `CLAUDE.md`.
  2. Port the Astro 7 + MDX + KaTeX + Playwright `pdf-build/` pipeline from *Mastering XRR Fitting*, configure `/MasteringELN` on port `4341`, add the 6 callout components (`Tip`, `Remember`, `Warning`, `GoingDeeper`, `InELN`, `InTeamLab`), and verify `/sampler/` and the empty-book PDF build across Vitest, pytest, and Playwright.
  3. Approve section-level outlines and draft Part by Part (`Introduction` + `Part 1` first, then `Parts 2–5` and `Appendices`), verifying every UI path and MCP tool against Delphi source and pulling figures from Study A and Study B.
- **Approach B — Batch-convert HTML Help first (Rejected):** Help uses reference register and dialog-oriented structure rather than student workflow order.
- **Approach C — Write all 21 section-level outlines before scaffolding (Rejected):** Delays a working site, sampler, and `Part 1` onboarding chapters.

---

## 5. Settled Decisions

### Decided by the Author
1. **Book arrangement:** Unified textbook for both lab students (Commercial "For Teams") and Community users, using **In a Team Lab** callouts for team-server differences and excluding IT/server administration.
2. **Running examples:** Study A (`BN-DLC`, sample `261015A`, tribology/coating) and Study B (`Co/C` multilayer, sample `261014B`, X-ray mirror + XRR fit) from `D:\MultilayerLab\Papers\ELN-Software-Paper\zenodo\demonstration\`.
3. **Chapter plan:** 5 Parts, 21 Chapters, and 5 Appendices (detailed in Section 7).
4. **Build workflow:** Approach A (canonical files + Astro/PDF scaffold first, then Part-by-Part section outlining and drafting).

### Builder Calls (Sensible Defaults Marked as Builder Decisions)
1. **Repository path, base URL, and port:**
   - Local path: `D:\Publications\Books\Mastering ELN\` (matching siblings `Vacuum Engineering`, `Vacuum Process Equipment`, and `XRR for Dummies`).
   - `BASE = '/MasteringELN'` and `PORT = 4341` in `src/lib/site.mjs` (avoiding `4321` Vacuum Engineering and `4331` Mastering XRR Fitting; note let's also check `Vacuum Process Equipment` port during scaffolding so there is no collision).
   - `BOOK_TITLE = 'Mastering ELN'`.
2. **Six Callout Icons (`src/components/textbook/`):**
   - `<Tip>`: A faster way or keyboard shortcut in ELN.
   - `<Remember>`: A rule to keep across chapters (e.g., never put result numbers in filenames).
   - `<Warning>`: A mistake that silently breaks provenance or loses a link with no error message (e.g., attaching a screenshot instead of a raw file, or typing a value by hand when a reader exists).
   - `<GoingDeeper>`: Data-model details, MD5/SHA-256 hashing, derived-value formulas, or ONNX semantic embedding internals that a student can skip and still complete the workflow.
   - `<InELN>`: The exact menu path, toolbar button, dialog name, and field in the ELN Desktop GUI (replaces `<InXRayCalc>`).
   - `<InTeamLab>`: How a step works when connected to a shared Commercial team server (server login, project roles, mobile QR protocol entry, supervisor approval gates).
3. **Downloadable student bundle (`public/downloads/`):**
   - Provide the raw files and demonstration Community notebooks for Study A (`261015A`) and Study B (`261014B`) from `D:\MultilayerLab\Papers\ELN-Software-Paper\zenodo\demonstration\` so any student can follow every chapter hands-on in **APS ELN Community** or in Demo Mode.
4. **Cover palette and hero (initial scaffold default, open for author customization):**
   - Companion cover to *Vacuum Engineering* and *Mastering XRR Fitting*: near-black type block, ELN blue accent band (matching the Desktop notebook icon palette), and a clean provenance-chain hero diagram connecting the Study A/B item tree (`Proc → Specimen → Action`) to raw files and extracted values.

---

## 6. Target Repository Architecture (`D:\Publications\Books\Mastering ELN\`)

```text
D:\Publications\Books\Mastering ELN\
├── CLAUDE.md                        # Project instructions, source hierarchy, commands
├── STYLE.md                         # Voice, register, callout rules, plain-language & de-LLM rules
├── NOTATION.md                      # Canonical ELN terms, item levels, value sources, units, icons
├── OUTLINE.md                       # Approved chapter plan + per-chapter section outlines
├── STATUS.md                        # Session-by-session progress and open author questions
├── README.md                        # Build, test, PDF, and citation instructions
├── package.json                     # Astro 7, Svelte 5, MDX, KaTeX, Vitest, Playwright
├── astro.config.mjs                 # Unified remark/rehype pipeline, BASE & PORT from site.mjs
├── tsconfig.json
├── vitest.config.ts
├── playwright.config.ts
├── scripts/
│   ├── check-links.mjs              # Verifies internal links, #fragments, no literal $$, no e-notation
│   ├── check-markers.mjs            # Release gate for [SCREENSHOT NEEDED] / [NUMBER NEEDED] markers
│   ├── check-markers.test.mjs
│   └── deploy.mjs                   # Lab server deploy script with destination guard
├── pdf-build/                       # Playwright section renderer + PyMuPDF/pypdf assembler + verifier
│   ├── README.md
│   ├── siteconf.py
│   ├── render-sections.mjs
│   ├── print-box.mjs
│   ├── assemble.py
│   ├── links.py
│   ├── verify_pdf.py
│   ├── cover_hero.py
│   ├── test_assemble.py
│   └── test_verify_pdf.py
├── public/
│   ├── figures/                     # Rendered SVG/PNG figures and GUI screenshots
│   └── data/                        # Downloadable Study A & Study B raw files / demo notebooks
└── src/
    ├── content.config.ts            # Chapters collection schema (title, part, number, order, inThisChapter)
    ├── content/
    │   └── chapters/                # introduction.mdx, ch1-...mdx .. ch21-...mdx, app-a-...mdx .. app-e-...mdx
    ├── components/
    │   └── textbook/
    │       ├── Callout.astro
    │       ├── Tip.astro
    │       ├── Remember.astro
    │       ├── Warning.astro
    │       ├── GoingDeeper.astro
    │       ├── InELN.astro
    │       ├── InTeamLab.astro
    │       ├── Figure.astro
    │       ├── FigureZoom.astro
    │       └── DataTable.astro
    ├── layouts/
    ├── lib/
    │   ├── site.mjs                 # BASE = '/MasteringELN', PORT = 4341, BOOK_TITLE = 'Mastering ELN'
    │   ├── parts.ts                 # Front Matter, Parts 1-5, Appendices
    │   ├── parts.test.ts
    │   ├── katex-macros.mjs
    │   ├── remark-output-directives.mjs
    │   └── rehype-collapse-sources.mjs
    ├── pages/
    │   ├── index.astro
    │   ├── sections.json.ts
    │   ├── sampler.mdx              # Renders all 6 callout icons, math, figure, table, print/web blocks
    │   └── [...slug].astro
    └── styles/
        └── textbook.css
```

---

## 7. Complete Chapter Plan (`OUTLINE.md` Backbone)

### Front Matter
- **Introduction** (`introduction.mdx`)
  - *About This Book · Foolish Assumptions · Icons Used in This Book · Beyond the Book · Where to Go from Here*
  - Introduces the two running examples (Study A `261015A` BN/DLC coating and Study B `261014B` Co/C multilayer), the six icons, and reading routes for a new student, a team-lab user, and an AI-agent user.

### Part 1: Getting Started
- **Chapter 1: What an ELN Is, and Why Links Between Files and Numbers Matter**
  - The provenance chain: `Sample → Operation → Raw File → Number`.
  - How a notebook can hold every file and still lose the link to the numbers (evidence from the 7-month lab study in `arXiv:2610.27859`).
  - The four rules of a clean record: no empty placeholder actions, raw files instead of screenshots, no results in filenames, and extracted (`Reader` / `Derived`) values instead of untraceable typing.
  - The whole student workflow on one page.
- **Chapter 2: Opening a Notebook: Team Server Login and Local Community Notebooks**
  - Creating or opening a local SQLite notebook (`.elndb` + attachment folder) in **APS ELN Community**.
  - **In a Team Lab:** Logging into a shared Commercial server, connection modes, Demo Mode, and what your user role (`Standard`, `PowerUser`, `Supervisor`) allows.
  - Backing up a local notebook database and its attachment folder together.
- **Chapter 3: A Tour of the Main Window**
  - The Project Tree, the Item Tree (`Proc`, `Specimen`, `Action`), the Content Pane (Files, Notes, Protocols, Values, Comments, Links), the Preview Pane, and the Status Bar.
  - Understanding tree icons, status badges, and theme-aware indicators.
- **Chapter 4: Your First Complete Sample Record in Twenty Minutes**
  - Hands-on walkthrough of **Study A (`BN-DLC(261015A)`)**: creating the `Deposition` procedure, the `BN-DLC(261015A)` specimen, and the `Thickness`, `NanoIndentation`, and `Friction test` actions; attaching the `.depo.json`, `.fibps`, `.mit`, and `.zrw` files; and extracting values with one click.

### Part 2: Recording Daily Lab Work
- **Chapter 5: Projects, Groups, and Folders**
  - Structuring projects and specimen folders; naming conventions (`BN-DLC(261015A)`); moving items safely across folders; archiving and the recycle bin.
  - **In a Team Lab:** Project ownership, read/write grants, and Supervisor View statement counts.
- **Chapter 6: The Procedure → Specimen → Action Tree and Experiment Templates**
  - Choosing the right level (`Proc` for a synthesis or deposition run, `Item`/`Specimen` for a physical sample or model, `Action` for a measurement, treatment, or calculation) and setting Action Type and Equipment.
  - Nesting child actions (e.g., `Friction test → Curve → Wear track → 3D profiles` in Study A, and `XRR measurement → XRR fit` in Study B).
  - Applying and saving reusable **Experiment Templates** (`.elntemplate`) and batch-selecting items.
- **Chapter 7: Attaching Raw Files, Working Drafts, and Using the Instrument Viewers**
  - Attaching files by drag-and-drop or browser; how ELN computes MD5 hashes and stores attachment bytes.
  - Viewing files across the 26 built-in viewers: deposition logs (`.depo.json`, `.tsv`, `.rcpx`), XRR curves and fits (`.xrdml`, `.xrcx`), nanoindentation (`.mit`), 3D optical/laser profilometry (`.fibps`, `.vk4`), tribometry (`.zrw`, `.raw`), microscopy/origin/simulations (`.dm3`, `.opju`, `.lmpin`, `.dsc`, `.xrfx`), and columnar data.
  - Editing Markdown notes and working drafts, and resolving save conflicts safely.
  - **In a Team Lab:** Using the standalone `ELNFileViewer.exe` to inspect instrument files without opening a notebook.
- **Chapter 8: Filling Out Protocols and Checklists**
  - Attaching a protocol template (Deposition, Indentation, Tribotest, XRD/XRR, Safety, Weekly Lab Report) to an item; required fields, units, and calculated protocol fields.
  - Local protocol completion vs. **In a Team Lab:** mobile web QR code entry at the instrument and submitting a protocol for supervisor review.
- **Chapter 9: Values, Units, Tolerances, Derived Formulas, and Value Provenance**
  - Experimental conditions (`EXP_CONDITION`) vs. test results (`TEST_RESULT`), value types, symbols, plausible ranges, and unit conversion.
  - The four value source kinds: `Reader` (extracted from an attached file with file ID, MD5, reader ID, and reader version), `Derived` (computed by a server formula from input value IDs), `Manual` (typed by hand), and `Unknown`.
  - Extracting single and multi-file values (mean ± SD across multiple `.fibps` step scans in Study A, and fitted period $D$, roughness $\sigma$, and thickness $H$ from `.xrcx` in Study B).

### Part 3: Thinking, Searching, and Reviewing
- **Chapter 10: The Hypothesis Tree: Proposals, Runs, Cited Evidence, and Conclusions**
  - Structuring research questions as a tree of hypotheses: statement, what changed from the parent hypothesis, attached `Run` and `Reference` items, and cited evidence (items, files, or values with snapshot hashes).
  - Moving through the lifecycle (`Proposed → Approved → InReview → Accepted / Rejected / Abandoned`) and why approval and acceptance require a human decision in the GUI.
- **Chapter 11: Project Wiki, Notes, Tags, Comments, and Links**
  - Writing project Wiki pages under the five-section convention (`Goals`, `Ideas`, `Literature`, `Analysis`, `References`) with `[[item:N]]` links and embedded figures.
  - Categorizing items with colored tags, discussing results in comments, and creating bidirectional item links (e.g., linking a coated specimen to its substrate batch or target).
- **Chapter 12: Finding Anything: Full-Text, Panel Filters, and Semantic Search**
  - Quick tree filters, tag filters, Favorites, and full-text search across items, files, values, and protocols.
  - Using hybrid and multilingual **Semantic Search** (`ELN.Search`) to find concepts inside PDFs, Markdown notes, Office files, and item descriptions.
- **Chapter 13: Charts, Correlations, and PDF Reports**
  - Plotting conditions against results across a project (`correlate_values` / Analysis view) and inspecting summary statistics.
  - Generating formatted PDF item/project reports and exporting portable scientific packages.
- **Chapter 14: Completeness Rules, Audit History, and Electronic Signatures**
  - Running completeness/audit checks (verifying that an action has the required raw file types and extracted value types for its Action Type and Equipment).
  - Inspecting the audit trail and value drift (`check_value_drift`, `check_storage`), and applying cryptographic electronic signatures (`Signatures`) that lock an item against silent edits.

### Part 4: Working with an AI Agent (MCP)
- **Chapter 15: Connecting an AI Assistant to Your Notebook**
  - What the ELN MCP server (`ELNCommunityMCP.exe` / `ELNMCPServer.exe`) does and how its permission and human-review boundaries work.
  - Configuring Claude Code, Codex, or another MCP client to talk to your local Community notebook or (**In a Team Lab**) your personal agent account on the lab server.
- **Chapter 16: Reading Data, Checking Storage, and Auditing Value Drift with an Agent**
  - Asking an agent to search items, summarize project statistics, read tabular columns (`list_file_columns`, `get_file_columns`), verify attachment hashes (`check_storage`), and check whether updated file readers change any stored numbers (`check_value_drift`).
- **Chapter 17: Recording Analysis Results with Full Provenance (Study B Walkthrough)**
  - End-to-end walkthrough of **Study B (`Co/C(261014B)`)**: how an agent downloads the raw `.xrdml` scan via `download_file`, fits the curve in `X-Ray Calc 3`, uploads the resulting `XRR-fit_Co-C(261014B).xrcx` file to the `XRR fit` child action, and extracts the fitted layer parameters as `Reader`-sourced values rather than untraceable prose.
- **Chapter 18: Drafting Hypotheses, Wiki Pages, and Structured Records with an Agent**
  - Using an agent to build an experiment tree from a checklist (Study A & Study B `record_agent.md`), draft literature or analysis Wiki pages, and propose or attach evidence to a hypothesis — and why the human student or supervisor must still inspect the preview and click Approve/Accept in the Desktop GUI.

### Part 5: The Part of Tens
- **Chapter 19: Ten Mistakes That Break Your Data Trail**
  1. Leaving an action as an empty placeholder "to fill in later".
  2. Attaching a screenshot (`.png`/`.jpg`) instead of the raw instrument file.
  3. Typing result numbers into the file name (`351.9nm.fibps`).
  4. Typing a number by hand (`Manual`) when a file reader can extract it (`Reader`).
  5. Entering a value before attaching the file it came from.
  6. Writing fit or test results only in a text note where charts and queries cannot see them.
  7. Putting an analysis file (`.xrcx`, `.opju`) under the wrong specimen or measurement action.
  8. Mixing Å and nm (or load and pressure) without checking the Value Type unit.
  9. Renaming or moving local attachment files in Windows Explorer instead of inside ELN.
  10. Backing up the `.elndb` SQLite file without its `Files/` attachment folder.
- **Chapter 20: Ten Checks Before You Sign a Record or Ask Your Supervisor for Approval**
  1. Every action in the tree has its raw measurement or recipe file attached.
  2. Every file opens cleanly in its built-in viewer preview.
  3. Every headline value shows a `Reader` or `Derived` source badge (or an explicit reason for `Manual`).
  4. Multi-position measurements (such as step height or indentation series) record their mean and tolerance (SD).
  5. The sample code in the Specimen title matches the code in every child action and file name.
  6. Required protocol fields are filled and validated.
  7. Completeness / health check shows no missing required file or value types.
  8. `check_value_drift` and `check_storage` report zero mismatches.
  9. Hypothesis runs and cited evidence point to the final record IDs.
  10. A teammate or your supervisor can trace every reported number back to its raw curve in two clicks.
- **Chapter 21: Ten Things an AI Agent Can and Cannot Do in ELN**
  1. An agent **can** build your `Proc → Specimen → Action` tree and attach raw files from `MCPUploadRoot`.
  2. An agent **can** run instrument file readers (`extract_file_key_values`) and store values with full `Reader` provenance.
  3. An agent **can** compute `Derived` values through server formulas (`add_derived_value`).
  4. An agent **can** audit an entire project for missing hashes, out-of-range values, and reader drift in seconds.
  5. An agent **can** download a raw measurement file to a local tool (like `X-Ray Calc 3`) and upload the finished fit project.
  6. An agent **cannot** approve a proposed hypothesis or accept a hypothesis conclusion (human review gate).
  7. An agent **cannot** apply or forge an electronic signature or modify a signed item.
  8. An agent **cannot** bypass project permissions or read projects outside its account scope.
  9. An agent **cannot** read or write arbitrary files on the computer outside the configured `MCPUploadRoot`.
  10. An agent **cannot** judge whether a physical sample was prepared properly — that remains the experimenter's job.

### Back Matter: Appendices
- **Appendix A: Toolbar, Menu, and Tree Icons Reference** (all item-type, status, provenance, and toolbar icons with their exact meanings).
- **Appendix B: Instrument Viewers and Supported File Formats** (the 26 viewers, extensions, what they display, and what key values their readers extract).
- **Appendix C: Value Sources, Units, Plausible Ranges, and Derived Formulas** (`ValueTypes.csv` reference, unit conversions, and `Unknown` / `Manual` / `Reader` / `Derived` provenance metadata).
- **Appendix D: Keyboard Shortcuts** (complete table verified against Community and Commercial Desktop builds).
- **Appendix E: Glossary** (plain-English definitions of ELN and provenance terms).

---

## 8. What Is Left to the Builder

1. **Porting the Astro + PDF scaffold:** Copy the site and `pdf-build/` infrastructure from `D:\Publications\Books\XRR for Dummies\`, strip XRR-specific chapters/figures/widgets, update `site.mjs` (`BASE = '/MasteringELN'`, `PORT = 4341` after checking no port conflict with `Vacuum Process Equipment`, `BOOK_TITLE = 'Mastering ELN'`), update `src/lib/parts.ts` to the 5 Parts of *Mastering ELN*, replace `<InXRayCalc>` with `<InELN>`, and add `<InTeamLab>`.
2. **Writing the initial canonical files:** Draft `CLAUDE.md`, `STYLE.md` (adapting *Mastering XRR Fitting* `STYLE.md` to ELN terms and the 6 icons), `NOTATION.md` (ELN item levels, value sources, record types, units, file extensions, and MCP tool naming conventions), `OUTLINE.md` (the approved 21-chapter + 5-appendix plan above, plus detailed section outlines for `Introduction` and `Part 1`), and `STATUS.md`.
3. **Verifying the scaffold:** Run `npm test` (Vitest), `npm run test:py` (pytest), `npm run build`, `npm run check:links`, `npm run check:markers`, and the PDF pipeline on `introduction,sampler` so all gates are green before chapter prose drafting begins.
