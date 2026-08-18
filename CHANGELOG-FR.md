# Journal des versions

Toutes les évolutions notables du projet sont documentées dans ce fichier.

Le format suit [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/),
et le projet respecte [Semantic Versioning](https://semver.org/lang/fr/).

> English? See [CHANGELOG.md](CHANGELOG.md).

## [Non publié]

## [0.1.5] - 2026-08-18

Version de retours d'usage après tests réels : déverrouille plusieurs commandes de l'onglet Format en mode math, corrige deux bugs d'affichage, et ajoute un lot de nouvelles commandes de mise en page (fonctions Typst jusque-là non couvertes).

### Corrigé

- **Étiquette `<>` manquante** — le bouton « label » (entre « footnote » et « @ref ») n'affichait rien : son texte littéral `<label>` était interprété comme une balise HTML égarée au lieu d'être affiché. `webviewProvider.js` échappe désormais le HTML de chaque substitution `{{t.xxx}}` ; le bouton affiche maintenant correctement `<>` dans les deux langues.
- **Bug `<html lang="...">`** — le placeholder dédié `{{t.__html_lang}}` était silencieusement consommé par la substitution i18n générique avant que son propre remplacement ne s'exécute, laissant un attribut littéral `lang="__html_lang"`. Réordonné pour que l'attribut de langue soit résolu en premier.
- **Étiquettes de placeholder générique peu claires** — la première variante de `#hspace`/`#vspace` insère `#h(em)` / `#v(em)` avec le curseur placé avant l'unité (pour taper la valeur voulue), mais son libellé dans le menu contextuel affichait `#h(1em)` / `#v(1em)`, suggérant une valeur fixe. Renommé en `#h(_em)` / `#v(_em)` pour rendre évident le caractère générique/paramétrable.

### Modifié — déverrouillage du mode dual (texte ⟷ math)

Plusieurs commandes de l'onglet Format étaient bloquées sans condition en mode math alors que la fonction Typst sous-jacente y est également valide (les fonctions qui enveloppent du contenu restent du contenu valide même imbriquées dans `$ ... $`, suivant la même convention déjà utilisée par `bold`/`italic`/`underline`/`color`). Déverrouillées pour les deux modes :

- `strike`, `highlight`, `smallcaps` — utilisables désormais dans `$ ... $` (`strike($1)`, `highlight($1)`, `smallcaps($1)`).
- `fontsize` (les 5 tailles) — `text(size: ...)[...]`, même appel que celui déjà utilisé par `color`.
- `box` (3 variantes) et `block` (3 variantes) — demande explicite ; `box(...)`/`block(...)` restent valides en math puisqu'elles ne font que produire du contenu.

Volontairement inchangé : les commandes structurelles/de document (titres, listes, tasks, citation, figure, footnote, grid/table, blocs d'alignement) n'ont pas de sens à l'intérieur d'une formule en ligne, elles restent donc texte uniquement.

### Ajouté

- **Transformations** : `#super[...]`, `#sub[...]`, `#skew(ax: ...)[...]` (2 variantes), `#hide[...]`, `#rotate(...)[...]` (4 variantes d'angle : 90°, 45°, -45°, 180°).
- **Alignement** : `#move(dx:, dy:)[...]`, `#place(...)[...]` (5 variantes de position), `#pad(...)[...]` (tous côtés / horizontal / vertical).
- **Espacement** : `#colbreak()` à côté de `#pagebreak()` ; nouveau bouton « espaces spéciales » avec 7 variantes (`~` espace insécable, insécable fine, fine, capillaire, cadratin, ponctuation, chiffre — via `#sym.space.*`).
- **Blocs** : `#rect[...]` (3 variantes : simple / rempli / coins arrondis), et un bouton bloc de contenu générique `#[ ... ]` (pratique pour cadrer des `#set` locaux, ex. `#set par(...)`, sans le saut de mise en page qu'induit `#block`).
- **Spécial** : `#line` déplacé ici, regroupé avec Commenter/Décommenter (voir Modifié ci-dessous).

Toutes les signatures de fonctions Typst utilisées (`skew`, `move`, `place`, `pad`, `rotate`, `rect`, `hide`, `colbreak`, `super`, `sub`, la famille `sym.space.*`) ont été vérifiées auprès de la référence officielle Typst avant implémentation.

### Modifié — réorganisation

- **`#line` déplacé** de « Espacement » vers « Spécial », aux côtés de Commenter/Décommenter, comme demandé.
- **Regroupement de `rotate`, `skew`, `hide`** — la demande initiale plaçait `super`/`sub`/`skew`/`hide` dans « Transformations » ET, séparément, demandait `rotate`/`hide` (et peut-être `skew`) dans « Blocs ». Pour éviter les doublons de boutons, les cinq (`super`, `sub`, `skew`, `hide`, `rotate`) ont été regroupés dans « Transformations » (ce sont toutes des fonctions Typst de *transformation de mise en page* appliquées à du contenu existant), tandis que `#rect` — un conteneur de contenu visuellement proche de `box` — a été placé dans « Blocs ». N'hésite pas à me dire si tu préfères un autre découpage à l'usage.

### Ajouté — deuxième vague de retours (même jour)

- **`scr(...)`** ajouté à côté de `cal` dans « Texte » — `math.scr()` (style script/manuscrit) est une fonction Typst distincte de `cal` (calligraphique), même comportement d'auto-wrap dans `$…$` en mode texte.
- **Aperçus visuels sur 3 boutons** : `strike` est maintenant barré, `highlight` a un fond jaune fluo, `code` utilise la police mono de l'éditeur — les règles CSS pour `highlight`/`strike` existaient déjà depuis l'époque du panneau LaTeX mais n'étaient jamais réellement rattachées à la classe des boutons.
- **Audit « clic direct = 1er item du menu »** — ajout d'une vérification permanente dans `verify.js` qui s'assure que `default` correspond toujours à `variants[0].id` pour chaque commande à variantes (Format + Math). Elle a détecté une incohérence préexistante : `fontsize` insérait du 12pt au clic mais listait le 8pt en premier dans son menu — variantes réordonnées (12pt est maintenant premier/défaut).
- **Math — « Styles et annotations »** (renommé/fusionné depuis « Décorations », suivant ta suggestion) : `widehat` gagne une 2e variante `overparen` (arc extensible, ex. pour des arcs géométriques) ; l'ancien `vec` (flèche/barre au-dessus d'une variable) est renommé `vecarrow` pour libérer le nom ; **`vec`** correspond désormais à la vraie fonction Typst `vec(...)` (vecteur colonne), avec 5 variantes de délimiteur (parenthèses/crochets/accolades/barres/aucun) ; ajout de **`op()`**, **`accent()`** (9 variantes d'accent : tilde, point, tréma, brève, grave, aigu, caron, rond, macron), **`attach()`** (4 variantes de coin : tl/tr/bl/br), **`cancel()`** (simple + rature en croix), et **`underbrace`**/**`overbrace`**, chacun exposant toute la famille des fonctions apparentées en variantes (accolade par défaut, puis line/bracket/paren/shell — c'est-à-dire `underline`/`underbracket`/`underparen`/`undershell` et leurs équivalents `over-`).
- **Math — nouvelle section « Espacements »** : un bouton rapide `fine` en un clic, le bouton générique `math_spaces` existant (déplacé ici), et **`stretch()`**.
- **Math — `num()` du paquet `zero` (API v0.7.0, revérifiée car le paquet vient de sortir une version avec rupture de compatibilité)** : simple, arrondi à 2 décimales, arrondi à l'entier, et un raccourci d'import, ajoutés dans « Fonctions ».
- **`cases` simplifié** — insère désormais juste `cases(  &  ,)` avec le curseur dans le premier espace (avant le `&`), au lieu d'un exemple « si / sinon » codé en dur.
- **Rythme vertical resserré** — l'espace entre les boutons, la marge sous chaque ligne de boutons, et la marge entre un titre de section et sa première ligne de boutons ont été divisés par deux pour tenir davantage à l'écran.

Note : `underset`/`overset` utilisent toujours `underline`/`overline` en interne, ce qui — maintenant que `attach()` est disponible — n'est pas tout à fait la manière idiomatique Typst d'empiler une étiquette sous/sur un symbole (`attach(base, b: ...)` serait plus correct). Laissé tel quel car hors du périmètre de cette vague de demandes ; je le signale au cas où tu voudrais que ce soit corrigé.

### Corrigé — troisième vague de retours (même jour)

- **`accent(..., tilde)` mal rendu** — le mot `tilde` était passé tel quel comme valeur d'accent. D'après l'exemple officiel de la doc Typst elle-même (`$tilde(a) = accent(a, \u{0303})$`), le bouton insère maintenant le point de code du tilde combinant `\u{0303}` au lieu du mot. L'étiquette du menu contextuel a été mise à jour en `accent(x, ~)` pour rester lisible.
- **`accent(..., grave)` — même type de bug, corrigé par anticipation.** Tu n'avais pas signalé celui-ci, mais le même exemple officiel écrit le cas grave `` $grave(a) = accent(a, `)$ `` (avec l'accent grave littéral) plutôt que le mot `grave`, exactement le même schéma que pour tilde. Corrigé par analogie — ça vaut le coup de vérifier visuellement de ton côté puisque ce n'était pas explicitement testé.
- **`subset.not` et `exists.not` manquants** — les deux commandes n'avaient qu'une seule variante (plain) et aucun menu contextuel. Ajout d'une 2ᵉ variante à chacune (`subset.not`, `exists.not`) et câblage du menu contextuel correspondant dans `math.html`.

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

[Non publié]: https://github.com/mmaunier/typst-format-panel/compare/v0.1.5...HEAD
[0.1.5]: https://github.com/mmaunier/typst-format-panel/compare/v0.1.4...v0.1.5
[0.1.4]: https://github.com/mmaunier/typst-format-panel/compare/v0.1.3...v0.1.4
[0.1.3]: https://github.com/mmaunier/typst-format-panel/releases/tag/v0.1.3
