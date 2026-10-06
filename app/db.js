import { DEFAULT_SETTINGS, PROGRAMME_WEEKS } from './data';

// Structuur in localStorage 'basfitdb':
// { version, logs: {YYYY-MM-DD: {...}}, measure: [{date,w,z}], settings: {...} }
export const DB_VERSION = 2;

export function migrate(raw) {
  const d = raw && typeof raw === 'object' ? raw : {};
  return {
    ...d,
    version: DB_VERSION,
    logs: d.logs && typeof d.logs === 'object' ? d.logs : {},
    measure: Array.isArray(d.measure) ? d.measure : [],
    settings: { ...DEFAULT_SETTINGS, ...(d.settings && typeof d.settings === 'object' ? d.settings : {}) },
  };
}

export function loadDb() {
  let raw = null;
  try { raw = JSON.parse(localStorage.basfitdb) } catch {}
  const db = migrate(raw);
  if (!raw || raw.version !== DB_VERSION) saveDb(db);
  return db;
}

export function saveDb(db) {
  try { localStorage.basfitdb = JSON.stringify(db) } catch {}
}

// Lokale datum als YYYY-MM-DD (niet UTC, anders telt 00:00–02:00 voor gisteren).
export function localDate(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function parseDate(s) {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

// Week 1 begint op de startdatum; < 1 = nog niet begonnen, > 16 = afgerond.
export function programmeWeek(startDate, today) {
  const days = Math.round((parseDate(today) - parseDate(startDate)) / 864e5);
  return Math.floor(days / 7) + 1;
}

export function weekLabel(weekNr, startDate) {
  if (weekNr < 1) return `Programma start op ${parseDate(startDate).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' })}`;
  if (weekNr > PROGRAMME_WEEKS) return 'Programma afgerond';
  return `Week ${weekNr} van ${PROGRAMME_WEEKS}`;
}
