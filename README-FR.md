# 🎨 Typst Format Panel

[![Version](https://img.shields.io/badge/version-0.1.5-blue.svg)](CHANGELOG-FR.md)
[![License: MIT](https://img.shields.io/badge/licence-MIT-green.svg)](LICENSE.txt)
[![VSCode ^1.80.0](https://img.shields.io/badge/VSCode-%5E1.80.0-007ACC.svg)](https://code.visualstudio.com/)

Panneau latéral interactif pour l'édition de [Typst](https://typst.app/) dans VSCode. Accès en un clic au formatage de texte, aux symboles mathématiques, aux environnements, tableaux et grilles — avec menus contextuels pour les variantes et assistants modaux pour les structures complexes.

Porté depuis [latex-format-panel](https://github.com/mmaunier/latex-format-panel).

> English? See [README.md](README.md).

## Sommaire

- [Fonctionnalités](#fonctionnalités)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Configuration](#configuration)
- [Développement](#développement)
- [Ajouter une commande](#ajouter-une-commande)
- [Contribuer](#contribuer)
- [Licence](#licence)

## ✨ Fonctionnalités

- **Trois onglets** : Formats, Math, Perso.
- **Clic gauche** = insertion de la commande par défaut à la position du curseur (ou entoure la sélection).
- **Clic droit** = menu contextuel avec toutes les variantes disponibles (flèches longues, markers de listes, presets de couleur/taille, délimiteurs de matrices, langages de blocs de code, …).
- **Détection automatique du mode math** : les commandes s'adaptent selon que le curseur est dans un `$…$` ou pas. Les commandes incompatibles sont annulées proprement sans détruire la sélection en cours.
- **Assistants modaux** pour les structures complexes :
  - `#table(…)` — lignes/colonnes, mise en forme des en-têtes, alternance des couleurs, case (0,0) vidée
  - `#grid(…)` — largeurs des colonnes, gouttières, alignement par défaut
  - Matrices — dimensions, choix du délimiteur (parenthèses, crochets, barres, accolades, …)
- **Onglet Perso configurable** — définis tes propres boutons et menus dans les paramètres VSCode.
- **Intégration taskize** — bouton dédié pour le [paquet taskize](https://typst.app/universe/package/taskize/) avec variantes 2/3/4 colonnes et auto-fit.
- **Commenter / Décommenter** — bascule `//` via boutons dédiés et commandes VSCode (`Typst: Comment selection`, `Typst: Uncomment selection`).
- **Panneau collant** — une fois ouvert, le panneau reste visible même quand tu bascules sur un fichier non `.typ` (preview PDF, autres onglets).

## 📦 Prérequis

- **VSCode** `^1.80.0`
- Une extension Typst qui enregistre `.typ` comme langage `typst`. Recommandé : [**Tinymist Typst**](https://marketplace.visualstudio.com/items?itemName=myriad-dreamin.tinymist).

Si ton extension Typst n'enregistre pas le langage automatiquement, ajoute dans `settings.json` :

```json
"files.associations": { "*.typ": "typst" }
```

## 🚀 Installation

### Depuis le code source (auto-installation)

```bash
git clone https://github.com/mmaunier/typst-format-panel.git
cd typst-format-panel
npm install
npx vsce package
# Puis dans VSCode : Ctrl+Shift+P → "Extensions: Install from VSIX"
# et choisir le fichier .vsix généré dans build/
```

### Pour le développement local

```bash
git clone https://github.com/mmaunier/typst-format-panel.git
cd typst-format-panel
npm install
code .
# F5 pour lancer une fenêtre Extension Development Host avec le panneau chargé
```

## 🎯 Utilisation

1. Ouvre un fichier `.typ`.
2. L'icône **Typst Format** apparaît dans la barre d'activité.
3. Clique dessus pour afficher le panneau avec les trois onglets.
4. **Clic gauche** sur un bouton : insère sa variante par défaut au curseur (ou entoure la sélection).
5. **Clic droit** sur un bouton : ouvre son menu contextuel de variantes — dont les formes markup vs fonction (`*gras*` vs `#strong[gras]`), les flèches longues, les markers de listes, les langages de blocs de code, etc.
6. **Clic droit** sur `#table …`, `#grid …` ou `mat` : ouvre l'**assistant modal** correspondant.

Marqueurs utilisés dans les templates :

- `$1` — position du texte sélectionné
- `$0` — position finale du curseur après insertion
- `\n` — retour à la ligne

## ⚙️ Configuration

L'onglet **Perso** est entièrement configurable via le paramètre VSCode `typstFormatPanel.persoButtons`. Trois types d'éléments sont supportés :

```jsonc
[
  { "type": "titre", "texte": "Ma section" },

  { "type": "bouton",
    "texte": "Section",
    "commande": "= $1$0" },

  { "type": "bouton_variantes",
    "defaut": 1,
    "variantes": [
      { "texte": "Cadre simple",
        "commande": "#block(stroke: 1pt, inset: 8pt, radius: 4pt)[$1]$0" },
      { "texte": "Cadre coloré",
        "commande": "#block(fill: luma(230), inset: 8pt, radius: 4pt)[$1]$0" }
    ]
  }
]
```

Ouvre les paramètres (`Ctrl+,`) et recherche **Typst Format Panel** pour les éditer avec tooltips et validation.

## 🛠️ Développement

Structure du projet :

```
src/
  extension.js                 Point d'entrée VSCode
  actions/
    formatActions.js           Commandes Format + commenter/décommenter
    mathActions.js             Commandes Math
    persoActions.js            Commandes Perso (générées depuis les paramètres)
  config/
    commandFormatVariants.js   Templates Format + wrapWithTable / wrapWithGrid
    commandMathVariants.js     Templates Math + wrapWithMatrix
  webview/
    template.html              Squelette + modales + JS front-end
    format.html                Boutons de l'onglet Format
    math.html                  Boutons de l'onglet Math
    styles.css                 Styles
    webviewProvider.js         Provider webview + dispatch des messages
utils/
  utils.js                     isInMathMode (Typst) + processTemplate
```

## ➕ Ajouter une commande

1. Ajoute une entrée dans `src/config/commandFormatVariants.js` (ou `commandMathVariants.js`) :
   ```js
   macommande: {
     default: 'v1',
     variants: [
       { id: 'v1', label: '#macmd[…]', description: 'Ma commande',
         textMode: '#macmd[$1]$0', mathMode: null,
         supportsText: true, supportsMath: false }
     ]
   }
   ```
2. Ajoute son nom dans `getFormatCommands()` (ou `getMathCommands()`).
3. Ajoute un `<button onclick="sendCommand('macommande')">…</button>` dans `format.html` (ou `math.html`).
4. Recharge la fenêtre Extension Development Host (`Ctrl+R`).

## 🤝 Contribuer

Signalements de bugs et pull requests bienvenus. Ouvre une [issue](https://github.com/mmaunier/typst-format-panel/issues) avant les changements importants pour qu'on discute de l'approche.

## 📄 Licence

MIT © [Mikaël Maunier](https://github.com/mmaunier). Voir [LICENSE.txt](LICENSE.txt).

## 📈 Journal des versions

Voir [CHANGELOG-FR.md](CHANGELOG-FR.md) pour l'historique des versions.
