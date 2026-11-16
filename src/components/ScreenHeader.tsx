import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ArrowLeftIcon } from './icons';
import theme from '../constants/theme';
import { HEADER_TOP_PAD } from '../constants/config';

type Props = {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
};

/**
 * The ONE header of the project — Menu, Today, Timeline, Search, Settings and
 * About all render this component and differ only by their slots. No inline
 * header markup anywhere else (cross-screen consistency).
 */
export function ScreenHeader({
  title,
  subtitle,
  onBack,
  leftSlot,
  rightSlot,
}: Props) {
  return (
    <View style={styles.root}>
      <View style={styles.side}>
        {onBack ? (
          <Pressable
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.backBtn}
          >
            <ArrowLeftIcon
              size={22}
              weight="duotone"
              color={theme.colors.text.primary}
              duotoneColor={theme.colors.earth.bronze}
            />
          </Pressable>
        ) : (
          leftSlot
        )}
      </View>

      <View style={styles.center}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      <View style={styles.sideRight}>{rightSlot}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingTop: HEADER_TOP_PAD,
    height: HEADER_TOP_PAD + 72,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: theme.colors.surface.header,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.ui.hairline,
  },
  side: { width: 96, height: 48, justifyContent: 'center' },
  sideRight: {
    width: 96,
    height: 48,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  backBtn: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: {
    fontFamily: theme.serif,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 2.4,
    color: theme.colors.text.primary,
  },
  subtitle: {
    marginTop: 3,
    fontSize: 10,
    letterSpacing: 1.6,
    color: theme.colors.text.muted,
  },
});

export const AppHeader = ScreenHeader;
export default ScreenHeader;
