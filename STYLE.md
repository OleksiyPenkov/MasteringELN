# STYLE: voice, level, and formatting

_Canonical file. Written 2026-11-02. It wins over any draft that disagrees with it, unless the author changes it. Terms, units, and file types are in `NOTATION.md`. The chapter plan is in `OUTLINE.md`._

## 1. The reader

A graduate student or engineer who is recording experiments, samples, measurements, and analyses in APS ELN. They know their own laboratory instruments (sputtering, profilometry, nanoindentation, tribometry, X-ray diffraction and reflectivity, microscopy), and they want their notebook records to be complete, searchable, and traceable months later. **Many of them read English as a second language.** Keep the technical and program vocabulary exact (*procedure*, *specimen*, *action*, *protocol*, *provenance*, *tolerance*, *reader*, *hypothesis*). Remove idioms, phrasal verbs, and long sentences with nested asides.

## 2. Register

**Chapters, the Introduction, and the Part of Tens** use the conversational voice:
- **Second person:** "you". The book talks to one student who is recording an experiment in ELN.
- **Present tense and the imperative** for anything the reader does: "Select the `Deposition 261015A` procedure in the item tree. Choose **Item > New Specimen**."
- **Contractions** (you'll, it's, don't). They are natural and easy for non-native readers.
- **Reason before fields.** Explain what link in the data trail a step protects before listing the dialog controls. Put schema, hashing, or formula details in a **Going Deeper** box when the step can be done without them.

**Appendices** (icons, viewer formats, value types and formulas, keyboard shortcuts, glossary) use the reference register: no contractions, and second person only for an instruction. Do not make a chapter formal to match an appendix, or add contractions to an appendix.

### The rule that outranks the rest

**Plain must not become bland.** Formal, hedged, evenly weighted prose is the most machine-sounding register there is. Every rule in Section 4 removes a device. None of them adds formality, hedging, or connecting phrases. A shorter sentence that says the same thing is always the right edit.

## 3. The book's structure

- **Introduction** with these five sections in order: `About This Book` · `Foolish Assumptions` · `Icons Used in This Book` · `Beyond the Book` · `Where to Go from Here`.
- **Parts**, each opening with a short description on the home and Contents pages.
- **Each chapter opens with an "In This Chapter" list** of 3–5 items, taken from the chapter's learning objectives in `OUTLINE.md`. Each item is a plain gerund phrase, for example "Creating a procedure, specimen, and action tree".
- **Each chapter works on its own.** A reader may arrive from search or the Contents page. When a chapter depends on another, it says so in one sentence with a link that includes the target `#fragment` anchor. It does not repeat the earlier chapter.
- **Sections are short, with frequent headings.** A heading says what the section does ("Extracting values from multiple files"). Headings may be questions ("Why did my value turn into Manual?"), which is the one place a question is allowed (Section 4.2).
- **GUI procedures are numbered steps**, one action per step. A step that needs an explanation gets it in a sentence after the action.
- **No chapter summary at the end.** Each chapter ends with its `## Sources` section (Section 7).
- **Part of Tens:** each chapter is ten numbered level-2 headings (`## 1. ...` through `## 10. ...`), each with one to three short paragraphs.

### Icons (callouts)

The book uses its own names and SVG art. Never copy Wiley's icon designs. The set is closed at six:

| Icon | Component | Use it for | Never use it for |
|---|---|---|---|
| **Tip** | `<Tip>` | A shortcut or faster way to do a step in ELN | Something the reader must do: that goes in the numbered steps |
| **Remember** | `<Remember>` | A rule the reader will need again in later chapters | Repeating the paragraph right above it |
| **Warning** | `<Warning>` | A mistake that loses data, breaks a provenance link, or stores a wrong number without an error message | Ordinary advice |
| **Going Deeper** | `<GoingDeeper>` | Data model internals, MD5/SHA-256 hashing, derived-value formulas, or ONNX search internals that the reader can skip | Anything needed to complete the GUI step |
| **In ELN** | `<InELN>` | The exact menu path, toolbar button, dialog name, and field in the Desktop program | Long multi-step procedures: those are numbered steps in the main text |
| **In a Team Lab** | `<InTeamLab>` | How the step works in the Commercial ("For Teams") edition when connected to a shared laboratory server (login, roles, mobile QR protocols, supervisor review gates) | Shared features that work the same way in Community and Commercial |

Aim for one or two icons per page. A page covered in callout boxes has no main text left.

## 4. Language rules

### 4.1 Plain language

1. **Idioms and figurative words -> plain words.** "the catch is" -> "the problem is". "a rule of thumb" -> "a simple rule". "out of the box" -> "by default".
2. **Keep analogies universal.** Remove sport, country, and culture references. Use metric quantities.
3. **Split sentences over about 30 words** at the natural clause boundary.
4. **Phrasal verbs -> single verbs** where a plain one exists ("figure out" -> "find", "leave out" -> "omit"). Program vocabulary stays: "log in", "set up", "back up", "check out".
5. **Complete sentences.** No verbless fragments in body prose.
6. **Common words.** Rare words go ("myriad" -> "many"), unless the word is the exact technical or domain term (*provenance*, *tribometer*, *nanoindentation*, *reflectivity*).

### 4.2 De-LLM rules

1. **No antithesis:** no "X, not Y", "not X but Y", "not just X". State the positive fact and put the second fact in its own sentence. "Rather than" and "instead of" are allowed when contrasting two concrete user actions.
2. **No rhetorical questions in body text.** Write the statement. A heading may be a question.
3. **No em-dashes.** Never use the em-dash character in any file. Use a comma, a colon, parentheses, or a full stop. The en-dash (`–`) stays for numeric ranges: `0.14–6.68°`, `Chapters 1–4`.
4. **No closing flourishes.** Do not end a section with "That's it.", "This is why...", or "And that is the whole secret."
5. **No reading-management narration.** Do not write "Here is the idea.", "In this section we will...", or "Now that we have seen...". Start directly with the content. A cross-reference stays when it gives the reader a link to follow.
6. **No signposting adverbs:** Furthermore, Moreover, Additionally, Ultimately, Overall, In conclusion, In summary, "It is worth noting", "It is important to note". Use *so*, *but*, *because*, or *then*.
7. **No stock evaluation words:** crucial, vital, essential, robust, comprehensive, seamless, leverage, harness, delve, showcase, underscore, pivotal, notably, importantly, landscape, nuanced, intricate, unveil, tapestry, "paves the way", "sheds light", "not only ... but also". State the specific consequence instead.
8. **No padded triads.** List the items that carry real facts.

### 4.3 Sentence shape

- **One main clause per sentence.**
- **Nothing tacked on after the main clause.** Do not end with ", which means ...", ", making ...", or ", leading to ...". Make the explanation the next sentence.
- **Literal verbs.** A value *is stored in* the database or *belongs to* an action. It never *lives in* it.
- **Rhythm:** aim for a median of 13–24 words per sentence, with at least one short sentence (12 words or fewer) in every paragraph of four or more sentences.

## 5. Formatting conventions for the ELN GUI

- **Menu paths** use `>` in bold: **File > New Notebook...**, **Item > New Procedure**, **Navigate > Search...**. Keep the trailing ellipsis (`...`) when the caption in the program has one.
- **Buttons, tab names, dialog titles, and field labels** are in **bold** with the exact capitalization on screen: **Extract Values**, **Values** tab, **Record type**, **Remember choices for this reader**.
- **Keyboard shortcuts** use plus signs in code or bold text: `Ctrl+F`, `Ctrl+G`, `Ctrl+D`, `Ctrl+S`, `F1`. Always state which panel has focus when a shortcut depends on focus.
- **File names, extensions, reader IDs, and MCP tool names** use inline code: `agent_tribo.sqlite`, `.depo.json`, `.fibps`, `.mit`, `.zrw`, `.xrdml`, `.xrcx`, `aps.mit`, `extract_file_key_values`.

## 6. Numbers and scientific notation

- **Never show raw computer e-notation (`3.58e-7` or `9.10E-05`) in body prose or formatted tables.** Write $3.58 \times 10^{-7}\,\text{m}$ with KaTeX or convert to the standard prefix unit shown in the UI ($358.3\,\text{nm}$), except when quoting a literal JSON/CSV tool output inside a code block. `scripts/check-links.mjs` checks `dist/` for leaked e-notation.
- **Ranges** use an en-dash with no spaces (`1–3`, `0.14–6.68°`).

## 7. Sources section

Every chapter and appendix ends with a `## Sources` section. On the web, `rehype-collapse-sources.mjs` wraps it in a collapsed `<details class="sources-section">`; in the PDF, the print renderer opens it. Each bullet names the exact Help page, Delphi unit/form, or paper section that backs the chapter's facts.
