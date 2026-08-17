const vscode = require('vscode');
const crypto = require('crypto');
const { processTemplate } = require('../../utils/utils');

function generatePersoId(item, index) {
  let contentToHash;
  if (item.type === 'bouton_variantes') {
    const variantCommands = item.variantes.map(v => v.commande).join('|');
    contentToHash = `${item.type}_${variantCommands}_${item.defaut || 1}`;
  } else {
    contentToHash = `${item.type}_${item.commande || item.texte}`;
  }
  const contentHash = crypto.createHash('md5').update(contentToHash).digest('hex').substring(0, 8);
  return `perso_${index}_${contentHash}`;
}

function getPersoCommands() {
  const config = vscode.workspace.getConfiguration('typstFormatPanel');
  const buttons = config.get('persoButtons', []);
  const commands = [];
  buttons.forEach((item, index) => {
    if (item.type === 'bouton' || item.type === 'bouton_variantes') {
      commands.push(generatePersoId(item, index));
    }
  });
  return commands;
}

function getPersoCommandVariants(cmd) {
  const config = vscode.workspace.getConfiguration('typstFormatPanel');
  const buttons = config.get('persoButtons', []);
  let target = null;
  buttons.forEach((item, index) => {
    if (item.type === 'bouton_variantes') {
      if (generatePersoId(item, index) === cmd) target = item;
    }
  });
  if (!target || !target.variantes || target.variantes.length <= 1) return null;
  return {
    command: cmd,
    defaultVariant: `variant_${(target.defaut || 1) - 1}`,
    variants: target.variantes.map((v, i) => ({
      id: `variant_${i}`, label: v.texte, displayNumber: i + 1
    }))
  };
}

function handlePersoCommand(cmd, editor, selection, text, isMathMode, variantId = null) {
  const config = vscode.workspace.getConfiguration('typstFormatPanel');
  const buttons = config.get('persoButtons', []);
  let target = null;
  buttons.forEach((item, index) => {
    if (item.type === 'bouton' || item.type === 'bouton_variantes') {
      if (generatePersoId(item, index) === cmd) target = item;
    }
  });
  if (!target) return null;

  let command;
  if (target.type === 'bouton_variantes') {
    if (variantId) {
      const idx = parseInt(variantId.replace('variant_', ''), 10);
      command = (idx >= 0 && idx < target.variantes.length)
        ? target.variantes[idx].commande
        : target.variantes[0].commande;
    } else {
      let def = target.defaut || 1;
      if (def <= 0 || def > target.variantes.length) def = 1;
      command = target.variantes[def - 1].commande;
    }
  } else {
    command = target.commande;
  }
  if (!command || typeof command !== 'string') return null;
  return processTemplate(command, text, selection);
}

module.exports = { getPersoCommands, handlePersoCommand, generatePersoId, getPersoCommandVariants };
