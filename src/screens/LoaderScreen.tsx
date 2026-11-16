import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ScreenBackground from '../components/ScreenBackground';
import theme from '../constants/theme';
import assets from '../assets';
import {
  LOADER_BAR_MS,
  LOADER_BAR_W,
  LOADER_DURATION_MS,
} from '../constants/config';

type Props = { onDone: () => void };

/**
 * Deliberately unlike the Menu: a 0.94 dark overlay, no chips, no CTA, no
 * stat row — only the emblem, the brand lines and a thin progress bar.
 */
export function LoaderScreen({ onDone }: Props) {
  const screen = useRef(new Animated.Value(1)).current;
  const logoIn = useRef(new Animated.Value(0)).current;
  const breathe = useRef(new Animated.Value(0)).current;
  const titleIn = useRef(new Animated.Value(0)).current;
  const subIn = useRef(new Animated.Value(0)).current;
  const bar = useRef(new Animated.Value(0)).current;
  const fired = useRef(false);
  const done = useRef(onDone);
  done.current = onDone;

  useEffect(() => {
    const entrance = Animated.parallel([
      Animated.timing(logoIn, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(titleIn, {
        toValue: 1,
        duration: 420,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(subIn, {
        toValue: 1,
        duration: 420,
        delay: 420,
        useNativeDriver: true,
      }),
    ]);
    entrance.start();

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(breathe, {
          toValue: 1,
          duration: 1300,
          useNativeDriver: true,
        }),
        Animated.timing(breathe, {
          toValue: 0,
          duration: 1300,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();

    // width is NOT a native-driver property -> useNativeDriver:false
    const barAnim = Animated.timing(bar, {
      toValue: 1,
      duration: LOADER_BAR_MS,
      useNativeDriver: false,
    });
    barAnim.start();

    const t = setTimeout(() => {
      if (fired.current) {
        return;
      }
      fired.current = true;
      Animated.timing(screen, {
        toValue: 0,
        duration: 260,
        useNativeDriver: true,
      }).start(() => done.current());
    }, LOADER_DURATION_MS - 260);

    return () => {
      entrance.stop();
      loop.stop();
      barAnim.stop();
      clearTimeout(t);
    };
  }, [bar, breathe, logoIn, screen, subIn, titleIn]);

  const logoScale = Animated.multiply(
    logoIn.interpolate({ inputRange: [0, 1], outputRange: [0.88, 1] }),
    breathe.interpolate({ inputRange: [0, 1], outputRange: [1, 1.03] }),
  );

  return (
    <ScreenBackground variant="loader">
      <Animated.View style={[styles.root, { opacity: screen }]}>
        <Animated.View
          style={{
            opacity: logoIn,
            transform: [{ scale: logoScale }],
          }}
        >
          <Image source={assets.logo} style={styles.logo} />
        </Animated.View>

        <Animated.View
          style={[
            styles.titleBlock,
            {
              opacity: titleIn,
              transform: [
                {
                  translateY: titleIn.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.titleTop}>DAILY GRATITUDE</Text>
          <Text style={styles.titleBottom}>NOTES</Text>
          <View style={styles.rule} />
        </Animated.View>

        <Animated.Text style={[styles.subtitle, { opacity: subIn }]}>
          THREE GOOD THINGS. EVERY DAY.
        </Animated.Text>

        <View style={styles.barTrack}>
          <Animated.View
            style={[
              styles.barFill,
              {
                width: bar.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, LOADER_BAR_W],
                }),
              },
            ]}
          >
            <LinearGradient
              colors={[...theme.gradients.loaderBar]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.barGradient}
            />
          </Animated.View>
        </View>
        <Text style={styles.loading}>LOADING...</Text>
      </Animated.View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  logo: { width: 132, height: 132, resizeMode: 'contain' },
  titleBlock: { marginTop: 26, alignItems: 'center' },
  titleTop: {
    fontFamily: theme.serif,
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: 3,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  titleBottom: {
    marginTop: 2,
    fontFamily: theme.serif,
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: 8,
    color: theme.colors.earth.bronzeLight,
    textAlign: 'center',
  },
  rule: {
    marginTop: 16,
    width: 140,
    height: 1,
    backgroundColor: 'rgba(240,238,233,0.10)',
  },
  subtitle: {
    marginTop: 16,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2.4,
    color: theme.colors.text.muted,
  },
  barTrack: {
    marginTop: 40,
    width: LOADER_BAR_W,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(240,238,233,0.10)',
    overflow: 'hidden',
  },
  barFill: { height: 4, borderRadius: 2, overflow: 'hidden' },
  barGradient: { flex: 1, borderRadius: 2 },
  loading: {
    marginTop: 14,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 3,
    color: '#6F6657',
  },
});

export default LoaderScreen;
