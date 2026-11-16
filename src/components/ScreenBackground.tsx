import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import assets from '../assets';
import theme from '../constants/theme';

export type BgVariant = 'loader' | 'menu' | 'today' | 'saved' | 'plain';

type Props = {
  variant: BgVariant;
  children: React.ReactNode;
};

const GRADIENTS: Record<BgVariant, readonly string[]> = {
  loader: theme.gradients.loader,
  menu: theme.gradients.menu,
  today: theme.gradients.today,
  saved: theme.gradients.saved,
  plain: theme.gradients.plain,
};

/**
 * bg_game is the ONLY background image in the project; the screens are told
 * apart by their gradient overlay and the position of the decor blobs
 * (rule #14 — Loader is far darker than Menu).
 */
function Decor({ variant }: { variant: BgVariant }) {
  if (variant === 'loader') {
    return (
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={[styles.blob, styles.bronzeLoader]} />
        <View style={[styles.blob, styles.indigoLoader]} />
      </View>
    );
  }
  if (variant === 'menu') {
    return (
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={[styles.blob, styles.bronzeMenu]} />
        <View style={styles.columnRule} />
      </View>
    );
  }
  if (variant === 'saved') {
    return (
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={[styles.blob, styles.bronzeSaved]} />
        <View style={[styles.blob, styles.indigoSaved]} />
      </View>
    );
  }
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <View style={[styles.blob, styles.bronzePlain]} />
    </View>
  );
}

export function ScreenBackground({ variant, children }: Props) {
  return (
    <ImageBackground
      source={assets.bgGame}
      style={styles.root}
      resizeMode="cover"
    >
      <LinearGradient
        colors={[...GRADIENTS[variant]]}
        start={variant === 'menu' ? { x: 0, y: 0 } : { x: 0, y: 0 }}
        end={variant === 'menu' ? { x: 1, y: 1 } : { x: 0.6, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Decor variant={variant} />
      <View style={styles.content}>{children}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.bg.base },
  content: { flex: 1 },
  blob: { position: 'absolute', borderRadius: 999 },
  bronzeLoader: {
    width: 320,
    height: 320,
    top: -70,
    left: -90,
    backgroundColor: 'rgba(171,123,42,0.14)',
  },
  indigoLoader: {
    width: 220,
    height: 220,
    bottom: 120,
    right: -60,
    backgroundColor: 'rgba(61,40,224,0.10)',
  },
  bronzeMenu: {
    width: 260,
    height: 260,
    top: -60,
    right: -80,
    backgroundColor: 'rgba(171,123,42,0.12)',
  },
  columnRule: {
    position: 'absolute',
    left: 12,
    top: 120,
    bottom: 160,
    width: 1,
    backgroundColor: 'rgba(240,238,233,0.07)',
  },
  bronzeSaved: {
    width: 280,
    height: 280,
    top: -110,
    left: -110,
    backgroundColor: 'rgba(171,123,42,0.12)',
  },
  indigoSaved: {
    width: 240,
    height: 240,
    bottom: -60,
    right: -80,
    backgroundColor: 'rgba(61,40,224,0.12)',
  },
  bronzePlain: {
    width: 240,
    height: 240,
    top: -80,
    right: -70,
    backgroundColor: 'rgba(171,123,42,0.10)',
  },
});

export default ScreenBackground;
