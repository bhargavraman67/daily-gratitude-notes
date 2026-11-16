import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, Vibration, View } from 'react-native';
import theme from '../constants/theme';
import { SAVE_CEREMONY_MS } from '../constants/config';
import { CheckCircleIcon } from './icons';

type Props = {
  visible: boolean;
  onDone: () => void;
  haptics?: boolean;
};

/** Scrim + a single big check + a short haptic tick (VIBRATE is declared). */
export function SaveCeremony({ visible, onDone, haptics = true }: Props) {
  const scrim = useRef(new Animated.Value(0)).current;
  const mark = useRef(new Animated.Value(0)).current;
  const done = useRef(onDone);
  done.current = onDone;

  useEffect(() => {
    if (!visible) {
      scrim.setValue(0);
      mark.setValue(0);
      return;
    }
    if (haptics) {
      Vibration.vibrate(12);
    }
    const anim = Animated.parallel([
      Animated.timing(scrim, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(mark, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.spring(mark, {
          toValue: 1,
          tension: 180,
          friction: 10,
          useNativeDriver: true,
        }),
      ]),
    ]);
    anim.start();
    const t = setTimeout(() => done.current(), SAVE_CEREMONY_MS);
    return () => {
      anim.stop();
      clearTimeout(t);
    };
  }, [haptics, mark, scrim, visible]);

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={[styles.root, { opacity: scrim }]}
      pointerEvents="auto"
    >
      <Animated.View
        style={{
          opacity: mark,
          transform: [
            {
              scale: mark.interpolate({
                inputRange: [0, 1],
                outputRange: [0.6, 1],
              }),
            },
          ],
        }}
      >
        <CheckCircleIcon
          size={96}
          weight="duotone"
          color={theme.colors.earth.oliveLight}
          duotoneColor={theme.colors.earth.bronzeLight}
        />
      </Animated.View>
      <View style={styles.rule} />
      <Text style={styles.text}>SAVED</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.surface.scrim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rule: {
    marginTop: 18,
    width: 72,
    height: 1,
    backgroundColor: theme.colors.ui.border,
  },
  text: {
    marginTop: 14,
    fontFamily: theme.serif,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 4,
    color: theme.colors.text.primary,
  },
});

export default SaveCeremony;
