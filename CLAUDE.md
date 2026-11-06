# CLAUDE.md

This file provides guidance to Claude Code and coding agents when working in this repository.

## What this is

A textbook on **how to record, trace, and analyze laboratory data in APS ELN**, from creating your first sample tree to extracting provenance-backed values and working with an AI assistant through the Model Context Protocol (MCP). It teaches by doing in the Desktop GUI and the MCP server, using two real laboratory studies (**Study A**, `BN-DLC` sample `261015A`, and **Study B**, `Co/C` multilayer sample `261014B`).

The project started on 2026-11-02. Both the Astro 7 web stack and the Playwright/PyMuPDF PDF pipeline are in place.

## Commands

- `npm run dev` / `npm run build` / `npm run preview`: the site, served at `http://localhost:4341/MasteringELN/`. The base path, port, and title live only in `src/lib/site.mjs`. Port 4341 is used so it never collides with the Vacuum books (4321) or Mastering XRR Fitting (4331).
- `npm test`: Vitest (`src/**/*.test.ts`, `scripts/**/*.test.mjs`, `pdf-build/**/*.test.mjs`).
- `npm run test:py`: pytest (`pdf-build/test_*.py`).
- `npm run test:e2e`: Playwright (`e2e/smoke.spec.ts`). Builds and previews automatically.
- `npm run check:links`: run after `npm run build`. Checks every internal link and `#fragment`, no literal `$$`, and no e-notation in `dist/`.
- `npm run check:markers`: the release gate. Fails while any `[NUMBER NEEDED]` or `[SCREENSHOT NEEDED]` marker remains.
- **PDF:** with `npm run preview` running, run `npm run pdf:render`, then `npm run pdf:assemble`, then `npm run pdf:verify`. Set `PYTHONIOENCODING=utf-8` for the Python steps.
- `/sampler/` (`src/pages/sampler.mdx`) renders every component once: the six callout icons, math, a figure, a table, and the print/web blocks. It is not part of the book.

## Site architecture

- **Chapters** are `src/content/chapters/*.mdx`, validated in `src/content.config.ts` (`title`, `part`, `number`, `order`, `inThisChapter`).
- **Part names** live only in `src/lib/parts.ts`.
- **The six callout icons** are `src/components/textbook/{Tip,Remember,Warning,GoingDeeper,InELN,InTeamLab}.astro`, thin wrappers over `Callout.astro`. The set is closed at six.
- **The Markdown pipeline** in `astro.config.mjs` runs `remark-math`, `remark-directive`, `remark-output-directives.mjs`, `rehype-katex`, and `rehype-collapse-sources.mjs`.

## Settled by the author (2026-11-02)

- **Title:** `Mastering ELN` (subtitle: `Recording, Tracing, and Analyzing Laboratory Data with APS ELN and AI Agents`). Never use "For Dummies" in the title, headings, or cover (Wiley trademark).
- **Edition arrangement:** One unified student textbook teaching the shared scientific workflow once, with `<InTeamLab>` callouts where the Commercial ("For Teams") edition adds server login, user roles, mobile QR protocol entry, or supervisor review gates. IT and server administration are excluded.
- **Running examples:** Study A (`tribo_study`, sample `261015A`, BN/DLC coating) and Study B (`xrr_study`, sample `261014B`, Co/C multilayer X-ray mirror) from `D:\MultilayerLab\Papers\ELN-Software-Paper\zenodo\demonstration\`.
- **Source hierarchy (`Code > Help > Paper`):**
  1. Delphi source in `D:\APS\ELN\APS-ELN-Community\` and `D:\APS\ELN\APS-ELN-Commercial\` (read-only).
  2. Built-in HTML Help in `APS-ELN-Community\ELN.Desktop\Assets\Runtime\Help\` and `APS-ELN-Commercial\ELN.Desktop\Assets\Runtime\Help\` (read-only).
  3. Experience report and Zenodo deposit in `D:\MultilayerLab\Papers\ELN-Software-Paper\` (`arXiv:2610.27859`, read-only).

## Canonical files: read these first, every session

`STYLE.md` (voice, structure, six icons, formatting), `NOTATION.md` (terms, levels, value sources, units, file extensions), `OUTLINE.md` (chapters, objectives, section outlines), and `STATUS.md` (what is drafted, what is open). They win over any draft.
