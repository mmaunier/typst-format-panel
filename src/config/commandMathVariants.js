// =============================================================================
// commandMathVariants.js — v0.4 (i18n-ready)
// =============================================================================

const M = (id, label, math, text, descKey, labelKey) => {
  const v = { id, label, mathMode: math, textMode: text || null,
              supportsMath: true, supportsText: (text != null) };
  if (descKey) v.descKey = descKey;
  if (labelKey) v.labelKey = labelKey;
  return v;
};

const mathCommandVariants = {

  frac: {
    default: 'slash',
    variants: [
      M('slash', 'a / b',      '$1/$0',        '$$1/$0$',         'variant.frac.slash'),
      M('fn',    'frac(a, b)', 'frac($1, $0)', '$frac($1, $0)$',  'variant.frac.fn')
    ]
  },
  sqrt: {
    default: 'sqrt',
    variants: [
      M('sqrt', 'sqrt(x)',    'sqrt($1)$0',   '$sqrt($1)$$0',   'variant.sqrt.sqrt'),
      M('root', 'root(n, x)', 'root($1, $0)', '$root($1, $0)$', 'variant.sqrt.root')
    ]
  },

  sum:  { default: 'plain', variants: [ M('plain', 'sum_(...)^(...)',     'sum_($1)^($0)') ] },
  prod: { default: 'plain', variants: [ M('plain', 'product_(...)^(...)', 'product_($1)^($0)') ] },
  int:  { default: 'plain', variants: [
    M('plain',  'integral',            'integral $1 dif $0',      null, 'variant.int.plain'),
    M('def',    'integral_a^b',        'integral_($1)^($0)',      null, 'variant.int.def'),
    M('double', 'integral.double',     'integral.double $1$0',    null, 'variant.int.double'),
    M('cont',   null,                  'integral.cont $1$0',      null, 'variant.int.cont', 'label.int.cont')
  ] },
  lim: { default: 'plain', variants: [ M('plain', 'lim_(x -> a)', 'lim_($1 -> $0)') ] },
  sup: { default: 'plain', variants: [ M('plain', 'sup', 'sup_($1) $0') ] },
  inf: { default: 'plain', variants: [ M('plain', 'inf', 'inf_($1) $0') ] },
  max: { default: 'plain', variants: [ M('plain', 'max', 'max_($1) $0') ] },
  min: { default: 'plain', variants: [ M('plain', 'min', 'min_($1) $0') ] },

  superscript: { default: 'sup', variants: [ M('sup', 'x^(...)', '$1^($0)') ] },
  subscript:   { default: 'sub', variants: [ M('sub', 'x_(...)', '$1_($0)') ] },

  sin: { default: 'plain', variants: [ M('plain', 'sin(...)', 'sin($1)$0') ] },
  cos: { default: 'plain', variants: [ M('plain', 'cos(...)', 'cos($1)$0') ] },
  tan: { default: 'plain', variants: [ M('plain', 'tan(...)', 'tan($1)$0') ] },
  ln:  { default: 'plain', variants: [ M('plain', 'ln(...)',  'ln($1)$0') ] },
  exp: { default: 'plain', variants: [ M('plain', 'exp(...)', 'exp($1)$0') ] },

  leq:    { default: 'plain', variants: [ M('plain', '<=', '<= $0') ] },
  geq:    { default: 'plain', variants: [ M('plain', '>=', '>= $0') ] },
  neq:    { default: 'plain', variants: [ M('plain', '!=', '!= $0') ] },
  approx: { default: 'plain', variants: [ M('plain', 'approx (~=)', 'approx $0') ] },
  sim:    { default: 'plain', variants: [ M('plain', 'tilde (~)',    'tilde $0') ] },
  equiv:  { default: 'plain', variants: [ M('plain', 'equiv', 'equiv $0') ] },

  rightarrow: { default: 'std', variants: [
    M('std',      '->',                 '-> $0',                 null, 'variant.rightarrow.std'),
    M('long',     'arrow.r.long (⟶)',   'arrow.r.long $0',       null, 'variant.rightarrow.long'),
    M('long-bar', 'arrow.long.bar (⟼)', 'arrow.long.bar $0',     null, 'variant.rightarrow.long-bar')
  ] },
  leftarrow: { default: 'std', variants: [
    M('std',  '<-',                 '<- $0',            null, 'variant.leftarrow.std'),
    M('long', 'arrow.l.long (⟵)',   'arrow.l.long $0',  null, 'variant.leftarrow.long')
  ] },
  Rightarrow: { default: 'std', variants: [
    M('std',  '=>',                       '=> $0',                    null, 'variant.Rightarrow.std'),
    M('long', 'arrow.r.double.long (⟹)', 'arrow.r.double.long $0',   null, 'variant.Rightarrow.long')
  ] },
  Leftarrow: { default: 'std', variants: [
    M('std',  '<==',                       '<== $0',                    null, 'variant.Leftarrow.std'),
    M('long', 'arrow.l.double.long (⟸)', 'arrow.l.double.long $0',   null, 'variant.Leftarrow.long')
  ] },
  Leftrightarrow: { default: 'std', variants: [
    M('std',  '<=>',                          '<=> $0',                      null, 'variant.Leftrightarrow.std'),
    M('long', 'arrow.l.r.double.long (⟺)', 'arrow.l.r.double.long $0',    null, 'variant.Leftrightarrow.long')
  ] },
  mapsto: { default: 'std', variants: [
    M('std',  '|->',                '|-> $0',              null, 'variant.mapsto.std'),
    M('long', 'arrow.long.bar (⟼)', 'arrow.long.bar $0',   null, 'variant.mapsto.long')
  ] },

  arrows_special: { default: 'squig', variants: [
    M('squig',  null, 'arrow.squiggly $0', null, 'variant.arrows_special.squig',  'label.arrows_special.squig'),
    M('hook-r', null, 'arrow.r.hook $0',   null, 'variant.arrows_special.hook-r', 'label.arrows_special.hook-r'),
    M('hook-l', null, 'arrow.l.hook $0',   null, 'variant.arrows_special.hook-l', 'label.arrows_special.hook-l'),
    M('tail',   null, 'arrow.r.tail $0',   null, 'variant.arrows_special.tail',   'label.arrows_special.tail'),
    M('tr',     null, 'arrow.tr $0',       null, 'variant.arrows_special.tr',     'label.arrows_special.tr'),
    M('br',     null, 'arrow.br $0',       null, 'variant.arrows_special.br',     'label.arrows_special.br'),
    M('tl',     null, 'arrow.tl $0',       null, 'variant.arrows_special.tl',     'label.arrows_special.tl'),
    M('bl',     null, 'arrow.bl $0',       null, 'variant.arrows_special.bl',     'label.arrows_special.bl'),
    M('wave-r', null, 'arrow.wave $0',     null, 'variant.arrows_special.wave-r', 'label.arrows_special.wave-r')
  ] },

  math_spaces: { default: 'quad', variants: [
    M('quad',  null, 'quad $0',   null, 'variant.math_spaces.quad',  'label.math_spaces.quad'),
    M('wide',  null, 'wide $0',   null, 'variant.math_spaces.wide',  'label.math_spaces.wide'),
    M('thick', null, 'thick $0',  null, 'variant.math_spaces.thick', 'label.math_spaces.thick'),
    M('med',   null, 'med $0',    null, 'variant.math_spaces.med',   'label.math_spaces.med'),
    M('thin',  null, 'thin $0',   null, 'variant.math_spaces.thin',  'label.math_spaces.thin')
  ] },

  setN: { default: 'plain', variants: [ M('plain', 'NN', 'NN $0') ] },
  setZ: { default: 'plain', variants: [ M('plain', 'ZZ', 'ZZ $0') ] },
  setD: { default: 'plain', variants: [ M('plain', 'bb(D)', 'bb(D) $0') ] },
  setQ: { default: 'plain', variants: [ M('plain', 'QQ', 'QQ $0') ] },
  setR: { default: 'plain', variants: [ M('plain', 'RR', 'RR $0') ] },
  setC: { default: 'plain', variants: [ M('plain', 'CC', 'CC $0') ] },

  in: { default: 'plain', variants: [
    M('plain', 'in',     'in $0'),
    M('notin', 'in.not', 'in.not $0', null, 'variant.in.notin')
  ] },
  subset:  { default: 'plain', variants: [
    M('plain', 'subset',     'subset $0',     null, 'variant.subset.plain'),
    M('not',   'subset.not', 'subset.not $0', null, 'variant.subset.not')
  ] },
  cup:     { default: 'plain', variants: [ M('plain', 'union',  'union $0') ] },
  cap:     { default: 'plain', variants: [ M('plain', 'sect',   'sect $0') ] },
  forall:  { default: 'plain', variants: [ M('plain', 'forall', 'forall $1, $0') ] },
  exists:  { default: 'plain', variants: [
    M('plain', 'exists',     'exists $1, $0',     null, 'variant.exists.plain'),
    M('not',   'exists.not', 'exists.not $1, $0', null, 'variant.exists.not')
  ] },
  cdot:    { default: 'plain', variants: [ M('plain', 'dot',    'dot $0') ] },
  dots:    { default: 'plain', variants: [
    M('plain', 'dots.h',   'dots.h $0',   null, 'variant.dots.plain'),
    M('cdots', 'dots.h.c', 'dots.h.c $0', null, 'variant.dots.cdots'),
    M('vdots', 'dots.v',   'dots.v $0',   null, 'variant.dots.vdots')
  ] },
  times: { default: 'plain', variants: [ M('plain', 'times', 'times $0') ] },
  div:   { default: 'plain', variants: [ M('plain', 'div',   'div $0') ] },
  pm:    { default: 'plain', variants: [ M('plain', 'plus.minus', 'plus.minus $0') ] },

  // "vecarrow" = décoration arrow/bar au-dessus d'une variable (ex. arrow(v)).
  // À ne pas confondre avec "vec" ci-dessous, qui est la vraie fonction Typst
  // vec(...) (vecteur colonne). Anciennement id 'vec' avant v0.1.5.
  vecarrow: { default: 'plain', variants: [
    M('plain', 'arrow(...)',    'arrow($1)$0',    null, 'variant.vecarrow.plain'),
    M('over',  'overline(...)', 'overline($1)$0', null, 'variant.vecarrow.over')
  ] },
  widehat: { default: 'hat', variants: [
    M('hat',      'hat(...)',      'hat($1)$0',      null, 'variant.widehat.hat'),
    M('overparen','overparen(...)','overparen($1)$0', null, 'variant.widehat.overparen')
  ] },
  underset:{ default: 'plain', variants: [ M('plain', 'underline(...)', 'underline($1)$0') ] },
  overset: { default: 'plain', variants: [ M('plain', 'overline(...)',  'overline($1)$0') ] },

  // ---- Vraie fonction vec() Typst (vecteur colonne, avec délimiteur) — v0.1.5 --
  vec: {
    default: 'paren',
    variants: [
      M('paren',   'vec(...)',                  'vec($1)$0',                  null, 'variant.vec.paren'),
      M('bracket', 'vec(delim: "[", ...)',       'vec(delim: "[", $1)$0',      null, 'variant.vec.bracket'),
      M('brace',   'vec(delim: "{", ...)',       'vec(delim: "{", $1)$0',      null, 'variant.vec.brace'),
      M('bar',     'vec(delim: "|", ...)',       'vec(delim: "|", $1)$0',      null, 'variant.vec.bar'),
      M('none',    'vec(delim: #none, ...)',     'vec(delim: #none, $1)$0',    null, 'variant.vec.none')
    ]
  },

  // ---- op / accent / attach — v0.1.5 ---------------------------------------
  op: { default: 'plain', variants: [
    M('plain', 'op("...")', 'op("$1")$0', null, 'variant.op.plain')
  ] },
  accent: {
    default: 'tilde',
    variants: [
      M('tilde',  'accent(x, ~)',      'accent($1, \\u{0303})$0', null, 'variant.accent.tilde'),
      M('dot',    'accent(x, dot)',    'accent($1, dot)$0',    null, 'variant.accent.dot'),
      M('diaer',  'accent(x, diaer)',  'accent($1, diaer)$0',  null, 'variant.accent.diaer'),
      M('breve',  'accent(x, breve)',  'accent($1, breve)$0',  null, 'variant.accent.breve'),
      M('grave',  'accent(x, `)',      'accent($1, `)$0',      null, 'variant.accent.grave'),
      M('acute',  'accent(x, acute)',  'accent($1, acute)$0',  null, 'variant.accent.acute'),
      M('caron',  'accent(x, caron)',  'accent($1, caron)$0',  null, 'variant.accent.caron'),
      M('circle', 'accent(x, circle)', 'accent($1, circle)$0', null, 'variant.accent.circle'),
      M('macron', 'accent(x, macron)', 'accent($1, macron)$0', null, 'variant.accent.macron')
    ]
  },
  attach: {
    default: 'tl',
    variants: [
      M('tl', 'attach(x, tl: ...)', 'attach($1, tl: $0)', null, 'variant.attach.tl'),
      M('tr', 'attach(x, tr: ...)', 'attach($1, tr: $0)', null, 'variant.attach.tr'),
      M('bl', 'attach(x, bl: ...)', 'attach($1, bl: $0)', null, 'variant.attach.bl'),
      M('br', 'attach(x, br: ...)', 'attach($1, br: $0)', null, 'variant.attach.br')
    ]
  },

  // ---- cancel / underbrace / overbrace — v0.1.5 ----------------------------
  cancel: {
    default: 'plain',
    variants: [
      M('plain', 'cancel(...)',              'cancel($1)$0',               null, 'variant.cancel.plain'),
      M('cross', 'cancel(..., cross: true)',  'cancel($1, cross: true)$0', null, 'variant.cancel.cross')
    ]
  },
  underbrace: {
    default: 'brace',
    variants: [
      M('brace',   'underbrace(...)',   'underbrace($1)$0',   null, 'variant.underbrace.brace'),
      M('line',    'underline(...)',    'underline($1)$0',    null, 'variant.underbrace.line'),
      M('bracket', 'underbracket(...)', 'underbracket($1)$0', null, 'variant.underbrace.bracket'),
      M('paren',   'underparen(...)',   'underparen($1)$0',   null, 'variant.underbrace.paren'),
      M('shell',   'undershell(...)',   'undershell($1)$0',   null, 'variant.underbrace.shell')
    ]
  },
  overbrace: {
    default: 'brace',
    variants: [
      M('brace',   'overbrace(...)',   'overbrace($1)$0',   null, 'variant.overbrace.brace'),
      M('line',    'overline(...)',    'overline($1)$0',    null, 'variant.overbrace.line'),
      M('bracket', 'overbracket(...)', 'overbracket($1)$0', null, 'variant.overbrace.bracket'),
      M('paren',   'overparen(...)',   'overparen($1)$0',   null, 'variant.overbrace.paren'),
      M('shell',   'overshell(...)',   'overshell($1)$0',   null, 'variant.overbrace.shell')
    ]
  },

  // ---- Espacements math (thin rapide + générique + stretch) — v0.1.5 -------
  mthin: { default: 'thin', variants: [
    M('thin', null, 'thin $0', null, 'variant.mthin.thin', 'label.mthin.thin')
  ] },
  stretch: {
    default: 'plain',
    variants: [
      M('plain', 'stretch(...)',            'stretch($1)$0',             null, 'variant.stretch.plain'),
      M('sized', 'stretch(..., size: 150%)', 'stretch($1, size: 150%)$0', null, 'variant.stretch.sized')
    ]
  },

  // ---- num() du paquet zero (v0.7) — v0.1.5 --------------------------------
  num: {
    default: 'plain',
    variants: [
      { id: 'plain',  label: 'num[...]',                  descKey: 'variant.num.plain', package: 'zero',
        mathMode: 'num[$1]$0', textMode: null, supportsMath: true, supportsText: false },
      { id: 'round2', label: 'num(round: 2 déc.)[...]',    descKey: 'variant.num.round2', package: 'zero',
        mathMode: 'num(round: (precision: 2))[$1]$0', textMode: null, supportsMath: true, supportsText: false },
      { id: 'round0', label: 'num(round: entier)[...]',    descKey: 'variant.num.round0', package: 'zero',
        mathMode: 'num(round: (precision: 0))[$1]$0', textMode: null, supportsMath: true, supportsText: false },
      { id: 'import', label: 'Import zero', descKey: 'variant.num.import', package: 'zero',
        mathMode: null, textMode: '#import "@preview/zero:0.7.0": num$0', supportsMath: false, supportsText: true }
    ]
  },

  left_paren:   { default: 'plain', variants: [ M('plain', '(...)',   '($1)$0') ] },
  left_bracket: { default: 'plain', variants: [ M('plain', '[...]',   '[$1]$0') ] },
  left_brace:   { default: 'plain', variants: [ M('plain', '{...}',   '{$1}$0') ] },
  left_abs:     { default: 'plain', variants: [ M('plain', '|...|',   'lr(|$1|)$0') ] },
  left_norm:    { default: 'plain', variants: [ M('plain', '||...||', 'lr(||$1||)$0') ] },

  inline_math: { default: 'plain', variants: [
    { id: 'plain', label: '$...$', descKey: 'variant.inline_math.plain',
      textMode: '$$1$$0', mathMode: null, supportsText: true, supportsMath: false }
  ] },
  display_math: { default: 'plain', variants: [
    { id: 'plain', label: '$ ... $', descKey: 'variant.display_math.plain',
      textMode: '$ $1 $$0', mathMode: null, supportsText: true, supportsMath: false }
  ] },
  display: { default: 'plain', variants: [
    M('plain', 'display(...)', 'display($1)$0', null, 'variant.display.plain')
  ] },

  array: { default: 'plain', variants: [
    M('plain', 'mat(delim: #none, ...)', 'mat(delim: #none, $1)$0')
  ] },
  matrix: {
    default: 'pmatrix',
    variants: [
      M('pmatrix', 'mat(...)',                'mat($1)$0',                null, 'variant.matrix.pmatrix'),
      M('bmatrix', 'mat(delim: "[", ...)',    'mat(delim: "[", $1)$0',    null, 'variant.matrix.bmatrix'),
      M('vmatrix', 'mat(delim: "|", ...)',    'mat(delim: "|", $1)$0',    null, 'variant.matrix.vmatrix'),
      M('Vmatrix', 'mat(delim: "‖", ...)',    'mat(delim: "‖", $1)$0',    null, 'variant.matrix.Vmatrix'),
      M('Bmatrix', 'mat(delim: "{", ...)',    'mat(delim: "{", $1)$0',    null, 'variant.matrix.Bmatrix'),
      M('plain',   'mat(delim: #none, ...)', 'mat(delim: #none, $1)$0',   null, 'variant.matrix.plain'),
      M('custom',  null,                     'MODAL_INTERFACE',           null, 'variant.matrix.custom', 'label.matrix.custom')
    ]
  },
  cases: { default: 'plain', variants: [
    M('plain', 'cases(...)', 'cases(\n  $1 & $0,\n)')
  ] },
  align_math: { default: 'plain', variants: [
    { id: 'plain', labelKey: 'label.align_math.plain', descKey: 'variant.align_math.plain',
      textMode: '$ $1 &= $0 \\\n     &= \\ $', mathMode: '$1 &= $0 \\\n     &=',
      supportsText: true, supportsMath: true }
  ] }
};

function getMathCommandVariants(cmd) { return mathCommandVariants[cmd] || null; }
function getDefaultMathVariant(cmd) {
  const v = mathCommandVariants[cmd];
  return v ? v.default : null;
}

function wrapWithMatrix(params) {
  const rows = Math.max(1, params.rows|0 || 2);
  const cols = Math.max(1, params.cols|0 || 2);
  const type = params.matrixType || 'pmatrix';

  const delimMap = {
    pmatrix: null, bmatrix: '"["', vmatrix: '"|"',
    Vmatrix: '"‖"', Bmatrix: '"{"', plain: '#none', matrix: '#none'
  };
  const delim = delimMap[type];

  const rowsStr = [];
  for (let r = 0; r < rows; r++) {
    rowsStr.push(Array.from({ length: cols }, () => ' ').join(', '));
  }
  const body = rowsStr.join(';\n  ');

  if (delim === null) return `mat(\n  ${body}\n)`;
  return `mat(delim: ${delim},\n  ${body}\n)`;
}

module.exports = {
  mathCommandVariants,
  getMathCommandVariants,
  getDefaultMathVariant,
  wrapWithMatrix
};
