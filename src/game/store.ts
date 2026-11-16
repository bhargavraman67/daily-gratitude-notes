/**
 * In-memory entry store: a module-level array plus subscriber callbacks.
 * No AsyncStorage / SQLite / MMKV — those are native deps outside the
 * allowed list. The snapshot reference is stable between mutations so
 * useSyncExternalStore never loops.
 */
import type { Entry, Note } from './types';
import buildSeed from './seed';
import { todayISO } from '../utils/date';
import type { Mood } from '../constants/config';

let entries: Entry[] = buildSeed();
const listeners = new Set<() => void>();

function emit(): void {
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getEntries(): Entry[] {
  return entries;
}

let seq = 0;

export function createEntry(texts: string[], mood: Mood | null): Entry {
  seq += 1;
  const id = `e-${Date.now()}-${seq}`;
  const notes: Note[] = [];
  texts.forEach((raw, i) => {
    const text = raw.trim();
    if (text.length > 0 && i < 3) {
      notes.push({ id: `${id}-n${i}`, text, slot: i as 0 | 1 | 2 });
    }
  });
  return { id, dateISO: todayISO(), notes, mood, favourite: false };
}

export function addEntry(entry: Entry): void {
  entries = [entry, ...entries];
  emit();
}

export function toggleFavourite(id: string): void {
  entries = entries.map((e) =>
    e.id === id ? { ...e, favourite: !e.favourite } : e,
  );
  emit();
}
