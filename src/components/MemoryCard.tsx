import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import theme from '../constants/theme';
import assets from '../assets';
import { QuotesIcon } from './icons';
import type { Entry } from '../game/types';

type Props = {
  entry: Entry;
  daysAgo: number;
};

export function MemoryCard({ entry, daysAgo }: Props) {
  const appear = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(appear, {
      toValue: 1,
      tension: 120,
      friction: 9,
      useNativeDriver: true,
    }).start();
  }, [appear]);

  const line = entry.notes.length > 0 ? entry.notes[0].text : '';

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[
        styles.card,
        {
          opacity: appear,
          transform: [
            {
              scale: appear.interpolate({
                inputRange: [0, 1],
                outputRange: [0.95, 1],
              }),
            },
          ],
        },
      ]}
    >
      <View style={styles.headRow}>
        <QuotesIcon
          size={18}
          weight="duotone"
          color={theme.colors.earth.bronzeLight}
          duotoneColor={theme.colors.accent.indigo}
        />
        <Text style={styles.label}>
          {`A MEMORY FROM ${daysAgo} DAYS AGO`}
        </Text>
      </View>
      <Text style={styles.quote} numberOfLines={3}>
        {line}
      </Text>
      {/* positive offsets only — the sprite never pokes past the radius */}
      <Image source={assets.memory} style={styles.sprite} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.surface.bronze,
    borderWidth: 1,
    borderColor: theme.colors.ui.bronzeBorder,
    padding: 16,
    paddingBottom: 20,
    minHeight: 112,
  },
  headRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  label: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.8,
    lineHeight: 18,
    color: theme.colors.earth.bronzeLight,
  },
  quote: {
    marginTop: 10,
    paddingRight: 84,
    fontFamily: theme.serif,
    fontSize: 15,
    fontStyle: 'italic',
    lineHeight: 22,
    color: theme.colors.text.primary,
  },
  sprite: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 64,
    height: 64,
    resizeMode: 'contain',
  },
});

export default MemoryCard;
