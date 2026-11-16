import React, { useCallback, useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ScreenBackground from '../components/ScreenBackground';
import ScreenHeader from '../components/ScreenHeader';
import NoteInputCard from '../components/NoteInputCard';
import ProgressSegments from '../components/ProgressSegments';
import GradientButton from '../components/GradientButton';
import Chip from '../components/Chip';
import SaveCeremony from '../components/SaveCeremony';
import { FloppyDiskIcon } from '../components/icons';
import theme from '../constants/theme';
import {
  MAX_NOTES_PER_DAY,
  MOODS,
  NOTE_PROMPTS,
  type Mood,
} from '../constants/config';
import { formatLong, todayISO } from '../utils/date';

type Props = {
  onBack: () => void;
  onSaved: (texts: string[], mood: Mood | null) => void;
  haptics: boolean;
};

const ACCENTS = [
  theme.colors.earth.bronze,
  theme.colors.earth.olive,
  theme.colors.accent.indigo,
];

/** G3 split panel: header -> writing area (flex:1) -> progress strip -> controls. */
export function TodayScreen({ onBack, onSaved, haptics }: Props) {
  const [notes, setNotes] = useState<string[]>(['', '', '']);
  const [mood, setMood] = useState<Mood | null>(null);
  const [saving, setSaving] = useState(false);

  const filled = useMemo(
    () => notes.filter((t) => t.trim().length > 0).length,
    [notes],
  );

  const setNote = useCallback((index: number, text: string) => {
    setNotes((prev) => {
      const next = prev.slice();
      next[index] = text;
      return next;
    });
  }, []);

  const handleSave = useCallback(() => {
    if (filled === 0 || saving) {
      return;
    }
    setSaving(true);
  }, [filled, saving]);

  const handleCeremonyDone = useCallback(() => {
    setSaving(false);
    onSaved(notes, mood);
  }, [mood, notes, onSaved]);

  return (
    <ScreenBackground variant="today">
      <ScreenHeader
        title="TODAY"
        subtitle={formatLong(todayISO())}
        onBack={onBack}
        rightSlot={
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {`${filled}/${MAX_NOTES_PER_DAY}`}
            </Text>
          </View>
        }
      />

      <View style={styles.writingArea}>
        <KeyboardAvoidingView
          style={styles.fill}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            style={styles.fill}
            contentContainerStyle={styles.scrollBody}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {NOTE_PROMPTS.map((prompt, i) => (
              <NoteInputCard
                key={prompt}
                index={i}
                prompt={prompt}
                value={notes[i]}
                accent={ACCENTS[i]}
                editable={!saving}
                onChangeText={(text) => setNote(i, text)}
              />
            ))}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      <ProgressSegments filled={filled} />

      <View style={styles.controls}>
        <View style={styles.moodRow}>
          {MOODS.map((m) => (
            <Chip
              key={m}
              label={m}
              active={mood === m}
              onPress={() => setMood((prev) => (prev === m ? null : m))}
            />
          ))}
        </View>

        <GradientButton
          label="SAVE TODAY"
          onPress={handleSave}
          Icon={FloppyDiskIcon}
          disabled={filled === 0}
        />
      </View>

      <SaveCeremony
        visible={saving}
        haptics={haptics}
        onDone={handleCeremonyDone}
      />
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  badge: {
    width: 48,
    height: 28,
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
  writingArea: { flex: 1 },
  scrollBody: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 18,
    gap: 12,
  },
  controls: {
    backgroundColor: theme.colors.surface.panel,
    borderTopLeftRadius: theme.radius.panel,
    borderTopRightRadius: theme.radius.panel,
    borderTopWidth: 1,
    borderTopColor: theme.colors.ui.hairline,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 22,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 14,
  },
});

export default TodayScreen;
