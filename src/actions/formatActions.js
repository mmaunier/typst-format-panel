const vscode = require('vscode');
const { getFormatCommandVariants, getDefaultFormatVariant } = require('../config/commandFormatVariants');
const { processTemplate } = require('../../utils/utils');

function getFormatCommands() {
  return [
    // Texte
    'bold', 'italic', 'underline', 'strike', 'highlight', 'smallcaps', 'cal', 'scr', 'code',
    // Transformations
    'uppercase', 'lowercase', 'capitalize', 'super', 'sub', 'skew', 'hide', 'rotate',
    // Couleurs / tailles
    'color', 'fontsize',
    // Titres
    'heading1', 'heading2', 'heading3',
    // Alignement
    'flushleft', 'center', 'flushright', 'move', 'place', 'pad',
    // Espacement
    'hspace', 'vspace', 'newpage', 'colbreak', 'special_spaces', 'hline',
    // Réglages fins
    'set_par', 'set_list',
    // Listes
    'itemize', 'enumerate', 'item',
    // Tasks (paquet taskize)
    'tasks',
    // Blocs
    'block', 'box', 'rect', 'contentblock', 'quote', 'figure', 'includegraphics',
    // Notes et réfs
    'footnote', 'label', 'ref',
    // Grid / Tableaux
    'grid2', 'grid3', 'typst_grid',
    'table22', 'table33', 'typst_table'
  ];
}

function handleFormatCommand(cmd, editor, selection, text, isMathMode, variantId = null) {
  const variants = getFormatCommandVariants(cmd);
  if (!variants) return null;

  let variant;
  if (variantId) {
    variant = variants.variants.find(v => v.id === variantId);
    if (!variant) return null;
  } else {
    const def = getDefaultFormatVariant(cmd);
    variant = variants.variants.find(v => v.id === def) || variants.variants[0];
  }
  return handleFormatVariant(variant, editor, selection, text, isMathMode);
}

function handleFormatVariant(variant, editor, selection, text, isMathMode) {
  if (!isMathMode && !variant.supportsText) return null;
  if (isMathMode && !variant.supportsMath) return null;

  const template = isMathMode ? variant.mathMode : variant.textMode;
  if (!template) return null;

  if (template === 'UPPERCASE_TRANSFORM') {
    return {
      replaced: text.toUpperCase(),
      newSelection: text ? new vscode.Selection(selection.start, selection.start.translate(0, text.length)) : null
    };
  }
  if (template === 'LOWERCASE_TRANSFORM') {
    return {
      replaced: text.toLowerCase(),
      newSelection: text ? new vscode.Selection(selection.start, selection.start.translate(0, text.length)) : null
    };
  }
  if (template === 'CAPITALIZE_TRANSFORM') {
    const cap = text.replace(/(^|\s)(\S)/g, (m, sp, c) => sp + c.toUpperCase());
    return {
      replaced: cap,
      newSelection: text ? new vscode.Selection(selection.start, selection.start.translate(0, cap.length)) : null
    };
  }
  if (template === 'MODAL_INTERFACE') return { replaced: '', newSelection: null };

  return processTemplate(template, text, selection);
}

function commentTypst(editor, selections) {
  editor.edit(editBuilder => {
    selections.forEach(selection => {
      const startLine = selection.start.line;
      const endLine = selection.end.line;
      for (let line = startLine; line <= endLine; line++) {
        const lineText = editor.document.lineAt(line).text;
        const lineRange = editor.document.lineAt(line).range;
        const newText = lineText.startsWith('//') ? '//' + lineText : '// ' + lineText;
        editBuilder.replace(lineRange, newText);
      }
    });
  });
}

function uncommentTypst(editor, selections) {
  editor.edit(editBuilder => {
    selections.forEach(selection => {
      const startLine = selection.start.line;
      const endLine = selection.end.line;
      for (let line = startLine; line <= endLine; line++) {
        const lineText = editor.document.lineAt(line).text;
        const lineRange = editor.document.lineAt(line).range;
        if (lineText.startsWith('//')) {
          let newText = lineText.replace(/^\/\//, '').replace(/^ /, '');
          editBuilder.replace(lineRange, newText);
        }
      }
    });
  });
}

module.exports = { handleFormatCommand, getFormatCommands, commentTypst, uncommentTypst };
