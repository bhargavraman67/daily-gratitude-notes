import { useEffect, useMemo, useRef } from 'react';
import { Animated } from 'react-native';

type Options = {
  delay?: number;
  step?: number;
  duration?: number;
  distance?: number;
};

/**
 * Mount entrance for a group of blocks: fade + translateY, staggered.
 * Opacity and transform only -> native driver is allowed.
 */
export function useStaggeredFade(count: number, options: Options = {}) {
  const { delay = 0, step = 70, duration = 200, distance = 20 } = options;
  const values = useRef<Animated.Value[]>(
    Array.from({ length: count }, () => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    const anims = values.map((v) =>
      Animated.timing(v, { toValue: 1, duration, useNativeDriver: true }),
    );
    const seq = Animated.sequence([
      Animated.delay(delay),
      Animated.stagger(step, anims),
    ]);
    seq.start();
    return () => {
      seq.stop();
    };
  }, [delay, duration, step, values]);

  return useMemo(
    () =>
      values.map((v) => ({
        opacity: v,
        transform: [
          {
            translateY: v.interpolate({
              inputRange: [0, 1],
              outputRange: [distance, 0],
            }),
          },
        ],
      })),
    [distance, values],
  );
}

export default useStaggeredFade;
