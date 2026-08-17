const vscode = require('vscode');

/**
 * En Typst, le mode math est délimité UNIQUEMENT par des $.
 *   $ x $        → math display (avec espaces autour)
 *   $x$          → math inline (sans espaces autour)
 * On considère qu'on est en mode math si le nombre de $ non échappés
 * avant le curseur est impair.
 * On ignore les commentaires // ligne et /* ... *​/ blocs.
 */
function isInMathMode(document, position) {
  const src = document.getText(new vscode.Range(new vscode.Position(0, 0), position));

  // Retirer les commentaires ligne (// ...) et blocs (/* ... */)
  let clean = src
    .replace(/\/\*[\s\S]*?\*\//g, '')       // blocs /* */
    .replace(/(^|[^:])\/\/.*$/gm, '$1');    // // en fin de ligne (mais pas dans https://)

  // Compter les $ non échappés (précédés par un nombre pair de \)
  let count = 0;
  for (let i = 0; i < clean.length; i++) {
    if (clean[i] !== '$') continue;
    // compter les backslashes juste avant
    let bs = 0, j = i - 1;
    while (j >= 0 && clean[j] === '\\') { bs++; j--; }
    if (bs % 2 === 0) count++;
  }
  return count % 2 === 1;
}

function calculatePosition(basePosition, content, offset) {
  const lines = content.substring(0, offset).split('\n');
  const lineOffset = lines.length - 1;
  const columnOffset = lines[lines.length - 1].length;
  if (lineOffset === 0) return basePosition.translate(0, columnOffset);
  return basePosition.translate(lineOffset, columnOffset);
}

/**
 * Traite un template contenant $1 (texte sélectionné) et $0 (curseur final).
 * Retourne { replaced, newSelection }.
 */
function processTemplate(command, text, selection) {
  let replaced = '';
  let newSelection = null;

  if (command.includes('$1') || command.includes('$0')) {
    const processed = command.replace(/\\n/g, '\n');
    if (text) {
      replaced = processed.replace(/\$1/g, text);
      if (replaced.includes('$0')) {
        const cursorOffset = replaced.indexOf('$0');
        replaced = replaced.replace('$0', '');
        const cursorPos = calculatePosition(selection.start, replaced, cursorOffset);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      } else {
        const cursorPos = calculatePosition(selection.start, replaced, replaced.length);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
    } else {
      if (processed.includes('$1')) {
        const cursorOffset = processed.indexOf('$1');
        replaced = processed.replace(/\$1/g, '').replace(/\$0/g, '');
        const cursorPos = calculatePosition(selection.start, replaced, cursorOffset);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      } else if (processed.includes('$0')) {
        const cursorOffset = processed.indexOf('$0');
        replaced = processed.replace('$0', '');
        const cursorPos = calculatePosition(selection.start, replaced, cursorOffset);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
    }
  } else {
    replaced = command;
    const cursorPos = calculatePosition(selection.start, replaced, replaced.length);
    newSelection = new vscode.Selection(cursorPos, cursorPos);
  }

  return { replaced, newSelection };
}

module.exports = { isInMathMode, calculatePosition, processTemplate };
