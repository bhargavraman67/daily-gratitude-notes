import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TextInput, View } from 'react-native';
import theme from '../constants/theme';
import { MAX_NOTE_LENGTH } from '../constants/config';
import { CheckCircleIcon } from './icons';

type Props = {
  index: number;
  prompt: string;
  value: string;
  onChangeText: (text: string) => void;
  accent: string;
  editable?: boolean;
};

export function NoteInputCard({
  index,
  prompt,
  value,
  onChangeText,
  accent,
  editable = true,
}: Props) {
  const [focused, setFocused] = useState(false);
  const filled = value.trim().length > 0;

  // Left accent bar grows on focus. Width is NOT native-driver safe -> false.
  const barW = useRef(new Animated.Value(3)).current;
  // Check badge: opacity + scale only -> native driver.
  const check = useRef(new Animated.Value(filled ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(barW, {
      toValue: focused ? 5 : 3,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [barW, focused]);

  useEffect(() => {
    Animated.timing(check, {
      toValue: filled ? 1 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [check, filled]);

  const handleFocus = useCallback(() => setFocused(true), []);
  const handleBlur = useCallback(() => setFocused(false), []);

  return (
    <View
      style={[
        styles.card,
        focused ? styles.cardFocused : null,
      ]}
    >
      <Animated.View
        style={[styles.accentBar, { width: barW, backgroundColor: accent }]}
      />

      <View style={styles.headRow}>
        <Text style={[styles.numeral, { color: accent }]}>
          {`0${index + 1}`}
        </Text>
        <Text style={styles.prompt} numberOfLines={1}>
          {prompt}
        </Text>
        <View style={styles.checkSlot}>
          <Animated.View
            style={{
              opacity: check,
              transform: [
                {
                  scale: check.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.7, 1],
                  }),
                },
              ],
            }}
          >
            <CheckCircleIcon
              size={22}
              weight="duotone"
              color={theme.colors.earth.oliveLight}
              duotoneColor={theme.colors.earth.bronzeLight}
            />
          </Animated.View>
        </View>
      </View>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        editable={editable}
        multiline
        maxLength={MAX_NOTE_LENGTH}
        placeholder="Write one good thing..."
        placeholderTextColor={theme.colors.text.placeholder}
        textAlignVertical="top"
        accessibilityLabel={prompt}
        style={styles.input}
      />

      <Text style={styles.counter}>
        {`${value.length}/${MAX_NOTE_LENGTH}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    minHeight: 104,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface.card,
    borderWidth: 1,
    borderColor: theme.colors.ui.hairline,
    paddingVertical: 14,
    paddingLeft: 20,
    paddingRight: 14,
    overflow: 'hidden',
  },
  cardFocused: { borderColor: 'rgba(61,40,224,0.55)' },
  accentBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderTopLeftRadius: theme.radius.lg,
    borderBottomLeftRadius: theme.radius.lg,
  },
  headRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  numeral: {
    fontFamily: theme.serif,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 2,
    lineHeight: 24,
  },
  prompt: {
    flex: 1,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.8,
    color: theme.colors.text.muted,
  },
  checkSlot: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginTop: 6,
    minHeight: 56,
    fontSize: 15,
    lineHeight: 22,
    color: theme.colors.text.primary,
    padding: 0,
  },
  counter: {
    marginTop: 4,
    alignSelf: 'flex-end',
    fontSize: 10,
    color: theme.colors.text.placeholder,
    fontVariant: ['tabular-nums'],
  },
});

export default NoteInputCard;
