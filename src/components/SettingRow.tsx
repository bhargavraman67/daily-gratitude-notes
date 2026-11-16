import React from 'react';
import { Animated, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import theme from '../constants/theme';
import { MinusIcon, PlusIcon } from './icons';
import usePressScale from '../hooks/usePressScale';

type StepperProps = {
  label: string;
  onPress: () => void;
  plus: boolean;
};

function StepperButton({ label, onPress, plus }: StepperProps) {
  const { scale, onPressIn, onPressOut } = usePressScale(0.93);
  const Icon = plus ? PlusIcon : MinusIcon;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      style={styles.stepperPress}
    >
      <Animated.View
        style={[styles.stepper, { transform: [{ scale }] }]}
      >
        <Icon
          size={20}
          weight="duotone"
          color={theme.colors.text.primary}
          duotoneColor={theme.colors.earth.bronzeLight}
        />
      </Animated.View>
    </Pressable>
  );
}

type Props = {
  label: string;
  hint?: string;
  type: 'switch' | 'stepper';
  value: boolean | string;
  onToggle?: (next: boolean) => void;
  onStep?: (delta: number) => void;
  last?: boolean;
  marker?: React.ReactNode;
};

export function SettingRow({
  label,
  hint,
  type,
  value,
  onToggle,
  onStep,
  last = false,
  marker,
}: Props) {
  return (
    <View style={[styles.row, last ? styles.rowLast : null]}>
      <View style={styles.textCol}>
        <View style={styles.labelRow}>
          {marker}
          <Text style={styles.label}>{label}</Text>
        </View>
        {hint ? <Text style={styles.hint}>{hint}</Text> : null}
      </View>

      {type === 'switch' ? (
        <Switch
          value={value === true}
          onValueChange={(next) => onToggle && onToggle(next)}
          accessibilityLabel={label}
          thumbColor={theme.colors.text.primary}
          trackColor={{
            true: theme.colors.accent.indigo,
            false: 'rgba(240,238,233,0.14)',
          }}
        />
      ) : (
        <View style={styles.stepperRow}>
          <StepperButton
            label={`${label} earlier`}
            plus={false}
            onPress={() => onStep && onStep(-1)}
          />
          <Text style={styles.stepValue}>{`${value}`}</Text>
          <StepperButton
            label={`${label} later`}
            plus
            onPress={() => onStep && onStep(1)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(240,238,233,0.08)',
    gap: 12,
  },
  rowLast: { borderBottomWidth: 0 },
  textCol: { flex: 1 },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  label: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: theme.colors.text.primary,
  },
  hint: {
    marginTop: 4,
    fontSize: 11,
    lineHeight: 15,
    color: theme.colors.text.muted,
  },
  stepperRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  stepperPress: { width: 48, height: 48 },
  stepper: {
    width: 48,
    height: 48,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface.bronzeStrong,
    borderWidth: 1,
    borderColor: theme.colors.ui.bronzeBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepValue: {
    minWidth: 62,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.text.primary,
    fontVariant: ['tabular-nums'],
  },
});

export default SettingRow;
