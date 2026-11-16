import type { Entry } from './types';
import { daysAgo, fromISO, startOfDay, toISO } from '../utils/date';

export type Stats = {
  streak: number;
  total: number;
  thisWeek: number;
  words: number;
};

const DAY_MS = 24 * 60 * 60 * 1000;

export function computeStats(entries: Entry[]): Stats {
  const withNotes = entries.filter((e) => e.notes.length > 0);
  const days = new Set(withNotes.map((e) => e.dateISO));

  let streak = 0;
  const cursor = startOfDay(new Date());
  // A streak may legitimately start yesterday if today is not written yet.
  if (!days.has(toISO(cursor))) {
    cursor.setTime(cursor.getTime() - DAY_MS);
  }
  while (days.has(toISO(cursor))) {
    streak += 1;
    cursor.setTime(cursor.getTime() - DAY_MS);
  }

  const thisWeek = withNotes.filter((e) => daysAgo(e.dateISO) < 7).length;

  let words = 0;
  withNotes.forEach((e) => {
    e.notes.forEach((n) => {
      words += n.text.split(/\s+/).filter(Boolean).length;
    });
  });

  return { streak, total: withNotes.length, thisWeek, words };
}

/** One random past entry for the Memory Card — never the one just written. */
export function pickMemory(entries: Entry[], excludeId?: string): Entry | null {
  const pool = entries.filter(
    (e) => e.id !== excludeId && e.notes.length > 0 && daysAgo(e.dateISO) > 0,
  );
  if (pool.length === 0) {
    return null;
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

export function entryMatches(entry: Entry, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (q.length === 0) {
    return true;
  }
  return entry.notes.some((n) => n.text.toLowerCase().indexOf(q) !== -1);
}

export function isThisWeek(entry: Entry): boolean {
  return daysAgo(entry.dateISO) < 7;
}

export function sortByDateDesc(entries: Entry[]): Entry[] {
  return [...entries].sort(
    (a, b) => fromISO(b.dateISO).getTime() - fromISO(a.dateISO).getTime(),
  );
}
