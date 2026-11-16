import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import theme from '../constants/theme';
import { MAX_NOTES_PER_DAY, PROGRESS_STRIP_H } from '../constants/config';

type Props = {
  filled: number;
  total?: number;
};

export function ProgressSegments({
  filled,
  total = MAX_NOTES_PER_DAY,
}: Props) {
  const segments = Array.from({ length: total }, (_, i) => i < filled);

  return (
    <View style={styles.root}>
      <View style={styles.bars}>
        {segments.map((on, i) => (
          <View
            key={`seg-${i}`}
            style={[styles.bar, on ? styles.barOn : styles.barOff]}
          />
        ))}
      </View>
      <Text style={styles.label}>{`${filled} OF ${total} WRITTEN`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: PROGRESS_STRIP_H,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: theme.colors.surface.strip,
    borderTopWidth: 1,
    borderTopColor: theme.colors.ui.hairline,
    gap: 12,
  },
  bars: { flex: 1, flexDirection: 'row', gap: 8 },
  bar: { flex: 1, height: 4, borderRadius: 2 },
  barOff: { backgroundColor: 'rgba(240,238,233,0.10)' },
  barOn: { backgroundColor: theme.colors.earth.bronze },
  label: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.6,
    color: theme.colors.text.secondary,
    fontVariant: ['tabular-nums'],
  },
});

export default ProgressSegments;
