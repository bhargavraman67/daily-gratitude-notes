import React from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import theme from '../constants/theme';
import usePressScale from '../hooks/usePressScale';
import type { PhosphorIcon } from './icons';

type Props = {
  label: string;
  onPress: () => void;
  Icon?: PhosphorIcon;
  style?: object;
  height?: number;
};

/** Same icon metrics as GradientButton (24 / lineHeight 24 / gap 10). */
export function SecondaryButton({
  label,
  onPress,
  Icon,
  style,
  height = 48,
}: Props) {
  const { scale, onPressIn, onPressOut } = usePressScale(0.97);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      style={[styles.press, { height }, style]}
    >
      <Animated.View
        style={[styles.surface, { height, transform: [{ scale }] }]}
      >
        <View style={styles.row}>
          {Icon ? (
            <Icon
              size={24}
              weight="duotone"
              color={theme.colors.text.primary}
              duotoneColor={theme.colors.earth.bronzeLight}
            />
          ) : null}
          <Text style={styles.label}>{label}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  press: { width: '100%', borderRadius: theme.radius.md },
  surface: {
    width: '100%',
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface.ghost,
    borderWidth: 1,
    borderColor: theme.colors.ui.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.4,
    lineHeight: 24,
    color: theme.colors.text.primary,
  },
});

export default SecondaryButton;
