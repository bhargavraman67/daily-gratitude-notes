import type { Entry, Note } from './types';
import { isoMinusDays } from '../utils/date';
import type { Mood } from '../constants/config';

type SeedRow = { back: number; lines: string[]; mood: Mood | null; fav?: boolean };

const ROWS: SeedRow[] = [
  { back: 1, lines: ['The bakery saved me the last cinnamon roll.', 'Finished the report before lunch.', 'Rain stopped exactly when I left.'], mood: 'PROUD' },
  { back: 2, lines: ['Long walk by the river after work.', 'Mum called just to say hello.'], mood: 'CALM', fav: true },
  { back: 3, lines: ['Found my old notebook from school.', 'Coffee with Tom lasted two hours.', 'Slept eight full hours.'], mood: 'THANKFUL' },
  { back: 4, lines: ['Fixed the squeaky door myself.'], mood: 'PROUD' },
  { back: 5, lines: ['The cat sat on my lap all evening.', 'Sunset was deep orange over the roofs.'], mood: 'CALM', fav: true },
  { back: 6, lines: ['A stranger held the lift for me.', 'New song on repeat all day.', 'Soup turned out right this time.'], mood: 'THANKFUL' },
  { back: 7, lines: ['Walked the whole way home instead of the bus.', 'Desk is finally clear.'], mood: 'PROUD' },
  { back: 8, lines: ['Family dinner, everyone laughing.'], mood: 'THANKFUL', fav: true },
  { back: 9, lines: ['Read twenty pages before bed.', 'Quiet morning with no alarm.'], mood: 'CALM' },
  { back: 10, lines: ['Helped a neighbour carry boxes up.', 'Garden smelled of wet earth.'], mood: 'THANKFUL' },
  { back: 11, lines: ['First run in weeks and it felt easy.', 'Work praised the design draft.', 'Cooked without burning anything.'], mood: 'PROUD' },
  { back: 12, lines: ['Old friend messaged out of nowhere.', 'Found money in a winter coat.'], mood: 'THANKFUL', fav: true },
  { back: 13, lines: ['Long bath, no phone.'], mood: 'CALM' },
  { back: 14, lines: ['Started this journal.', 'Decided to keep one small habit.'], mood: 'PROUD' },
];

function mkNotes(id: string, lines: string[]): Note[] {
  return lines.slice(0, 3).map((text, i) => ({
    id: `${id}-n${i}`,
    text,
    slot: i as 0 | 1 | 2,
  }));
}

export function buildSeed(): Entry[] {
  return ROWS.map((row, i) => {
    const id = `seed-${i}`;
    return {
      id,
      dateISO: isoMinusDays(row.back),
      notes: mkNotes(id, row.lines),
      mood: row.mood,
      favourite: !!row.fav,
    };
  });
}

export default buildSeed;
