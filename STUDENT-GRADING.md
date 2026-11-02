# Student Practice Verification & Grading Rubric (MCP)

_Deadline: **November 16, 2026**. Run this procedure via the `eln` MCP server (`xd://mcp__eln_*`) whenever the supervisor asks to check student practice projects._

---

## 1. Expected Projects per Student

Each student creates a personal group named `Practice` in the Desktop client and creates two projects inside it under their own username:

1. `Study A Practice` — **Study A (`261015A`, BN/DLC tribological coating)** recorded in the Desktop GUI (Chapter 4).
2. `Study B Practice` — **Study B (`261014B`, Co/C multilayer X-ray mirror)** recorded and fitted via the AI agent (`ELNMCPServer.exe` + `XRC_MCP.exe`, Chapter 17).

To locate all student practice projects, call `list_projects` (`{"include_archived": true}`) and match projects owned by each student whose `title` contains `Study A` / `261015A` or `Study B` / `261014B` / `Practice`.

---

## 2. Ground Truth & MCP Checks for `Study A Practice` (`261015A`)

### 2.1 Item Hierarchy (`list_items` on `Study A Practice`)

| # | Level | Expected Title | Parent | Action Type | Attached Files | Stored Values |
|---|---|---|---|---|---|---|
| 1 | `Proc` | `Deposition 261015A` | Project / Folder root | `Deposition` | 3 files (`.depo.json`, `.run.json`, `.tsv`) | 12 `Reader` (`aps.deposition` v1) |
| 2 | `Item` | `261015A` | `Deposition 261015A` | — | 0 | 0 |
| 3 | `Action` | `Thickness 261015A` | `261015A` | `3D Profiling` | 3 files (`1.fibps`, `2.fibps`, `3.fibps`) | 3 `Reader` (`aps.fibps` v3) |
| 4 | `Action` | `Indentation 261015A` | `261015A` | `Indentation` | 1 file (`BN-DLC(261015A).mit`) | 2 `Reader` (`aps.mit` v2/v3) |
| 5 | `Action` | `Friction test 261015A` | `261015A` | `Tribotest` | 1 file (`BN-DLC.zrw`) | 3 `Reader` (`aps.zrw` v2) + 1 `Derived` |
| 6 | `Action` | `Wear track 261015A` | `Friction test 261015A` | `3D Profiling` | 3 files (`wear 1.fibps`, `wear 2.fibps`, `wear 3.fibps`) | 3 `Reader` (`aps.fibps` v3) |

### 2.2 File Checksums (`list_files` / `check_storage`)

All 11 files must match `public/data/study-a/checksums.md5`:
- `Deposition_BN-DLC_(261015A)_2026-10-15_17-21-48.depo.json`: `a21a1999f3756f3e83950ca30216cc61`
- `2026-10-15_17-21-48_BN-DLC(DLCTOP).run.json`: `c907ce788340a689929951f8bba56807`
- `2026-10-15_17-21-48_BN-DLC(DLCTOP).tsv`: `939d1e9ea7d029bd4827dc1e3332939f`
- `1.fibps`: `fbd4bee2fd6206b32a86c73d14180a95`
- `2.fibps`: `1d7034d3dd13a52fa59f3f7874d06b32`
- `3.fibps`: `1c7da94acc8134287891b30ebece40d8`
- `BN-DLC(261015A).mit`: `d36fad778ef43d39985093ca1fdd00c9`
- `BN-DLC.zrw`: `93834e9f295ce1a71ee508e488ef0015`
- `wear 1.fibps`: `d89c6b9ba87c73f93142499b0acc8a21`
- `wear 2.fibps`: `398609167911d5536497f249d01ea026`
- `wear 3.fibps`: `99b5518776e72d468bb9f634386af188`

### 2.3 Expected Values & Provenance (`get_values` / `check_value_drift`)

- **Total values:** 24 (`23` with `source.kind == "Reader"` and `1` with `source.kind == "Derived"`, `0` `Manual`).
- **Key results to verify:**
  - `Deposition 261015A`: 10 conditions + 2 results (`Duration` $= 12941.5\,\text{s}$, `BasePressure` $= 9.10 \times 10^{-5}\,\text{Pa}$).
  - `Thickness 261015A`: 3 step-height values ($\approx 3.58 \times 10^{-7}\,\text{m}$, $3.16 \times 10^{-7}\,\text{m}$, $3.55 \times 10^{-7}\,\text{m}$).
  - `Indentation 261015A`: `Hardness` $= 5.92 \pm 0.47\,\text{GPa}$, `Modulus` $= 127.17 \pm 11.06\,\text{GPa}$.
  - `Friction test 261015A`: `Fn` $= 9.81\,\text{N}$, `Cycles` $= 1000$, `COF` $= 0.528 \pm 0.019$, and `Derived` wear rate $K = 3.05 \times 10^{-7}\,\text{mm}^3/(\text{N}\cdot\text{mm})$ (`formula_id: "wear_rate_reciprocating"`).
  - `Wear track 261015A`: 3 wear-area values ($0.00620\,\text{mm}^2$, $0.00553\,\text{mm}^2$, $0.00621\,\text{mm}^2$).
- **Health checks:**
  - `check_storage(project_id)`: `11 ok`, `0 missing`, `0 hash_mismatch`.
  - `check_value_drift(project_id)`: `23` or `24` checked, `0` drifted.
  - `report_value_issues(project_id)`: `0` issues.

---

## 3. Ground Truth & MCP Checks for `Study B Practice` (`261014B`)

### 3.1 Item Hierarchy (`list_items` on `Study B Practice`)

| # | Level | Expected Title | Parent | Attached Files | Stored Values |
|---|---|---|---|---|---|
| 1 | `Proc` | `Deposition 261014B` | Folder `261014B` (or root) | 3 files (`Deposition_*.depo.json`, `.run.json`, `.tsv`) | 14 `Reader` (`aps.deposition` v1) |
| 2 | `Action` | `Cleaning 261014B` | `Deposition 261014B` | 3 files (`Cleaning_*.depo.json`, `.run.json`, `.tsv`) | 4 `Reader` (`aps.deposition` v1) |
| 3 | `Item` | `261014B` | `Deposition 261014B` | 0 | 0 |
| 4 | `Action` | `XRR-1 261014B` | `261014B` | 1 file (`XRR-1_Co-C(261014B).xrdml`) | 0 |
| 5 | `Action` | `XRR fit 261014B` | `XRR-1 261014B` | 1 file (`*.xrcx` fitted by student's agent) | 4 `Reader` (`aps.xrcx` v2) |

### 3.2 File Checksums & XRR Fit Verification (`list_files`, `extract_file_data`)

- The 7 raw files must match `public/data/study-b/checksums.md5`:
  - `Deposition_2026-10-14_11-56-09.depo.json`: `7c431f345fa8eff066089ae05c8b18f4`
  - `2026-10-14_11-56-09_StudyB_CoC_Co42s_C108s_N20_2mT.run.json`: `05c8c2d3243e7977093e444761c46dbe`
  - `2026-10-14_11-56-09_StudyB_CoC_Co42s_C108s_N20_2mT.tsv`: `f3ed4cc9ba26504f6edd4da75bb417b0`
  - `Cleaning_(261014B)_2026-10-14_11-16-41.depo.json`: `22a7043837fe6b6bb024f43662f3d021`
  - `2026-10-14_11-16-41_Cleaning.run.json`: `4577c8e4d9b3f333b708f076f03a41be`
  - `2026-10-14_11-16-41_Cleaning.tsv`: `f00b45802574c4dd1b6c0d07c3134838`
  - `XRR-1_Co-C(261014B).xrdml`: `4b744f790e81ea7b3cc9c29efbf11652`
- **The 8th file (`*.xrcx` on `XRR fit 261014B`):**
  - Because `Study-B-261014B-raw.zip` omits `XRR-fit_Co-C(261014B).xrcx`, the student's `.xrcx` file will have a fresh MD5 generated by their `XRC_MCP` fit (also flag if a student copied the reference MD5 `106d0efc42c3b0a200ffd9be087bb1a5`).
  - Call `extract_file_key_values` on the attached `.xrcx` file to verify that `Chi2` is emitted by `aps.xrcx` (proving `save_project` used `curves.job_id` and wrote `[FITRESULT]`).

### 3.3 Expected Values & Provenance (`get_values` / `check_value_drift`)

- **Total values:** 22 (`22` with `source.kind == "Reader"`, `0` `Manual`).
  - `Deposition 261014B`: 12 conditions + 2 results (`aps.deposition` v1). Verify no `Mean.*` keys and no `.tsv` values were stored.
  - `Cleaning 261014B`: 2 conditions + 2 results (`aps.deposition` v1).
  - `XRR fit 261014B`: 4 results (`aps.xrcx` v2):
    - `Period` $\approx 4.94 \times 10^{-9}\,\text{m}$ ($49.4\,\text{\AA}$)
    - `Co Thickness` $\approx 2.08 \times 10^{-9}\,\text{m}$ ($20.8\,\text{\AA}$)
    - `C Thickness` $\approx 2.86 \times 10^{-9}\,\text{m}$ ($28.6\,\text{\AA}$)
    - `Chi2` $\le 1.2$ (reference Polynomial order 1 fit: $0.943$)
- **Health checks:**
  - `check_storage(project_id)`: `8 ok`, `0 missing`, `0 hash_mismatch`.
  - `check_value_drift(project_id)`: `22 checked`, `22 unchanged`, `0` drifted.
  - `report_value_issues(project_id)`: `0` issues.

---

## 4. Report Template

When generating the verification report, output a summary table across all students followed by per-student findings:

```markdown
# APS ELN Mandatory Practice Report (YYYY-MM-DD)

| Student (`username`) | `Study A Practice` (`261015A`) | `Study B Practice` (`261014B`) | Overall Status |
|---|---|---|---|
| `username` (Name) | 6/6 items, 11/11 files, 24/24 values (0 drift) | 5/5 items, 8/8 files, 22/22 values ($\chi^2 = ...$, 0 drift) | PASS / NEEDS FIX |
```
