# Mastering ELN

A practical textbook on recording, tracing, and analyzing laboratory data in **APS ELN**, from building your first sample hierarchy (`Procedure -> Specimen -> Action`) to extracting values with file and reader provenance, testing hypotheses, and working with an AI agent through the Model Context Protocol (MCP).

The book is built around **APS ELN Community** and **APS ELN ("For Teams")**. Its provenance workflow and demonstration studies (`261015A` BN/DLC tribology coating and `261014B` Co/C X-ray multilayer mirror) are described in *Value-level data provenance in an electronic laboratory notebook used by humans and language-model agents: An experience report*, [arXiv:2610.27859](https://arxiv.org/abs/2610.27859).

## What is in this repository

- `src/content/chapters/`: the chapters, one MDX file each. This is the only source of the text.
- `src/components/`, `src/layouts/`, `src/lib/`: the Astro 7 site, the six callout icons (`Tip`, `Remember`, `Warning`, `GoingDeeper`, `InELN`, `InTeamLab`), and their unit tests.
- `public/figures/`: the SVG and PNG figures shown in the book.
- `public/data/`: the downloadable Study A (`261015A`) and Study B (`261014B`) demonstration files.
- `pdf-build/`: the print edition renderer, assembler, and verifier.

## Build the web edition

Node 20.19 or newer.

```sh
npm ci
npm run dev            # http://localhost:4341/MasteringELN/
npm test               # Vitest unit tests
npm run test:py        # Python PDF pipeline unit tests
npm run build          # static site in dist/
npm run check:links    # every internal link, #fragment, and number format in dist/
npm run check:markers  # release gate for unresolved placeholders
```

## Build the PDF

With `npm run preview` running (Python 3 with PyMuPDF, pypdf, and BeautifulSoup, plus Playwright Chromium):

```sh
npm run pdf:render
npm run pdf:assemble
npm run pdf:verify
```

`pdf-build/README.md` describes the stages and verification gates.

## Licence

The text, figures, and demonstration data are under [CC BY 4.0](LICENSE-CONTENT.md); the code is under the [MIT licence](LICENSE).
