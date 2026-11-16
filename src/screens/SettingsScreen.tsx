import React, { useCallback } from 'react';
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ScreenBackground from '../components/ScreenBackground';
import ScreenHeader from '../components/ScreenHeader';
import SettingRow from '../components/SettingRow';
import SecondaryButton from '../components/SecondaryButton';
import SectionLabel from '../components/SectionLabel';
import theme from '../constants/theme';
import assets from '../assets';
import { REMINDER_STEP_MIN } from '../constants/config';
import { formatClock } from '../utils/date';
import usePressScale from '../hooks/usePressScale';

export type Settings = {
  reminder: boolean;
  reminderMinutes: number;
  morningMemory: boolean;
  passcode: boolean;
  haptics: boolean;
  pin: string;
};

type Props = {
  settings: Settings;
  onChange: (patch: Partial<Settings>) => void;
  onBack: () => void;
  onAbout: () => void;
};

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'CLR', '0', 'DEL'];

function KeypadKey({
  label,
  onPress,
}: {
  label: string;
  onPress: (label: string) => void;
}) {
  const { scale, onPressIn, onPressOut } = usePressScale(0.93);
  return (
    <Pressable
      onPress={() => onPress(label)}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      accessibilityRole="button"
      accessibilityLabel={`Key ${label}`}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      style={styles.keyPress}
    >
      <Animated.View style={[styles.key, { transform: [{ scale }] }]}>
        <Text style={styles.keyText}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

export function SettingsScreen({
  settings,
  onChange,
  onBack,
  onAbout,
}: Props) {
  const handleKey = useCallback(
    (label: string) => {
      if (label === 'CLR') {
        onChange({ pin: '' });
        return;
      }
      if (label === 'DEL') {
        onChange({ pin: settings.pin.slice(0, -1) });
        return;
      }
      if (settings.pin.length < 4) {
        onChange({ pin: settings.pin + label });
      }
    },
    [onChange, settings.pin],
  );

  const boxes = [0, 1, 2, 3];

  return (
    <ScreenBackground variant="plain">
      <ScreenHeader title="SETTINGS" onBack={onBack} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <SectionLabel text="THE EVENING RITUAL" rule />

        <View style={styles.surface}>
          <SettingRow
            label="EVENING REMINDER"
            hint="A quiet nudge to write before bed."
            type="switch"
            value={settings.reminder}
            onToggle={(next) => onChange({ reminder: next })}
            marker={
              <Image source={assets.iconPause} style={styles.marker} />
            }
          />
          <SettingRow
            label="REMINDER TIME"
            type="stepper"
            value={formatClock(settings.reminderMinutes)}
            onStep={(delta) =>
              onChange({
                reminderMinutes:
                  (settings.reminderMinutes +
                    delta * REMINDER_STEP_MIN +
                    1440) %
                  1440,
              })
            }
          />
          <SettingRow
            label="MORNING MEMORY CARD"
            hint="Show one random old note on the menu."
            type="switch"
            value={settings.morningMemory}
            onToggle={(next) => onChange({ morningMemory: next })}
          />
          <SettingRow
            label="PASSCODE LOCK"
            type="switch"
            value={settings.passcode}
            onToggle={(next) => onChange({ passcode: next })}
          />
          <SettingRow
            label="HAPTIC FEEDBACK"
            type="switch"
            value={settings.haptics}
            onToggle={(next) => onChange({ haptics: next })}
            last
          />
        </View>

        {settings.passcode ? (
          <View style={styles.passBlock}>
            <SectionLabel text="SET A FOUR DIGIT CODE" />
            <View style={styles.boxRow}>
              {boxes.map((i) => (
                <View
                  key={`box-${i}`}
                  style={[
                    styles.box,
                    settings.pin.length > i ? styles.boxFilled : null,
                  ]}
                >
                  <Text style={styles.boxText}>
                    {settings.pin.length > i ? settings.pin[i] : ''}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.keypad}>
              {KEYS.map((k) => (
                <KeypadKey key={k} label={k} onPress={handleKey} />
              ))}
            </View>
          </View>
        ) : null}

        <View style={styles.footer}>
          <SecondaryButton label="ABOUT THIS APP" onPress={onAbout} />
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  body: { paddingHorizontal: 16, paddingTop: 18, paddingBottom: 28 },
  surface: {
    marginTop: 14,
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.surface.card,
    borderWidth: 1,
    borderColor: theme.colors.ui.hairline,
    overflow: 'hidden',
  },
  marker: { width: 20, height: 20, resizeMode: 'contain' },

  passBlock: { marginTop: 22 },
  boxRow: { flexDirection: 'row', gap: 12, marginTop: 12 },
  box: {
    width: 52,
    height: 60,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface.ghost,
    borderWidth: 1,
    borderColor: theme.colors.ui.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxFilled: {
    backgroundColor: theme.colors.surface.indigo,
    borderColor: theme.colors.accent.indigo,
  },
  boxText: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.text.primary,
    fontVariant: ['tabular-nums'],
  },
  keypad: {
    marginTop: 18,
    width: 64 * 3 + 10 * 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  keyPress: { width: 64, height: 64 },
  key: {
    width: 64,
    height: 64,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface.bronze,
    borderWidth: 1,
    borderColor: theme.colors.ui.bronzeBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
    lineHeight: 20,
    color: theme.colors.text.primary,
  },
  footer: { marginTop: 24 },
});

export default SettingsScreen;
