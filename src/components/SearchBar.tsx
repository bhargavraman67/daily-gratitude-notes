import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import theme from '../constants/theme';
import { MagnifyingGlassIcon } from './icons';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export function SearchBar({ value, onChangeText }: Props) {
  return (
    <View style={styles.root}>
      <MagnifyingGlassIcon
        size={20}
        weight="duotone"
        color={theme.colors.text.secondary}
        duotoneColor={theme.colors.earth.bronzeLight}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Find an old note..."
        placeholderTextColor={theme.colors.text.placeholder}
        accessibilityLabel="Search notes"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 52,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface.ghost,
    borderWidth: 1,
    borderColor: theme.colors.ui.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 10,
  },
  input: {
    flex: 1,
    height: 52,
    fontSize: 15,
    color: theme.colors.text.primary,
    padding: 0,
  },
});

export default SearchBar;
