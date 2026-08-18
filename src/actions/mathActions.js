const { processTemplate } = require('../../utils/utils');
const { getMathCommandVariants, getDefaultMathVariant } = require('../config/commandMathVariants');

function getMathCommands() {
  return [
    // Fractions et racines
    'frac', 'sqrt',
    // Opérateurs
    'sum', 'prod', 'int', 'lim',
    'sup', 'inf', 'max', 'min',
    'superscript', 'subscript',
    // Fonctions usuelles
    'sin', 'cos', 'tan', 'ln', 'exp',
    // Comparaisons
    'leq', 'geq', 'neq', 'approx', 'sim', 'equiv',
    // Flèches (avec long en variantes)
    'rightarrow', 'leftarrow', 'Rightarrow', 'Leftarrow', 'Leftrightarrow', 'mapsto',
    // Flèches spéciales (bouton dédié)
    'arrows_special',
    // Espacements math
    'math_spaces', 'mthin', 'stretch',
    // Ensembles usuels (avec bb(D))
    'setN', 'setZ', 'setD', 'setQ', 'setR', 'setC',
    // Symboles logiques / ensemblistes
    'in', 'subset', 'cup', 'cap', 'forall', 'exists',
    'cdot', 'dots', 'times', 'div', 'pm',
    // Styles et annotations (vecteurs, accents, attaches, cancel/braces)
    'vecarrow', 'vec', 'widehat', 'underset', 'overset',
    'op', 'accent', 'attach', 'cancel', 'underbrace', 'overbrace',
    // Délimiteurs
    'left_paren', 'left_bracket', 'left_brace', 'left_abs', 'left_norm',
    // Fonctions numériques (paquet zero)
    'num',
    // Environnements math + display()
    'inline_math', 'display_math', 'display',
    // Matrices / array / systèmes / cas
    'array', 'matrix', 'cases', 'align_math'
  ];
}

function handleMathCommand(cmd, editor, selection, text, isMathMode, variantId = null) {
  const variants = getMathCommandVariants(cmd);
  if (!variants) return null;

  let variant;
  if (variantId) {
    variant = variants.variants.find(v => v.id === variantId) || variants.variants[0];
  } else {
    const def = getDefaultMathVariant(cmd);
    variant = variants.variants.find(v => v.id === def) || variants.variants[0];
  }

  const template = isMathMode ? variant.mathMode : (variant.textMode || null);
  if (!template) return null;

  return processTemplate(template, text, selection);
}

module.exports = { getMathCommands, handleMathCommand };
