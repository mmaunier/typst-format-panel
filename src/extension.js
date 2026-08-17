const vscode = require('vscode');
const path = require('path');

const { wrapWithTable, wrapWithGrid } = require('./config/commandFormatVariants');
const { wrapWithMatrix }              = require('./config/commandMathVariants');

const { isInMathMode } = require('../utils/utils');
const {
  getFormatCommands, handleFormatCommand,
  commentTypst, uncommentTypst
} = require('./actions/formatActions');
const { getMathCommands, handleMathCommand } = require('./actions/mathActions');
const { getPersoCommands, handlePersoCommand } = require('./actions/persoActions');
const { TypstSidebarProvider } = require('./webview/webviewProvider');

const TYPST_EXTENSIONS = ['.typ'];
let manuallyOpened = false;

function isTypstPath(fsPath) {
  if (!fsPath) return false;
  const ext = path.extname(fsPath).toLowerCase();
  return TYPST_EXTENSIONS.includes(ext);
}
function isTypstFile(document) { return isTypstPath(document.fileName); }

function hasAnyTypstTab() {
  try {
    const tabGroups = vscode.window.tabGroups;
    if (tabGroups && tabGroups.all) {
      for (const group of tabGroups.all) {
        for (const tab of group.tabs) {
          const input = tab.input;
          if (!input) continue;
          const uri = input.uri || input.modified || input.original;
          if (uri && isTypstPath(uri.fsPath || uri.path)) return true;
        }
      }
      return false;
    }
  } catch (e) { /* fallback ci-dessous */ }
  return vscode.workspace.textDocuments.some(d => isTypstFile(d));
}

function updateTypstContext() {
  const enabled = manuallyOpened || hasAnyTypstTab();
  vscode.commands.executeCommand('setContext', 'typst-format-panel:enabled', enabled);
}

function wrapWith(cmd, variantId = null, customParams = null) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;
  const { document, selections } = editor;
  let newSelections = [];
  let hasValidActions = false;

  editor.edit(editBuilder => {
    selections.forEach(selection => {
      const text = document.getText(selection);
      const position = selection.active;
      const isMathMode = isInMathMode(document, position);
      let result;

      if (cmd === 'matrix' && customParams) {
        result = wrapWithMatrix(customParams, text, selection);
      } else if (getFormatCommands().includes(cmd)) {
        result = handleFormatCommand(cmd, editor, selection, text, isMathMode, variantId);
      } else if (getMathCommands().includes(cmd)) {
        result = handleMathCommand(cmd, editor, selection, text, isMathMode, variantId);
      } else if (getPersoCommands().includes(cmd)) {
        result = handlePersoCommand(cmd, editor, selection, text, isMathMode, variantId);
      } else {
        return;
      }

      if (result === null) return;
      if (result && result.replaced !== undefined) {
        editBuilder.replace(selection, result.replaced);
        hasValidActions = true;
        if (result.newSelection) newSelections.push(result.newSelection);
      }
    });
  }).then(() => {
    if (hasValidActions && newSelections.length > 0) editor.selections = newSelections;
    vscode.commands.executeCommand('workbench.action.focusFirstEditorGroup');
  });
}

function activate(context) {
  const provider = new TypstSidebarProvider(context.extensionUri, () => {
    if (!manuallyOpened) {
      manuallyOpened = true;
      updateTypstContext();
    }
  });

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('typstFormatPanel', provider)
  );

  updateTypstContext();

  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(updateTypstContext),
    vscode.workspace.onDidOpenTextDocument(updateTypstContext),
    vscode.workspace.onDidCloseTextDocument(updateTypstContext)
  );
  if (vscode.window.tabGroups) {
    context.subscriptions.push(
      vscode.window.tabGroups.onDidChangeTabs(updateTypstContext),
      vscode.window.tabGroups.onDidChangeTabGroups(updateTypstContext)
    );
  }

  context.subscriptions.push(
    vscode.commands.registerCommand('typstFormat.wrapWith', wrapWith),
    vscode.commands.registerCommand('typstFormat.wrapWithVariant', (cmd, variantId) => wrapWith(cmd, variantId))
  );

  getFormatCommands().forEach(cmd => {
    context.subscriptions.push(
      vscode.commands.registerCommand(`typstFormat.${cmd}`, () => wrapWith(cmd))
    );
  });
  getMathCommands().forEach(cmd => {
    context.subscriptions.push(
      vscode.commands.registerCommand(`typstMath.${cmd}`, () => wrapWith(cmd))
    );
  });

  context.subscriptions.push(
    vscode.commands.registerCommand('typstFormat.wrapWithPerso',
      (cmd, variantId = null) => wrapWith(cmd, variantId))
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('typstFormat.wrapWithCustomParams', (cmd, params) => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;
      let replaced;
      if (cmd === 'typst_table') replaced = wrapWithTable(params);
      else if (cmd === 'typst_grid') replaced = wrapWithGrid(params);
      else if (cmd === 'matrix')    replaced = wrapWithMatrix(params);
      else return;
      const selection = editor.selection;
      editor.edit(eb => eb.replace(selection, replaced)).then(() => {
        vscode.commands.executeCommand('workbench.action.focusFirstEditorGroup');
      });
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('typstFormat.commentTypst', () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) commentTypst(editor, editor.selections);
    }),
    vscode.commands.registerCommand('typstFormat.uncommentTypst', () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) uncommentTypst(editor, editor.selections);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('typstFormat.hidePanel', () => {
      manuallyOpened = false;
      updateTypstContext();
    })
  );

  // Refresh du webview quand un setting pertinent change :
  //   - persoButtons : les boutons Perso changent
  //   - language     : les libellés doivent être re-générés
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(event => {
      if (event.affectsConfiguration('typstFormatPanel.persoButtons') ||
          event.affectsConfiguration('typstFormatPanel.language')) {
        provider.refresh();
      }
    })
  );

  console.log('Typst Format Panel: activated (v0.4)');
}

function deactivate() { console.log('Typst Format Panel: deactivated'); }

module.exports = { activate, deactivate };
