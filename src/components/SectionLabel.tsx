import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import theme from '../constants/theme';

type Props = {
  text: string;
  rule?: boolean;
  color?: string;
};

/** The editorial signature: a thin uppercase label with an optional hairline. */
export function SectionLabel({ text, rule = false, color }: Props) {
  return (
    <View style={styles.root}>
      <Text style={[styles.text, color ? { color } : null]}>{text}</Text>
      {rule ? <View style={styles.rule} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { width: '100%' },
  text: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.8,
    color: theme.colors.text.muted,
  },
  rule: {
    marginTop: 8,
    height: 1,
    width: '100%',
    backgroundColor: theme.colors.ui.hairline,
  },
});

export default SectionLabel;
