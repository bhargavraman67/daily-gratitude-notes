import React from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ScreenBackground from '../components/ScreenBackground';
import ScreenHeader from '../components/ScreenHeader';
import GradientButton from '../components/GradientButton';
import SecondaryButton from '../components/SecondaryButton';
import { StatRow } from '../components/StatCard';
import {
  FlameIcon,
  ListBulletsIcon,
  MagnifyingGlassIcon,
  PencilSimpleLineIcon,
} from '../components/icons';
import theme from '../constants/theme';
import assets from '../assets';
import { GUTTER } from '../constants/config';
import useStaggeredFade from '../hooks/useStaggeredFade';
import { groupNumber } from '../utils/date';
import type { Stats } from '../game/stats';
import type { Entry } from '../game/types';

type Props = {
  stats: Stats;
  memory: Entry | null;
  showMemory: boolean;
  onStart: () => void;
  onTimeline: () => void;
  onSearch: () => void;
  onSettings: () => void;
  onAbout: () => void;
};

/** M4 asymmetric / editorial: left-flush serif hero, hairline rule, CTA block. */
export function MenuScreen({
  stats,
  memory,
  showMemory,
  onStart,
  onTimeline,
  onSearch,
  onSettings,
  onAbout,
}: Props) {
  const blocks = useStaggeredFade(5, { step: 70, duration: 200, distance: 20 });
  const memoryLine =
    memory && memory.notes.length > 0 ? memory.notes[0].text : '';

  return (
    <ScreenBackground variant="menu">
      <ScreenHeader
        title="GRATITUDE"
        leftSlot={
          <View style={styles.streakPill}>
            <FlameIcon
              size={16}
              weight="duotone"
              color={theme.colors.earth.bronzeLight}
              duotoneColor={theme.colors.accent.indigo}
            />
            <Text style={styles.streakText}>{`${stats.streak} DAYS`}</Text>
          </View>
        }
        rightSlot={
          <Pressable
            onPress={onAbout}
            accessibilityRole="button"
            accessibilityLabel="About this app"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.homeBtn}
          >
            <Image source={assets.iconHome} style={styles.homeIcon} />
          </Pressable>
        }
      />

      <View style={styles.body}>
        <View style={styles.hero}>
          <Animated.View style={blocks[0]}>
            <Text style={styles.heroLine}>GOOD</Text>
            <Text style={styles.heroLine}>THINGS</Text>
            <Text style={[styles.heroLine, styles.heroAccent]}>TODAY</Text>
          </Animated.View>

          <Animated.View style={blocks[1]}>
            <View style={styles.heroRule} />
            <Text style={styles.tagline} numberOfLines={2}>
              Write three small things that went right.
            </Text>
            <Text style={styles.tagline} numberOfLines={1}>
              It takes one minute.
            </Text>
          </Animated.View>

          {/* In flow, below the tagline: decor can never cross the letters. */}
          <View style={styles.artRow} pointerEvents="none">
            <Image source={assets.journal} style={styles.heroArt} />
          </View>
        </View>

        <Animated.View
          style={[styles.ctaBlock, blocks[2]]}
          pointerEvents="box-none"
        >
          <Text style={styles.hint}>ONE MINUTE / THREE LINES</Text>
          <GradientButton
            label="START WRITING"
            onPress={onStart}
            Icon={PencilSimpleLineIcon}
            height={60}
          />
        </Animated.View>

        <Animated.View
          style={[styles.statBlock, blocks[3]]}
          pointerEvents="box-none"
        >
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
                key: 'week',
                value: `${stats.thisWeek}`,
                raw: stats.thisWeek,
                label: 'THIS WEEK',
                accent: theme.colors.accent.indigoLight,
              },
            ]}
          />

          {showMemory && memoryLine.length > 0 ? (
            <View style={styles.memoryStrip}>
              <View style={styles.memoryDot} />
              <Text style={styles.memoryText} numberOfLines={1}>
                {memoryLine}
              </Text>
            </View>
          ) : null}
        </Animated.View>

        <Animated.View
          style={[styles.secondaryRow, blocks[4]]}
          pointerEvents="box-none"
        >
          <View style={styles.secondarySlot}>
            <SecondaryButton
              label="TIMELINE"
              onPress={onTimeline}
              Icon={ListBulletsIcon}
            />
          </View>
          <View style={styles.secondarySlot}>
            <SecondaryButton
              label="SEARCH"
              onPress={onSearch}
              Icon={MagnifyingGlassIcon}
            />
          </View>
        </Animated.View>

        <View style={styles.footerRow}>
          <Pressable
            onPress={onSettings}
            accessibilityRole="button"
            accessibilityLabel="Settings"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.footerBtn}
          >
            <Text style={styles.footerText}>SETTINGS</Text>
          </Pressable>
          <Pressable
            onPress={onAbout}
            accessibilityRole="button"
            accessibilityLabel="About"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.footerBtnRight}
          >
            <Text style={styles.footerText}>ABOUT</Text>
          </Pressable>
        </View>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, paddingBottom: 16 },
  streakPill: {
    height: 34,
    borderRadius: 17,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: theme.colors.surface.bronzeStrong,
    borderWidth: 1,
    borderColor: theme.colors.ui.bronzeBorder,
  },
  streakText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    lineHeight: 16,
    color: theme.colors.text.primary,
  },
  homeBtn: {
    width: 48,
    height: 48,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  homeIcon: { width: 36, height: 36, resizeMode: 'contain' },

  hero: { flex: 1, paddingLeft: GUTTER, paddingTop: 22, paddingRight: 16 },
  heroLine: {
    fontFamily: theme.serif,
    fontSize: 42,
    fontWeight: '700',
    letterSpacing: 1,
    lineHeight: 46,
    color: theme.colors.text.primary,
  },
  heroAccent: { color: theme.colors.earth.bronzeLight },
  heroRule: {
    marginTop: 14,
    marginBottom: 14,
    width: '64%',
    height: 1,
    backgroundColor: 'rgba(240,238,233,0.14)',
  },
  tagline: {
    maxWidth: '68%',
    fontSize: 15,
    lineHeight: 22,
    color: theme.colors.text.secondary,
  },
  artRow: {
    flex: 1,
    minHeight: 0,
    overflow: 'hidden',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: 8,
    paddingTop: 10,
  },
  heroArt: {
    width: 112,
    height: 112,
    resizeMode: 'contain',
    opacity: 0.92,
  },

  ctaBlock: { paddingHorizontal: GUTTER, marginTop: 10 },
  hint: {
    marginBottom: 8,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2,
    color: theme.colors.text.muted,
  },

  statBlock: { paddingHorizontal: GUTTER, marginTop: 14 },
  memoryStrip: {
    marginTop: 12,
    minHeight: 40,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface.bronze,
    borderWidth: 1,
    borderColor: theme.colors.ui.bronzeBorder,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  memoryDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.earth.bronzeLight,
  },
  memoryText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: theme.colors.text.secondary,
  },

  secondaryRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: GUTTER,
    marginTop: 14,
  },
  secondarySlot: { flex: 1 },

  footerRow: {
    height: 48,
    marginTop: 8,
    paddingHorizontal: GUTTER,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerBtn: { height: 48, width: 120, justifyContent: 'center' },
  footerBtnRight: {
    height: 48,
    width: 120,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  footerText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.6,
    color: theme.colors.text.muted,
  },
});

export default MenuScreen;
