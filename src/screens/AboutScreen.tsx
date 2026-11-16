import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import ScreenBackground from '../components/ScreenBackground';
import ScreenHeader from '../components/ScreenHeader';
import SecondaryButton from '../components/SecondaryButton';
import SectionLabel from '../components/SectionLabel';
import { HouseIcon } from '../components/icons';
import theme from '../constants/theme';
import assets from '../assets';

type Props = {
  onBack: () => void;
  onMenu: () => void;
};

const BLOCKS = [
  {
    label: 'WHAT THIS IS',
    text: 'Three good things, written down once a day. The habit is small on purpose, so it survives the busy weeks.',
  },
  {
    label: 'PRIVACY',
    text: 'ALL ENTRIES STAY ON THIS DEVICE. NOTHING IS UPLOADED, SHARED OR SOLD.',
  },
  {
    label: 'CONTACT',
    text: 'hello@dailygratitude.app',
  },
];

export function AboutScreen({ onBack, onMenu }: Props) {
  return (
    <ScreenBackground variant="plain">
      <ScreenHeader title="ABOUT" onBack={onBack} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.brand}>
          <Image source={assets.logo} style={styles.logo} />
          <Text style={styles.name}>Daily Gratitude Notes</Text>
          <Text style={styles.version}>VERSION 1.0.0</Text>
          <View style={styles.rule} />
        </View>

        <View style={styles.surface}>
          {BLOCKS.map((block, i) => (
            <View
              key={block.label}
              style={[styles.block, i === BLOCKS.length - 1 ? styles.blockLast : null]}
            >
              <SectionLabel
                text={block.label}
                color={theme.colors.earth.bronzeLight}
              />
              <Text style={styles.text}>{block.text}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <SecondaryButton
            label="BACK TO MENU"
            onPress={onMenu}
            Icon={HouseIcon}
          />
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  body: { paddingHorizontal: 24, paddingTop: 22, paddingBottom: 30 },
  brand: { alignItems: 'center' },
  logo: { width: 96, height: 96, resizeMode: 'contain' },
  name: {
    marginTop: 14,
    fontFamily: theme.serif,
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: 1,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  version: {
    marginTop: 6,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2,
    color: theme.colors.text.muted,
  },
  rule: {
    marginTop: 18,
    width: 120,
    height: 1,
    backgroundColor: theme.colors.ui.border,
  },
  surface: {
    marginTop: 22,
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.surface.card,
    borderWidth: 1,
    borderColor: theme.colors.ui.hairline,
    paddingHorizontal: 16,
  },
  block: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(240,238,233,0.08)',
  },
  blockLast: { borderBottomWidth: 0 },
  text: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: theme.colors.text.secondary,
  },
  footer: { marginTop: 24 },
});

export default AboutScreen;
