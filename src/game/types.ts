import type { Mood } from '../constants/config';

export type Note = {
  id: string;
  text: string;
  slot: 0 | 1 | 2;
};

export type Entry = {
  id: string;
  dateISO: string;
  notes: Note[];
  mood: Mood | null;
  favourite: boolean;
};
