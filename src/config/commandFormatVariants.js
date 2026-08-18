// =============================================================================
// commandFormatVariants.js — v0.4 (i18n-ready)
//
// Convention :
//   - `label`    : chaîne brute (souvent du code Typst tel que `*...*`) — NON traduite
//   - `labelKey` : clé i18n → remplace `label` au moment de servir le webview
//   - `descKey`  : clé i18n → remplit `description`
// Le webviewProvider applique les substitutions au chargement.
// =============================================================================

const formatCommandVariants = {

  // ---- Texte ----------------------------------------------------------------

  bold: {
    default: 'stars',
    variants: [
      { id: 'stars',  label: '*...*',        descKey: 'variant.bold.stars',
        textMode: '*$1*$0', mathMode: 'bold($1)$0', supportsText: true, supportsMath: true },
      { id: 'strong', label: '#strong[...]', descKey: 'variant.bold.strong',
        textMode: '#strong[$1]$0', mathMode: 'bold($1)$0', supportsText: true, supportsMath: true }
    ]
  },
  italic: {
    default: 'under',
    variants: [
      { id: 'under', label: '_..._',      descKey: 'variant.italic.under',
        textMode: '_$1_$0', mathMode: 'italic($1)$0', supportsText: true, supportsMath: true },
      { id: 'emph',  label: '#emph[...]', descKey: 'variant.italic.emph',
        textMode: '#emph[$1]$0', mathMode: 'italic($1)$0', supportsText: true, supportsMath: true }
    ]
  },
  underline: {
    default: 'underline',
    variants: [
      { id: 'underline', label: '#underline[...]', descKey: 'variant.underline.underline',
        textMode: '#underline[$1]$0', mathMode: 'underline($1)$0', supportsText: true, supportsMath: true }
    ]
  },
  strike: {
    default: 'strike',
    variants: [
      { id: 'strike', label: '#strike[...]', descKey: 'variant.strike.strike',
        textMode: '#strike[$1]$0', mathMode: 'strike($1)$0', supportsText: true, supportsMath: true }
    ]
  },
  highlight: {
    default: 'highlight',
    variants: [
      { id: 'highlight', label: '#highlight[...]', descKey: 'variant.highlight.highlight',
        textMode: '#highlight[$1]$0', mathMode: 'highlight($1)$0', supportsText: true, supportsMath: true }
    ]
  },
  smallcaps: {
    default: 'sc',
    variants: [
      { id: 'sc', label: '#smallcaps[...]', descKey: 'variant.smallcaps.sc',
        textMode: '#smallcaps[$1]$0', mathMode: 'smallcaps($1)$0', supportsText: true, supportsMath: true }
    ]
  },
  cal: {
    default: 'cal',
    variants: [
      { id: 'cal', label: 'cal(...)', descKey: 'variant.cal.cal',
        textMode: '$cal($1)$$0', mathMode: 'cal($1)$0', supportsText: true, supportsMath: true }
    ]
  },
  scr: {
    default: 'scr',
    variants: [
      { id: 'scr', label: 'scr(...)', descKey: 'variant.scr.scr',
        textMode: '$scr($1)$$0', mathMode: 'scr($1)$0', supportsText: true, supportsMath: true }
    ]
  },

  // ---- Code ----------------------------------------------------------------

  code: {
    default: 'inline',
    variants: [
      { id: 'inline', label: '`...`',         descKey: 'variant.code.inline',
        textMode: '`$1`$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'text',   label: '```text ```',   descKey: 'variant.code.text',
        textMode: '```text\n$1\n```$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'python', label: '```python ```', descKey: 'variant.code.python',
        textMode: '```python\n$1\n```$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'casio',  label: '```casio ```',  descKey: 'variant.code.casio',
        textMode: '```casio\n$1\n```$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'ti',     label: '```ti ```',     descKey: 'variant.code.ti',
        textMode: '```ti\n$1\n```$0', mathMode: null, supportsText: true, supportsMath: false }
    ]
  },

  // ---- Transformations -----------------------------------------------------

  uppercase: {
    default: 'upper',
    variants: [
      { id: 'upper', labelKey: 'label.uppercase.upper', descKey: 'variant.uppercase.upper',
        textMode: 'UPPERCASE_TRANSFORM', mathMode: null, supportsText: true, supportsMath: false }
    ]
  },
  lowercase: {
    default: 'lower',
    variants: [
      { id: 'lower', labelKey: 'label.lowercase.lower', descKey: 'variant.lowercase.lower',
        textMode: 'LOWERCASE_TRANSFORM', mathMode: null, supportsText: true, supportsMath: false }
    ]
  },
  capitalize: {
    default: 'cap',
    variants: [
      { id: 'cap', labelKey: 'label.capitalize.cap', descKey: 'variant.capitalize.cap',
        textMode: 'CAPITALIZE_TRANSFORM', mathMode: null, supportsText: true, supportsMath: false }
    ]
  },

  // ---- Transformations de mise en forme (layout) — v0.1.5 --------------------

  super: {
    default: 'super',
    variants: [ { id: 'super', label: '#super[...]', descKey: 'variant.super.super',
      textMode: '#super[$1]$0', mathMode: null, supportsText: true, supportsMath: false } ]
  },
  sub: {
    default: 'sub',
    variants: [ { id: 'sub', label: '#sub[...]', descKey: 'variant.sub.sub',
      textMode: '#sub[$1]$0', mathMode: null, supportsText: true, supportsMath: false } ]
  },
  skew: {
    default: 'left',
    variants: [
      { id: 'left',  label: '#skew(ax: -12deg)[...]', descKey: 'variant.skew.left',
        textMode: '#skew(ax: -12deg)[$1]$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'right', label: '#skew(ax: 12deg)[...]',  descKey: 'variant.skew.right',
        textMode: '#skew(ax: 12deg)[$1]$0', mathMode: null, supportsText: true, supportsMath: false }
    ]
  },
  hide: {
    default: 'hide',
    variants: [ { id: 'hide', label: '#hide[...]', descKey: 'variant.hide.hide',
      textMode: '#hide[$1]$0', mathMode: null, supportsText: true, supportsMath: false } ]
  },
  rotate: {
    default: 'r90',
    variants: [
      { id: 'r90',  label: '#rotate(90deg)[...]',  descKey: 'variant.rotate.r90',
        textMode: '#rotate(90deg)[$1]$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'r45',  label: '#rotate(45deg)[...]',  descKey: 'variant.rotate.r45',
        textMode: '#rotate(45deg)[$1]$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'rm45', label: '#rotate(-45deg)[...]', descKey: 'variant.rotate.rm45',
        textMode: '#rotate(-45deg)[$1]$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'r180', label: '#rotate(180deg)[...]', descKey: 'variant.rotate.r180',
        textMode: '#rotate(180deg)[$1]$0', mathMode: null, supportsText: true, supportsMath: false }
    ]
  },

  // ---- Couleurs et tailles -------------------------------------------------

  color: {
    default: 'red',
    variants: [
      { id: 'red',    labelKey: 'label.color.red',    descKey: 'variant.color.red',
        textMode: '#text(fill: red)[$1]$0',    mathMode: 'text(fill: red)[$1]$0',    supportsText: true, supportsMath: true },
      { id: 'blue',   labelKey: 'label.color.blue',   descKey: 'variant.color.blue',
        textMode: '#text(fill: blue)[$1]$0',   mathMode: 'text(fill: blue)[$1]$0',   supportsText: true, supportsMath: true },
      { id: 'green',  labelKey: 'label.color.green',  descKey: 'variant.color.green',
        textMode: '#text(fill: green)[$1]$0',  mathMode: 'text(fill: green)[$1]$0',  supportsText: true, supportsMath: true },
      { id: 'orange', labelKey: 'label.color.orange', descKey: 'variant.color.orange',
        textMode: '#text(fill: orange)[$1]$0', mathMode: 'text(fill: orange)[$1]$0', supportsText: true, supportsMath: true },
      { id: 'gray',   labelKey: 'label.color.gray',   descKey: 'variant.color.gray',
        textMode: '#text(fill: gray)[$1]$0',   mathMode: 'text(fill: gray)[$1]$0',   supportsText: true, supportsMath: true }
    ]
  },
  fontsize: {
    // Ordre = ordre d'affichage dans le menu contextuel. Le défaut (clic direct)
    // doit être le 1er élément de ce tableau (cf. audit v0.1.5 : le clic direct
    // doit toujours correspondre au 1er item du menu, comme pour tous les
    // autres boutons à variantes). p12 est donc placé en tête.
    default: 'p12',
    variants: [
      { id: 'p12', labelKey: 'label.fontsize.p12',     descKey: 'variant.fontsize.p12',
        textMode: '#text(size: 12pt)[$1]$0', mathMode: 'text(size: 12pt)[$1]$0', supportsText: true, supportsMath: true },
      { id: 'p10', label: '10pt',                      descKey: 'variant.fontsize.p10',
        textMode: '#text(size: 10pt)[$1]$0', mathMode: 'text(size: 10pt)[$1]$0', supportsText: true, supportsMath: true },
      { id: 'p8',  label: '8pt',                       descKey: 'variant.fontsize.p8',
        textMode: '#text(size: 8pt)[$1]$0',  mathMode: 'text(size: 8pt)[$1]$0',  supportsText: true, supportsMath: true },
      { id: 'p14', labelKey: 'label.fontsize.p14',     descKey: 'variant.fontsize.p14',
        textMode: '#text(size: 14pt)[$1]$0', mathMode: 'text(size: 14pt)[$1]$0', supportsText: true, supportsMath: true },
      { id: 'p18', labelKey: 'label.fontsize.p18',     descKey: 'variant.fontsize.p18',
        textMode: '#text(size: 18pt)[$1]$0', mathMode: 'text(size: 18pt)[$1]$0', supportsText: true, supportsMath: true }
    ]
  },

  // ---- Titres --------------------------------------------------------------

  heading1: {
    default: 'eq',
    variants: [
      { id: 'eq', label: '= ...',                    descKey: 'variant.heading1.eq',
        textMode: '= $1$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'fn', label: '#heading(level: 1)[...]', descKey: 'variant.heading1.fn',
        textMode: '#heading(level: 1)[$1]$0', mathMode: null, supportsText: true, supportsMath: false }
    ]
  },
  heading2: {
    default: 'eq',
    variants: [
      { id: 'eq', label: '== ...', descKey: 'variant.heading2.eq',
        textMode: '== $1$0', mathMode: null, supportsText: true, supportsMath: false }
    ]
  },
  heading3: {
    default: 'eq',
    variants: [
      { id: 'eq', label: '=== ...', descKey: 'variant.heading3.eq',
        textMode: '=== $1$0', mathMode: null, supportsText: true, supportsMath: false }
    ]
  },

  // ---- Alignement ----------------------------------------------------------

  flushleft: {
    default: 'align',
    variants: [ { id: 'align', label: '#align(left)[...]', descKey: 'variant.flushleft.align',
      textMode: '#align(left)[$1]$0', mathMode: null, supportsText: true, supportsMath: false } ]
  },
  center: {
    default: 'align',
    variants: [ { id: 'align', label: '#align(center)[...]', descKey: 'variant.center.align',
      textMode: '#align(center)[$1]$0', mathMode: null, supportsText: true, supportsMath: false } ]
  },
  flushright: {
    default: 'align',
    variants: [ { id: 'align', label: '#align(right)[...]', descKey: 'variant.flushright.align',
      textMode: '#align(right)[$1]$0', mathMode: null, supportsText: true, supportsMath: false } ]
  },
  move: {
    default: 'move',
    variants: [ { id: 'move', label: '#move(dx: ..., dy: ...)[...]', descKey: 'variant.move.move',
      textMode: '#move(dx: 0pt, dy: 0pt)[$1]$0', mathMode: null, supportsText: true, supportsMath: false } ]
  },
  place: {
    default: 'top-left',
    variants: [
      { id: 'top-left',     label: '#place(top + left)[...]',     descKey: 'variant.place.top-left',
        textMode: '#place(top + left)[$1]$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'top-right',    label: '#place(top + right)[...]',    descKey: 'variant.place.top-right',
        textMode: '#place(top + right)[$1]$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'bottom-left',  label: '#place(bottom + left)[...]',  descKey: 'variant.place.bottom-left',
        textMode: '#place(bottom + left)[$1]$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'bottom-right', label: '#place(bottom + right)[...]', descKey: 'variant.place.bottom-right',
        textMode: '#place(bottom + right)[$1]$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'center',       label: '#place(center + horizon)[...]', descKey: 'variant.place.center',
        textMode: '#place(center + horizon)[$1]$0', mathMode: null, supportsText: true, supportsMath: false }
    ]
  },
  pad: {
    default: 'rest',
    variants: [
      { id: 'rest', label: '#pad(rest: ...)[...]', descKey: 'variant.pad.rest',
        textMode: '#pad(rest: 1em)[$1]$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'x',    label: '#pad(x: ...)[...]',    descKey: 'variant.pad.x',
        textMode: '#pad(x: 1em)[$1]$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'y',    label: '#pad(y: ...)[...]',    descKey: 'variant.pad.y',
        textMode: '#pad(y: 1em)[$1]$0', mathMode: null, supportsText: true, supportsMath: false }
    ]
  },

  // ---- Espacement ----------------------------------------------------------

  hspace: {
    default: 'h',
    variants: [
      { id: 'h',     label: '#h(_em)',         descKey: 'variant.hspace.h',
        textMode: '#h($1em)$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'quad',  label: '#h(1em) — quad',  descKey: 'variant.hspace.quad',
        textMode: '#h(1em)$0',  mathMode: null, supportsText: true, supportsMath: false },
      { id: 'qquad', label: '#h(2em) — qquad', descKey: 'variant.hspace.qquad',
        textMode: '#h(2em)$0',  mathMode: null, supportsText: true, supportsMath: false },
      { id: 'hfill', label: '#h(1fr) — hfill', descKey: 'variant.hspace.hfill',
        textMode: '#h(1fr)$0',  mathMode: null, supportsText: true, supportsMath: false }
    ]
  },
  vspace: {
    default: 'v',
    variants: [
      { id: 'v',         label: '#v(_em)',   descKey: 'variant.vspace.v',
        textMode: '#v($1em)$0',  mathMode: null, supportsText: true, supportsMath: false },
      { id: 'smallskip', label: '#v(0.5em)', descKey: 'variant.vspace.smallskip',
        textMode: '#v(0.5em)$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'medskip',   label: '#v(1em)',   descKey: 'variant.vspace.medskip',
        textMode: '#v(1em)$0',   mathMode: null, supportsText: true, supportsMath: false },
      { id: 'bigskip',   label: '#v(1.5em)', descKey: 'variant.vspace.bigskip',
        textMode: '#v(1.5em)$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'vfill',     label: '#v(1fr)',   descKey: 'variant.vspace.vfill',
        textMode: '#v(1fr)$0',   mathMode: null, supportsText: true, supportsMath: false }
    ]
  },
  newpage: {
    default: 'pb',
    variants: [
      { id: 'pb', label: '#pagebreak()', descKey: 'variant.newpage.pb',
        textMode: '#pagebreak()$0', mathMode: null, supportsText: true, supportsMath: false }
    ]
  },
  colbreak: {
    default: 'cb',
    variants: [
      { id: 'cb', label: '#colbreak()', descKey: 'variant.colbreak.cb',
        textMode: '#colbreak()$0', mathMode: null, supportsText: true, supportsMath: false }
    ]
  },
  special_spaces: {
    default: 'nbsp',
    variants: [
      { id: 'nbsp',        label: '~',                          descKey: 'variant.special_spaces.nbsp',
        textMode: '~$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'nbsp_narrow', label: '#sym.space.nobreak.narrow',  descKey: 'variant.special_spaces.nbsp_narrow',
        textMode: '#sym.space.nobreak.narrow$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'thin',        label: '#sym.space.thin',            descKey: 'variant.special_spaces.thin',
        textMode: '#sym.space.thin$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'hair',        label: '#sym.space.hair',            descKey: 'variant.special_spaces.hair',
        textMode: '#sym.space.hair$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'en',          label: '#sym.space.en',              descKey: 'variant.special_spaces.en',
        textMode: '#sym.space.en$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'punct',       label: '#sym.space.punct',           descKey: 'variant.special_spaces.punct',
        textMode: '#sym.space.punct$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'fig',         label: '#sym.space.fig',             descKey: 'variant.special_spaces.fig',
        textMode: '#sym.space.fig$0', mathMode: null, supportsText: true, supportsMath: false }
    ]
  },
  hline: {
    default: 'p1',
    variants: [
      { id: 'p1',   labelKey: 'label.hline.p1',   descKey: 'variant.hline.p1',
        textMode: '#line(length: 100%, stroke: 1pt)$0',   mathMode: null, supportsText: true, supportsMath: false },
      { id: 'p05',  labelKey: 'label.hline.p05',  descKey: 'variant.hline.p05',
        textMode: '#line(length: 100%, stroke: 0.5pt)$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'd1',   labelKey: 'label.hline.d1',   descKey: 'variant.hline.d1',
        textMode: '#line(length: 100%, stroke: (thickness: 1pt, dash: "dashed"))$0',   mathMode: null, supportsText: true, supportsMath: false },
      { id: 'd05',  labelKey: 'label.hline.d05',  descKey: 'variant.hline.d05',
        textMode: '#line(length: 100%, stroke: (thickness: 0.5pt, dash: "dashed"))$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'red',  labelKey: 'label.hline.red',  descKey: 'variant.hline.red',
        textMode: '#line(length: 100%, stroke: (thickness: 1pt, paint: red))$0',   mathMode: null, supportsText: true, supportsMath: false },
      { id: 'blue', labelKey: 'label.hline.blue', descKey: 'variant.hline.blue',
        textMode: '#line(length: 100%, stroke: (thickness: 1pt, paint: blue))$0',  mathMode: null, supportsText: true, supportsMath: false },
      { id: 'gray', labelKey: 'label.hline.gray', descKey: 'variant.hline.gray',
        textMode: '#line(length: 100%, stroke: (thickness: 0.5pt, paint: gray))$0', mathMode: null, supportsText: true, supportsMath: false }
    ]
  },

  // ---- Réglages fins -------------------------------------------------------

  set_par: {
    default: 'leading',
    variants: [
      { id: 'leading', labelKey: 'label.set_par.leading', descKey: 'variant.set_par.leading',
        textMode: '#set par(leading: 0.65em)$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'spacing', labelKey: 'label.set_par.spacing', descKey: 'variant.set_par.spacing',
        textMode: '#set par(spacing: 1.2em)$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'indent',  labelKey: 'label.set_par.indent',  descKey: 'variant.set_par.indent',
        textMode: '#set par(first-line-indent: 1em)$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'justify', labelKey: 'label.set_par.justify', descKey: 'variant.set_par.justify',
        textMode: '#set par(justify: true)$0', mathMode: null, supportsText: true, supportsMath: false }
    ]
  },
  set_list: {
    default: 'spacing',
    variants: [
      { id: 'spacing',     labelKey: 'label.set_list.spacing',     descKey: 'variant.set_list.spacing',
        textMode: '#set list(spacing: 0.65em)$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'indent',      labelKey: 'label.set_list.indent',      descKey: 'variant.set_list.indent',
        textMode: '#set list(indent: 1em)$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'body-indent', labelKey: 'label.set_list.body-indent', descKey: 'variant.set_list.body-indent',
        textMode: '#set list(body-indent: 0.5em)$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'tight',       labelKey: 'label.set_list.tight',       descKey: 'variant.set_list.tight',
        textMode: '#set list(tight: true)$0', mathMode: null, supportsText: true, supportsMath: false }
    ]
  },

  // ---- Listes --------------------------------------------------------------

  itemize: {
    default: 'dash',
    variants: [
      { id: 'dash',   labelKey: 'label.itemize.dash',   descKey: 'variant.itemize.dash',
        textMode: '- $1\n- $0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'bullet', labelKey: 'label.itemize.bullet', descKey: 'variant.itemize.bullet',
        textMode: '#list(marker: [•],\n  [$1],\n  [$0],\n)', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'tri',    labelKey: 'label.itemize.tri',    descKey: 'variant.itemize.tri',
        textMode: '#list(marker: [‣],\n  [$1],\n  [$0],\n)', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'star',   labelKey: 'label.itemize.star',   descKey: 'variant.itemize.star',
        textMode: '#list(marker: [★],\n  [$1],\n  [$0],\n)', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'wedge',  labelKey: 'label.itemize.wedge',  descKey: 'variant.itemize.wedge',
        textMode: '#list(marker: [▸],\n  [$1],\n  [$0],\n)', mathMode: null, supportsText: true, supportsMath: false }
    ]
  },
  enumerate: {
    default: 'plus',
    variants: [
      { id: 'plus',        labelKey: 'label.enumerate.plus',        descKey: 'variant.enumerate.plus',
        textMode: '+ $1\n+ $0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'hier',        labelKey: 'label.enumerate.hier',        descKey: 'variant.enumerate.hier',
        textMode: '#enum(numbering: "1.a.i.",\n  [$1],\n  [$0],\n)', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'paren',       labelKey: 'label.enumerate.paren',       descKey: 'variant.enumerate.paren',
        textMode: '#enum(numbering: "(1)",\n  [$1],\n  [$0],\n)', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'bracket',     labelKey: 'label.enumerate.bracket',     descKey: 'variant.enumerate.bracket',
        textMode: '#enum(numbering: "[1]",\n  [$1],\n  [$0],\n)', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'circled',     labelKey: 'label.enumerate.circled',     descKey: 'variant.enumerate.circled',
        textMode: '#enum(numbering: n => if n <= 20 { str.from-unicode(0x245F + n) } else { str(n) },\n  [$1],\n  [$0],\n)',
        mathMode: null, supportsText: true, supportsMath: false },
      { id: 'circled-inv', labelKey: 'label.enumerate.circled-inv', descKey: 'variant.enumerate.circled-inv',
        textMode: '#enum(numbering: n => if n <= 10 { str.from-unicode(0x2775 + n) } else { str(n) },\n  [$1],\n  [$0],\n)',
        mathMode: null, supportsText: true, supportsMath: false }
    ]
  },
  item: {
    default: 'dash',
    variants: [
      { id: 'dash', label: '- ', descKey: 'variant.item.dash',
        textMode: '- $1$0', mathMode: null, supportsText: true, supportsMath: false }
    ]
  },

  // ---- Tasks (paquet taskize) ---------------------------------------------

  tasks: {
    default: 'tasks2',
    variants: [
      { id: 'tasks2', label: '#tasks2[...]', descKey: 'variant.tasks.tasks2', package: 'taskize',
        textMode: '#tasks2[\n  + $1\n  + $0\n]', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'tasks3', label: '#tasks3[...]', descKey: 'variant.tasks.tasks3', package: 'taskize',
        textMode: '#tasks3[\n  + $1\n  + $0\n]', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'tasks4', label: '#tasks4[...]', descKey: 'variant.tasks.tasks4', package: 'taskize',
        textMode: '#tasks4[\n  + $1\n  + $0\n]', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'num',    label: '#tasks(label: "1)") 2 col',  descKey: 'variant.tasks.num',   package: 'taskize',
        textMode: '#tasks(columns: 2, label: "1)")[\n  + $1\n  + $0\n]', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'paren',  label: '#tasks(label: "(1)") 2 col', descKey: 'variant.tasks.paren', package: 'taskize',
        textMode: '#tasks(columns: 2, label: "(1)")[\n  + $1\n  + $0\n]', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'auto',   label: '#tasks(columns: "auto-fit")', descKey: 'variant.tasks.auto', package: 'taskize',
        textMode: '#tasks(columns: "auto-fit")[\n  + $1\n  + $0\n]', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'import', label: 'Import taskize', descKey: 'variant.tasks.import', package: 'taskize',
        textMode: '#import "@preview/taskize:0.2.8": *$0', mathMode: null, supportsText: true, supportsMath: false }
    ]
  },

  // ---- Blocs ---------------------------------------------------------------

  block: {
    default: 'plain',
    variants: [
      { id: 'plain',   label: '#block[...]',              descKey: 'variant.block.plain',
        textMode: '#block[$1]$0', mathMode: 'block($1)$0', supportsText: true, supportsMath: true },
      { id: 'framed',  label: '#block(stroke: 1pt)[...]', descKey: 'variant.block.framed',
        textMode: '#block(stroke: 1pt, inset: 8pt, radius: 4pt)[$1]$0', mathMode: 'block(stroke: 1pt, inset: 8pt, radius: 4pt)[$1]$0', supportsText: true, supportsMath: true },
      { id: 'colored', label: '#block(fill: ...)[...]',   descKey: 'variant.block.colored',
        textMode: '#block(fill: luma(230), inset: 8pt, radius: 4pt)[$1]$0', mathMode: 'block(fill: luma(230), inset: 8pt, radius: 4pt)[$1]$0', supportsText: true, supportsMath: true }
    ]
  },
  box: {
    default: 'plain',
    variants: [
      { id: 'plain',  label: '#box[...]',              descKey: 'variant.box.plain',
        textMode: '#box[$1]$0', mathMode: 'box($1)$0', supportsText: true, supportsMath: true },
      { id: 'width',  label: '#box(width: 5cm)[...]',  descKey: 'variant.box.width',
        textMode: '#box(width: 5cm)[$1]$0', mathMode: 'box(width: 5cm)[$1]$0', supportsText: true, supportsMath: true },
      { id: 'framed', label: '#box(stroke: 0.5pt)[...]', descKey: 'variant.box.framed',
        textMode: '#box(stroke: 0.5pt, inset: (x: 4pt, y: 2pt))[$1]$0', mathMode: 'box(stroke: 0.5pt, inset: (x: 4pt, y: 2pt))[$1]$0', supportsText: true, supportsMath: true }
    ]
  },
  rect: {
    default: 'plain',
    variants: [
      { id: 'plain',   label: '#rect[...]',              descKey: 'variant.rect.plain',
        textMode: '#rect[$1]$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'filled',  label: '#rect(fill: ...)[...]',   descKey: 'variant.rect.filled',
        textMode: '#rect(fill: luma(230))[$1]$0', mathMode: null, supportsText: true, supportsMath: false },
      { id: 'rounded', label: '#rect(radius: 4pt)[...]', descKey: 'variant.rect.rounded',
        textMode: '#rect(radius: 4pt)[$1]$0', mathMode: null, supportsText: true, supportsMath: false }
    ]
  },
  contentblock: {
    default: 'plain',
    variants: [
      { id: 'plain', label: '#[ ... ]', descKey: 'variant.contentblock.plain',
        textMode: '#[\n  $1\n]$0', mathMode: null, supportsText: true, supportsMath: false }
    ]
  },
  quote: {
    default: 'q',
    variants: [
      { id: 'q', label: '#quote(block: true)[...]', descKey: 'variant.quote.q',
        textMode: '#quote(block: true)[$1]$0', mathMode: null, supportsText: true, supportsMath: false }
    ]
  },
  figure: {
    default: 'img',
    variants: [
      { id: 'img', label: '#figure(image(...), caption)', descKey: 'variant.figure.img',
        textMode: '#figure(\n  image("$1", width: 60%),\n  caption: [$0],\n)', mathMode: null, supportsText: true, supportsMath: false }
    ]
  },
  includegraphics: {
    default: 'img',
    variants: [
      { id: 'img', label: '#image(...)', descKey: 'variant.includegraphics.img',
        textMode: '#image("$1", width: 60%)$0', mathMode: null, supportsText: true, supportsMath: false }
    ]
  },

  // ---- Notes et références -------------------------------------------------

  footnote: { default: 'fn', variants: [
    { id: 'fn', label: '#footnote[...]', descKey: 'variant.footnote.fn',
      textMode: '#footnote[$1]$0', mathMode: null, supportsText: true, supportsMath: false } ] },
  label: { default: 'lbl', variants: [
    { id: 'lbl', label: '<label>', descKey: 'variant.label.lbl',
      textMode: '<$1>$0', mathMode: null, supportsText: true, supportsMath: false } ] },
  ref: { default: 'r', variants: [
    { id: 'r', label: '@label', descKey: 'variant.ref.r',
      textMode: '@$1$0', mathMode: null, supportsText: true, supportsMath: false } ] },

  // ---- Grid / Tableaux -----------------------------------------------------

  grid2: { default: 'g2', variants: [
    { id: 'g2', label: '#grid 2 colonnes', descKey: 'variant.grid2.g2',
      textMode: '#grid(\n  columns: (1fr, 1fr),\n  row-gutter: 1em,\n  column-gutter: 1em,\n  [$1],\n  [$0],\n)',
      mathMode: null, supportsText: true, supportsMath: false } ] },
  grid3: { default: 'g3', variants: [
    { id: 'g3', label: '#grid 3 colonnes', descKey: 'variant.grid3.g3',
      textMode: '#grid(\n  columns: (1fr, 1fr, 1fr),\n  row-gutter: 1em,\n  column-gutter: 1em,\n  [$1],\n  [ ],\n  [$0],\n)',
      mathMode: null, supportsText: true, supportsMath: false } ] },
  typst_grid: { default: 'modal', variants: [
    { id: 'modal', label: 'Assistant #grid', descKey: 'variant.typst_grid.modal',
      textMode: 'MODAL_INTERFACE', mathMode: null, supportsText: true, supportsMath: false } ] },

  table22: { default: 't22', variants: [
    { id: 't22', label: '#table 2×2', descKey: 'variant.table22.t22',
      textMode: '#table(\n  columns: 2,\n  [$1], [ ],\n  [ ], [$0],\n)', mathMode: null, supportsText: true, supportsMath: false } ] },
  table33: { default: 't33', variants: [
    { id: 't33', label: '#table 3×3', descKey: 'variant.table33.t33',
      textMode: '#table(\n  columns: 3,\n  [$1], [ ], [ ],\n  [ ], [ ], [ ],\n  [ ], [ ], [$0],\n)',
      mathMode: null, supportsText: true, supportsMath: false } ] },
  typst_table: { default: 'modal', variants: [
    { id: 'modal', label: 'Assistant #table', descKey: 'variant.typst_table.modal',
      textMode: 'MODAL_INTERFACE', mathMode: null, supportsText: true, supportsMath: false } ] }
};

function getFormatCommandVariants(cmd) { return formatCommandVariants[cmd] || null; }
function getDefaultFormatVariant(cmd) {
  const v = formatCommandVariants[cmd];
  return v ? v.default : null;
}

// =============================================================================
// Générateurs wrapWithTable / wrapWithGrid — inchangés depuis v0.3
// =============================================================================
function wrapWithTable(p) {
  const rows = Math.max(1, p.rows|0 || 3);
  const cols = Math.max(1, p.cols|0 || 3);
  const style = p.style || 'grid';

  let strokeSpec;
  if (p.removeFirstCell) {
    if (style === 'grid')        strokeSpec = '(x, y) => if x == 0 and y == 0 { none } else { 0.5pt }';
    else if (style === 'hlines') strokeSpec = '(x, y) => if x == 0 and y == 0 { none } else { (top: 0.5pt) }';
    else if (style === 'vlines') strokeSpec = '(x, y) => if x == 0 and y == 0 { none } else { (left: 0.5pt) }';
    else                          strokeSpec = 'none';
  } else {
    if (style === 'grid')        strokeSpec = '0.5pt';
    else if (style === 'hlines') strokeSpec = '(x, y) => if y == 0 { none } else { (top: 0.5pt) }';
    else if (style === 'vlines') strokeSpec = '(x, y) => if x == 0 { none } else { (left: 0.5pt) }';
    else                          strokeSpec = 'none';
  }

  const fillClauses = [];
  if (p.removeFirstCell) fillClauses.push('if x == 0 and y == 0 { return none }');
  if (p.headerRowFilled) fillClauses.push('if y == 0 { return luma(230) }');
  if (p.headerColFilled) fillClauses.push('if x == 0 { return luma(230) }');
  if (p.alternateColors) {
    const skipY = (p.headerRowBold || p.headerRowFilled);
    const skipX = (p.headerColBold || p.headerColFilled);
    const guards = [];
    if (skipY) guards.push('y == 0');
    if (skipX) guards.push('x == 0');
    const guard = guards.length ? `if not (${guards.join(' or ')}) and ` : 'if ';
    fillClauses.push(`${guard}calc.odd(y - ${skipY ? 1 : 0}) { return luma(245) }`);
  }
  let fillSpec = null;
  if (fillClauses.length) {
    fillSpec = '(x, y) => {\n    ' + fillClauses.join('\n    ') + '\n    return none\n  }';
  }

  const cell = (x, y) => {
    if (p.removeFirstCell && x === 0 && y === 0) return '[]';
    if (p.headerRowBold && y === 0) return '[*  *]';
    if (p.headerColBold && x === 0) return '[*  *]';
    return '[ ]';
  };

  const lines = [];
  lines.push('#table(');
  lines.push(`  columns: ${cols},`);
  lines.push(`  stroke: ${strokeSpec},`);
  if (fillSpec) lines.push(`  fill: ${fillSpec},`);
  if (p.headerRowBold) {
    const hdrCells = Array.from({ length: cols }, (_, x) => cell(x, 0)).join(', ');
    lines.push(`  table.header(${hdrCells}),`);
    for (let y = 1; y < rows; y++) {
      lines.push(`  ${Array.from({ length: cols }, (_, x) => cell(x, y)).join(', ')},`);
    }
  } else {
    for (let y = 0; y < rows; y++) {
      lines.push(`  ${Array.from({ length: cols }, (_, x) => cell(x, y)).join(', ')},`);
    }
  }
  lines.push(')');
  return lines.join('\n');
}

function wrapWithGrid(p) {
  const cols = Math.max(1, p.cols|0 || 2);
  const rows = Math.max(1, p.rows|0 || 2);
  let colSpec;
  if (p.widthMode === 'auto')                             colSpec = `${cols}`;
  else if (p.widthMode === 'custom' && p.widthCustom)     colSpec = `(${p.widthCustom})`;
  else                                                    colSpec = '(' + Array.from({ length: cols }, () => '1fr').join(', ') + ')';

  const lines = ['#grid('];
  lines.push(`  columns: ${colSpec},`);
  if (p.rowGutter !== undefined && p.rowGutter !== null && p.rowGutter !== '')
    lines.push(`  row-gutter: ${p.rowGutter}em,`);
  if (p.colGutter !== undefined && p.colGutter !== null && p.colGutter !== '')
    lines.push(`  column-gutter: ${p.colGutter}em,`);
  if (p.align && p.align !== 'left') lines.push(`  align: ${p.align},`);

  for (let y = 0; y < rows; y++) {
    lines.push(`  ${Array.from({ length: cols }, () => '[ ]').join(', ')},`);
  }
  lines.push(')');
  return lines.join('\n');
}

module.exports = {
  formatCommandVariants,
  getFormatCommandVariants,
  getDefaultFormatVariant,
  wrapWithTable,
  wrapWithGrid
};
