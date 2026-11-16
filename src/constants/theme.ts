/**
 * WARM_EARTHY preset copy. The `name` field stays verbatim (rule #11b) —
 * only the hexes are overridden to the brief's dark-warm journal palette.
 */
export const theme = {
  name: 'warm-earthy',
  colors: {
    bg: {
      base: '#221B10',
      deep: '#1A140B',
      night: '#0E0B06',
      raised: '#2E2415',
    },
    surface: {
      card: 'rgba(51,41,26,0.86)',
      cardSoft: 'rgba(51,41,26,0.78)',
      panel: 'rgba(26,20,11,0.92)',
      ghost: 'rgba(240,238,233,0.06)',
      bronze: 'rgba(171,123,42,0.14)',
      bronzeStrong: 'rgba(171,123,42,0.18)',
      indigo: 'rgba(61,40,224,0.22)',
      header: 'rgba(0,0,0,0.30)',
      strip: 'rgba(0,0,0,0.26)',
      scrim: 'rgba(0,0,0,0.55)',
    },
    earth: {
      bronze: '#AB7B2A',
      bronzeLight: '#D4A24A',
      olive: '#535926',
      oliveLight: '#7C8440',
      walnut: '#3A3022',
    },
    accent: {
      indigo: '#3D28E0',
      indigoLight: '#5C46F0',
    },
    text: {
      primary: '#F0EEE9',
      secondary: '#C9C2B4',
      muted: '#8E8676',
      placeholder: '#6F6657',
    },
    ui: {
      hairline: 'rgba(240,238,233,0.10)',
      border: 'rgba(240,238,233,0.14)',
      bronzeBorder: 'rgba(171,123,42,0.45)',
    },
  },
  gradients: {
    loader: ['rgba(10,7,3,0.94)', 'rgba(34,27,16,0.90)', 'rgba(8,6,3,0.96)'],
    menu: ['rgba(34,27,16,0.72)', 'rgba(46,36,21,0.80)', 'rgba(26,20,11,0.92)'],
    today: ['rgba(26,20,11,0.88)', 'rgba(34,27,16,0.90)', 'rgba(14,11,6,0.94)'],
    saved: ['rgba(61,40,224,0.30)', 'rgba(34,27,16,0.88)', 'rgba(14,11,6,0.96)'],
    plain: ['rgba(34,27,16,0.86)', 'rgba(26,20,11,0.92)', 'rgba(14,11,6,0.95)'],
    action: ['#3D28E0', '#5C46F0'],
    actionOff: ['#3A3022', '#2C2416'],
    loaderBar: ['#AB7B2A', '#D4A24A', '#3D28E0'],
  },
  typography: {
    hero: { fontSize: 42, fontWeight: '700' as const, letterSpacing: 1, lineHeight: 46 },
    title: { fontSize: 26, fontWeight: '700' as const, letterSpacing: 2 },
    section: { fontSize: 16, fontWeight: '700' as const, letterSpacing: 2.4 },
    body: { fontSize: 15, fontWeight: '400' as const, lineHeight: 22 },
    label: { fontSize: 10, fontWeight: '800' as const, letterSpacing: 1.8 },
    caption: { fontSize: 11, fontWeight: '600' as const, letterSpacing: 1.4 },
    number: { fontSize: 22, fontWeight: '800' as const },
  },
  serif: 'serif',
  radius: { sm: 8, md: 14, lg: 16, xl: 18, panel: 22, chip: 20, round: 999 },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 },
  shadows: {
    action: {
      shadowColor: '#3D28E0',
      shadowOpacity: 0.42,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 8 },
      elevation: 10,
    },
    panel: {
      shadowColor: '#000000',
      shadowOpacity: 0.35,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: -4 },
      elevation: 8,
    },
  },
} as const;

export type Theme = typeof theme;
export default theme;
