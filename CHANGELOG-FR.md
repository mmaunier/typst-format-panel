# Journal des versions

Toutes les évolutions notables du projet sont documentées dans ce fichier.

Le format suit [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/),
et le projet respecte [Semantic Versioning](https://semver.org/lang/fr/).

> English? See [CHANGELOG.md](CHANGELOG.md).

## [Non publié]

## [0.1.4] - 2026-08-16

Version d'internationalisation : le panneau latéral est désormais disponible en anglais et en français, avec détection automatique de la langue de VSCode.

### Ajouté

- **Nouveau paramètre `typstFormatPanel.language`** avec les valeurs `"auto"` (défaut), `"en"`, `"fr"`.
  - `auto` suit `vscode.env.language` et retombe sur `en` si la langue détectée n'est pas disponible.
  - Le changement de paramètre rafraîchit le panneau instantanément, sans redémarrage.
- **Dossier `src/i18n/`** contenant :
  - `en.json` — dictionnaire anglais complet (~250 clés, référence).
  - `fr.json` — dictionnaire français complet.
  - `index.js` — chargeur avec fallback automatique sur l'anglais pour toute clé manquante.
- **Ajouter une nouvelle langue** = déposer `<code>.json` dans `src/i18n/` et étendre l'enum dans `package.json`.
- **Toutes les chaînes d'interface extraites** des trois fichiers HTML d'onglets (`format.html`, `math.html`, `template.html`) et des deux fichiers `commandVariants`. Rien n'est laissé codé en dur dans une seule langue.
- Chaînes traduites : titres de sections, libellés de boutons, descriptions du menu contextuel, titres des modales et libellés de champs, boutons « Annuler » / « Créer ».
- L'onglet Perso reste neutre au niveau linguistique (les utilisateurs écrivent leurs propres libellés dans les paramètres, dans la langue qu'ils préfèrent).

### Modifié

- `commandFormatVariants.js` et `commandMathVariants.js` utilisent désormais `descKey` (et `labelKey` quand le label est du texte humain plutôt que du code Typst) au lieu de chaînes françaises codées en dur. Les labels qui sont du code Typst (`*...*`, `#strong[...]`, `arrow.r.long`) restent inchangés.
- `webviewProvider.js` résout les clés i18n au moment du rendu et substitue les placeholders `{{t.section.key}}` dans les templates HTML.
- Icône de l'application mise à jour (`media/icon.svg` et `media/icon.png` régénéré en 512×512).
- Version de l'extension bumpée en `0.1.4`.

### Notes

- Les commandes de la palette VSCode (`Typst: Comment selection`, etc.) restent en anglais uniquement. Les traduire nécessite un fichier `package.nls.<lang>.json` séparé (mécanisme natif VSCode) et pourra être ajouté plus tard si besoin.
- La `markdownDescription` de `persoButtons` dans `package.json` reste en anglais.

## [0.1.3] - 2026-08-16

Première version publique. Portage depuis [latex-format-panel](https://github.com/mmaunier/latex-format-panel), réécrit pour la syntaxe et les idiomes Typst.

### Ajouté

- **Panneau latéral à trois onglets** — Formats, Math, Perso — activé sur les fichiers `.typ`.
- **Détection automatique du mode math** basée sur le comptage des `$` non échappés (les commentaires ligne et bloc sont ignorés). Les commandes s'annulent proprement quand elles ne sont pas applicables au mode courant, sans détruire la sélection.
- **Interaction clic gauche / clic droit** — clic gauche insère la variante par défaut d'une commande, clic droit ouvre un menu contextuel listant toutes les variantes.
- **Panneau collant** — une fois ouvert manuellement, le panneau latéral reste visible même quand le fichier actif n'est pas `.typ`.
- **Onglet Format** avec 12 sections (Texte, Transformations, Couleurs et tailles, Titres, Alignement, Espacement dont `#line` 7 variantes, Réglages fins `#set par/list`, Listes avec markers/UTF-8, tasks (taskize), Blocs, Notes et références, Grid/Tableaux dont assistants `#grid` et `#table` avec cases riches, Spécial).
- **Onglet Math** avec opérateurs, fractions/racines, comparaisons, flèches (avec variantes longues), bouton flèches spéciales, espaces math, fonctions, délimiteurs et matrices, ensembles (ℕ ℤ 𝔻 ℚ ℝ ℂ), logique et symboles, décorations, environnements math dont `display()`.
- **Onglet Perso** — entièrement configurable via `typstFormatPanel.persoButtons` dans les paramètres VSCode.
- **Caractère de commentaire** : `//`, avec les commandes `Typst: Comment selection` et `Typst: Uncomment selection` accessibles dans la palette.
- **Générateur de matrice** : cellules vides (`mat( , ; , )`) — plus de valeurs par défaut à effacer.
- **Positionnement du menu contextuel** — aligné sur le bord gauche du bouton cliqué, contenu dans les limites du webview, bascule vers le haut automatiquement s'il n'y a pas la place en bas.
- **README** et **CHANGELOG** en anglais et français.

### Retiré (par rapport à `latex-format-panel`)

- Commandes propres à LaTeX sans équivalent direct en Typst : `noindent`, `hbox`, `tabbing`, `tikzpicture`, `setlength`, `setcounter`, `subequations`, `displaystyle`, `multline`, `split`, `equation` (numérotée), `wrapfig`.
- Commandes LaTeX fusionnées : `emphasis`/`slanted` → `italique` ; `tt` → `code` ; `mathbb`/`mathcal` → boutons dédiés ; `tabular`/`tabularray` → `#table` ; `listing` → variantes bloc de `code` ; `tcolorbox` → variante colorée de `block` ; `array` → bouton propre + variante matrice ; `align`/`alignat`/`gather` → `align_math` ; `systeme` → `cases` ; `dots`/`cdots` → `dots` avec variantes.

[Non publié]: https://github.com/mmaunier/typst-format-panel/compare/v0.1.4...HEAD
[0.1.4]: https://github.com/mmaunier/typst-format-panel/compare/v0.1.3...v0.1.4
[0.1.3]: https://github.com/mmaunier/typst-format-panel/releases/tag/v0.1.3
