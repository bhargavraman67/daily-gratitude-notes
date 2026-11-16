import React from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ScreenBackground from '../components/ScreenBackground';
import GradientButton from '../components/GradientButton';
import SecondaryButton from '../components/SecondaryButton';
import MemoryCard from '../components/MemoryCard';
import SectionLabel from '../components/SectionLabel';
import { StatRow } from '../components/StatCard';
import {
  HouseIcon,
  ListBulletsIcon,
  PencilSimpleLineIcon,
} from '../components/icons';
import theme from '../constants/theme';
import assets from '../assets';
import { GUTTER, HEADER_TOP_PAD } from '../constants/config';
import useStaggeredFade from '../hooks/useStaggeredFade';
import { daysAgo, groupNumber } from '../utils/date';
import type { Stats } from '../game/stats';
import type { Entry } from '../game/types';

type Props = {
  entry: Entry | null;
  memory: Entry | null;
  stats: Stats;
  onWriteAgain: () => void;
  onTimeline: () => void;
  onMenu: () => void;
};

const ACCENTS = [
  theme.colors.earth.bronzeLight,
  theme.colors.earth.oliveLight,
  theme.colors.accent.indigoLight,
];

/** The mandatory result state of the flow (rule #12). */
export function EntrySavedScreen({
  entry,
  memory,
  stats,
  onWriteAgain,
  onTimeline,
  onMenu,
}: Props) {
  const blocks = useStaggeredFade(4, { step: 90, duration: 220, distance: 18 });
  const lines = entry ? entry.notes : [];

  return (
    <ScreenBackground variant="saved">
      <View style={styles.root}>
        <Animated.View style={[styles.headline, blocks[0]]}>
          <Text style={styles.headTop}>SAVED</Text>
          <Text style={styles.headBottom}>FOR TODAY</Text>
          <View style={styles.headRule} />
        </Animated.View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollBody}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={blocks[1]} pointerEvents="box-none">
            <View style={styles.recapHead}>
              <Image source={assets.savedAccent} style={styles.accentSprite} />
              <View style={styles.recapLabel}>
                <SectionLabel
                  text="WHAT YOU WROTE TODAY"
                  color={theme.colors.earth.bronzeLight}
                  rule
                />
              </View>
            </View>

            <View style={styles.recapCard}>
              {lines.length > 0 ? (
                lines.map((note, i) => (
                  <View key={note.id} style={styles.recapRow}>
                    <View
                      style={[
                        styles.recapDot,
                        { backgroundColor: ACCENTS[i % 3] },
                      ]}
                    />
                    <Text style={styles.recapText}>{note.text}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.recapText}>
                  A quiet day. That counts too.
                </Text>
              )}
              {entry && entry.mood ? (
                <Text style={styles.moodTag}>{`MOOD / ${entry.mood}`}</Text>
              ) : null}
            </View>
          </Animated.View>

          {memory ? (
            <Animated.View style={styles.memoryBlock} pointerEvents="box-none">
              <MemoryCard entry={memory} daysAgo={daysAgo(memory.dateISO)} />
            </Animated.View>
          ) : null}

          <Animated.View style={[styles.statBlock, blocks[2]]}>
            <StatRow
              items={[
                {
                  key: 'streak',
                  value: `${stats.streak}`,
                  raw: stats.streak,
                  label: 'STREAK',
                  accent: theme.colors.earth.oliveLight,
                },
                {
                  key: 'entries',
                  value: groupNumber(stats.total),
                  raw: stats.total,
                  label: 'ENTRIES',
                  accent: theme.colors.earth.bronzeLight,
                },
                {
                  key: 'words',
                  value: groupNumber(stats.words),
                  raw: stats.words,
                  label: 'WORDS',
                  accent: theme.colors.accent.indigoLight,
                },
              ]}
            />
          </Animated.View>
        </ScrollView>

        <Animated.View
          style={[styles.ctaBlock, blocks[3]]}
          pointerEvents="box-none"
        >
          <GradientButton
            label="WRITE AGAIN"
            onPress={onWriteAgain}
            Icon={PencilSimpleLineIcon}
          />
          <View style={styles.secondaryRow}>
            <View style={styles.secondarySlot}>
              <SecondaryButton
                label="TIMELINE"
                onPress={onTimeline}
                Icon={ListBulletsIcon}
              />
            </View>
            <View style={styles.secondarySlot}>
              <SecondaryButton
                label="MENU"
                onPress={onMenu}
                Icon={HouseIcon}
              />
            </View>
          </View>
        </Animated.View>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, paddingTop: HEADER_TOP_PAD },
  headline: { alignItems: 'center', paddingTop: 10, paddingHorizontal: GUTTER },
  headTop: {
    fontFamily: theme.serif,
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: 2,
    lineHeight: 44,
    color: theme.colors.text.primary,
  },
  headBottom: {
    fontFamily: theme.serif,
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: 2,
    lineHeight: 44,
    color: theme.colors.earth.bronzeLight,
  },
  headRule: {
    marginTop: 14,
    width: 120,
    height: 1,
    backgroundColor: theme.colors.ui.border,
  },

  scroll: { flex: 1 },
  scrollBody: { paddingHorizontal: GUTTER, paddingTop: 18, paddingBottom: 12 },

  recapHead: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  accentSprite: { width: 56, height: 56, resizeMode: 'contain' },
  recapLabel: { flex: 1 },

  recapCard: {
    marginTop: 12,
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.surface.card,
    borderWidth: 1,
    borderColor: theme.colors.ui.hairline,
    padding: 16,
  },
  recapRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  recapDot: { width: 8, height: 8, borderRadius: 4, marginTop: 6, marginRight: 10 },
  recapText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: theme.colors.text.primary,
  },
  moodTag: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.8,
    color: theme.colors.text.muted,
  },

  memoryBlock: { marginTop: 14 },
  statBlock: { marginTop: 16 },

  ctaBlock: {
    paddingHorizontal: GUTTER,
    paddingTop: 10,
    paddingBottom: 22,
  },
  secondaryRow: { flexDirection: 'row', gap: 12, marginTop: 12 },
  secondarySlot: { flex: 1 },
});

export default EntrySavedScreen;
