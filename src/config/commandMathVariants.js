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
  subset:  { default: 'plain', variants: [ M('plain', 'subset', 'subset $0') ] },
  cup:     { default: 'plain', variants: [ M('plain', 'union',  'union $0') ] },
  cap:     { default: 'plain', variants: [ M('plain', 'sect',   'sect $0') ] },
  forall:  { default: 'plain', variants: [ M('plain', 'forall', 'forall $1, $0') ] },
  exists:  { default: 'plain', variants: [ M('plain', 'exists', 'exists $1, $0') ] },
  cdot:    { default: 'plain', variants: [ M('plain', 'dot',    'dot $0') ] },
  dots:    { default: 'plain', variants: [
    M('plain', 'dots.h',   'dots.h $0',   null, 'variant.dots.plain'),
    M('cdots', 'dots.h.c', 'dots.h.c $0', null, 'variant.dots.cdots'),
    M('vdots', 'dots.v',   'dots.v $0',   null, 'variant.dots.vdots')
  ] },
  times: { default: 'plain', variants: [ M('plain', 'times', 'times $0') ] },
  div:   { default: 'plain', variants: [ M('plain', 'div',   'div $0') ] },
  pm:    { default: 'plain', variants: [ M('plain', 'plus.minus', 'plus.minus $0') ] },

  vec: { default: 'plain', variants: [
    M('plain', 'arrow(...)',    'arrow($1)$0',    null, 'variant.vec.plain'),
    M('over',  'overline(...)', 'overline($1)$0', null, 'variant.vec.over')
  ] },
  widehat: { default: 'plain', variants: [ M('plain', 'hat(...)', 'hat($1)$0') ] },
  underset:{ default: 'plain', variants: [ M('plain', 'underline(...)', 'underline($1)$0') ] },
  overset: { default: 'plain', variants: [ M('plain', 'overline(...)',  'overline($1)$0') ] },

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
    M('plain', 'cases(...)', 'cases(\n  $1 &"si " $0,\n  0  &"sinon",\n)')
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
