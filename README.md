# Typst Format Panel

[![Version](https://img.shields.io/badge/version-0.1.5-blue.svg)](CHANGELOG.md)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE.txt)
[![VSCode ^1.80.0](https://img.shields.io/badge/VSCode-%5E1.80.0-007ACC.svg)](https://code.visualstudio.com/)

Interactive side panel for [Typst](https://typst.app/) editing in VSCode. Provides one-click access to text formatting, mathematical symbols, environments, tables and grids — with right-click context menus for variants and modal assistants for complex structures.

Ported from [latex-format-panel](https://github.com/mmaunier/latex-format-panel).

> Français ? Voir [README-FR.md](README-FR.md).

## Table of contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Development](#development)
- [Adding a command](#adding-a-command)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Three tabs**: Formats, Math, Perso (custom)
- **Left click** inserts the default variant of a command
- **Right click** opens a context menu with all available variants (long arrows, list markers, color/size presets, matrix delimiters, code block languages, …)
- **Automatic math-mode detection**: commands adapt to whether the cursor is inside `$…$` or not; incompatible commands are cancelled cleanly without destroying the current selection
- **Modal assistants** for complex structures:
  - `#table(…)` — rows/columns, header styling, alternate row colors, empty top-left cell
  - `#grid(…)` — column widths, gutters, default alignment
  - Matrices — dimensions, delimiter choice (parentheses, brackets, bars, braces, …)
- **Configurable Perso tab** — define your own buttons and menus in VSCode settings
- **taskize integration** — dedicated button for the [taskize package](https://typst.app/universe/package/taskize/) with 2/3/4-column and auto-fit variants
- **Comment / Uncomment** — `//` toggling via buttons and VSCode commands (`Typst: Comment selection`, `Typst: Uncomment selection`)
- **Sticky panel** — once opened, the panel stays visible even when switching to non-`.typ` files (PDF previews, other tabs)

## Requirements

- **VSCode** `^1.80.0`
- A Typst language provider so `.typ` files are recognized as `typst`. The recommended extension is [**Tinymist Typst**](https://marketplace.visualstudio.com/items?itemName=myriad-dreamin.tinymist).

If your Typst extension does not register the language automatically, add this to your `settings.json`:

```json
"files.associations": { "*.typ": "typst" }
```

## Installation

### From source (development / self-install)

```bash
git clone https://github.com/mmaunier/typst-format-panel.git
cd typst-format-panel
npm install
npx vsce package
# Then in VSCode: Ctrl+Shift+P → "Extensions: Install from VSIX"
# and pick the .vsix file created under build/
```

### For local development

```bash
git clone https://github.com/mmaunier/typst-format-panel.git
cd typst-format-panel
npm install
code .
# Press F5 to launch an Extension Development Host with the panel loaded
```

## Usage

1. Open a `.typ` file.
2. The **Typst Format** icon appears in the activity bar.
3. Click it to reveal the panel with the three tabs.
4. **Left-click** a button to insert its default variant at the cursor (or wrap the current selection).
5. **Right-click** a button to open its context menu of variants — including the raw markup versus function forms (`*bold*` vs `#strong[bold]`), long arrows, list markers, code block languages, and more.
6. Right-click on `#table …`, `#grid …` or `mat` to open the corresponding **modal assistant**.

Selection markers used in templates:

- `$1` — where the selected text goes
- `$0` — final cursor position after insertion
- `\n` — newline

## Configuration

The **Perso** tab is fully configurable via the VSCode setting `typstFormatPanel.persoButtons`. Three element types are supported:

```jsonc
[
  { "type": "titre", "texte": "My section" },

  { "type": "bouton",
    "texte": "Section",
    "commande": "= $1$0" },

  { "type": "bouton_variantes",
    "defaut": 1,
    "variantes": [
      { "texte": "Simple frame",
        "commande": "#block(stroke: 1pt, inset: 8pt, radius: 4pt)[$1]$0" },
      { "texte": "Colored frame",
        "commande": "#block(fill: luma(230), inset: 8pt, radius: 4pt)[$1]$0" }
    ]
  }
]
```

Open the settings UI (`Ctrl+,`) and search for **Typst Format Panel** to edit them with tooltips and validation.

## Development

Project layout:

```
src/
  extension.js                 VSCode entry point
  actions/
    formatActions.js           Format commands + comment/uncomment
    mathActions.js             Math commands
    persoActions.js            Perso commands (generated from settings)
  config/
    commandFormatVariants.js   Format templates + wrapWithTable / wrapWithGrid
    commandMathVariants.js     Math templates + wrapWithMatrix
  webview/
    template.html              Layout + modals + front-end JS
    format.html                Format tab buttons
    math.html                  Math tab buttons
    styles.css                 Styles
    webviewProvider.js         Webview provider + message dispatch
utils/
  utils.js                     isInMathMode (Typst) + processTemplate
```

## Adding a command

1. Add an entry in `src/config/commandFormatVariants.js` (or `commandMathVariants.js`):
   ```js
   mycommand: {
     default: 'v1',
     variants: [
       { id: 'v1', label: '#mycmd[…]', description: 'My command',
         textMode: '#mycmd[$1]$0', mathMode: null,
         supportsText: true, supportsMath: false }
     ]
   }
   ```
2. Add its name to `getFormatCommands()` (or `getMathCommands()`).
3. Add a `<button onclick="sendCommand('mycommand')">…</button>` in `format.html` (or `math.html`).
4. Reload the Extension Development Host (`Ctrl+R`).

## Contributing

Bug reports and pull requests are welcome. Please open an [issue](https://github.com/mmaunier/typst-format-panel/issues) first for large changes so we can discuss the approach.

## License

MIT © [Mikaël Maunier](https://github.com/mmaunier). See [LICENSE.txt](LICENSE.txt).

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for the release history.
