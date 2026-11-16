import React from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';
import theme from '../constants/theme';
import usePressScale from '../hooks/usePressScale';

type Props = {
  label: string;
  active: boolean;
  onPress: () => void;
};

export function Chip({ label, active, onPress }: Props) {
  const { scale, onPressIn, onPressOut } = usePressScale(0.95);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={label}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      style={styles.press}
    >
      <Animated.View
        style={[
          styles.chip,
          active ? styles.chipActive : styles.chipIdle,
          { transform: [{ scale }] },
        ]}
      >
        <Text style={[styles.label, active ? styles.labelActive : null]}>
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  press: { height: 40, borderRadius: theme.radius.chip },
  chip: {
    height: 40,
    minWidth: 76,
    borderRadius: theme.radius.chip,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  chipIdle: {
    backgroundColor: theme.colors.surface.ghost,
    borderColor: theme.colors.ui.border,
  },
  chipActive: {
    backgroundColor: theme.colors.surface.indigo,
    borderColor: theme.colors.accent.indigo,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    lineHeight: 16,
    color: theme.colors.text.secondary,
  },
  labelActive: { color: theme.colors.text.primary },
});

export default Chip;
