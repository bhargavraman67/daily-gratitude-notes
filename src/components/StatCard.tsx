import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import theme from '../constants/theme';
import { STAT_GAP } from '../constants/config';

export type StatItem = {
  key: string;
  value: string;
  raw: number;
  label: string;
  accent: string;
};

type Props = {
  value: string;
  label: string;
  accent: string;
};

/**
 * No raster icon here on purpose: three AI PNGs in one row never come out
 * visually equal (rule #21). The semantics are carried by the accent colour,
 * the big tabular number and the caption. `width:'100%'` — never flex:1
 * inside a flex:1 slot (rule #19a).
 */
export function StatCard({ value, label, accent }: Props) {
  const pulse = useRef(new Animated.Value(1)).current;
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    Animated.sequence([
      Animated.timing(pulse, {
        toValue: 1.08,
        duration: 110,
        useNativeDriver: true,
      }),
      Animated.timing(pulse, {
        toValue: 1,
        duration: 110,
        useNativeDriver: true,
      }),
    ]).start();
  }, [pulse, value]);

  return (
    <View style={[styles.card, { borderColor: `${accent}55` }]}>
      <View style={[styles.dot, { backgroundColor: accent }]} />
      <Animated.Text
        style={[styles.value, { color: accent, transform: [{ scale: pulse }] }]}
        numberOfLines={1}
      >
        {value}
      </Animated.Text>
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

/**
 * A lone pill looks orphaned and an empty pill reads as a broken skeleton:
 * cards with value 0 are dropped and the row itself disappears below two.
 */
export function StatRow({ items }: { items: StatItem[] }) {
  const visible = items.filter((i) => i.raw > 0);
  if (visible.length < 2) {
    return null;
  }
  return (
    <View style={styles.row}>
      {visible.map((item) => (
        <View key={item.key} style={styles.slot}>
          <StatCard
            value={item.value}
            label={item.label}
            accent={item.accent}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: STAT_GAP },
  slot: { flex: 1 },
  card: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    backgroundColor: theme.colors.surface.cardSoft,
    alignItems: 'center',
  },
  dot: { width: 8, height: 8, borderRadius: 4, marginBottom: 8 },
  value: {
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 26,
    fontVariant: ['tabular-nums'],
  },
  label: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.4,
    color: theme.colors.text.muted,
  },
});

export default StatCard;
