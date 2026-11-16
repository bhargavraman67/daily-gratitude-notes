import React, { memo, useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import theme from '../constants/theme';
import { dayNumber, monthShort } from '../utils/date';
import { StarIcon } from './icons';
import type { Entry } from '../game/types';

type Props = {
  entry: Entry;
  index: number;
  onPress: (id: string) => void;
};

const ACCENTS = [
  theme.colors.earth.bronze,
  theme.colors.earth.olive,
  theme.colors.accent.indigo,
];

/** memo + primitive-friendly props: the FlatList recycles these cheaply. */
function GratitudeCardBase({ entry, index, onPress }: Props) {
  const appear = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.timing(appear, {
      toValue: 1,
      duration: 160,
      delay: Math.min(index, 6) * 50,
      useNativeDriver: true,
    });
    anim.start();
    return () => anim.stop();
  }, [appear, index]);

  const handlePress = () => onPress(entry.id);

  return (
    <Animated.View
      pointerEvents="box-none"
      style={{
        opacity: appear,
        transform: [
          {
            translateY: appear.interpolate({
              inputRange: [0, 1],
              outputRange: [14, 0],
            }),
          },
        ],
      }}
    >
      <Pressable
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={`Entry from ${dayNumber(entry.dateISO)} ${monthShort(
          entry.dateISO,
        )}`}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        style={styles.card}
      >
        <View style={styles.dateCol}>
          <Text style={styles.day}>{dayNumber(entry.dateISO)}</Text>
          <Text style={styles.month}>{monthShort(entry.dateISO)}</Text>
        </View>
        <View style={styles.vRule} />
        <View style={styles.body}>
          {entry.notes.slice(0, 3).map((note, i) => (
            <View key={note.id} style={styles.line}>
              <View
                style={[styles.lineDot, { backgroundColor: ACCENTS[i % 3] }]}
              />
              <Text style={styles.lineText} numberOfLines={2}>
                {note.text}
              </Text>
            </View>
          ))}
          {entry.mood ? (
            <Text style={styles.mood}>{entry.mood}</Text>
          ) : null}
        </View>
        {entry.favourite ? (
          <View style={styles.favSlot}>
            <StarIcon
              size={18}
              weight="duotone"
              color={theme.colors.earth.bronzeLight}
              duotoneColor={theme.colors.accent.indigo}
            />
          </View>
        ) : null}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface.cardSoft,
    borderWidth: 1,
    borderColor: 'rgba(240,238,233,0.08)',
    padding: 14,
    marginBottom: 12,
  },
  dateCol: { width: 44, alignItems: 'center' },
  day: {
    fontFamily: theme.serif,
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 26,
    color: theme.colors.earth.bronzeLight,
    fontVariant: ['tabular-nums'],
  },
  month: {
    marginTop: 2,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.4,
    color: theme.colors.text.muted,
  },
  vRule: {
    width: 1,
    alignSelf: 'stretch',
    marginHorizontal: 12,
    backgroundColor: 'rgba(240,238,233,0.12)',
  },
  body: { flex: 1 },
  line: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 },
  lineDot: { width: 6, height: 6, borderRadius: 3, marginTop: 7, marginRight: 8 },
  lineText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: theme.colors.text.primary,
  },
  mood: {
    marginTop: 2,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.6,
    color: theme.colors.earth.oliveLight,
  },
  favSlot: { width: 22, alignItems: 'flex-end' },
});

export const GratitudeCard = memo(GratitudeCardBase);
export default GratitudeCard;
