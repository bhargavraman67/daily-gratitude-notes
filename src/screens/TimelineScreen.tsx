import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import type { ListRenderItemInfo } from 'react-native';
import ScreenBackground from '../components/ScreenBackground';
import ScreenHeader from '../components/ScreenHeader';
import Chip from '../components/Chip';
import GratitudeCard from '../components/GratitudeCard';
import EmptyState from '../components/EmptyState';
import SectionLabel from '../components/SectionLabel';
import { NotebookIcon } from '../components/icons';
import theme from '../constants/theme';
import assets from '../assets';
import { isThisWeek, sortByDateDesc } from '../game/stats';
import { toggleFavourite } from '../game/store';
import useEntries from '../hooks/useEntries';
import type { Entry } from '../game/types';

type Filter = 'ALL' | 'THIS WEEK' | 'FAVOURITES';

const FILTERS: Filter[] = ['ALL', 'THIS WEEK', 'FAVOURITES'];

type Props = {
  onBack: () => void;
  onStartWriting: () => void;
};

export function TimelineScreen({ onBack, onStartWriting }: Props) {
  const entries = useEntries();
  const [filter, setFilter] = useState<Filter>('ALL');

  const data = useMemo(() => {
    const sorted = sortByDateDesc(entries.filter((e) => e.notes.length > 0));
    if (filter === 'THIS WEEK') {
      return sorted.filter(isThisWeek);
    }
    if (filter === 'FAVOURITES') {
      return sorted.filter((e) => e.favourite);
    }
    return sorted;
  }, [entries, filter]);

  // Hoisted out of renderItem so memoised rows keep a stable callback.
  const handleCardPress = useCallback((id: string) => {
    toggleFavourite(id);
  }, []);

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<Entry>) => (
      <GratitudeCard entry={item} index={index} onPress={handleCardPress} />
    ),
    [handleCardPress],
  );

  const keyExtractor = useCallback((item: Entry) => item.id, []);

  return (
    <ScreenBackground variant="plain">
      <ScreenHeader
        title="TIMELINE"
        onBack={onBack}
        rightSlot={
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{`${data.length}`}</Text>
          </View>
        }
      />

      <View style={styles.filterRow}>
        {FILTERS.map((f) => (
          <Chip
            key={f}
            label={f}
            active={filter === f}
            onPress={() => setFilter(f)}
          />
        ))}
      </View>

      <View style={styles.listArea}>
        {data.length > 0 ? (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            contentContainerStyle={styles.listBody}
            showsVerticalScrollIndicator={false}
            initialNumToRender={6}
            windowSize={7}
            ListHeaderComponent={
              <View style={styles.listHead}>
                <Image source={assets.emptyTimeline} style={styles.headSprite} />
                <View style={styles.headTextCol}>
                  <SectionLabel
                    text="YOUR DAYS, NEWEST FIRST"
                    color={theme.colors.earth.bronzeLight}
                    rule
                  />
                  <Text style={styles.headHint}>
                    Tap a card to mark it as a favourite.
                  </Text>
                </View>
              </View>
            }
          />
        ) : (
          <EmptyState
            Icon={NotebookIcon}
            title="NOTHING HERE YET"
            hint="Entries you save will stack up in this timeline."
            sprite={assets.emptyTimeline}
            actionLabel="START WRITING"
            onAction={onStartWriting}
          />
        )}
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  badge: {
    minWidth: 48,
    height: 28,
    paddingHorizontal: 10,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface.bronzeStrong,
    borderWidth: 1,
    borderColor: theme.colors.ui.bronzeBorder,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 16,
    color: theme.colors.earth.bronzeLight,
    fontVariant: ['tabular-nums'],
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
  },
  listArea: { flex: 1 },
  listHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  headSprite: { width: 56, height: 56, resizeMode: 'contain' },
  headTextCol: { flex: 1 },
  headHint: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 17,
    color: theme.colors.text.muted,
  },
  listBody: { paddingHorizontal: 16, paddingBottom: 20 },
});

export default TimelineScreen;
