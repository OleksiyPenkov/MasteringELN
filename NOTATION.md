# NOTATION: terms, record levels, value sources, units, and file formats

_Canonical file. Written 2026-11-02. **No new symbol, term, reader ID, or file extension enters the manuscript without being added here in the same pass.** Each entry names its source. When sources disagree, the order is Delphi source code > Help > ELN software paper (`arXiv:2610.27859`)._

## 1. Editions and hosts

| Term in the book | Program executable / edition | Meaning | Source |
|---|---|---|---|
| **APS ELN** (or **ELN**) | Shared scientific desktop and model | The electronic laboratory notebook when a statement applies to both Community and Commercial editions | `APS-ELN-Community/README.md` |
| **APS ELN Community** (or **Community**) | `ELNCommunity.exe`, `ELNCommunityMCP.exe` | The public Apache-2.0 single-user local edition storing data in a format 5 `.sqlite` file and a local attachment folder | `Help/GettingStarted.html`, `Help/Notebooks.html` |
| **APS ELN ("For Teams")** (or **Commercial**) | `ELabNotebook3.exe`, `ELNMCPServer.exe` | The multi-user laboratory edition connecting to a shared MySQL database and WebDAV/server attachment store with user roles and supervisor review gates | `APS-ELN-Commercial/README.md`, Commercial `Help/GettingStarted.html` |
| **ELN File Viewer** | `ELNFileViewer.exe` | Standalone personal file viewer in the Commercial build that opens all 26 viewer plugins without opening a notebook | `APS-ELN-Commercial/README.md` |

## 2. Scientific hierarchy and containers

| UI term | Internal code / MCP level | What it represents | Parent in tree | Source |
|---|---|---|---|---|
| **Notebook** | `.sqlite` database + attachment folder (Community) or Server DB + WebDAV (Team) | The top-level database and file store | None | `Help/Notebooks.html` |
| **Project** | `TProject` | A research topic, grant, or material system (for example `Tribology` or `Co/C`) | Notebook | `Help/Projects.html` |
| **Group** | Project group | An optional organizational grouping of projects | Notebook | `Help/Projects.html` |
| **Folder** | `TFolder` (`folder_id`) | A subfolder inside a project used to group procedures and specimens | Project or parent Folder | `Help/Projects.html` |
| **Procedure** | `Proc` | A top-level experimental run, synthesis, or deposition (for example `Deposition 261015A`) | Project or Folder (`parent_id = 0`) | `Help/Items.html` |
| **Specimen** | `Item` (UI label: **Specimen**) | A physical sample or computational model produced or studied in a procedure (for example `261015A`) | Procedure (`Proc`) | `Help/Items.html` |
| **Action** | `Action` | A preparation, treatment, measurement, test, or analysis step (for example `Thickness 261015A`, `XRR-1 261014B`, `XRR fit 261014B`) | Procedure, Specimen, or parent Action | `Help/Items.html` |

## 3. Attached content and value provenance

| Term | UI / MCP identifier | Meaning | Source |
|---|---|---|---|
| **Condition** | `EXP_CONDITION` (UI: **Condition**) | An experimental input or setting (pressure, power, current, deposition time, normal load, cycle count) | `Help/Values.html` |
| **Result** | `TEST_RESULT` (UI: **Result**) | A measured observation or calculated output (step height, hardness, modulus, friction coefficient, wear rate, fitted period, $\chi^2$) | `Help/Values.html` |
| **Reader value** | Source kind `Reader` | A value extracted from an attached file by a viewer plugin reader. Stores `file_id`, file MD5, `reader_id`, `reader_version`, emitted key name, emitted unit, conversion factor, and optional analysis snapshot | `Help/Values.html`, `arXiv:2610.27859` Section 5 |
| **Derived value** | Source kind `Derived` | A value calculated by the notebook from stored input values using a versioned formula (for example `wear_rate_reciprocating` version 1). Stores `formula_id`, `formula_version`, and input `value_id` list | `Help/Values.html` |
| **Manual value** | Source kind `Manual` | A number typed by a user, or a `Reader`/`Derived` value whose number or tolerance was later edited by hand | `Help/Values.html` |
| **Unknown source** | Source kind `Unknown` | A legacy value recorded before value-level source tracking was introduced | `Help/Values.html` |
| **Tolerance** | `Tolerance` field | A non-negative number in the stored unit of the value (for example the standard deviation paired from `<Key> STD` by a reader) | `Help/Values.html` |

## 4. Units and symbols used in the running examples

| Symbol / quantity | Stored unit in ELN | Reader / display unit | Notes and source |
|---|---|---|---|
| $d$, $h$ (Step height / coating thickness, Study A) | $\text{m}$ (or $\text{nm}$ in `ValueTypes.csv`) | $\text{m}$ ($3.58 \times 10^{-7}\,\text{m} = 358\,\text{nm}$) | `aps.fibps` version 3 (`record_report.md`) |
| $H_{\text{IT}}$ (Indentation hardness, Study A) | $\text{GPa}$ | $\text{GPa}$ ($5.92 \pm 0.47\,\text{GPa}$) | `aps.mit` version 2/3 (`Help/Values.html`) |
| $E_{\text{IT}}$ (Indentation modulus, Study A) | $\text{GPa}$ | $\text{GPa}$ ($127.17 \pm 11.06\,\text{GPa}$) | `aps.mit` version 2/3 (`Help/Values.html`) |
| $F_n$ (Normal force, Study A) | $\text{N}$ | $\text{N}$ ($9.81\,\text{N}$ for $1\,\text{kgf}$ or $19.61\,\text{N}$ for $2\,\text{kgf}$) | `aps.zrw` version 2 (`Help/Values.html`) |
| $N$ (Cycles, Study A; or multilayer periods, Study B) | dimensionless | dimensionless ($1000$ cycles; $N = 20$ periods) | `aps.zrw` version 2; `aps.deposition` version 1 |
| $\mu$ or $\text{COF}$ (Coefficient of friction, Study A) | dimensionless | dimensionless ($0.528 \pm 0.019$) | `aps.zrw` version 2 (`Help/Values.html`) |
| $A$ (Wear track cross-sectional area, Study A) | $\text{mm}^2$ | $\text{mm}^2$ ($0.00620\,\text{mm}^2$) | `aps.fibps` version 3 (`record_report.md`) |
| $K$ (Reciprocating wear rate, Study A) | $\text{mm}^3/(\text{N}\cdot\text{mm})$ | $\text{mm}^3/(\text{N}\cdot\text{mm})$ | Formula $K = A / (2 \cdot F_n \cdot N)$, `wear_rate_reciprocating` version 1 (`Help/Values.html`) |
| $D$, $H$ (X-ray multilayer period and layer thickness, Study B) | $\text{m}$ in general `Thickness`/`Period` value types, or $\text{\AA}$ in X-Ray Calc | $\text{\AA}$ in `aps.xrcx` ($D = 49.40\,\text{\AA}$ converted to $4.940 \times 10^{-9}\,\text{m}$) | `aps.xrcx` version 2 (`record_report.md`, `Help/Values.html`) |
| $\chi^2$ (Goodness of fit, Study B) | dimensionless | dimensionless ($0.943$) | `aps.xrcx` version 2 (`Help/Values.html`) |
| $\theta$, $2\theta$ (Grazing and scattering angles, Study B) | $\text{deg}$ ($^\circ$) | $\text{deg}$ ($^\circ$) | Always label whether an angle is $\theta$ or $2\theta$ |

## 5. Built-in viewer plugins and data file readers (26 viewers)

| Viewer name | Extensions | Reader ID (if value extractor exists) | Source |
|---|---|---|---|
| **Deposition** | `.depo.json`, `.tsv` | `aps.deposition` | `Help/FilesAndNotes.html`, `record_report.md` |
| **Recipe** | `.rcpx` | `aps.recipe` | `Help/FilesAndNotes.html` |
| **Process Log** | `.process.log` | none | `Help/FilesAndNotes.html` |
| **DSC** (Deposition script) | `.dsc` | `aps.dsc` | `Help/Values.html` |
| **DSR** | `.dsr` | none | `Help/FilesAndNotes.html` |
| **XRDML** | `.xrdml` | `aps.xrdml` | `Help/FilesAndNotes.html` |
| **X-Ray Calc** | `.xrcx` | `aps.xrcx` | `Help/Values.html` |
| **XRFX** | `.xrfx` | `aps.xrfx` | `Help/FilesAndNotes.html` |
| **MIT** (Anton Paar UNHT nanoindentation) | `.mit` | `aps.mit` | `Help/Values.html` |
| **FIBPS** (Filmetrics Profilm3D surface profiler) | `.fibps` | `aps.fibps` | `Help/FilesAndNotes.html`, `record_report.md` |
| **VK4** (Keyence laser confocal microscope) | `.vk4` | `aps.vk4` | `Help/FilesAndNotes.html` |
| **ZRW** (DaVinci / Tribo Tester tribometer) | `.zrw`, `.zrv` | `aps.zrw` | `Help/Values.html` |
| **Tribo** (Plain-text tribometer) | `.raw` | `aps.tribo` | `Help/FilesAndNotes.html` |
| **DM3** (Gatan DigitalMicrograph TEM) | `.dm3` | `aps.dm3` | `Help/FilesAndNotes.html` |
| **OPJU** (OriginLab project) | `.opju` | none | `Help/FilesAndNotes.html` |
| **LAMMPS** (Molecular dynamics) | `.lmpin`, `.dump`, `.data`, `.lammps` | `aps.lammps` | `Help/FilesAndNotes.html` |
| **Columnar data** | `.dat`, `.csv`, `.txt`, `.ascii` | none | `Help/FilesAndNotes.html` |
| **Markdown** | `.md` | none | `Help/FilesAndNotes.html` |
| **PDF** | `.pdf` | none | `Help/FilesAndNotes.html` |
| **Image** | `.png`, `.bmp`, `.jpg`, `.jpeg`, `.tif`, `.tiff` | none | `Help/FilesAndNotes.html` |
| **HTML** | `.html`, `.htm` | none | `Help/FilesAndNotes.html` |
| **JSON** | `.json` | none | `Help/FilesAndNotes.html` |
| **OLE** (Microsoft Office) | `.xlsx`, `.docx`, `.pptx` | none | `Help/FilesAndNotes.html` |
| **Note** | Rich-text note entry | none | `Help/FilesAndNotes.html` |
| **Protocol** | `.protocol` form record | none | `Help/FilesAndNotes.html` |
| **File** | General fallback browser | none | `Help/FilesAndNotes.html` |
