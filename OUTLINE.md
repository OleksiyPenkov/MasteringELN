# OUTLINE: Mastering ELN

_Draft 1, 2026-11-02. **Approved by the author 2026-11-02.**_

Reader: a graduate student or engineer recording and analyzing experiments in APS ELN (both the team-server Commercial edition and the local SQLite Community edition). Output: web plus PDF.

**How to read this outline.** Each chapter lists its learning objectives ("In This Chapter"), its prerequisites, and its main sources. The source keys are:

- **C:Help:Page**: a page of the Community built-in Help, `APS-ELN-Community\ELN.Desktop\Assets\Runtime\Help\Page.html`
- **P:Help:Page**: a page of the Commercial built-in Help, `APS-ELN-Commercial\ELN.Desktop\Assets\Runtime\Help\Page.html`
- **C:Code** / **P:Code**: the Delphi source in `APS-ELN-Community` or `APS-ELN-Commercial`. Code wins every conflict.
- **Paper§n**: Penkov & Shen (2026), *Value-level data provenance in an electronic laboratory notebook used by humans and language-model agents: An experience report* (`arXiv:2610.27859`), section n
- **Demo:A** / **Demo:B**: the Zenodo demonstration studies in `D:\MultilayerLab\Papers\ELN-Software-Paper\zenodo\demonstration\` (`tribo_study` sample `261015A` and `xrr_study` sample `261014B`).

---

## Front Matter: Introduction (`introduction.mdx`)

Sections (fixed by `STYLE.md §3`):
1. **About This Book:** How the book takes a student from an empty notebook to a complete, provenance-verified record that a teammate, supervisor, or AI agent can trace from any reported number back to the raw instrument file. Introduces the two running studies (**Study A**, sample `261015A` BN/DLC tribology coating, and **Study B**, sample `261014B` Co/C X-ray multilayer mirror) and explains how the book covers both the shared workflow and team-server specifics.
2. **Foolish Assumptions:** You run laboratory experiments or simulations, you have Windows 10 or Windows 11 (64-bit) with WebView2 installed, and you want your records to survive graduation, audits, and paper writing without hunting through USB drives.
3. **Icons Used in This Book:** Renders all six callout components (`<Tip>`, `<Remember>`, `<Warning>`, `<GoingDeeper>`, `<InELN>`, `<InTeamLab>`) with one clear paragraph each.
4. **Beyond the Book:** The downloadable Study A (`261015A`) and Study B (`261014B`) demonstration bundles (`:::web-only` links + `:::print-only` paths), the built-in **Help > Contents...** manual and **Help > Keyboard Shortcuts...** (`F1`), the public `APS-Techno/ELN-Community` repository, and the `arXiv:2610.27859` paper.
5. **Where to Go from Here:** Four linked reading routes:
   - Brand new to ELN: Chapters 1 -> 2 -> 3 -> 4;
   - Recording a sample today: Chapter 4, then Part 2 (Chapters 5–9);
   - Connecting an AI agent (Claude Code or Codex): Part 4 (Chapters 15–18);
   - Preparing a record for supervisor review or signing: Chapters 14 and 20.

---

## Part 1: Getting Started

### Chapter 1: What an ELN Is, and Why Links Between Files and Numbers Matter (`ch1-what-an-eln-is-and-why-links-matter.mdx`)

In This Chapter:
- Tracing the four links from a physical sample to a published number
- Seeing how a notebook can keep every file and still lose the link to its numbers
- Following the four rules that keep your data trail unbroken
- Viewing the complete student workflow on one page

Section outline:
1. **The four links in every laboratory result.**
   - A result in a paper or thesis is a chain of four items: the physical **Sample** (`Specimen`), the **Operation** (`Procedure` or `Action`), the **Raw File** from the instrument, and the **Stored Number** (`Value`).
   - Fig 1-1 (`fig-1-1-provenance-chain.svg`): The four-link provenance chain, showing which links the folder/item tree keeps by structure and which link requires value-level provenance.
   - Sources: Paper§1, Paper§2.
2. **What happens in seven months of real laboratory use.**
   - Evidence from the laboratory audit in `arXiv:2610.27859` (24 projects, 1,283 items, 2,676 files, 674 values, 7,710 audit log writes across 6 researchers and 1 agent account).
   - When 26 stored values across six studies (`T1`–`T6`) were compared against the output of the built-in data file readers, 13 matched, 4 differed, and 9 had no reader counterpart at all.
   - Warning: A number typed by hand with no file link cannot be checked when a calibration, interval, or unit changes.
   - Sources: Paper§2.4, Paper§4.2, `zenodo/README.md`.
3. **The two running examples in this book: Study A and Study B.**
   - Study A (`261015A`, BN/DLC tribology coating): deposition (`.depo.json`, `.tsv`), Filmetrics 3D step height (`.fibps`), Anton Paar nanoindentation (`.mit`), DaVinci tribometer friction test (`.zrw`), wear track profiles (`.fibps`), and reciprocating wear rate ($K = A / (2 \cdot F_n \cdot N)$).
   - Study B (`261014B`, Co/C multilayer X-ray mirror): substrate cleaning and magnetron sputtering (`.depo.json`, `.tsv`), Empyrean XRR scan (`.xrdml`), and X-Ray Calc 3 fit (`.xrcx`).
   - Fig 1-2 (`fig-1-2-study-a-tree.svg`): Side-by-side item trees of Study A (`261015A`) and Study B (`261014B`).
   - Sources: Demo:A, Demo:B, `review/demo_A_student_checklist.md`.
4. **Four rules that keep your data trail unbroken.**
   - Rule 1: Build the whole `Procedure -> Specimen -> Action` tree and never leave an action empty at the end of the run.
   - Rule 2: Attach the raw instrument file (`.fibps`, `.mit`, `.zrw`, `.xrdml`, `.xrcx`), never a screenshot of the screen.
   - Rule 3: Never type measurement results into a file name (no `351.9nm.fibps`).
   - Rule 4: Extract numbers with **Extract Values** (`Reader` source) or **Add > Derived Value...** (`Derived` source) rather than typing them by hand (`Manual`).
   - Remember: File names identify *what* sample and *which* position was measured; values store the result.
   - Sources: Paper§4.1–4.5, Paper§5, `review/demo_A_student_checklist.md`.
5. **The whole student workflow on one page.**
   - Table 1-1: 10 workflow stages, what you do in ELN Desktop (or via MCP), and which chapter covers each stage.
   - Sources: C:Help:Index, P:Help:Index.

### Chapter 2: Opening a Notebook: Team Server Login and Local Community Notebooks (`ch2-opening-a-notebook.mdx`)

In This Chapter:
- Creating and opening a local SQLite notebook in APS ELN Community
- Logging into a shared laboratory server in the Team edition
- Understanding your local profile, signing password, and team roles
- Backing up your database and attachment directory together without losing files

Section outline:
1. **Two ways ELN stores your laboratory work.**
   - Local single-user mode (**APS ELN Community**): a format 5 `.sqlite` database file paired with a local `<name> files` attachment directory.
   - Shared laboratory server mode (**APS ELN "For Teams"**): a remote MySQL server paired with a shared WebDAV or server attachment store.
   - Fig 2-1 (`fig-2-1-notebook-modes.svg`): Local Community notebook architecture versus Team Server architecture.
   - Sources: C:Help:GettingStarted, C:Help:Notebooks, P:Help:GettingStarted.
2. **Creating and opening a local notebook in APS ELN Community.**
   - Numbered steps for **File > New Notebook...**: choosing a new `.sqlite` filename, selecting the separate `<name> files` attachment directory, entering your first name, last name, and signing password, and importing the seven scientific catalogs.
   - Switching notebooks with **File > Open Notebook...** and **File > Recent Notebooks** (up to 8 recent notebooks).
   - In ELN: **File > New Notebook...**, **File > Open Notebook...**, **File > Recent Notebooks**.
   - Warning: Your signing password is used when applying electronic signatures (`Chapter 14`); it does not encrypt the `.sqlite` file or ask for a password when opening the notebook.
   - Going Deeper: Format 5 schema upgrades (`.format4-backup-` automatic backup) and relative attachment directory paths (`..\Files`).
   - Sources: C:Help:GettingStarted, C:Help:Notebooks.
3. **Logging into a shared server in a team laboratory.**
   - In a Team Lab: First-run connection wizard (`.elnconfig` managed configuration file or remote server), entering username and case-sensitive password on the Login screen, the **Caps Lock warning**, the **eye icon**, and **Remember credentials** (Windows Credential Manager).
   - User roles (`Guest`, `Standard`, `PowerUser`, `Super`, `Admin`) and what a student account can create, edit, and submit for review.
   - Tip: Using **Demo Mode** to practice without touching production records.
   - Sources: P:Help:GettingStarted, P:Help:Administration.
4. **How to back up a local notebook safely.**
   - Numbered 5-step backup procedure: save open editors, close ELN Desktop and stop any `ELNCommunityMCP.exe` process, copy both the `.sqlite` file and the entire attachment folder together, copy any retained draft directory, and verify in a new folder.
   - Warning: Never delete `-journal`, `-wal`, or `-shm` SQLite sidecar files by hand, and never copy only the `.sqlite` file without its attachment directory.
   - Sources: C:Help:Notebooks.

### Chapter 3: A Tour of the Main Window (`ch3-a-tour-of-the-main-window.mdx`)

In This Chapter:
- Navigating the three main panels: Projects, Items, and Content Viewer
- Telling Procedures, Specimens, and Actions apart in the item tree
- Using row focus buttons, panel filters, and the Dashboard
- Setting display preferences, themes, and plugin paths safely

Section outline:
1. **The three-panel workspace.**
   - Left: **Projects panel** (projects, groups, and folders).
   - Center: **Items panel** (the scientific tree of `Procedure`, `Specimen`, and `Action` rows, plus attached files, notes, and protocols).
   - Right: **Content Viewer** (live preview using the 26 viewer plugins, plus details, values, protocols, and hypothesis views).
   - Bottom: **Status bar** (connection mode or active `.sqlite` notebook path, selected attachment, and build version).
   - Fig 3-1 (`fig-3-1-main-window.svg`): Annotated tour of the ELN Desktop main window showing the three panels, row action buttons, and status bar.
   - Sources: C:Help:GettingStarted, P:Help:GettingStarted.
2. **Reading the item tree and its row buttons.**
   - How `Procedure` (`Proc`), `Specimen` (`Item`), and `Action` (`Action`) nest inside a project folder.
   - How repeated values summarize automatically on a row as mean, sample standard deviation, and count: for example `d = 322.8 ± 22.9 nm (n=4)`.
   - The three row buttons that appear at the right of a selected parent row: **Collapse all below**, **Expand all below**, and **Focus** (**Focus: collapse everything else**).
   - In ELN: `Ctrl+Up` and `Ctrl+Down` move a selected top-level root item up or down in manual order.
   - Sources: C:Help:Items, C:Help:Values, C:Help:Shortcuts.
3. **The Dashboard and keyboard navigation.**
   - Opening the Dashboard to see recent work, project statistics, and pending reviews.
   - In ELN: In Community, choose **Navigate > Dashboard** (`Ctrl+D`), **Navigate > Search...** (`Ctrl+F`), or **Navigate > Go to Item...** (`Ctrl+G`), and press `F1` for **Help > Keyboard Shortcuts...**.
   - In a Team Lab: In the Commercial team client, open the Dashboard via **Edit > Dashboard** (where **Protocols Awaiting Review** and **Waiting for You** list pending supervisor approvals), while `Ctrl+D` duplicates the selected item when the Items panel has focus.
   - Sources: C:Help:GettingStarted, C:Help:Shortcuts, P:Help:GettingStarted, P:Help:Shortcuts.
4. **Customizing appearance and checking paths in Preferences.**
   - Opening **Tools > Preferences...** to adjust VCL theme, tree spacing and tint, preview scope, and template/plugin directories.
   - Remember: The attachment root shown in **Tools > Preferences...** is for information only; moving a notebook requires moving its folder while the notebook is closed (`Chapter 2`).
   - Sources: C:Help:GettingStarted, C:Help:Notebooks.

### Chapter 4: Your First Complete Sample Record in Twenty Minutes (`ch4-your-first-complete-sample-record.mdx`)

In This Chapter:
- Building the complete Study A (`BN-DLC(261015A)`) item tree before attaching files
- Naming raw measurement files so sample codes stay consistent and results stay out of filenames
- Attaching deposition, step-height, nanoindentation, and tribometry files in one pass
- Extracting `Reader` values and calculating the reciprocating wear rate as a `Derived` value

Section outline:
1. **Meet Study A: sample `261015A` (a BN/DLC tribological coating).**
   - What was made and measured: a boron nitride / diamond-like carbon coating deposited on silicon and masked steel substrates (`Deposition 261015A`), measured for film thickness across the masked step (`Thickness 261015A`, three `.fibps` scans), hardness and modulus (`Indentation 261015A`, `.mit` file with 9 indents), reciprocating friction (`Friction test 261015A`, `.zrw` file at $1\,\text{kgf} = 9.81\,\text{N}$, $1000$ cycles), and wear track area (`Wear track 261015A`, three `.fibps` scans).
   - Table 4-1: The 6 items and 11 raw files of Study A (`261015A`) from the downloadable bundle (`public/data/study-a/`).
   - Sources: Demo:A (`tribo_study/reports/record_report.md`), `review/demo_A_student_checklist.md`.
2. **Step 1: Build the whole item tree first.**
   - Why you build all 6 items at the start of the experiment: it serves as your checklist so no measurement is forgotten (such as a missing friction file).
   - Numbered GUI steps using **Item > New Procedure**, **Item > New Specimen**, and **Item > New Action** to create:
     1. `Deposition 261015A` (`Procedure`, Action type `Deposition`)
     2. `261015A` (`Specimen` under `Deposition 261015A`)
     3. `Thickness 261015A` (`Action` under `261015A`, Action type `3D Profiling`)
     4. `Indentation 261015A` (`Action` under `261015A`, Action type `Indentation`)
     5. `Friction test 261015A` (`Action` under `261015A`, Action type `Tribotest`)
     6. `Wear track 261015A` (`Action` under `Friction test 261015A`, Action type `3D Profiling`)
   - Warning: When creating a new Specimen, click **Save** first and then use **Item > Edit** if you need to add custom specimen properties (`C:Help:Items`).
   - Sources: C:Help:Items, Demo:A.
3. **Step 2: Attach the 11 raw files to their actions.**
   - Selecting each item and choosing **Item > Add File** (or clicking **Add File**).
   - How ELN handles single files versus multi-file review (**Review files** -> **Files to attach**), and how compound extensions like `.depo.json` automatically select the **Deposition** viewer rather than plain JSON.
   - Remember: Keep result numbers out of file names (`1.fibps`, `wear 1.fibps`, `BN-DLC(261015A).mit`).
   - Sources: C:Help:FilesAndNotes, Demo:A.
4. **Step 3: Extract `Reader` values from the attached files.**
   - Using **Extract Values** in the viewer (or right-clicking multiple `.fibps` files and choosing **Extract values from N files...**) to store:
     - 12 deposition conditions and results on `Deposition 261015A` (`aps.deposition` v1);
     - 3 step-height values on `Thickness 261015A` ($3.58 \times 10^{-7}\,\text{m}$, $3.16 \times 10^{-7}\,\text{m}$, $3.55 \times 10^{-7}\,\text{m}$, `aps.fibps` v3);
     - Hardness ($5.92 \pm 0.47\,\text{GPa}$) and Modulus ($127.17 \pm 11.06\,\text{GPa}$) on `Indentation 261015A` (`aps.mit` v2/v3);
     - Normal force ($F_n = 9.81\,\text{N}$), Cycles ($1000$), and COF ($0.528 \pm 0.019$) on `Friction test 261015A` (`aps.zrw` v2);
     - 3 wear-area values on `Wear track 261015A` ($0.00620\,\text{mm}^2$, $0.00553\,\text{mm}^2$, $0.00621\,\text{mm}^2$, `aps.fibps` v3).
   - Tip: Keep **Remember choices for this reader** ticked so ELN maps those keys automatically on your next sample.
   - Sources: C:Help:Values, Demo:A.
5. **Step 4: Compute the reciprocating wear rate as a `Derived` value and verify the record.**
   - Right-clicking `Friction test 261015A` and choosing **Add > Derived Value...**, selecting `wear_rate_reciprocating` ($K = A / (2 \cdot F_n \cdot N)$), multi-selecting the three `Wear Area` values from `Wear track 261015A` plus `Fn` and `Cycles`, to store $K = 3.05 \times 10^{-7}\,\text{mm}^3/(\text{N}\cdot\text{mm})$ with full input provenance.
   - Right-clicking `Deposition 261015A` and choosing **Check Value Sources...** to confirm all 24 values match their source files and formula inputs.
   - Fig 4-1 (`fig-4-1-study-a-complete.svg`): The completed Study A (`261015A`) tree and its 24 provenance-backed values.
   - Sources: C:Help:Values, Demo:A.

---

## Part 2: Recording Daily Lab Work

### Chapter 5: Projects, Groups, and Folders (`ch5-projects-groups-and-folders.mdx`)

In This Chapter:
- Creating and organizing Projects, Groups, and Folders in the left panel
- Archiving finished projects without losing access to their records
- Sharing projects and setting review permissions in a team laboratory
- Restoring deleted items from the Recycle Bin safely

Section outline:
1. **How Groups, Projects, and Folders fit together.**
   - **Groups** organize projects at the top of the **Projects** panel (`Project > New Group`); **Projects** hold all scientific work (`Project > New Project`); **Folders** organize procedures and specimens inside a project (`New Folder`).
   - Fig 5-1 (`fig-5-1-project-containers.svg`): Container hierarchy in the Projects panel and item recovery through the Recycle Bin.
   - Sources: C:Help:Projects, P:Help:Projects.
2. **Creating, sorting, and moving projects and folders.**
   - Numbered steps for creating a project, creating nested folders, and moving folders with **Move Folder Up** or drag and drop in the Projects panel.
   - Sorting siblings (`Move Up`, `Move Down`, `By Name`, `By Date Created`) in the team client.
   - Sources: C:Help:Projects, P:Help:Projects.
3. **Archiving finished projects.**
   - Why you archive a completed project (`Archive` / `Show Archived` or `Ctrl+Shift+A`) instead of deleting it: archived projects remain readable and searchable while blocking accidental edits.
   - Sources: C:Help:Projects, P:Help:Projects.
4. **Sharing projects in a team laboratory.**
   - In a Team Lab: Using **Share...** on a project to grant teammates `Read` or `ReadWrite` access, and setting **Can approve proposals** and **Can accept conclusions** for hypothesis reviewers.
   - Sources: P:Help:Projects, P:Help:Administration.
5. **Deleting containers and using the Recycle Bin.**
   - Why only empty projects and folders can be deleted (items in the Recycle Bin still count).
   - Restoring deleted item trees with **Tools > Recycle Bin...** -> **Restore**, and why hypotheses in review or accepted protect cited items from permanent deletion.
   - Sources: C:Help:Projects, C:Help:Items.

### Chapter 6: The Item Tree and Experiment Templates (`ch6-the-item-tree-and-experiment-templates.mdx`)

In This Chapter:
- Choosing between Procedures, Specimens, and Actions for each step of an experiment
- Adding missing Action Types and Equipment without leaving the item dialog
- Selecting multiple items for batch value extraction, tagging, moving, or deletion
- Creating and reusing Experiment Templates (`.elntemplate`) for repeatable workflows

Section outline:
1. **Designing a clean item hierarchy.**
   - Comparing Study A (`261015A`, where `Wear track` nests under `Friction test`) and Study B (`261014B`, where `Cleaning` sits under `Deposition` and `XRR fit` sits under `XRR-1`).
   - Table 6-1: Which level (`Procedure`, `Specimen`, `Action`), item type, and action type to choose for common laboratory operations.
   - Sources: C:Help:Items, Demo:A, Demo:B.
2. **Creating, duplicating, and moving items safely.**
   - Using **Item > New Procedure**, **Item > New Specimen**, **Item > New Action**, **Item > Duplicate**, and the context-menu **Move to...** dialog.
   - Quick-adding an **Action type** or **Equipment** (`Model`, `Manufacturer`, `Location`) with the **+** buttons inside the item dialog.
   - Sources: C:Help:Items.
3. **Working on multiple records at once.**
   - Selecting multiple rows with `Ctrl`+click, `Shift`+click, or `Shift+Up`/`Down`, and running batch **Extract values**, **Move to...**, **Tags...**, **Export**, or **Delete** with one confirmation and one summary report.
   - Sources: C:Help:Items.
4. **Building and applying Experiment Templates.**
   - Creating a reusable blueprint in **Reference Data > Experiment Templates...** and applying it in one atomic step with **Item > New from Template...**.
   - Exporting and importing `.elntemplate` files (`Deposition_Mechanical.elntemplate`, `Deposition_XRayOptics.elntemplate`).
   - Fig 6-1 (`fig-6-1-experiment-template.svg`): Stamping out a multi-action experiment hierarchy from an `.elntemplate` blueprint.
   - Sources: C:Help:Templates.

### Chapter 7: Raw Files, Drafts, and Instrument Viewers (`ch7-raw-files-drafts-and-instrument-viewers.mdx`)

In This Chapter:
- Attaching single and multiple files and understanding compound extensions
- Inspecting data in the specialist viewers: Deposition, FIBPS, MIT, ZRW, and X-Ray Calc
- Saving and reloading working drafts when editing attachments in external programs
- Using the Markdown Editor and the standalone ELN File Viewer

Section outline:
1. **How file attachment and extension routing work.**
   - Single-file attach versus **Review files** -> **Files to attach** (with **Keep display names** or **Use prefix:**).
   - How compound extensions (`.depo.json`, `.process.log`) route to specialist viewers instead of generic JSON or log viewers, and how paired `.depo.json` + `.tsv` files unlock time-series charts.
   - Sources: C:Help:FilesAndNotes, P:Help:Plugins.
2. **Inside the five core instrument viewers.**
   - **Deposition (`.depo.json`, `.tsv`), Recipe (`.rcpx`), and DSC (`.dsc`):** Overview, Recipe, and time-series tabs.
   - **FIBPS 3D optical profiler (`.fibps`):** **Profile**, **Distance**, **Roughness**, **Flatten**, **Step Height** (shared regions A and B), and **Wear Track** (automatic groove area), plus **Copy Data** in OriginLab layout.
   - **MIT nanoindentation (`.mit`):** Ticking indents in **Records:**, compliance subtraction, **Average**, and **Instrument fit**.
   - **ZRW tribometer (`.zrw`, `.zrv`):** **Automatic** plateau detection versus **Manual** cycle interval and clicking **Apply** to save the shared interval.
   - **X-Ray Calc (`.xrcx`) and XRDML (`.xrdml`):** Inspecting reflectivity curves and the fitted layer **Structure** table.
   - Table 7-1: Summary of the specialist instrument viewers and their shared selection states.
   - Sources: C:Help:FilesAndNotes, C:Help:Values, P:Help:Plugins.
3. **Working drafts, external edits, and conflict resolution.**
   - Why opening an attachment launches a separate working copy rather than editing notebook storage in place.
   - Using **Tools > Save Attachment Working Draft** and **Tools > Reload Attachment Working Draft**, and resolving conflicts in the **Markdown Editor** (`Ctrl+S`, `Cancel`, `Reload (discard my edits)`, `Save Anyway`).
   - Fig 7-1 (`fig-7-1-viewer-draft-lifecycle.svg`): The lifecycle of a file from instrument disk to stored notebook bytes and local working draft.
   - Sources: C:Help:FilesAndNotes.
4. **Replacing, moving, exporting, and viewing files outside a notebook.**
   - Using **Reupload...**, **Move to...**, and **Export** on attached files.
   - In a Team Lab: Using `ELNFileViewer.exe` to preview local instrument files without opening a notebook.
   - Sources: C:Help:FilesAndNotes, P:Help:Plugins, `APS-ELN-Commercial/README.md`.

### Chapter 8: Filling Out Protocols and Checklists (`ch8-filling-out-protocols-and-checklists.mdx`)

In This Chapter:
- Attaching a structured protocol form to a procedure, specimen, or action
- Using AutoFill fields (`values.all`, `conditions.all`, `results.all`) in protocol templates
- Moving a protocol through Draft, In Review, Approved, and Rejected states
- Submitting protocols from a phone at the instrument with the Quick Protocol web app

Section outline:
1. **Adding and completing a protocol on an item.**
   - Choosing **Item > Add Protocol** (or `Ctrl+Shift+P` in the team client), picking a category and template (such as Sputter Deposition, Indentation, Tribotest, XRD, or Safety Assessment), and filling the form fields.
   - Warning: Switching the **Template** drop-down inside the Protocol Editor clears the form fields you already entered.
   - Sources: C:Help:Protocols, P:Help:Protocols.
2. **How protocol templates and AutoFill work.**
   - Designing or inspecting a template in **Reference Data > Protocol Templates...** (`+Section`, `+Row`, `+Field`, and **Tags...** for equipment types).
   - How `AutoFill` expressions (`values.all`, `conditions.all`, `results.all`, `values.<Symbol>`) copy a snapshot of the item's values into the form when the protocol is created, and why formulas belong in **Add > Derived Value...** rather than protocol fields.
   - Table 8-1: Protocol field types and `AutoFill` value sources.
   - Sources: C:Help:Templates, P:Help:Protocols.
3. **The protocol review workflow.**
   - Moving a protocol from `Draft` to `In Review`, opening **Tools > Protocol Review...** (or `Ctrl+Shift+R`), and choosing **Approve** (which locks the protocol permanently) or **Reject** (which requires a rejection reason and returns it to `Draft`).
   - Fig 8-1 (`fig-8-1-protocol-workflow.svg`): The four validation states of a protocol and their transitions.
   - Sources: C:Help:Protocols, P:Help:Protocols.
4. **Submitting protocols from the instrument in a team lab.**
   - In a Team Lab: Using the **Quick Protocol** mobile web app at the instrument (signing in, searching the specimen code, picking an equipment-tagged template, and attaching a photo) and reviewing the submission in the desktop client.
   - Sources: P:Help:Protocols.

### Chapter 9: Values, Units, Formulas, and Provenance (`ch9-values-units-formulas-and-provenance.mdx`)

In This Chapter:
- Recording Conditions and Results with the right Value Type, unit, and tolerance
- Mapping reader keys and converting units automatically during Extract Values
- Computing Derived values from stored inputs with server formulas
- Auditing your items with Check Value Sources to catch drift and changed selections

Section outline:
1. **Conditions, Results, units, and plausible-range checks.**
   - Choosing **Condition** (`EXP_CONDITION`) versus **Result** (`TEST_RESULT`), using the built-in unit converter (**Convert...** and **Tools > Unit Converter...**), and entering **Tolerance** in the stored unit.
   - How APS ELN checks plausible ranges (`range_min`, `range_max`) and the tolerance factor (default $1000	imes$) before saving.
   - Sources: C:Help:Values.
2. **Reader mappings, unit factors, and standard deviations.**
   - How **Extract Values** and **Reference Data > Value Types... > Reader mappings...** map reader keys (including `<Material> Thickness` pattern rules) and convert units (`um` to `m`, `mTorr` to `Pa`).
   - How `<Key>` and `<Key> STD` pair automatically so the standard deviation becomes the value's tolerance.
   - Sources: C:Help:Values, Demo:A, Demo:B.
3. **The four value sources and Derived formulas.**
   - Comparing `Reader`, `Derived`, `Manual`, and `Unknown` sources (<a href="#fig-9-1">Figure 9-1</a>), and what happens if you hand-edit a `Reader` or `Derived` value.
   - Creating a `Derived` value with **Add > Derived Value...** (`wear_rate_reciprocating` version 1), including multi-value averaging over several wear-track scans.
   - Fig 9-1 (`fig-9-1-value-provenance-sources.svg`): The four value source kinds and how **Check Value Sources...** verifies them.
   - Sources: C:Help:Values, Paper§5.
4. **Checking value sources and understanding drift codes.**
   - Running **Check Value Sources...** on an item subtree and reading every diagnostic status code (`value_changed`, `reader_version_changed`, `selection_changed`, `source_changed`, `input_changed`, `input_missing`, `not_fully_rerunnable`).
   - Table 9-1: Meaning and action to take for each **Check Value Sources...** status code.
   - Sources: C:Help:Values, Demo:A, Demo:B.

## Part 3: Thinking, Searching, and Reviewing

### Chapter 10: The Hypothesis Tree and Evidence (`ch10-the-hypothesis-tree-and-evidence.mdx`)

In This Chapter:
- Proposing a root hypothesis or a follow-up refinement in a project
- Attaching experimental Runs and context References to an approved hypothesis
- Citing items, files, and values as evidence with snapshot checksums
- Submitting a conclusion and passing the two human review gates

Section outline:
1. **Why connect experiments to a hypothesis tree?**
   - How a hypothesis links *what you expected and why* (`Proposal`), the procedures and specimens you made to test it (`Runs`), the specific files and values you rely on (`Evidence`), and what you found (`Conclusion`).
   - Fig 10-1 (`fig-10-1-hypothesis-lifecycle.svg`): The hypothesis lifecycle and its two human review gates.
   - Sources: C:Help:Hypotheses, P:Help:Experiments.
2. **Proposing a hypothesis and passing the first gate.**
   - Opening **Project > Hypotheses**, clicking **New hypothesis...** (or **New follow-up...** to specify **Change - what differs from the parent hypothesis**), and selecting a headline quantity.
   - Approving or rejecting a proposal in **Your decision** (and why MCP agents can propose hypotheses but never approve or reject them).
   - In a Team Lab: How **Administration > Approval Policy...**, **Four-eyes**, project **Share...** checkboxes, and the Dashboard's **Waiting for You** queue govern team approvals.
   - Sources: C:Help:Hypotheses, P:Help:Experiments.
3. **Attaching Runs and citing Evidence.**
   - Attaching items on the **Runs** tab (**Attach selected item...** or right-clicking an item -> **Hypothesis > Attach to hypothesis...**) as a `Run` (after approval) or `Reference`.
   - Citing an item, an attached file, or a stored value on the **Evidence** tab (**Add evidence...**), and how ELN snapshots the file's MD5 checksum and value at citation time.
   - Sources: C:Help:Hypotheses, P:Help:Experiments.
4. **Submitting a conclusion and checking the content seal.**
   - Filling in **What we found** and **Outcome** (`Supported`, `Refuted`, or `Inconclusive`), clicking **Submit conclusion**, and choosing **Accept** or **Return for more work**.
   - Understanding **Sealed**, `changed` evidence badges, `missing` warnings, and **Abandon...**.
   - Table 10-1: Hypothesis states, derived lab states, and who can act at each step.
   - Sources: C:Help:Hypotheses, P:Help:Experiments.

### Chapter 11: Project Wiki, Notes, Tags, and Links (`ch11-project-wiki-notes-tags-and-links.mdx`)

In This Chapter:
- Creating a five-section Project Wiki and editing Markdown pages with inline figures
- Cross-referencing items and specimens with `[[item:N]]` and `[[specimen:CODE]]` links
- Categorizing records with colored Tags and discussing results in Comments
- Building typed bidirectional relationships between items with Copy as Link Target

Section outline:
1. **The five-section Project Wiki.**
   - Seeding a project wiki with **Project > New Wiki** (or **New Topic Wiki**) to create the five standard folders: `Goals`, `Ideas`, `Literature`, `Analysis`, and `References`.
   - Creating and editing Wiki pages in the **Markdown Editor** (`Ctrl+S`), dragging or pasting (`Ctrl+V`) images as page attachments, and why Wiki file attachments stay hidden in the item tree.
   - Fig 11-1 (`fig-11-1-wiki-five-sections.svg`): The five-section Wiki structure alongside Tags, Comments, and typed item relationships.
   - Sources: C:Help:Wiki, P:Help:Wiki.
2. **Navigating between Wiki pages and experimental records.**
   - Writing `[[item:N]]` and `[[specimen:CODE]]` (or `eln://item/N` and `eln://specimen/CODE`) inside Markdown pages to jump directly to any procedure, specimen, or action.
   - Sources: C:Help:Wiki, P:Help:Wiki.
3. **Classifying items with Tags and Favorites.**
   - Right-clicking one or more items and choosing **Tags...** to assign colored badge tags (showing `k of N` across multi-selected items), and managing the catalog in **Reference Data > Tags...**.
   - Warning: Clicking **Delete** inside the Tags dialog deletes the tag definition from the entire notebook; to remove a tag from the current item, clear its check box instead.
   - Bookmarking frequent projects, folders, and items with **Add to Favorites**.
   - Sources: C:Help:TagsAndLinks.
4. **Recording Comments and typed item relationships.**
   - Posting and editing timestamped discussion entries in **Comments...** (and how comments differ from rich-text **Notes** added via **Item > Add Note**).
   - Creating a typed directional relationship between two items (such as linking a coated specimen to its substrate batch or target): right-click the target item and choose **Copy as Link Target**, then right-click the source item and choose **Link to...**, pick the **Relationship:** phrase, and inspect or follow links in **Item > Links...**.
   - Table 11-1: Choosing between Wiki pages, rich-text Notes, Comments, Tags, Markdown links, and typed Item Links.
   - Sources: C:Help:TagsAndLinks, C:Help:FilesAndNotes.

### Chapter 12: Full-Text, Panel, and Semantic Search (`ch12-full-text-panel-and-semantic-search.mdx`)

In This Chapter:
- Filtering the Projects and Items panels in real time without losing context
- Finding exact words and phrases across a notebook with Navigate > Search
- Setting up and running offline Semantic Search (Search by meaning) across PDFs and notes
- Using Rerank results, Project/Type/Created filters, and Go to Item

Section outline:
1. **Three ways to find a record in APS ELN.**
   - Comparing real-time panel filters, notebook-wide text search (**Navigate > Search...**, `Ctrl+F`), and offline semantic search (**Search by meaning**).
   - Fig 12-1 (`fig-12-1-search-architecture.svg`): Overview of panel filters, record text search, and hybrid semantic search.
   - Sources: C:Help:Search.
2. **Filtering panels and jumping to a known ID.**
   - Using the search boxes at the top of the **Projects** and **Items** panels, clearing active filters, enabling **Show Archived**, and jumping directly to an item ID or `eln://` URL with **Navigate > Go to Item...** (`Ctrl+G`).
   - Sources: C:Help:Search, C:Help:Shortcuts.
3. **Searching notebook text (`Ctrl+F`).**
   - How **Navigate > Search...** searches item titles, descriptions, properties, entry titles, attachment titles, value descriptions, and tag names: matching the full phrase first, then falling back to items containing all entered words (2+ characters).
   - Sources: C:Help:Search.
4. **Searching by meaning (Semantic Search) and reranking.**
   - Downloading the local models (~666 MB total: 549 MB required + 117 MB optional PDFium and reranker) once via **Tools > Semantic Search Setup...** -> **Download and Install**, and how the `.search.sqlite` index stays 100% offline on your PC.
   - Which attachment files are read inside (`PDF` with PDFium, `.docx`, `.pptx`, `.xlsx`, `.html`, `.json`, `.xml`, `.csv`, `.rtf`, `.md`, `.txt`, up to 64 MB / 200,000 characters / 2,000 PDF pages).
   - Ticking **Search by meaning**, using **Rerank results** (which re-sorts the top 20 candidates in ~0.5 s using passage text and item path context), and narrowing by **Project**, **Type**, and UTC **Created** dates.
   - Table 12-1: Comparison of Panel Filters, Text Search, Semantic Search, and **Tools > Analysis...**.
   - Sources: C:Help:Search, `APS-ELN-Community/README.md`.

### Chapter 13: Charts, Correlations, and PDF Reports (`ch13-charts-correlations-and-pdf-reports.mdx`)

In This Chapter:
- Plotting experimental Conditions against test Results across a project
- Understanding how Analysis pairs procedure conditions with child action results
- Generating formatted A4 or Letter PDF experiment reports
- Exporting and importing JSON scientific packages safely

Section outline:
1. **Plotting conditions against results (`Tools > Analysis...`).**
   - Selecting a project or folder, opening **Tools > Analysis...**, choosing a **Condition** value type on the **X Axis** and a **Result** value type on the **Y Axis**, selecting procedures, and clicking **Plot**.
   - How each plotted point is computed: $X$ is the first matching `Condition` on the **Procedure**, and $Y$ is the arithmetic mean of matching `Result` values on child actions, specimen actions, and one level below specimen actions.
   - Copying the plotted numbers with **Copy Data (CSV)** or the image with **Copy Chart**.
   - Fig 13-1 (`fig-13-1-analysis-and-reports.svg`): How **Tools > Analysis...** pairs conditions with results and how **File > Export Report...** builds a PDF report.
   - Sources: C:Help:AnalysisAndReports.
2. **Exporting a formatted PDF report (`File > Export Report...`).**
   - Selecting a **Procedure** root in the item tree (so all child specimens and actions are available), choosing **File > Export Report...**, ticking the items and sections (`Metadata`, `Protocols`, `Values`, `Files`, `Tags`, `Comments`, `Signatures`), previewing in the HTML viewer, and clicking **Export PDF**.
   - Sources: C:Help:AnalysisAndReports.
3. **Exporting and importing scientific packages.**
   - Using **File > Export...** and **File > Import scientific package...** to share item metadata and protocol templates as JSON, and understanding why neither a PDF report nor a JSON scientific package replaces a full backup of your `.sqlite` database and attachment folder.
   - Sources: C:Help:AnalysisAndReports.

### Chapter 14: Completeness, Audit, and Signatures (`ch14-completeness-audit-and-signatures.mdx`)

In This Chapter:
- Defining and running Completeness Rules for each Action Type and Equipment
- Finding missing files and missing values with Data Completeness checks
- Inspecting the notebook Audit Log by date, entity, operation, and user
- Applying and verifying cryptographic Electronic Signatures (`SIGNED`)

Section outline:
1. **Three layers of record integrity.**
   - How **Completeness Rules**, **Check Value Sources** / **Audit Log**, and **Electronic Signatures** work together before a sample record is closed (<a href="#fig-14-1">Figure 14-1</a>).
   - Fig 14-1 (`fig-14-1-integrity-layers.svg`): The three layers of record verification in APS ELN.
   - Sources: C:Help:Integrity, P:Help:Signatures.
2. **Completeness rules and Data Quality Checks.**
   - Creating rules in **Tools > Completeness Rules...** that specify which **Required File Types** and **Required Value Types** must be present for a given **Action Type** and **Equipment** (with `Error` or `Warning` severity).
   - Running **Tools > Data Completeness...** (or right-clicking a project/folder -> **Data Quality Check...** in the team client), jumping to incomplete items with **Go To**, and exporting the findings to CSV.
   - Sources: C:Help:Integrity, P:Help:Projects.
3. **Inspecting the Audit Log.**
   - Opening **Tools > Audit Log...** and filtering by **From**, **To**, **Entity**, **Op** (`Create`, `Update`, `Delete`), and **User** to see when every record was written and whether it came through the desktop GUI or MCP (`arXiv:2610.27859`).
   - Sources: C:Help:Integrity, Paper§2.4.
4. **Signing an item and verifying signature integrity.**
   - Right-clicking a finished item and choosing **Signature > Sign Item...**, picking a **Meaning** (`Authored`, `Reviewed`, `Approved`, or `Witnessed`), entering a comment and your password, and clicking **Sign**.
   - Warning: Signing permanently locks the item against any further edits, file replacements, value changes, or deletion; there is no undo.
   - Checking a signed record with **Signature > View Signature...** -> **Verify Now** (or **Signature > Verify Integrity**), and what the content hash covers.
   - Table 14-1: Comparison of Protocol Approval, Hypothesis Acceptance Seal, and Item Electronic Signature.
   - Sources: C:Help:Integrity, P:Help:Signatures.

## Part 4: Working with an AI Agent (MCP) (Chapter-Level Plan)

- **Chapter 15: Connecting an AI Assistant to Your Notebook** (`C:Help:MCP`, `P:Help:AIIntegration`)
- **Chapter 16: Reading Data, Checking Storage, and Auditing Value Drift with an Agent** (`C:Help:MCP`, `Demo:A`, `Demo:B`)
- **Chapter 17: Recording Analysis Results with Full Provenance (Study B Walkthrough)** (`Demo:B`, `docs/note-download-file-mcp-tool.md`)
- **Chapter 18: Drafting Hypotheses, Wiki Pages, and Structured Records with an Agent** (`C:Help:MCP`, `C:Help:Hypotheses`)

## Part 5: The Part of Tens (Chapter-Level Plan)

- **Chapter 19: Ten Mistakes That Break Your Data Trail** (`Paper§4`, `review/demo_A_student_checklist.md`)
- **Chapter 20: Ten Checks Before You Sign a Record or Ask Your Supervisor for Approval** (`C:Help:Integrity`, `C:Help:Values`, `Demo:A`)
- **Chapter 21: Ten Things an AI Agent Can and Cannot Do in ELN** (`C:Help:MCP`, `P:Help:AIIntegration`)

## Back Matter: Appendices (Chapter-Level Plan)

- **Appendix A: Toolbar, Menu, and Tree Icons Reference** (`P:Help:IconReference`, `C:Code`)
- **Appendix B: Instrument Viewers and Supported File Formats** (`C:Help:FilesAndNotes`, `C:Help:Values`, `P:Help:Plugins`)
- **Appendix C: Value Sources, Units, Plausible Ranges, and Derived Formulas** (`C:Help:Values`, `C:Help:ReferenceData`, `ValueTypes.csv`)
- **Appendix D: Keyboard Shortcuts** (`C:Help:Shortcuts`, `P:Help:Shortcuts`)
- **Appendix E: Glossary** (`NOTATION.md`)
