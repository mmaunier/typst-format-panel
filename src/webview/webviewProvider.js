const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const { getFormatCommands } = require('../actions/formatActions');
const { getMathCommands } = require('../actions/mathActions');
const { getPersoCommands, generatePersoId, getPersoCommandVariants } = require('../actions/persoActions');
const { getFormatCommandVariants } = require('../config/commandFormatVariants');
const { getMathCommandVariants } = require('../config/commandMathVariants');
const { getTranslator, resolveLanguage } = require('../i18n');

/**
 * Renvoie une COPIE des variants avec label/description résolus depuis
 * les clés i18n (labelKey / descKey). Ne mute pas les tables d'origine.
 */
function resolveVariants(variants, t) {
  if (!variants || !variants.variants) return variants;
  return {
    ...variants,
    variants: variants.variants.map(v => {
      const out = { ...v };
      if (v.labelKey) out.label = t(v.labelKey);
      if (v.descKey)  out.description = t(v.descKey);
      return out;
    })
  };
}

/**
 * Échappe les caractères spéciaux HTML — nécessaire car les {{t.xxx}} sont
 * substitués tels quels dans du HTML brut (pas via textContent). Sans ça,
 * une traduction contenant "<" ou ">" (ex. le bouton label "<>") est
 * interprétée comme une balise HTML et disparaît silencieusement.
 */
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

/**
 * Remplace tous les {{t.a.b.c}} dans une chaîne par t('a.b.c') (échappé HTML).
 */
function substituteTranslations(str, t) {
  return str.replace(/\{\{\s*t\.([a-zA-Z0-9_.-]+)\s*\}\}/g, (_, key) => escapeHtml(t(key)));
}

function getHtmlTemplate(extensionUri) {
  const p = (name) => path.join(extensionUri.fsPath, 'src', 'webview', name);

  // Charger la langue depuis le setting
  const setting = vscode.workspace.getConfiguration('typstFormatPanel').get('language', 'auto');
  const lang = resolveLanguage(setting, vscode.env.language);
  const t = getTranslator(lang);

  let templateContent = fs.readFileSync(p('template.html'), 'utf8');
  let formatHtml      = fs.readFileSync(p('format.html'),  'utf8');
  let mathHtml        = fs.readFileSync(p('math.html'),    'utf8');
  const cssContent    = fs.readFileSync(p('styles.css'),   'utf8');
  const persoHtml     = generatePersoHtml();

  // {{t.__html_lang}} n'est PAS une clé i18n (elle n'existe dans aucun
  // dictionnaire) : il faut la résoudre AVANT substituteTranslations,
  // sinon la regex générique la consomme et la remplace par la clé brute
  // "__html_lang" au lieu de "en"/"fr" (le .replace ciblé plus bas ne
  // trouve alors plus rien à remplacer).
  const htmlLangEarly = (lang === 'fr') ? 'fr' : 'en';
  templateContent = templateContent.replace('{{t.__html_lang}}', htmlLangEarly);

  // Substituer les {{t.xxx}} dans les trois HTML
  templateContent = substituteTranslations(templateContent, t);
  formatHtml      = substituteTranslations(formatHtml, t);
  mathHtml        = substituteTranslations(mathHtml, t);

  // Construire les variants (avec résolution i18n) pour le JS front
  const variants = {};
  getFormatCommands().forEach(cmd => {
    const v = getFormatCommandVariants(cmd);
    if (v) variants[cmd] = resolveVariants(v, t);
  });
  getMathCommands().forEach(cmd => {
    const v = getMathCommandVariants(cmd);
    if (v) variants[cmd] = resolveVariants(v, t);
  });
  getPersoCommands().forEach(cmd => {
    const v = getPersoCommandVariants(cmd);
    if (v) variants[cmd] = v; // perso : pas de i18n, l'utilisateur écrit dans sa langue
  });

  // Suffixe du titre du menu contextuel (variable JS injectée)
  const contextMenuSuffix = t('menu.variants_suffix');

  return templateContent
    .replace('{{CSS_CONTENT}}',        cssContent)
    .replace('{{FORMAT_HTML}}',        formatHtml)
    .replace('{{MATH_HTML}}',          mathHtml)
    .replace('{{PERSO_HTML}}',         persoHtml)
    .replace('{{COMMAND_VARIANTS}}',   JSON.stringify(variants))
    .replace('{{CONTEXT_MENU_SUFFIX}}', JSON.stringify(contextMenuSuffix));
}

class TypstSidebarProvider {
  constructor(extensionUri, onManuallyOpened) {
    this.extensionUri = extensionUri;
    this.onManuallyOpened = onManuallyOpened;
    this.webviewView = null;
  }

  resolveWebviewView(webviewView) {
    this.webviewView = webviewView;
    if (this.onManuallyOpened) this.onManuallyOpened();

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.extensionUri]
    };
    webviewView.webview.html = getHtmlTemplate(this.extensionUri);

    webviewView.webview.onDidReceiveMessage(message => {
      if (message.command && message.command.startsWith('perso_')) {
        vscode.commands.executeCommand('typstFormat.wrapWithPerso', message.command, message.variant);
        return;
      }
      if (message.command === 'typst_table' || message.command === 'typst_grid' || message.command === 'matrix') {
        if (message.customParams) {
          vscode.commands.executeCommand('typstFormat.wrapWithCustomParams', message.command, message.customParams);
        } else if (message.variant) {
          vscode.commands.executeCommand('typstFormat.wrapWithVariant', message.command, message.variant);
        } else {
          vscode.commands.executeCommand('typstFormat.wrapWith', message.command);
        }
        return;
      }
      const all = [...getFormatCommands(), ...getMathCommands()];
      if (all.includes(message.command)) {
        if (message.variant) {
          vscode.commands.executeCommand('typstFormat.wrapWithVariant', message.command, message.variant);
        } else {
          vscode.commands.executeCommand('typstFormat.wrapWith', message.command);
        }
      } else if (message.command === 'comment') {
        vscode.commands.executeCommand('typstFormat.commentTypst');
      } else if (message.command === 'uncomment') {
        vscode.commands.executeCommand('typstFormat.uncommentTypst');
      }
    });
  }

  refresh() {
    if (this.webviewView) this.webviewView.webview.html = getHtmlTemplate(this.extensionUri);
  }
}

function generatePersoHtml() {
  const config = vscode.workspace.getConfiguration('typstFormatPanel');
  const buttons = config.get('persoButtons', []);
  let html = '<div id="perso-tab" class="tab-content">\n\n';
  let currentGroup = '';
  let count = 0;
  buttons.forEach((item, index) => {
    if (item.type === 'titre') {
      if (currentGroup) html += '</div>\n\n';
      html += `<h3>${item.texte}</h3>\n<div class="button-group">\n`;
      currentGroup = item.texte; count = 0;
    } else if (item.type === 'bouton') {
      const id = generatePersoId(item, index);
      html += `<button class="perso-button" onclick="sendCommand('${id}')">${item.texte}</button>\n`;
      if (++count === 3) { html += '</div>\n<div class="button-group">\n'; count = 0; }
    } else if (item.type === 'bouton_variantes') {
      const id = generatePersoId(item, index);
      let def = item.defaut || 1;
      if (def <= 0 || def > (item.variantes || []).length) def = 1;
      const label = item.variantes && item.variantes[def - 1] ? item.variantes[def - 1].texte : 'Bouton';
      const ctx = item.variantes && item.variantes.length > 1
        ? ` oncontextmenu="showContextMenu(event, '${id}'); return false;"` : '';
      html += `<button class="perso-button" onclick="sendCommand('${id}')"${ctx}>${label}</button>\n`;
      if (++count === 3) { html += '</div>\n<div class="button-group">\n'; count = 0; }
    }
  });
  if (currentGroup) html += '</div>\n';
  html += '\n</div>';
  return html;
}

module.exports = { TypstSidebarProvider };
