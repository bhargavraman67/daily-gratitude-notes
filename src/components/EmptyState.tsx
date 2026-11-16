import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import theme from '../constants/theme';
import SecondaryButton from './SecondaryButton';
import type { PhosphorIcon } from './icons';

type Props = {
  Icon: PhosphorIcon;
  title: string;
  hint?: string;
  sprite: number;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({
  Icon,
  title,
  hint,
  sprite,
  actionLabel,
  onAction,
}: Props) {
  return (
    <View style={styles.root}>
      <Icon
        size={64}
        weight="duotone"
        color={theme.colors.earth.bronze}
        duotoneColor={theme.colors.accent.indigo}
      />
      <Text style={styles.title}>{title}</Text>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
      <Image source={sprite} style={styles.sprite} />
      {actionLabel && onAction ? (
        <View style={styles.action}>
          <SecondaryButton label={actionLabel} onPress={onAction} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { alignItems: 'center', paddingTop: 28, paddingHorizontal: 24 },
  title: {
    marginTop: 16,
    fontFamily: theme.serif,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 2,
    color: theme.colors.text.primary,
  },
  hint: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    color: theme.colors.text.secondary,
  },
  sprite: { marginTop: 18, width: 96, height: 96, resizeMode: 'contain' },
  action: { marginTop: 22, width: 200 },
});

export default EmptyState;
