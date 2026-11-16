import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import type { ListRenderItemInfo } from 'react-native';
import ScreenBackground from '../components/ScreenBackground';
import ScreenHeader from '../components/ScreenHeader';
import SearchBar from '../components/SearchBar';
import Chip from '../components/Chip';
import GratitudeCard from '../components/GratitudeCard';
import SectionLabel from '../components/SectionLabel';
import { MagnifyingGlassIcon } from '../components/icons';
import theme from '../constants/theme';
import assets from '../assets';
import { entryMatches, sortByDateDesc } from '../game/stats';
import { toggleFavourite } from '../game/store';
import useEntries from '../hooks/useEntries';
import type { Entry } from '../game/types';

const SUGGESTIONS = ['FAMILY', 'WORK', 'WALK'];

type Props = { onBack: () => void };

export function SearchScreen({ onBack }: Props) {
  const entries = useEntries();
  const [query, setQuery] = useState('');

  const trimmed = query.trim();

  const results = useMemo(() => {
    if (trimmed.length === 0) {
      return [];
    }
    return sortByDateDesc(
      entries.filter((e) => e.notes.length > 0 && entryMatches(e, trimmed)),
    );
  }, [entries, trimmed]);

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
      <ScreenHeader title="SEARCH" onBack={onBack} />

      <View style={styles.barWrap}>
        <SearchBar value={query} onChangeText={setQuery} />
        {trimmed.length > 0 ? (
          <Text style={styles.count}>
            {`${results.length} ENTRIES FOUND`}
          </Text>
        ) : null}
      </View>

      <View style={styles.listArea}>
        {trimmed.length === 0 ? (
          <View style={styles.suggestBlock}>
            <SectionLabel text="TRY ONE OF THESE" rule />
            <View style={styles.chipRow}>
              {SUGGESTIONS.map((s) => (
                <Chip
                  key={s}
                  label={s}
                  active={false}
                  onPress={() => setQuery(s.toLowerCase())}
                />
              ))}
            </View>
            <Image source={assets.emptySearch} style={styles.sprite} />
            <Text style={styles.hint}>
              Search looks through every line you have written.
            </Text>
          </View>
        ) : results.length > 0 ? (
          <FlatList
            data={results}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            contentContainerStyle={styles.listBody}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            initialNumToRender={6}
            windowSize={7}
          />
        ) : (
          <View style={styles.noResult}>
            <MagnifyingGlassIcon
              size={56}
              weight="duotone"
              color={theme.colors.earth.bronze}
              duotoneColor={theme.colors.accent.indigo}
            />
            <Text style={styles.noResultTitle}>NO MATCHES</Text>
            <Text style={styles.hint}>
              Nothing with that word yet. Try a shorter one.
            </Text>
          </View>
        )}
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  barWrap: { paddingHorizontal: 16, paddingTop: 16 },
  count: {
    marginTop: 12,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.6,
    color: theme.colors.text.secondary,
  },
  listArea: { flex: 1, paddingTop: 14 },
  listBody: { paddingHorizontal: 16, paddingBottom: 20 },
  suggestBlock: { paddingHorizontal: 16, alignItems: 'flex-start' },
  chipRow: { flexDirection: 'row', gap: 8, marginTop: 16 },
  sprite: {
    alignSelf: 'center',
    marginTop: 26,
    width: 96,
    height: 96,
    resizeMode: 'contain',
    opacity: 0.8,
  },
  hint: {
    marginTop: 16,
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    alignSelf: 'center',
    maxWidth: 260,
    color: theme.colors.text.muted,
  },
  noResult: { alignItems: 'center', paddingTop: 30, paddingHorizontal: 24 },
  noResultTitle: {
    marginTop: 16,
    fontFamily: theme.serif,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 2,
    color: theme.colors.text.primary,
  },
});

export default SearchScreen;
