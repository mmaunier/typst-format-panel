// =============================================================================
// i18n/index.js — chargement des traductions avec fallback sur l'anglais.
//
// Utilisation :
//   const { getTranslator } = require('./i18n');
//   const t = getTranslator('fr');           // ou 'en', ou 'auto'
//   t('button.bold')                          → 'Gras' (ou 'Bold')
//
// - Résolution par clé pointée : "modal.table.title" → JSON.modal.table.title
// - Si la clé n'existe pas dans la langue demandée, retombe sur 'en'.
// - Si absente aussi de 'en', retourne la clé elle-même (aide au diagnostic).
// - resolve('auto', vscodeLocale) → 'fr' si vscodeLocale commence par 'fr',
//   'en' sinon (extensible en ajoutant des fichiers dans ce dossier).
// =============================================================================

const fs = require('fs');
const path = require('path');

const AVAILABLE = ['en', 'fr'];
const DEFAULT_LANG = 'en';
const cache = {};

function load(lang) {
  if (cache[lang]) return cache[lang];
  const file = path.join(__dirname, lang + '.json');
  try {
    cache[lang] = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    console.warn('[i18n] Could not load', file, e.message);
    cache[lang] = {};
  }
  return cache[lang];
}

/**
 * Résout la langue effective à partir du setting et de la locale VSCode.
 *   'en' / 'fr'  → tel quel s'il est disponible
 *   'auto'       → détecté depuis vscodeLocale ('fr-FR' → 'fr', 'en-US' → 'en', ...)
 *   inconnu      → DEFAULT_LANG
 */
function resolveLanguage(setting, vscodeLocale) {
  const s = (setting || 'auto').toLowerCase();
  if (s !== 'auto' && AVAILABLE.includes(s)) return s;
  const base = String(vscodeLocale || '').toLowerCase().split(/[-_]/)[0];
  if (AVAILABLE.includes(base)) return base;
  return DEFAULT_LANG;
}

function getByPath(obj, key) {
  if (obj == null) return undefined;
  const parts = key.split('.');
  let cur = obj;
  for (const p of parts) {
    if (cur == null || typeof cur !== 'object') return undefined;
    cur = cur[p];
  }
  return typeof cur === 'string' ? cur : undefined;
}

/**
 * Renvoie une fonction t(key) qui traduit dans la langue donnée avec fallback EN.
 */
function getTranslator(lang) {
  const primary = load(lang);
  const fallback = lang === DEFAULT_LANG ? primary : load(DEFAULT_LANG);
  return function t(key) {
    const v = getByPath(primary, key);
    if (v !== undefined) return v;
    const f = getByPath(fallback, key);
    if (f !== undefined) return f;
    return key; // aide au diagnostic : clé manquante visible dans l'UI
  };
}

module.exports = { getTranslator, resolveLanguage, AVAILABLE, DEFAULT_LANG };
