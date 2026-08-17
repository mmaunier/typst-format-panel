# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> Français ? Voir [CHANGELOG-FR.md](CHANGELOG-FR.md).

## [Unreleased]

## [0.1.4] - 2026-08-16

Internationalization release: the side panel is now available in English and French, with automatic detection of the VSCode locale.

### Added

- **New setting `typstFormatPanel.language`** with values `"auto"` (default), `"en"`, `"fr"`.
  - `auto` follows `vscode.env.language` and falls back to `en` if the detected language is not available.
  - Changing the setting refreshes the panel instantly, no reload required.
- **`src/i18n/` directory** with:
  - `en.json` — full English dictionary (~250 keys, complete reference).
  - `fr.json` — French dictionary (complete).
  - `index.js` — loader with automatic English fallback for any missing key.
- **Adding a new language** is a drop-in operation: add `<code>.json` under `src/i18n/` and extend the enum in `package.json`.
- **All UI strings extracted** from the three tab HTML files (`format.html`, `math.html`, `template.html`) and both `commandVariants` files. Nothing is left hardcoded in a single language.
- Documentation strings translated: section titles, button labels, context menu descriptions, modal titles and field labels, "Cancel"/"Create" buttons.
- The Perso tab remains language-neutral (users write their own labels in the settings, in whatever language they prefer).

### Changed

- `commandFormatVariants.js` and `commandMathVariants.js` now use `descKey` (and `labelKey` where the label is human text rather than Typst code) instead of hardcoded French strings. Typst code labels like `*...*`, `#strong[...]`, `arrow.r.long` remain untouched.
- `webviewProvider.js` resolves i18n keys at render time and substitutes `{{t.section.key}}` placeholders in the HTML templates.
- Updated app icon (`media/icon.svg` and `media/icon.png` regenerated at 512×512).
- Extension version bumped to `0.1.4`.

### Notes

- VSCode palette commands (`Typst: Comment selection`, etc.) remain in English only. Translating them requires a separate `package.nls.<lang>.json` file (VSCode-native mechanism) and can be added later if needed.
- The `persoButtons` markdown description in `package.json` stays in English.

## [0.1.3] - 2026-08-16

First public release. Adapted from [latex-format-panel](https://github.com/mmaunier/latex-format-panel), rewritten for Typst syntax and idioms.

### Added

- **Three-tab side panel** — Formats, Math, Perso — activated on `.typ` files.
- **Auto math-mode detection** based on unescaped `$` count (line and block comments ignored). Commands cancel cleanly when they are not applicable to the current mode, without destroying the selection.
- **Left click / right click** interaction — left click inserts the default variant of a command, right click opens a context menu listing all variants.
- **Sticky panel behaviour** — once opened manually, the side panel stays visible even when the active file is not `.typ` (PDF previews, other tabs). Icon visibility uses `vscode.window.tabGroups` to detect any `.typ` tab in any group. New command `Typst: Hide the side panel` to force-hide.
- **Format tab** with the following blocks:
  - **Text**: bold, italic, underline, strike, highlight, code, smallcaps, calligraphy (`cal`).
    - `bold` and `italic` default to the markup shortcut (`*…*`, `_…_`); function forms (`#strong[…]`, `#emph[…]`) available via right-click.
    - `code` offers 5 variants: inline, block text, block Python, block Casio, block TI.
  - **Transformations**: uppercase, lowercase, capitalize (first letter of each word).
  - **Colors and sizes**: single button for each, with variants (red / blue / green / orange / gray, 8/10/12/14/18pt).
  - **Headings**: H1, H2, H3.
  - **Alignment**: left, center, right.
  - **Spacing**: `hspace` with variants (h / quad / qquad / hfill), `vspace` with variants (v / smallskip / medskip / bigskip / vfill), `pagebreak`, and a `#line` (horizontal rule) button with 7 variants (plain 1pt / plain 0.5pt / dashed 1pt / dashed 0.5pt / red 1pt / blue 1pt / gray 0.5pt).
  - **Fine-grained settings**: `#set par(…)` with 4 variants (leading, spacing, first-line-indent, justify), `#set list(…)` with 4 variants (spacing, indent, body-indent, tight).
  - **Lists**: `- Liste` (itemize) with 5 marker variants (`-`, `•`, `‣`, `★`, `▸`); `+ Liste` (enumerate) with 6 numbering variants including hierarchical `1.a.i.`, parenthesized `(1)`, bracketed `[1]` and UTF-8 circled numerals (①②③ / ❶❷❸).
  - **Tasks (taskize)**: dedicated button with 7 variants covering `#tasks2/3/4`, numbered/parenthesized labels, `columns: "auto-fit"`, and an import shortcut.
  - **Blocks**: `block` (plain / framed / colored), `box` (plain / width / framed), `quote`, `figure`, `image`.
  - **Notes and references**: `#footnote[…]`, `<label>`, `@label`.
  - **Grid / Tables**:
    - `#grid 2col`, `#grid 3col` — one-click inserts.
    - `#grid …` — modal assistant (column count, widths via equal/auto/custom, row and column gutters, default alignment).
    - `#table 2×2`, `#table 3×3` — one-click inserts.
    - `#table …` — enriched modal assistant (rows/columns, stroke style, first row bold/filled, first column bold/filled, blank top-left cell without borders, alternating row colors that skip bold or filled rows/columns).
  - **Special**: comment / uncomment.
- **Math tab** with operators, fractions/roots, comparisons, arrows (with long variants), special arrows button, math spaces, functions, delimiters and matrices, sets (ℕ ℤ 𝔻 ℚ ℝ ℂ), logic and symbols, decorations, math environments including `display()`.
- **Perso tab** — fully configurable via `typstFormatPanel.persoButtons` in VSCode settings.
- **Comment character** is `//`, with the `Typst: Comment selection` and `Typst: Uncomment selection` commands available in the palette.
- **Matrix generator** produces empty cells (`mat( , ; , )`) — no default values to erase before typing.
- **Context menu positioning** — aligned on the clicked button's left edge, clamped inside the webview, opens upward automatically when there is no room below.
- **README** and **CHANGELOG** in English and French (`README.md` / `README-FR.md`, `CHANGELOG.md` / `CHANGELOG-FR.md`).

### Removed (compared to `latex-format-panel`)

- LaTeX-specific commands with no direct Typst equivalent: `noindent`, `hbox`, `tabbing`, `tikzpicture`, `setlength`, `setcounter`, `subequations`, `displaystyle`, `multline`, `split`, `equation` (numbered), `wrapfig`.
- LaTeX commands merged into a single Typst equivalent: `emphasis`/`slanted` → `italic`; `tt` → `code`; `mathbb`/`mathcal` → dedicated buttons `bb()` / `cal()`; `tabular`/`tabularray` → `#table`; `listing` → `code` block variants; `tcolorbox` → `block` colored variant; `array` (math) exposed as its own button and as a matrix variant; `align`/`alignat`/`gather` → `align_math`; `systeme` → `cases`; `dots`/`cdots` → `dots` with variants.

[Unreleased]: https://github.com/mmaunier/typst-format-panel/compare/v0.1.4...HEAD
[0.1.4]: https://github.com/mmaunier/typst-format-panel/compare/v0.1.3...v0.1.4
[0.1.3]: https://github.com/mmaunier/typst-format-panel/releases/tag/v0.1.3
