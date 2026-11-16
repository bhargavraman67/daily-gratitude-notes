import { Dimensions } from 'react-native';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

/** Splash length. EXACTLY 8000 — shorter races the screenshot gate (rule #13). */
export const LOADER_DURATION_MS = 8000;
export const LOADER_BAR_MS = 7600;
export const LOADER_BAR_W = 180;

export const MAX_NOTES_PER_DAY = 3;
export const MAX_NOTE_LENGTH = 120;
export const SAVE_CEREMONY_MS = 420;

export const SCREEN_WIDTH = SCREEN_W;
export const SCREEN_HEIGHT = SCREEN_H;

/** Geometry — rule #5: content never wider than min(screen - 32, 380). */
export const CONTENT_MAX_W = Math.min(SCREEN_W - 32, 380);
export const GUTTER = 24;

/** Stat row: 3 cards + 2 gaps must fit the content width with zero overflow. */
export const STAT_GAP = 10;
export const STAT_W = Math.floor((CONTENT_MAX_W - 2 * STAT_GAP) / 3);
export const STAT_ROW_W = STAT_W * 3 + STAT_GAP * 2;

export const HEADER_TOP_PAD = 44;
export const HEADER_BODY_H = 72;
export const PROGRESS_STRIP_H = 46;

export const NOTE_PROMPTS = [
  'WHAT MADE YOU SMILE',
  'WHO HELPED TODAY',
  'A SMALL WIN',
] as const;

export const MOODS = ['CALM', 'PROUD', 'THANKFUL'] as const;
export type Mood = (typeof MOODS)[number];

export const REMINDER_STEP_MIN = 30;
