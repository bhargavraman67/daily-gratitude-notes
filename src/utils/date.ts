/** Local English month names — no Intl reliance (rule: deterministic on Android). */
export const MONTHS_SHORT = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
];

export const MONTHS_LONG = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
];

const DAY_MS = 24 * 60 * 60 * 1000;

export function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function toISO(d: Date): string {
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

export function fromISO(iso: string): Date {
  const [y, m, d] = iso.split('-').map((p) => parseInt(p, 10));
  return new Date(y, (m || 1) - 1, d || 1);
}

export function todayISO(): string {
  return toISO(new Date());
}

export function isoMinusDays(days: number): string {
  return toISO(new Date(startOfDay(new Date()).getTime() - days * DAY_MS));
}

export function daysBetween(isoA: string, isoB: string): number {
  const a = startOfDay(fromISO(isoA)).getTime();
  const b = startOfDay(fromISO(isoB)).getTime();
  return Math.round(Math.abs(a - b) / DAY_MS);
}

export function daysAgo(iso: string): number {
  return daysBetween(iso, todayISO());
}

/** "16 NOV" */
export function formatShort(iso: string): string {
  const d = fromISO(iso);
  return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]}`;
}

/** "16 NOVEMBER" */
export function formatLong(iso: string): string {
  const d = fromISO(iso);
  return `${d.getDate()} ${MONTHS_LONG[d.getMonth()]}`;
}

export function dayNumber(iso: string): string {
  return `${fromISO(iso).getDate()}`;
}

export function monthShort(iso: string): string {
  return MONTHS_SHORT[fromISO(iso).getMonth()];
}

/** 1240 -> "1 240" (plain ASCII space, rule #15 safe). */
export function groupNumber(n: number): string {
  const s = `${Math.max(0, Math.floor(n))}`;
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const fromEnd = s.length - i;
    out += s[i];
    if (fromEnd > 1 && (fromEnd - 1) % 3 === 0) {
      out += ' ';
    }
  }
  return out;
}

/** minutes since midnight -> "21:00" */
export function formatClock(minutes: number): string {
  const m = ((minutes % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${`${h}`.padStart(2, '0')}:${`${mm}`.padStart(2, '0')}`;
}
