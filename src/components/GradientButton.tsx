import React from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../constants/theme';
import usePressScale from '../hooks/usePressScale';
import type { PhosphorIcon } from './icons';

type Props = {
  label: string;
  onPress: () => void;
  Icon?: PhosphorIcon;
  disabled?: boolean;
  height?: number;
  colors?: readonly string[];
  style?: object;
};

/**
 * Primary CTA. Pressable is the PARENT, the Animated.View is INSIDE it
 * (rule #8) — an animated wrapper around a Pressable swallows onPress on
 * Android release. Icon is a fixed 24 square and the label's lineHeight is
 * 24 as well, so icon and text share one baseline (rule #20).
 */
export function GradientButton({
  label,
  onPress,
  Icon,
  disabled = false,
  height = 58,
  colors = theme.gradients.action,
  style,
}: Props) {
  const { scale, onPressIn, onPressOut } = usePressScale(0.96);
  const palette = disabled ? theme.gradients.actionOff : colors;
  const textColor = disabled
    ? theme.colors.text.placeholder
    : theme.colors.text.primary;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      style={[styles.press, { height }, style]}
    >
      <Animated.View
        style={[
          styles.animated,
          { height, transform: [{ scale }] },
          disabled ? null : theme.shadows.action,
        ]}
      >
        <LinearGradient
          colors={[...palette]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.fill, { height }]}
        >
          <View style={styles.row}>
            {Icon ? (
              <Icon
                size={24}
                weight="duotone"
                color={textColor}
                duotoneColor={theme.colors.earth.bronzeLight}
              />
            ) : null}
            <Text style={[styles.label, { color: textColor }]}>{label}</Text>
          </View>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  press: { width: '100%', borderRadius: theme.radius.xl },
  animated: {
    width: '100%',
    borderRadius: theme.radius.xl,
  },
  fill: {
    width: '100%',
    borderRadius: theme.radius.xl,
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
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1.6,
    lineHeight: 24,
  },
});

export default GradientButton;
