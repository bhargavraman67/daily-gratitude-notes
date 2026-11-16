import { useSyncExternalStore } from 'react';
import { getEntries, subscribe } from '../game/store';
import type { Entry } from '../game/types';

/** Individual selector-style access — screens pull only what they render. */
export function useEntries(): Entry[] {
  return useSyncExternalStore(subscribe, getEntries, getEntries);
}

export default useEntries;
