# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> Français ? Voir [CHANGELOG-FR.md](CHANGELOG-FR.md).

## [Unreleased]

## [0.1.5] - 2026-08-18

Feedback release after real-world testing: unlocks several Format-tab commands in math mode, fixes two display bugs, and adds a batch of new layout commands (Typst functions not covered before).

### Fixed

- **Missing `<>` label** — the "label" button (between "footnote" and "@ref") rendered nothing, because its literal text `<label>` was interpreted as a stray HTML tag instead of being displayed. `webviewProvider.js` now HTML-escapes every `{{t.xxx}}` substitution; the button now correctly shows `<>` in both languages.
- **`<html lang="...">` bug** — the dedicated `{{t.__html_lang}}` placeholder was being silently consumed by the generic i18n substitution pass before its own replacement ran, leaving a literal `lang="__html_lang"` attribute. Reordered so the language attribute is resolved first.
- **Unclear generic placeholder labels** — the first `#hspace`/`#vspace` variant inserts `#h(em)` / `#v(em)` with the cursor placed before the unit (so you can type the value), but its context-menu label read `#h(1em)` / `#v(1em)`, suggesting a fixed value. Relabeled to `#h(_em)` / `#v(_em)` to make the generic/parametric nature obvious.

### Changed — dual-mode unlock (text ⟷ math)

Several Format-tab commands were unconditionally blocked in math mode even though the underlying Typst function is valid there too (content-wrapping functions remain valid content when nested inside `$ ... $`, following the same convention already used by `bold`/`italic`/`underline`/`color`). Unlocked for both modes:

- `strike`, `highlight`, `smallcaps` — now usable inside `$ ... $` (`strike($1)`, `highlight($1)`, `smallcaps($1)`).
- `fontsize` (all 5 sizes) — `text(size: ...)[...]`, same call already used by `color`.
- `box` (all 3 variants) and `block` (all 3 variants) — explicitly requested; `box(...)`/`block(...)` are valid inside math since they still just produce content.

Left untouched on purpose: structural/document-level commands (headings, lists, tasks, quote, figure, footnote, grid/table, alignment blocks) have no sensible meaning inside an inline formula, so they stay text-only.

### Added

- **Transformations**: `#super[...]`, `#sub[...]`, `#skew(ax: ...)[...]` (2 variants), `#hide[...]`, `#rotate(...)[...]` (4 angle variants: 90°, 45°, -45°, 180°).
- **Alignment**: `#move(dx:, dy:)[...]`, `#place(...)[...]` (5 position variants), `#pad(...)[...]` (all sides / horizontal / vertical).
- **Spacing**: `#colbreak()` next to `#pagebreak()`; new "special spaces" button with 7 variants (`~` non-breaking space, narrow non-breaking, thin, hair, en, punctuation, figure — via `#sym.space.*`).
- **Blocks**: `#rect[...]` (3 variants: plain / filled / rounded corners), and a generic `#[ ... ]` content-block button (handy to scope local `#set` rules, e.g. `#set par(...)`, without a `#block`-induced layout break).
- **Special**: `#line` moved here, grouped with Comment/Uncomment (see Changed below).

All new Typst function signatures (`skew`, `move`, `place`, `pad`, `rotate`, `rect`, `hide`, `colbreak`, `super`, `sub`, the `sym.space.*` family) were checked against the official Typst reference before implementation.

### Changed — reorganization

- **`#line` moved** from "Spacing" to "Special", alongside Comment/Uncomment, as requested.
- **`rotate`, `skew`, `hide` grouping** — the request asked for `super`/`sub`/`skew`/`hide` in "Transformations" AND, separately, for `rotate`/`hide` (and possibly `skew`) in "Blocks". To avoid duplicate buttons, all five (`super`, `sub`, `skew`, `hide`, `rotate`) were consolidated into "Transformations" (they're all Typst *layout transform* functions on existing content), while `#rect` — a content container like `box`, visually — was placed in "Blocks" instead. Happy to split them differently if this grouping doesn't feel right in practice.

### Added — second round of feedback (same day)

- **`scr(...)`** added next to `cal` in "Text" — `math.scr()` (script/roundhand style) is a distinct Typst function from `cal` (calligraphic), same auto-wrap-in-`$…$` behavior in text mode.
- **Visual previews on 3 buttons**: `strike` is now struck through, `highlight` has a fluorescent-yellow background, `code` uses the editor's monospace font — the CSS rules for `highlight`/`strike` already existed from the LaTeX-panel days but were never actually attached to the buttons' `class`.
- **"Left-click = 1st context-menu item" audit** — added a permanent check to `verify.js` asserting `default` always equals `variants[0].id` for every multi-variant command (Format + Math). It caught one pre-existing mismatch: `fontsize` inserted 12pt on click but listed 8pt first in its menu — variants reordered (12pt now first/default).
- **Math — "Styles and annotations"** (renamed/merged from "Decorations", per your suggestion): `widehat` gained a 2nd variant `overparen` (stretchy arc, e.g. for geometric arcs); the old `vec` (arrow/bar over a variable) was renamed `vecarrow` to free up the name; **`vec`** now maps to Typst's real `vec(...)` column-vector function, with 5 delimiter variants (parentheses/brackets/braces/bars/none); added **`op()`**, **`accent()`** (9 accent variants: tilde, dot, diaeresis, breve, grave, acute, caron, circle, macron), **`attach()`** (4 corner variants: tl/tr/bl/br), **`cancel()`** (plain + cross-out), and **`underbrace`**/**`overbrace`**, each exposing the full family of matching functions as variants (brace default, then line/bracket/paren/shell — i.e. `underline`/`underbracket`/`underparen`/`undershell` and their `over-` equivalents).
- **Math — new "Spacing" section**: a quick one-click `thin` button, the existing `math_spaces` generic button (moved here), and **`stretch()`**.
- **Math — `num()` from the `zero` package (v0.7.0 API, double-checked since the package just had a breaking release)**: plain, round-to-2-decimals, round-to-integer, and an import shortcut, added to "Functions".
- **`cases` simplified** — now inserts just `cases(  &  ,)` with the cursor in the first blank (before `&`), instead of a hardcoded "if / else" example.
- **Tighter vertical rhythm** — halved the gap between buttons, the margin below each button row, and the margin between a section title and its first row, to fit more on screen.

Note: `underset`/`overset` still use `underline`/`overline` under the hood, which — now that `attach()` is available — isn't quite the idiomatic Typst way to stack a label under/over a symbol (`attach(base, b: ...)` would be more correct). Left untouched since it wasn't part of this round's request, flagging it in case you'd like it fixed next.

### Fixed — third round of feedback (same day)

- **`accent(..., tilde)` rendered incorrectly** — the bare word `tilde` was being passed as the accent value. Per the official Typst doc's own worked example (`$tilde(a) = accent(a, \u{0303})$`), it now inserts the combining tilde codepoint `\u{0303}` instead. The context-menu label was updated to `accent(x, ~)` to stay readable.
- **`accent(..., grave)` — same class of bug, fixed proactively.** You didn't flag this one, but the same official example writes the grave case as `` $grave(a) = accent(a, `)$ `` (literal backtick) rather than the word `grave`, exactly mirroring the tilde issue. Applied the same fix by analogy — worth a quick visual check on your end since it wasn't explicitly tested.
- **`subset.not` and `exists.not` were missing** — both commands only had a single (plain) variant and no right-click menu. Added a 2nd variant to each (`subset.not`, `exists.not`) and wired up their context menus in `math.html`.

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

[Unreleased]: https://github.com/mmaunier/typst-format-panel/compare/v0.1.5...HEAD
[0.1.5]: https://github.com/mmaunier/typst-format-panel/compare/v0.1.4...v0.1.5
[0.1.4]: https://github.com/mmaunier/typst-format-panel/compare/v0.1.3...v0.1.4
[0.1.3]: https://github.com/mmaunier/typst-format-panel/releases/tag/v0.1.3
