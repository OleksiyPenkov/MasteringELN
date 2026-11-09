# Design Spec: Part 3 — Experiment Planning with ELN (Chapters 10–12) and GUI/Taguchi Updates

_Date: 2026-11-09. Author: Oleksiy Penkov._

## 1. Intent and Why

Two major capabilities in **APS ELN** (`Community 2.4.1.90` and `Commercial 1.7.1.1631`) reshape how students plan and track multi-run research:

1. **Taguchi Design of Experiments (DOE) and multi-factor Experiment Series (`0919c0f`):**
   - **Project > Series...** now supports **1 to 7 factors** with inline semicolon-separated **Levels** and three **Point generation** modes: **Full grid** (1 to 3 factors, up to 27 points), **Taguchi orthogonal array** (`L4`, `L8`, `L9`, `L16`, `L18`, `L27`), and **No initial points**.
   - On the **Plot** tab, **Level means (Taguchi)** plots the mean response at each planned factor level (with sample SD error bars for $n \ge 2$ or value tolerance for $n = 1$) and computes $\Delta$ ($\max - \min$ level mean) and **Rank** (`rank 1 of k`) across all plan factors, automatically excluding unconfirmed `planned` values and runs whose factor value deviated beyond tolerance.
   - In MCP, `create_series` and `update_series_plan` accept factor `levels` and `design` (`"grid"`, `"taguchi"`, `"manual"`), returning `point_count` and `taguchi_array`.
2. **Updated Hypotheses and Series GUI (`e653fea`, `7003fca`, `7f00f51`, `1b010ef`):**
   - Both **Project > Hypotheses** and **Project > Series...** now open in their **own top-level windows** with their own taskbar buttons and remembered size/position rather than inside the right-hand Content Viewer, so a student can keep the plan or hypothesis open beside the main item tree.
   - Read-only proposal and conclusion text in Hypotheses is tinted with the row status color.
   - **APS ELN Community** now uses a streamlined local self-review workflow (**Draft** $\rightarrow$ **Start** / **Discard** $\rightarrow$ **Open** $\rightarrow$ **Close with conclusion** $\rightarrow$ **Closed · Supported / Refuted / Inconclusive**, plus **Make run**), while **APS ELN ("For Teams")** retains the two-gate supervisor workflow (**Proposed** $\rightarrow$ **Approved** $\rightarrow$ **In review** $\rightarrow$ **Accepted**).

Previously, Hypotheses sat in Chapter 10 while Experiment Series was squeezed into the first section of Chapter 13 alongside `Tools > Analysis...` and PDF exports, with almost no pedagogical background on *why* or *how* to plan experiments. Extracting a dedicated **Part 3: Experiment Planning with ELN** with **three chapters** (`Chapters 10–12`) gives graduate students a complete foundation in experimental design before they organize wikis, run searches, export reports, or automate via MCP.

## 2. Goals, Non-Goals, and Anti-Goals

### Goals
1. Create **Part 3: Experiment Planning with ELN** containing three chapters:
   - **Chapter 10: Principles of Experiment Planning and the Taguchi Method** (`src/content/chapters/ch10-principles-of-experiment-planning.mdx`) — student background on why unplanned trial-and-error runs fail, how hypotheses and experiment series work as a pair, when to use a 1-factor sweep vs. a 2–3-factor Full Grid vs. a 2–7-factor Taguchi orthogonal array (`L4`–`L27`), and how level means, $\Delta$, and factor rank isolate dominant process parameters.
   - **Chapter 11: The Hypothesis Tree and Evidence** (`src/content/chapters/ch11-the-hypothesis-tree-and-evidence.mdx`) — updated for the standalone **Hypotheses** window, Community self-review (`Draft` $\rightarrow$ `Open` $\rightarrow$ `Closed`) vs. Commercial two-gate supervisor review (`Proposed` $\rightarrow$ `Approved` $\rightarrow$ `In review` $\rightarrow$ `Accepted`), **Make run**, `Planned`-value citation rules, and content seals.
   - **Chapter 12: Experiment Series and Taguchi Arrays in ELN** (`src/content/chapters/ch12-experiment-series-and-taguchi-arrays.mdx`) — complete hands-on guide to the standalone **Series** window, 1–7 factors with labels and inline levels, Full Grid and Taguchi point generation, making/linking depositions, confirming `planned` values, handling failed runs, reading the **Table** tab, analyzing **Level means (Taguchi)** ($\Delta$ and rank) on the **Plot** tab, and exporting to OriginLab.
2. Shift the remaining Parts and Chapters cleanly (+1 Part from Part 4 onward, +2 chapter numbers from old Chapter 11 onward, resulting in **6 Parts and 24 Chapters**):
   - **Part 4: Organizing, Searching, and Reviewing** (`Chapters 13–16`: Wiki/Tags/Links, Full-Text/Panel/Semantic Search, Cross-Project Charts/PDF Reports/Packages, and Completeness/Audit/Signatures).
   - **Part 5: Working with an AI Agent (MCP)** (`Chapters 17–21`: Connecting an Agent, Reading/Auditing via MCP, Study B XRR Fitting, Drafting Trees/Hypotheses/Series/Wikis, and Importing Legacy Folders).
   - **Part 6: The Part of Tens** (`Chapters 22–24`: Ten Mistakes, Ten Checks, Ten Things an Agent Can and Cannot Do).
3. Update all affected chapters, figures, appendices (`NOTATION.md`, `OUTLINE.md`, `STATUS.md`, `ch1`, `ch3`, `ch15`, `ch18`, `ch20`, `ch21`, `appendix-a`, `appendix-c`, `appendix-e`, `src/pages/assignment.mdx`, `public/ELN-Cheat-Sheet.pdf`, `public/ELN-Mandatory-Assignment.pdf`) and pass all web and PDF verification gates.

### Non-Goals
- Do not add signal-to-noise (S/N) ratio formulas or ANOVA tables to the ELN Series instructions; `Series.html` explicitly notes: *"The level means do not include signal-to-noise ratios or an analysis of variance."* Explain why level means and $\Delta$ ranking are used for laboratory screening and direct readers to OriginLab/Python export when ANOVA is needed.
- Do not alter the Study A (`261015A`) or Study B (`261014B`) raw `.zip` data packages.

### Anti-Goals
- Never violate `STYLE.md §4` (conversational second-person register in chapters, reference register in appendices, $\le 30$ words per sentence, one main clause per sentence, zero em-dashes, zero antithesis or stock evaluation words, and zero raw computer e-notation in prose or tables).
- Never conflate Community's local self-review labels (`Draft`, `Start`, `Open`, `Close with conclusion`, `Closed`) with Commercial's multi-user approval gates (`Proposed`, `Approve`, `Approved`, `Submit conclusion`, `In review`, `Accept`, `Accepted`); always present both clearly using `<InTeamLab>` where team governance applies.

## 3. Approaches Considered

1. **Approach 1: 2-chapter Part 3 (Hypotheses + combined Theory/GUI Series chapter).**
   - *Tradeoff:* Keeps the chapter count at 23, but crowds the general experiment-planning and Taguchi DOE background into the same chapter as the step-by-step **Project > Series...** GUI walkthrough.
2. **Approach 2 (Chosen by Author): 3-chapter Part 3 (`Ch 10` Principles of Experiment Planning & Taguchi DOE, `Ch 11` The Hypothesis Tree and Evidence, `Ch 12` Experiment Series and Taguchi Arrays in ELN).**
   - *Pros:* Gives students a dedicated conceptual chapter on *why* and *how* to plan experiments (from formulating a falsifiable hypothesis to choosing between 1-factor sweeps, Full Grids, and Taguchi orthogonal arrays `L4`–`L27`) before walking through the **Hypotheses** window (`Ch 11`) and the **Series** window (`Ch 12`).
   - *Tradeoffs:* Shifts subsequent chapter numbers by +2 (`Ch 11–22` become `Ch 13–24`) and Part numbers by +1 (`Parts 3–5` become `Parts 4–6`).
3. **Approach 3: Place Experiment Planning as Part 4 after Search, Reports, and Signatures.**
   - *Tradeoff:* Rejected because students should learn how to plan experiments *before* learning how to export final PDF reports and sign completed records.

## 4. Detailed Part and Chapter Design

### Part Structure (`src/lib/parts.ts`)

```ts
export const PART_KEYS = ['front', '1', '2', '3', '4', '5', '6', 'back'] as const;

export const PARTS: Part[] = [
  { key: 'front', name: 'Front Matter', numbered: false },
  { key: '1', name: 'Getting Started', numbered: true },
  { key: '2', name: 'Recording Daily Lab Work', numbered: true },
  { key: '3', name: 'Experiment Planning with ELN', numbered: true },
  { key: '4', name: 'Organizing, Searching, and Reviewing', numbered: true },
  { key: '5', name: 'Working with an AI Agent (MCP)', numbered: true },
  { key: '6', name: 'The Part of Tens', numbered: true },
  { key: 'back', name: 'Appendices', numbered: false },
];
```

### Chapter 10: Principles of Experiment Planning and the Taguchi Method (`ch10-principles-of-experiment-planning.mdx`)
- **Frontmatter:** `part: '3'`, `number: '10'`, `order: 100`
- **In This Chapter:**
  - `Seeing why unplanned trial-and-error runs waste laboratory time and samples`
  - `Connecting a testable scientific hypothesis to a structured experiment series`
  - `Choosing between one-factor sweeps, full factorial grids, and Taguchi orthogonal arrays`
  - `Using level means, Delta effect sizes, and factor ranks to find dominant parameters`
- **Section 1: `## Why unplanned experiments fail in the laboratory`**
  - Explain the four traps students hit when they run depositions without a written plan:
    1. **Changing two knobs at once:** adjusting both bias voltage and working pressure between runs makes it impossible to tell which change improved hardness.
    2. **Silent baseline drift:** forgetting to specify fixed conditions (such as target-to-substrate distance or base pressure) lets unrecorded changes masquerade as effects.
    3. **Orphan runs:** six months later, thirty `Deposition` items sit in a folder with no record of which question they tested or why run 7 was abandoned.
    4. **Combinatorial explosion:** testing 4 sputtering parameters at 3 levels each by brute force requires $3^4 = 81$ depositions and 81 sets of profilometry, indentation, and tribology measurements.
  - Explain how APS ELN solves this with two linked tools that open in their own windows: **Hypotheses** (**Project > Hypotheses**, why you expect an effect) and **Experiment Series** (**Project > Series...**, the exact matrix of factors, fixed conditions, and responses).
- **Section 2: `## Factors, levels, fixed conditions, and responses`**
  - Define the four building blocks of every experiment plan in plain student language, grounded in magnetron sputtering and tribology:
    - **Factors:** the 1 to 7 controlled input parameters (`Condition` value types) you intentionally vary across the series, such as magnetron `Power`, substrate `Bias`, working `Pressure`, or layer deposition `Time` (with a `Label` such as `Mo layer` or `Si layer` when two factors share the same value type).
    - **Levels:** the specific numeric setpoints tested for each factor (for example, $100\,\text{W}$, $200\,\text{W}$, and $300\,\text{W}$).
    - **Fixed conditions:** the input parameters held constant across every run in the series (with an optional tolerance), such as $0.4\,\text{Pa}$ argon pressure or $60\,\text{min}$ annealing time.
    - **Responses:** the output quantities (`Result` value types) measured on every sample to evaluate the outcome, such as film `Thickness` ($d$), `Hardness` ($H_{\text{IT}}$), `Wear rate` ($K$), or multilayer `Period` ($D$).
- **Section 3: `## Sweeps, full grids, and Taguchi orthogonal arrays`**
  - Compare the three ways to generate plan points (<a href="#fig-10-1">Figure 10-1</a> and <a href="#table-10-1">Table 10-1</a>):
    1. **One-factor sweep (1 factor):** vary one factor across $m$ levels while holding all other parameters fixed. Simple and direct for calibrating a single rate or threshold, but misses how parameters behave across different regimes.
    2. **Full factorial grid (`Full grid`, 1 to 3 factors, up to 27 points):** test every combination of levels (for example, $3 \times 3 = 9$ runs for 2 factors at 3 levels, or $3 \times 3 \times 3 = 27$ runs for 3 factors at 3 levels). Maps pairs of factors completely, but grows as $m^k$ (4 factors at 3 levels would require 81 runs, so APS ELN caps **Full grid** at 3 factors and 27 points).
    3. **Taguchi orthogonal array (`Taguchi orthogonal array`, 2 to 7 factors):** uses a balanced fractional matrix (`L4`, `L8`, `L9`, `L16`, `L18`, or `L27`) where each row is one deposition and each column is one factor.
  - Explain **what makes an array orthogonal** with a concrete 4-factor, 3-level sputtering example in `L9` (`Power`, `Bias`, `Pressure`, `N2 flow`, each at Low / Medium / High):
    - In the 9 rows of `L9`, each level (`1`, `2`, `3`) of every factor appears **3 times**.
    - For any two factors, every possible pair of levels (`(1,1)`, `(1,2)`, `(1,3)`, `(2,1)`, ..., `(3,3)`) appears **exactly once**.
    - Because the other three factors cycle through all three of their levels equally inside each level of Factor A, their main effects cancel out when you average the response at `A = 1`, `A = 2`, and `A = 3`. You screen 4 factors in **9 depositions instead of 81** (or up to 7 three-level factors in **27 depositions** with `L27` instead of $3^7 = 2{,}187$).
  - Include **Figure 10-1 (`fig-10-1-planning-designs.svg`):** visual comparison of a 1-Factor Sweep (3 points), a 2-Factor Full Grid ($3 \times 3 = 9$ points), and a 4-Factor Taguchi `L9` Orthogonal Array (9 balanced points out of 81), plus the Level-Means $\Delta$ ranking chart.
  - Include **Table 10-1:** *All six Taguchi orthogonal arrays built into APS ELN (`L4`, `L8`, `L9`, `L16`, `L18`, `L27`), their factor counts, level counts, run counts, and full-grid equivalents.*
  - Include **Table 10-2:** *Worked `L9` orthogonal array for a 4-factor reactive sputtering study (showing all 9 rows and how pairs of levels balance).*
- **Section 4: `## Reading main effects: level means, Delta, and factor rank`**
  - Explain the mathematics of **Level means (Taguchi)** step by step:
    - For a chosen factor $X$ and response $Y$, the **level mean** $\bar{Y}_{X=L}$ is the arithmetic mean of the measured response across all runs at planned level $L$:
      $$\bar{Y}_{X=L} = \frac{1}{n_L} \sum_{i=1}^{n_L} Y_i$$
    - When $n_L \ge 2$ runs share that level, the vertical error bar on the level-means plot is the sample standard deviation:
      $$s_L = \sqrt{\frac{1}{n_L - 1} \sum_{i=1}^{n_L} \left(Y_i - \bar{Y}_{X=L}\right)^2}$$
      (When only $n_L = 1$ run is present at a level, ELN uses that single measurement's stored tolerance.)
    - The **effect range ($\Delta$)** of factor $X$ is the difference between its highest and lowest level means:
      $$\Delta_X = \max_L \left(\bar{Y}_{X=L}\right) - \min_L \left(\bar{Y}_{X=L}\right)$$
    - **Factor rank (`rank 1 of k`):** APS ELN computes $\Delta$ for every factor in the plan and ranks them from largest to smallest. **Rank 1** is the factor with the largest $\Delta$: the knob that moves the response the most across its tested range.
  - `<Remember>` Explain why deviated runs (where the actual deposition setpoint missed the planned level by more than tolerance) and unconfirmed `planned` values must be left out of level means: a deviated setpoint breaks the orthogonal balance of the array.
  - `<GoingDeeper title="when Taguchi screening is enough and when to run a follow-up grid">` State the assumptions clearly: Taguchi orthogonal arrays estimate main effects efficiently when two-factor interactions are small compared to main effects, and APS ELN's level-means view does not compute signal-to-noise (S/N) ratios or ANOVA. Once `L9` or `L18` identifies the Rank 1 and Rank 2 factors, you can propose a follow-up hypothesis and run a focused 2-factor **Full grid** (or export the table to OriginLab) to map curvature and interaction between those top two factors.

### Chapter 11: The Hypothesis Tree and Evidence (`ch11-the-hypothesis-tree-and-evidence.mdx`)
- **Frontmatter:** `part: '3'`, `number: '11'`, `order: 110`
- **In This Chapter:**
  - `Opening the standalone Hypotheses window and proposing a root or follow-up hypothesis`
  - `Comparing the Community self-review workflow with Commercial two-gate supervisor review`
  - `Attaching experimental Runs and References, promoting a Reference with Make run, and citing Evidence`
  - `Closing or accepting a conclusion and verifying the cryptographic content seal`
- **Updates to existing content (formerly Chapter 10):**
  - Explain that **Project > Hypotheses** opens in a **separate top-level window** with its own taskbar button and remembered size and position, staying open while you work in the main window. Note that read-only proposal and conclusion text boxes are tinted with the row's status color.
  - Document both editions accurately (`Hypotheses.html` and `Experiments.html`):
    - **APS ELN Community (local self-review):** `Draft` (`Proposed`) $\rightarrow$ click **Start** to open (or **Discard** with an optional reason) $\rightarrow$ `Open` (`Approved`) $\rightarrow$ on the **Conclusion** tab, enter **What we found**, choose **Supported**, **Refuted**, or **Inconclusive** under **Outcome**, and click **Close with conclusion** (or click **Close** if an MCP agent submitted the conclusion to `Open · conclusion ready`) $\rightarrow$ `Closed · Supported`, `Closed · Refuted`, or `Closed · Inconclusive` (`Accepted`). Clicking **Edit conclusion** returns a closed hypothesis to `Open`.
    - **APS ELN ("For Teams") (`<InTeamLab>`):** `Proposed` $\rightarrow$ reviewer clicks **Approve** or **Reject** (comment required) $\rightarrow$ `Approved` (showing `Approved · no runs yet`, `Approved · no evidence yet`, or `Approved · evidence in`) $\rightarrow$ **Submit conclusion** $\rightarrow$ `In review` $\rightarrow$ reviewer clicks **Accept** or **Return for more work** $\rightarrow$ `Accepted`.
  - Document **Make run** on the **Runs** tab (converting an attached `Reference` from the same project into a `Run` once the hypothesis is `Open` / `Approved`).
  - Document the interaction with **Experiment Series**: `Planned` values on a series procedure are excluded from the headline key-value summary, cannot be cited as evidence (`planned_value`), and block **Close** / **Accept** if an already-cited value is still `Planned`.
  - Update **Table 11-1** to show the MCP JSON status name, the Community label, the Commercial label, and what happens at each stage.
  - Update **Figure 11-1 (`fig-11-1-hypothesis-lifecycle.svg`)** and **Figure 11-2 (`fig-11-2-hypotheses-view.png`)**.

### Chapter 12: Experiment Series and Taguchi Arrays in ELN (`ch12-experiment-series-and-taguchi-arrays.mdx`)
- **Frontmatter:** `part: '3'`, `number: '12'`, `order: 120`
- **In This Chapter:**
  - `Planning a 1-to-7-factor Experiment Series in the standalone Series window`
  - `Generating points with Full grid, Taguchi orthogonal arrays (L4 to L27), or manual points`
  - `Making or linking depositions, confirming planned values, and handling failed runs`
  - `Analyzing sweeps and Level means (Taguchi) on the Plot tab and exporting to OriginLab`
- **Section 1: `## Planning a series in the Series window`**
  - Opening **Project > Series...** in its separate top-level window (with its own taskbar button that stays open beside the main window).
  - Numbered steps for **New series...** (`dlg_SeriesPlan`):
    1. Enter **Title**, **Purpose - what this series tests**, and select **Target folder**.
    2. Under **Factors - parameters you vary (up to 7)**, click **Add...** for each factor (`1` to `7`). Pick **Category** and **Value type**, enter an optional **Label** (such as `Mo layer`, shown in brackets in headers as `Time (Mo layer), s`), optional range minimum/maximum, and semicolon-separated **Levels** (with inline unit conversion, such as `2 mTorr` converted automatically to $\text{Pa}$).
    3. Under **Point generation**, select **Full grid** (1 to 3 factors, $\le 27$ points), **Taguchi orthogonal array** (`L4`, `L8`, `L9`, `L16`, `L18`, `L27`, selected automatically when you add a 3rd factor), or **No initial points**. Note how 1–2 factors show the **Levels** boxes directly, while 3–7 factors edit levels via **Edit...** on the factor row and display the chosen array above the list (for example, `Taguchi L9: 9 points.`).
    4. Under **Fixed conditions**, click **Add...** for each constant parameter (with optional label, value, and tolerance; offset units like `°C` are refused for tolerances on a `K` value type).
    5. Under **Responses**, click **Add...** for each result value type (`TEST_RESULT`) you will measure on every point.
    6. Click **OK**. Explain **Active** vs. **Draft** status (MCP `create_series` starts as `Draft` until you click **Start**), **Edit plan...** (and why changing factors requires removing points first, while factor labels can always be edited), **Add point...** (`added` points), **Close**, and **Abandon...**.
  - Include **Figure 12-1 (`fig-12-1-series-taguchi-workflow.svg`):** end-to-end diagram of the Series workflow (Plan Dialog with Full Grid / Taguchi `L9` $\rightarrow$ `Make deposition...` & `Confirm planned values` $\rightarrow$ Series Table $\rightarrow$ `Level means (Taguchi)` Plot with $\Delta$ and Rank $\rightarrow$ OriginLab CSV export).
- **Section 2: `## Making or linking depositions and confirming planned values`**
  - Creating runs from the plan: double-clicking a `planned` row or choosing **Make deposition...** (pre-filled title, `Synthesis`, previous action type and equipment, writing factor levels and fixed conditions with source kind `Planned` in grey italic).
  - Linking existing runs: **Link existing deposition...** from a `planned` row, or selecting one or more procedures in the main window's **Items** panel and choosing **Link to plan point...** (automatic matching within tolerance, `item -> 200 W`, `item -> new point 250 W` with **Add new points for depositions that match no point**).
  - Confirming setpoints: right-clicking a row (or using the **Item** menu) and choosing **Confirm planned values** once the deposition succeeds, or editing the value on the procedure if the real setpoint differed. Explain the warning icon (`Differs from the plan (planned value)`) when a factor or fixed condition misses the plan beyond tolerance.
  - Handling failed attempts: **Mark failed...** with a reason (returning the slot to `planned` for a retry), **Show failed**, **Unlink deposition**, and **Unlink excluded** (when linked items were moved to the Recycle Bin or another project).
- **Section 3: `## Reading the Series Table and setting column roles`**
  - Columns on the **Table** tab: **Point** (levels with units, or `added`), **State** (`planned`, `deposited`, `measured`, `failed`), condition columns, and method-specific result columns (such as `Thickness (XRR)` vs. `Thickness (3D Profiling)`, never averaged across methods).
  - Cell displays: `value ± tol`, `—` (missing), and the multi-value warning icon when the same method produced multiple values on different specimens (left unplotted until resolved).
  - Right-clicking any column header to set its role: **Shown**, **Hidden**, **Varied**, or **Response**; double-clicking any cell to jump to the item in the main window.
  - Include **Table 12-1:** *Row states, cell warnings, column roles, and context-menu commands in **Project > Series...**.*
- **Section 4: `## Plotting sweeps, Taguchi level means, and exporting to OriginLab`**
  - Using the **Plot** tab for standard sweeps: choosing **X (condition)**, ticking **Y (results)**, optional **Group by (condition)** (up to 8 curves), and **Linear trend**.
  - Ticking **Level means (Taguchi)** when **X (condition)** is a plan factor:
    - How ELN plots the mean response at each planned level of $X$ with sample SD error bars ($n \ge 2$) or single-value tolerance ($n = 1$).
    - Reading the diagnostic note below the result list: `Delta = 10 nm (rank 1 of 3)`, `n point(s) wait for confirmed values.`, and `n point(s) differ from the plan and are left out of level means.`
  - Exporting to OriginLab or Python: **Copy table** (tab-separated clipboard) and **Save CSV...** (Row 1 names, Row 2 units, adjacent `±` tolerance columns for error bars, omitting `Hidden` columns and `planned` rows/values).

### Downstream Renumbering and Sync Map (`Chapters 13–24`)

| New Chapter | New File (`src/content/chapters/`) | Old Chapter / File | Key Updates |
|---|---|---|---|
| **Ch 13** (Part 4) | `ch13-project-wiki-notes-tags-and-links.mdx` | Ch 11 (`ch11-...`) | Shift number/order (`13`, `130`), figure `fig-13-1`, Table `13-1`, cross-references. |
| **Ch 14** (Part 4) | `ch14-full-text-panel-and-semantic-search.mdx` | Ch 12 (`ch12-...`) | Shift number/order (`14`, `140`), figures `fig-14-1` & `fig-14-2`, Table `14-1`, cross-references. |
| **Ch 15** (Part 4) | `ch15-charts-correlations-and-pdf-reports.mdx` | Ch 13 (`ch13-...`) | Retitle to `Cross-Project Charts, PDF Reports, and Packages`; remove Section 1 (now expanded into Ch 12) and link to Ch 12; renumber `fig-15-1` and `Table 15-1`. |
| **Ch 16** (Part 4) | `ch16-completeness-audit-and-signatures.mdx` | Ch 14 (`ch14-...`) | Shift number/order (`16`, `160`), figure `fig-16-1`, Table `16-1`, cross-references. |
| **Ch 17** (Part 5) | `ch17-connecting-an-ai-agent-to-your-notebook.mdx` | Ch 15 (`ch15-...`) | Shift number/order (`17`, `170`), figure `fig-17-1`, Table `17-1`, cross-references. |
| **Ch 18** (Part 5) | `ch18-reading-data-and-auditing-drift-via-mcp.mdx` | Ch 16 (`ch16-...`) | Shift number/order (`18`, `180`), figure `fig-18-1`, Table `18-1`, cross-references. |
| **Ch 19** (Part 5) | `ch19-study-b-xrr-fitting-with-provenance.mdx` | Ch 17 (`ch17-...`) | Shift number/order (`19`, `190`), figures `fig-19-1` & `fig-19-2`, Table `19-1`, cross-references. |
| **Ch 20** (Part 5) | `ch20-drafting-trees-hypotheses-and-wikis.mdx` | Ch 18 (`ch18-...`) | Shift number/order (`20`, `200`), figure `fig-20-1`, Table `20-1`; document `create_series` / `update_series_plan` `levels`, `design: "grid" \| "taguchi" \| "manual"`, `point_count`, `taguchi_array`, and Community (`Open · conclusion ready`) vs. Commercial (`In review`) MCP hypothesis states. |
| **Ch 21** (Part 5) | `ch21-importing-legacy-folders-with-an-ai-agent.mdx` | Ch 19 (`ch19-...`) | Shift number/order (`21`, `210`), figure `fig-21-1`, Tables `21-1` & `21-2`, cross-references. |
| **Ch 22** (Part 6) | `ch22-ten-mistakes-that-break-your-data-trail.mdx` | Ch 20 (`ch20-...`) | Shift number/order (`22`, `220`), cross-references. |
| **Ch 23** (Part 6) | `ch23-ten-checks-before-you-sign-or-submit.mdx` | Ch 21 (`ch21-...`) | Shift number/order (`23`, `230`), cross-references. |
| **Ch 24** (Part 6) | `ch24-ten-things-an-agent-can-and-cannot-do.mdx` | Ch 22 (`ch22-...`) | Shift number/order (`24`, `240`), cross-references (note Taguchi series drafting and Community `Start`/`Close` vs. Commercial `Approve`/`Accept`). |

## 5. What Is Left to the Builder

1. Update `OUTLINE.md` and `NOTATION.md` (adding **Taguchi orthogonal array** `L4`–`L27`, **Level means (Taguchi)**, $\Delta$, **Rank**, and Community vs. Commercial hypothesis status labels).
2. Update `src/lib/parts.ts`, `src/lib/parts.test.ts`, and `e2e/smoke.spec.ts` for the 6-Part structure.
3. Draft `ch10-principles-of-experiment-planning.mdx`, `ch11-the-hypothesis-tree-and-evidence.mdx`, and `ch12-experiment-series-and-taguchi-arrays.mdx`, create `fig-10-1-planning-designs.svg` and `fig-12-1-series-taguchi-workflow.svg`, and update `fig-11-1-hypothesis-lifecycle.svg`.
4. Rename `ch11`..`ch22` to `ch13`..`ch24`, rename `fig-11-1`..`fig-19-1` to `fig-13-1`..`fig-21-1`, trim Section 1 of `ch15-charts-correlations-and-pdf-reports.mdx`, and update all internal links across `src/content/chapters/*.mdx`, `src/pages/assignment.mdx`, `public/ELN-Cheat-Sheet.pdf`, and `public/ELN-Mandatory-Assignment.pdf`.
5. Run all verification gates (`npm test`, `npm run test:py`, `npm run build`, `npm run check:links`, `npm run check:markers`, `pdf:render`, `pdf:assemble`, `pdf:verify`) and update `STATUS.md`.

## 6. Builder Calls and Migration Details

1. **Sequential backwards file migration (`ch22` -> `ch24` down to `ch10` -> `ch11`):** Rename chapters and figures from highest number down (`ch22` -> `ch24`, `ch21` -> `ch23`, ..., `ch11` -> `ch13`, `ch10` -> `ch11`) so no filename collides mid-step, then update all internal `/MasteringELN/ch...` links across `src/` and verify with `npm run check:links`.
2. **Part 4 title (`Organizing, Searching, and Reviewing`):** Because Hypotheses and Experiment Planning now have their own dedicated Part 3, Part 4 (which holds Wiki/Tags/Links, Search, Cross-Project Charts/Reports, and Completeness/Signatures) is named `Organizing, Searching, and Reviewing`.
3. **Figures and screenshots:** Create vector SVGs `fig-10-1-planning-designs.svg` and `fig-12-1-series-taguchi-workflow.svg`, update `fig-11-1-hypothesis-lifecycle.svg` (moved from `fig-10-1-hypothesis-lifecycle.svg`), and rename `fig-10-2-hypotheses-view.png` to `fig-11-2-hypotheses-view.png` with updated captions so zero `[SCREENSHOT NEEDED]` markers are introduced.
4. **Standalone PDFs (`public/ELN-Cheat-Sheet.pdf` and `public/ELN-Mandatory-Assignment.pdf`):** Update chapter numbers and clickable URL annotations (`ch15` -> `ch17`, `ch17` -> `ch19`, `ch20`/`ch21` -> `ch23`, plus the Series/Taguchi row on the cheat sheet) programmatically via PyMuPDF / ReportLab so they stay in sync with the 24-chapter layout.
